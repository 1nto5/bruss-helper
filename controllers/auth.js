import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/User.js';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'fae8@ethereal.email',
        pass: '9hpBQSJwxtcCZNkEyY'
    }
});

export const register = async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ email });
  }

  const token = crypto.randomBytes(20).toString('hex');
  const tokenExpiration = new Date(Date.now() + 15 * 60 * 1000);

  user.token = token;
  user.tokenExpiration = tokenExpiration;

  await user.save();

  const loginLink = `https://yourapp.com/login/${token}`;

  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Login link',
    text: `Click the link to log in: ${loginLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      res.status(200).json({ message: 'Login link sent to email' });
    }
  });
};

export const login = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });

  if (!user || Date.now() > user.tokenExpiration) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  const newToken = crypto.randomBytes(20).toString('hex');
  const newTokenExpiration = new Date(Date.now() + 15 * 60 * 1000);

  user.token = newToken;
  user.tokenExpiration = newTokenExpiration;

  await user.save();

  // Set session or JWT for the user (you can use express-session or jsonwebtoken)

  res.status(200).json({ message: 'Logged in successfully' });
};
