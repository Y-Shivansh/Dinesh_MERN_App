import express from 'express';
import { body, check, validationResult } from 'express-validator'; // Added this import
import User from "../models/user.js";
import { checkAuth, isAdmin } from "../middlewares/authMiddleware.js";
import { authMiddleware } from '../middlewares/authenticate.js';
import { registerUser } from '../controllers/registerController.js';
import { loginUser } from '../controllers/loginController.js';
// import  {resetPassword,verifyOtpAndReset}  from '../controllers/resetPassController.js';

const router = express.Router();

router.post("/register", [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
    body('role').optional().isIn(['individual', 'business', 'charity']).withMessage('Invalid role'),
], registerUser);

router.post("/login", [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
], loginUser);

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        path: '/'
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

// router.put("/reset-password",[
//     body('email').isEmail().withMessage('Please include a valid email')
// ], resetPassword);

// router.put("/verify-otp", verifyOtpAndReset);

router.put("update-password",[
    check('oldPassword', 'Old password is required').notEmpty(),
    check('newPassword', 'New password must be at least 6 characters long').isLength({ min: 6 })
], authMiddleware);

router.get("/profile/:id", checkAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/profile/:id", checkAuth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

// router.put("/profile/:id", checkAuth, async (req, res) => {
//     try {
//         if (req.user.id !== req.params.id && req.user.role !== "admin") {
//             return res.status(403).json({ message: "Not authorized" });
//         }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//         res.json(updatedUser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

router.delete("/profile/:id", checkAuth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// router.get("/users", isAdmin, async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });


router.post("/profile/:id/reviews", checkAuth, async (req, res) => {
    try {
        const { comment, rating } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        const review = {
            reviewer: req.user.id,
            comment,
            rating,
        };

        user.reviews.push(review);

        user.rating = (
            user.reviews.reduce((sum, r) => sum + r.rating, 0) / user.reviews.length
        ).toFixed(1);

        await user.save();
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/profile/:id/reviews", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("reviews.reviewer", "name");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
