import { Request, Response } from 'express';
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/userModel";


export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        const existingUser: IUser | null = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists with this email.' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser: IUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User signed up successfully.' });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Failed to sign up user.' });
    }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user: IUser | null = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User does not exist. Please register first' });
            return;
        }

        // Compare passwords
        const matchingPassword: boolean = await bcrypt.compare(password, user.password);
        if (matchingPassword) {
            const payload = {
                userId: user._id
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
                expiresIn: '1d'
            });
            res.status(200).json({ message: 'Login successful', token: token, userType: user.userType });
        } else {
            res.status(401).json({ message: 'One or more fields is incorrect' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
}