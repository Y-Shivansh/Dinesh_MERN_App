import express from "express";
import { createRating, getRatingsForUser, getRatingsByUser, updateRating, deleteRating } from "../controllers/ratingController.js";

const router = express.Router();

// Route to create a new rating
router.post("/", createRating);

// Route to get all ratings for a specific user
router.get("/user/:userId", getRatingsForUser);

// Route to get all ratings given by a specific user
router.get("/ratedBy/:userId", getRatingsByUser);

// Route to update a rating by its ID
router.put("/:ratingId", updateRating);

// Route to delete a rating by its ID
router.delete("/:ratingId", deleteRating);

export default router;
