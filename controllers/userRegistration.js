import { ExchangeService, ExchangeCredentials, ExchangeVersion, Uri, EmailMessage } from 'ews-javascript-api';
import crypto from 'crypto';
import ModelUser from '../models/user.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with email already exists
    const existingUser = await ModelUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with email already exists' });
    }

    // Generate unique token for email verification
    const token = crypto.randomBytes(20).toString('hex');

    // Create new user document with email verification token
    const newUser = new ModelUser({
      name,
      email,
      password,
      verificationToken: token,
      isVerified: false,
    });
    await newUser.save();

    // Send email with verification link
    const exch = new ExchangeService(ExchangeVersion.Exchange2010_SP1);
    exch.Url = new Uri(process.env.EXCHANGE_URL);
    exch.Credentials = new ExchangeCredentials(process.env.EXCHANGE_USERNAME, process.env.EXCHANGE_PASSWORD);
    const message = new EmailMessage(exch);
    message.Subject = 'Please verify your email';
    message.Body = `Please click the following link to verify your email: ${process.env.APP_BASE_URL}/verify-email/${token}`;
    message.ToRecipients.Add(email);
    await message.Send();

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

