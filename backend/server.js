import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/notes/", noteRoutes);

app.get("/", (req, res) => {
    res.send(`Server running on port: ${port}`);
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

mongoose.connect(
    process.env.MONGO_URI
).then(() => {
    console.log("MongoDB connected")
}).catch((err) => {
    console.error("MongoDB connection error: ", err);
});