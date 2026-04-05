import bcrypt from "bcryptjs";

import { query } from "../config/db.js";
import { signToken } from "../utils/tokens.js";

const sanitizeUser = (user) => ({
  id: user.id,
  fullName: user.full_name,
  email: user.email
});

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existing = await query("SELECT id FROM users WHERE email = $1", [email.toLowerCase()]);

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const { rows } = await query(
      `INSERT INTO users (full_name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, full_name, email`,
      [fullName, email.toLowerCase(), passwordHash]
    );

    const user = rows[0];
    const token = signToken(user);

    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Unable to create account.", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const { rows } = await query(
      "SELECT id, full_name, email, password_hash FROM users WHERE email = $1",
      [email.toLowerCase()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = rows[0];
    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = signToken(user);
    res.json({ token, user: sanitizeUser(user) });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Unable to log in.", error: error.message });
  }
};

export const me = async (req, res) => {
  try {
    const { rows } = await query("SELECT id, full_name, email FROM users WHERE id = $1", [req.user.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ user: sanitizeUser(rows[0]) });
  } catch (error) {
    console.error("Auth me error:", error);
    res.status(500).json({ message: "Unable to fetch user.", error: error.message });
  }
};
