import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/user.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // generate confirmation token
    const confirmationToken = jwt.sign({ email }, process.env.JWT_SECRET);

    // create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      confirmationToken,
    });
    await newUser.save();

    // send confirmation email
    await sendConfirmationEmail(email, confirmationToken);

    res.json({ message: 'User created. Please check your email to confirm your account.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

async function sendConfirmationEmail(email, token) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'fae8@ethereal.email',
          pass: '9hpBQSJwxtcCZNkEyY'
      }
    });
    const mailOptions = {
      from: process.env.SMTP_FROM_ADDRESS,
      to: email,
      subject: 'Confirm Your Account',
      html: `Please click <a href="${process.env.CLIENT_URL}/user/confirm/${token}">here</a> to confirm your account.`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}