console.log("hello Baby");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectToDB from './utils/database';
import userRoute from './routes//userRoute';

dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/health-care/user",userRoute);

connectToDB().then(() => {
    app.listen(SERVER_PORT, () => {
        console.log(`Server is running on port ${SERVER_PORT}`);
    });
}).catch((err: any) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
});
