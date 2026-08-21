import type {
  Request,
  Response,
} from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/authService.js";

export async function registerController(
  req: Request,
  res: Response
) {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required",
      });
    }

    const result =
      await registerUser({
        name,
        email,
        password,
      });

    return res.status(201).json({
      success: true,
      message:
        "Account created successfully",
      ...result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Registration failed";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

export async function loginController(
  req: Request,
  res: Response
) {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const result =
      await loginUser({
        email,
        password,
      });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Login failed";

    return res.status(401).json({
      success: false,
      message,
    });
  }
}

export async function meController(
  req: Request,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user =
      await getCurrentUser(
        req.userId
      );

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch user";

    return res.status(404).json({
      success: false,
      message,
    });
  }
}