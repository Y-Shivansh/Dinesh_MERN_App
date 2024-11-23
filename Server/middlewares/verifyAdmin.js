import Admin from "../models/Admin.js";
export const verifyAdmin = async(req, res, next) => {
    const adminId = req.admin.userId
    // 
    const admin = await Admin.findById(adminId);
    if (admin && admin.role === 'admin') {
        
        next();
    } else {
        
        
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};