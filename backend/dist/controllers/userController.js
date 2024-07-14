"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("hello");
        // const username = "Maaz Danish"
        // const email = "dk599318@gmail.com"
        // const password = "Maaz@318"
        // Check if user already exists
        let existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists with this email.' });
            return;
        }
        // Hash the password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create a new user instance
        await userModel_1.default.create({
            username,
            email,
            password: hashedPassword,
        });
        // Respond with success message
        res.status(201).json({ message: 'User signed up successfully.' });
    }
    catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Failed to sign up user.' });
    }
};
exports.signUp = signUp;
