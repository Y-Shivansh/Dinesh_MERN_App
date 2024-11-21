export const verifyAdmin = (req, res, next) => {
    // Assuming `req.user` is populated with the authenticated admin's details
    if (req.user && req.user.role === 'admin') {
        next(); // Admin is authorized
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};
