import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import crypto from "crypto";
import User from "../models/users.js";
import config from "../utils/config.js";
import { withUser } from "../utils/middleware.js";

const router = express.Router();

// Registro de usuario
router.post("/register", async (request, response, next) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, passwordHash: hashedPassword });
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

// Login de usuario
router.post("/login", async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ error: "Please enter email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(401).json({ error: "Invalid email" });
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return response.status(401).json({ error: "Invalid password" });
    }

    const csrfToken = crypto.randomUUID();
    const userForToken = {
      email: user.email,
      csrf: csrfToken,
      id: user._id,
    }

    const token = jwt.sign(userForToken, config.JWT_SECRET, { expiresIn: 60 * 60 });

    response.setHeader("X-CSRF-Token", userForToken.csrf);
    response.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    // Devolver info del usuario (sin password)
    response.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      csrf: csrfToken
    });
  } catch (exception) {
    next(exception);
  }
});

router.get("/me", withUser, async (request, response, next) => {
  try {
    const user = await User.findById(request.userId);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    response.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (exception) {
    next(exception);
  }
});

router.post("/logout", (request, response) => {
  response.clearCookie("token");
  response.status(200).send({
    message: "Logged out successfully"
  });
});

export default router;