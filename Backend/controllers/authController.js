import bcrypt from 'bcrypt';
import { createUser, findUserByUsername } from '../models/userModel.js';

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await createUser(username, password);
    res.json({ message: "User registered successfully", user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};
