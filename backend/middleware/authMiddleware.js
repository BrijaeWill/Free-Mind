import jwt from 'jsonwebtoken';
import { blacklistedToken } from '../models/Blacklist.js';
const authMiddleware = async (req,res, next) =>{
    const authHeader = req.header("Authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader; 

    if(!token) return res.status(401).json({ message: "Acess Denied. No token provided"});
    try{
         // Check if token is blacklisted
    const blacklisted = await blacklistedToken.findOne({ token });
    if (blacklisted) return res.status(401).json({ message: "Token is invalid" });

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        res.status(400).json({message:"Invalid token"});
    }
};
export default authMiddleware;