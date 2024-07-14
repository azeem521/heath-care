import { Request, Response } from 'express';
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs";
import User from "../models/userModel";


export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {

        const { username, email, password } = req.body;
        console.log("hello");

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists with this email.' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        await User.create({
            username,
            email,
            password: hashedPassword,
        });

        
        // Respond with success message
        res.status(201).json({ message: 'User signed up successfully.' });

    } catch (error) {

        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Failed to sign up user.' });
    }
};

