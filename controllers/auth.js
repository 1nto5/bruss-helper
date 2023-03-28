import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import passport from "passport";
import JwtStrategy from "passport-jwt";

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

passport.use(
  new JwtStrategy.Strategy(
    {
      jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      User.findById(jwtPayload.id, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done(null, false);
      });
    }
  )
);

const sendLoginLinkEmail = async (email, loginToken) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "fae8@ethereal.email",
      pass: "9hpBQSJwxtcCZNkEyY",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Login Link",
    text: `Click on this link to log in: http://localhost:3000/login/${loginToken}`,
  };

  await transporter.sendMail(mailOptions);
};

export const login = async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ email });
    await user.save();
  }

  const loginToken = uuidv4();
  const loginTokenExpires = new Date();
  loginTokenExpires.setHours(loginTokenExpires.getHours() + 1);

  await User.findByIdAndUpdate(user._id, { loginToken, loginTokenExpires });

  await sendLoginLinkEmail(email, loginToken);

  res.json({ message: "Login link sent to your email" });
};

export const loginToken = async (req, res) => {
  const { loginToken } = req.params;

  const user = await User.findOne({
    loginToken,
    loginTokenExpires: { $gt: new Date() },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid or expired login link" });
  }

  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
};

// app.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({
//       message: "You have accessed a protected route!",
//       user: req.user,
//     });
//   }
// );
