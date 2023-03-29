import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const user = new User({ email, password });
  await user.save();

  res.json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
};

export const fetchMgmtAccess = async (req, res) => {
  try {
    // Get the token from the request headers
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Verify the token and retrieve the user's email
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decodedToken.email;

    // Find the user with the email address
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // Return the dmcheckMgmtAccess value from the user object
    res.json({ dmcheckMgmtAccess: user.dmcheckMgmtAccess });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
