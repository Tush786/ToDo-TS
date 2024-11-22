import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: { name, email, role } });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login user and return a token
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET as string);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
};

// Get all users (Admin only)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
