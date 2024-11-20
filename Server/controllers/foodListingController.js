import FoodListing from "../models/FoodListing.js";
import APIFeatures from '../utils/APIFeatures.js';
export const createFoodListing = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            quantity,
            expirationDate,
            location,
            photos,
            postedBy,
        } = req.body;

        if (!title || !description || !category || !quantity || !expirationDate || !location || !postedBy) {
            return res.status(400).json({ error: "All required fields must be filled." });
        }

        const newListing = new FoodListing({
            title,
            description,
            category,
            quantity,
            expirationDate,
            location,
            photos,
            postedBy,
        });

        await newListing.save();

        res.status(201).json({
            message: "Food listing created successfully!",
            listing: newListing,
        });
    } catch (error) {
        console.error("Error in createFoodListing:", error); // More detailed logging
        res.status(500).json({ error: "Internal Server Error. Please try again later." });
    }
};


export const getAllFoodListings = async (req, res) => {
    try {
    // console.log(req.query);
    // for moongoose
    const features = new APIFeatures(FoodListing.find() ,req.query)
                    .filter()
                    .sort()
                    .fieldLimiting();

    const newFood = await features.query;

    
    res.status(200).json({
        status: 'success',
        length: newFood.length,
        data: {
          newFood
        }
      });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status:'error comming',
            message:err
        })
    }

};

export const getFoodListingById = async (req, res) => {
    try {
        const listingId = req.params.id;
        const listing = await FoodListing.findById(listingId);

        if (!listing) {
            return res.status(404).json({ error: "Food listing not found." });
        }

        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving food listing. Please try again later." });
    }
};
export const updateFoodListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const updateData = req.body;

        const updatedListing = await FoodListing.findByIdAndUpdate(listingId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied to the updated data
        });

        if (!updatedListing) {
            return res.status(404).json({ error: "Food listing not found." });
        }

        res.status(200).json({
            message: "Food listing updated successfully!",
            listing: updatedListing,
        });
    } catch (error) {
        res.status(500).json({ error: "Error updating food listing. Please try again later." });
    }
};
export const deleteFoodListing = async (req, res) => {
    try {
        const listingId = req.params.id;

        const deletedListing = await FoodListing.findByIdAndDelete(listingId);

        if (!deletedListing) {
            return res.status(404).json({ error: "Food listing not found." });
        }

        res.status(200).json({ message: "Food listing deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting food listing. Please try again later." });
    }
};