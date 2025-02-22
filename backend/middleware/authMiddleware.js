import jwt from 'jsonwebtoken';
import { BlacklistedToken } from "../models/BlacklistedToken";
const authMiddleware = (req,res, next) =>{
    const token = req.header("Authorization");

    if(!token) return res.status(401).json({ message: "Acess Denied. No token provided"});
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        res.status(400).json({message:"Invalid token"});
    }
};
export default authMiddleware;