import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { blacklistedToken } from '../models/Blacklist.js';
import authMiddleware from "../middleware//authMiddleware.js";

dotenv.config();
const router = express.Router();

//Register User
router.post("/register", async (req,res)=>{
    try{
        const {username,email,password} = req.body;
        const userExists = await User.findOne({email});

        if(userExists) return res.status(400).json({message: "User already exists"});

        const newUser = new User({ username,email,password});
        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    }catch (error){
        res.status(500).json({message: "Server error",error});
    }
});

//Login User
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ token, user: { username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  router.post("/logout", authMiddleware, async (req, res) => {
    try {
      const authHeader = req.header("Authorization");
      const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      // Save the token to the blacklist
      await blacklistedToken.create({ token });
  
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });


  export default router;