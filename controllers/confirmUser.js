import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const confirmUser = async (req, res) => {
    try {
      const token = req.query.token;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOneAndUpdate(
        { email: decodedToken.email },
        { confirmed: true, confirmationToken: null },
        { new: true }
      );
      if (!user) {
        return res.status(400).json({ error: 'Invalid token' });
      }
  
      res.json({ message: 'Account confirmed. You may now log in.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };