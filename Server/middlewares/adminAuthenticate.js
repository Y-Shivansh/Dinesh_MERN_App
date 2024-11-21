import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";  
import dotenv from 'dotenv'
dotenv.config()

export const authenticateAdmin = async (req, res, next) => {
    const {token} = req.cookies;
    if (!token) return res.status(403).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const admin = await Admin.findById(decoded.userId); 
        if (!admin) return res.status(404).json({ message: "Admin not found." });
        req.user = admin; 
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token." });
    }
};
