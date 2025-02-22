import jwt from 'jsonwebtoken';
import { blacklistedToken } from "../models/Blacklist.js";
const authMiddleware = async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      // Check if token is blacklisted
      const blacklisted = await blacklistedToken.findOne({ token });
      if (blacklisted) return res.status(401).json({ message: "Token is invalid" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
  
  export default authMiddleware;