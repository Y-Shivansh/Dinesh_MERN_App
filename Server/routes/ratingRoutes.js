import express from "express";
import { createRating, getRatingsForUser, getRatingsByUser, updateRating, deleteRating } from "../controllers/ratingController.js";
import { authMiddleware } from "../middlewares/authenticate.js";

const router = express.Router();

// Route to create a new rating
router.post("/", createRating);

// Route to get all ratings for a specific user
router.get("/user-rating/:userId", authMiddleware,getRatingsForUser);

// Route to get all ratings given by a specific user
router.get("/ratedBy/:userId", authMiddleware,getRatingsByUser);

// Route to update a rating by its ID
router.put("/:ratingId",authMiddleware, updateRating);

// Route to delete a rating by its ID
router.delete("/:ratingId", authMiddleware, deleteRating);

export default router;
