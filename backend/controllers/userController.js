import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
    const { name, email, password} = req.body;
    
    const existingUser = await User.findOne({ email });

    if(existingUser) {
        return res.status(400).json({ error: "Email already exists"});
    }

    const hashedPassword =await bcrypt.hash(password, 10);  

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return res.json({message: "User Registered", userId: newUser._id});;;
}

export async function loginUser(req, res) {
    const { email, password} = req.body;

    //find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({error: "User not found"});

    //compare pwds
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({ error: "Invalid password"});
    }

    //create jwt token
    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET);

    return res.json({ message: "Login Succesful", token});
}
