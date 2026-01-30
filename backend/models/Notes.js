import mongoose from "mongoose";

const noteSchema =  new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" }
}, {timestamp: true});

export default mongoose.model("Note", noteSchema);