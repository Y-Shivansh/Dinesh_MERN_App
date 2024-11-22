import bcrypt from 'bcrypt';
import User from '../models/user.js'; // Import user model
import { validationResult } from 'express-validator';

export const updatePassword = async (req, res) => {
    try {
        const userId = req.user?.userId; // Fetched from middleware
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(userId);
        
        const { newPassword, oldPassword } = req.body;

        // Fetch user using userId from middleware
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare old password with the current hashed password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Your entered password does not match your last password" });
        }

        // Hash the new password and save it
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
