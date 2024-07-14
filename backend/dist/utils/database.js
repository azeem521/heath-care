"use strict";
// src/utils/database.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.DATABASE_URL;
console.log(`Database URL: ${url}`);
const connectToDB = async () => {
    try {
        if (!url) {
            throw new Error('Database URL is not defined in the environment variables');
        }
        await mongoose_1.default.connect(url);
        console.log("Welcome! You're connected to MongoDB database");
    }
    catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        // Optionally handle the error or throw it further
        throw err;
    }
};
exports.default = connectToDB;
