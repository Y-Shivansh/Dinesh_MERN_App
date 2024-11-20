import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config';

export const authMiddleware = (req,res,next) => {
    try{
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        jwt.verify(token, SECRET_KEY, (err,user)=>{
            if(err){
                res.status(403).json({message: "Forbidden: Invalid Token"})
            }
            req.user = user;
            next();
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Server error"})
    }
}