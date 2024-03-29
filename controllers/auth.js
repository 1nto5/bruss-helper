import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Register a new user
export const register = async (req, res) => {
  const { email, password } = req.body;

  // Check if user with given email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Extract first name and last name from the email
  const emailSplit = email.split("@");
  const [rawFirstName, rawLastName] = emailSplit[0].split(".");

  // Capitalize the first letters of first name and last name
  const firstName = capitalizeFirstLetter(rawFirstName);
  const lastName = capitalizeFirstLetter(rawLastName);

  // Create a new user and save it to the database
  const user = new User({ email, password, firstName, lastName });
  await user.save();

  res.json({ message: "User registered successfully" });
};

// Log in a user and issue a JWT token
export const login = async (req, res) => {
  const { email, password } = req.body;
  // Find the user with the given email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the provided password matches the user's password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // If the password is correct, create a JWT token and send it to the client
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });

  res.json({ token });
};

// Fetch the management access level for a user with a valid JWT token
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
    // Return the management access level for the user
    res.json({ dmcheckMgmtAccess: user.dmcheckMgmtAccess });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Check if a JWT token has expired
export const isTokenValid = (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    // Verify the token to see if it has expired
    jwt.verify(token, process.env.JWT_SECRET);
    res.sendStatus(200);
  } catch (err) {
    res.status(401).json({ msg: "Token expired" });
  }
};

// Extract username from an email address
const extractUsername = (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    throw new Error("Invalid email address");
  }
  return email.substring(0, atIndex);
};

// Function to get the username from the token
export const getUsernameFromToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Decode the token to get the user email
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decodedToken.email;

    // Extract the username from the email
    const username = extractUsername(userEmail);

    res.json({ username });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Function to get the user ID from the token
export const getUserIdFromToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Decode the token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    res.json({ userId });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const getExtraHoursSupervisors = async (req, res) => {
  try {
    const supervisors = await User.find({ extraHoursSupervisor: true }).select(
      "firstName lastName"
    );
    res.status(200).json(supervisors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
