import Rating from "../models/Rating.js"; // Import the Rating model
import User from "../models/user.js";

// Create a new rating
export const createRating = async (req, res) => {
    try {
        const { ratedBy, ratedFor, rating, review } = req.body;

        // Check if the rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        // Create a new rating
        const newRating = new Rating({ ratedBy, ratedFor, rating, review });
        await newRating.save();
        
        res.status(201).json({ message: "Rating created successfully", rating: newRating });
    } catch (error) {
        res.status(500).json({ message: "Error creating rating", error });
    }
};

// Get all ratings for a specific user
export const getRatingsForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        // console.log(userId);
        
        const ratings = await Rating.find();
        // console.log(ratings);
        
        const user = await User.find({userId})
        // console.log(user);
        

        if (!ratings) {
            return res.status(403).json({ 
                message: "No ratings found for this user" });
        }
        return res.status(200).json({
            user,
            ratings
        })
    } catch (error) {
        res.status(500).json({ message: "Error fetching ratings", error });
    }
};

// Get all ratings given by a specific user
export const getRatingsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const ratings = await Rating.find({ ratedBy: userId }).populate("ratedFor", "username");
    
        if (!ratings) {
            return res.status(403).json({ 
                message: "No ratings found for this user" });
        }
        return res.status(200).json({
            ratings
        })
    } catch (error) {
        res.status(500).json({ message: "Error fetching ratings", error });
    }
};

// Update a rating (only if the rating is by the user)
export const updateRating = async (req, res) => {
    try {
        const { ratingId } = req.params;
        const { rating, review } = req.body;

        // Check if the rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        // Find the rating and update it
        const updatedRating = await Rating.findByIdAndUpdate(
            ratingId,
            { rating, review },
            { new: true } // Return the updated document
        );

        if (!updatedRating) {
            return res.status(404).json({ message: "Rating not found" });
        }

        res.status(200).json({ message: "Rating updated successfully", rating: updatedRating });
    } catch (error) {
        res.status(500).json({ message: "Error updating rating", error });
    }
};

// Delete a rating (only if the rating is by the user)
export const deleteRating = async (req, res) => {
    try {
        const { ratingId } = req.params;

        const deletedRating = await Rating.findByIdAndDelete(ratingId);

        if (!deletedRating) {
            return res.status(404).json({ message: "Rating not found" });
        }

        res.status(200).json({ message: "Rating deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting rating", error });
    }
};
