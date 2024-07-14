"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hello Baby");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./utils/database"));
const userRoute_1 = __importDefault(require("./routes//userRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const SERVER_PORT = process.env.SERVER_PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/health-care/user", userRoute_1.default);
(0, database_1.default)().then(() => {
    app.listen(SERVER_PORT, () => {
        console.log(`Server is running on port ${SERVER_PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
});
