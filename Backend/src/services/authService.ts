import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser(
  input: RegisterInput
) {
  const name = input.name.trim();
  const email =
    input.email.trim().toLowerCase();
  const password = input.password;

  if (!name) {
    throw new Error("Name is required");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  if (password.length < 6) {
    throw new Error(
      "Password must be at least 6 characters"
    );
  }

  const existingUser =
    await User.findOne({ email });

  if (existingUser) {
    throw new Error(
      "An account with this email already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token =
    generateToken(user._id.toString());

  return {
    token,

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
}

export async function loginUser(
  input: LoginInput
) {
  const email =
    input.email.trim().toLowerCase();

  const user =
    await User.findOne({ email })
      .select("+password");

  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }

  const passwordMatches =
    await bcrypt.compare(
      input.password,
      user.password
    );

  if (!passwordMatches) {
    throw new Error(
      "Invalid email or password"
    );
  }

  const token =
    generateToken(user._id.toString());

  return {
    token,

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
}

export async function getCurrentUser(
  userId: string
) {
  const user =
    await User.findById(userId)
      .select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}