import express from "express";
import User from "../models/user.js";
// import { checkAuth, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.get("/profile/:id", checkAuth, async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) return res.status(404).json({ message: "User not found" });
//         res.json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// router.put("/profile/:id", checkAuth, async (req, res) => {
//     try {
//         if (req.user.id !== req.params.id && req.user.role !== "admin") {
//             return res.status(403).json({ message: "Not authorized" });
//         }

//         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//         });

//         if (!updatedUser) return res.status(404).json({ message: "User not found" });

//         res.json(updatedUser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// router.delete("/profile/:id", checkAuth, async (req, res) => {
//     try {
//         if (req.user.id !== req.params.id && req.user.role !== "admin") {
//             return res.status(403).json({ message: "Not authorized" });
//         }

//         const deletedUser = await User.findByIdAndDelete(req.params.id);

//         if (!deletedUser) return res.status(404).json({ message: "User not found" });

//         res.json({ message: "User deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// router.get("/users", isAdmin, async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

export default router;
