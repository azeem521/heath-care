import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the User document
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    userType: 'patient' | 'doctor' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

// Define the schema for the User model
const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
