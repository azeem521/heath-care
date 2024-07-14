"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("hello");
        // Check if user already exists
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists with this email.' });
            return;
        }
        // Hash the password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create a new user instance
        const newUser = new userModel_1.default({
            username,
            email,
            password: hashedPassword,
        });
        // Save the new user to the database
        await newUser.save();
        // Respond with success message
        res.status(201).json({ message: 'User signed up successfully.' });
    }
    catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Failed to sign up user.' });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'User does not exist. Please register first' });
            return;
        }
        // Compare passwords
        const matchingPassword = await bcryptjs_1.default.compare(password, user.password);
        if (matchingPassword) {
            const payload = {
                userId: user._id
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            res.status(200).json({ message: 'Login successful', token: token, userType: user.userType });
        }
        else {
            res.status(401).json({ message: 'One or more fields is incorrect' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};
exports.signIn = signIn;
