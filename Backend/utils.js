import jwt from "jsonwebtoken";
import { config } from 'dotenv'
config()

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Allow cross-origin in production
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};