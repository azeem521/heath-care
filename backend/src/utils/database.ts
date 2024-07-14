// src/utils/database.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DATABASE_URL as string;

console.log(`Database URL: ${url}`);

const connectToDB = async () => {
    try {
        if (!url) {
            throw new Error('Database URL is not defined in the environment variables');
        }

        await mongoose.connect(url);

        console.log("Welcome! You're connected to MongoDB database");

    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        // Optionally handle the error or throw it further
        throw err;
    }
};

export default connectToDB;
