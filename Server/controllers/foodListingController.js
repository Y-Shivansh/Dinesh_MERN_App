import APIFeatures from "../utils/APIFeatures.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import FoodListing from "../models/FoodListing.js";
import User from '../models/user.js'
import { validationResult } from 'express-validator';

export const createFoodListing = async (req, res) => {
    try {
        // Validate the incoming request
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        // Destructure fields from the request body
        const {
            title,
            description,
            category,
            quantity,
            expirationDate,
            locationAddress,
            longitude,   // Ensure these are included in req.body
            latitude,
        } = req.body;

        const userId = req.user.userId;
        const postedBy = userId;
        const photo = req.file;

        // Parse and validate location
        const location = {
            address: locationAddress,
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
        };
        console.log(location);

        if (
            isNaN(location.coordinates[0]) ||
            isNaN(location.coordinates[1]) ||
            location.coordinates[0] === "" ||
            location.coordinates[1] === "" ||
            location.coordinates.length !== 2
        ) {
            return res.status(400).json({ error: "Invalid coordinates provided." });
        }

        // Upload the photo to Cloudinary (or any other service)
        let uploadedPhoto = null;
        if (photo) {
            const uploadedImage = await uploadOnCloudinary(photo.path); // Adjust function for your service
            if (uploadedImage) {
                uploadedPhoto = uploadedImage.url; // Save the uploaded photo URL
            }
        }

        // Parse and validate quantity and expiration date
        const parsedQuantity = parseInt(quantity, 10);
        const parsedExpirationDate = (() => {
            const [day, month, year] = expirationDate.split('-');
            const isoFormattedDate = `${year}-${month}-${day}`;
            const parsedDate = new Date(isoFormattedDate);

            if (parsedDate.toString() === "Invalid Date") {
                throw new Error("Invalid date format. Please use dd-mm-yyyy.");
            }
            return parsedDate;
        })();

        if (isNaN(parsedQuantity) || parsedExpirationDate.toString() === "Invalid Date") {
            return res.status(400).json({ error: "Invalid quantity or expiration date." });
        }

        // Create a new food listing
        const newListing = new FoodListing({
            title,
            description,
            category,
            quantity: parsedQuantity,
            expirationDate: parsedExpirationDate,
            location,
            photo: uploadedPhoto,
            postedBy,
        });

        await newListing.save();

        // Update the user's food items
        const user = await User.findById(postedBy);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        user.foodItems.push(newListing._id);
        await user.save();

        // Respond with success
        res.status(201).json({
            message: "Food listing created successfully!",
            listing: newListing,
        });
    } catch (error) {
        console.error("Error in createFoodListing:", error);
        res.status(500).json({ error: "Internal Server Error. Please try again later." });
    }
};


export const updateFoodListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const updateData = req.body;
        const photo = req.file ;
        const uploadedPhoto = null;

        if (photo) {
                const uploadedImage = await uploadOnCloudinary(photo.path);
                if (uploadedImage) {
                    uploadedPhoto.push(uploadedImage.url);
            }
        }

        if (uploadedPhoto.length > 0) {
            updateData.photo = uploadedPhoto;
        }

        const updatedListing = await FoodListing.findByIdAndUpdate(listingId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedListing) {
            return res.status(404).json({ error: "Food listing not found." });
        }

        // Ensure the logged-in user is the one updating the listing
        if (updatedListing.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "You are not authorized to update this listing." });
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

        // Ensure the logged-in user is the one who posted the listing
        if (deletedListing.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "You are not authorized to delete this listing." });
        }

        // Update the user's foodItems array
        const user = await User.findById(req.user._id);
        user.foodItems = user.foodItems.filter(item => item.toString() !== listingId);
        await user.save();

        res.status(200).json({ message: "Food listing deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting food listing. Please try again later." });
    }
};

export const getAllFoodListings = async (req, res) => {
    try {
        const user = req.user.userId;
        const allFoodItems = await FoodListing.find();
        if (!allFoodItems) {
            return res.status(404).json({
                status: 'fail',
                message: 'Food item not found',
            });
        }
        // console.log(user);
        // console.log(allFoodItems);

        // console.log(allFoodItems);

        res.status(200).json({
            allFoodItems
        });
    } catch (err) {
        // Handle any errors
        console.log(err);
        res.status(400).json({
            status: 'error',
            message: 'Error fetching food item',
        });
    }
}
export const getSearchedFoodListings = async (req, res) => {
    const filter = req.params.filter || "";

    try {
        // Wait for the query result
        const lists = await FoodListing.find({
            $or: [{
                category: {
                    $regex: filter,
                    $options: 'i' // Making case-insensitive
                }
            }]
        });

        // If no listings found, return this
        if (!lists || lists.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No listings found"
            });
        }

        return res.json({
            list: lists.map(list => ({
                _id: list.id,
                title: list.title,
                description: list.description,
                category: list.category,
                quantity: list.quantity,
                expirationDate: list.expirationDate,
                location: list.location,
                photo: list.photo,
                postedBy: list.postedBy,
                isModerated: list.isModerated
            }))
        });

    } catch (error) {
        console.error("Error fetching listings:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


export const getFilteredFoodListings = async (req, res) => {
    try {
        const features = new APIFeatures(FoodListing.find(), req.query)
            .filter()
            .sort()
            .fieldLimiting();

        const newFood = await features.query;

        res.status(200).json({
            length: newFood.length,
            newFood
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'error coming',
            message: err,
        });
    }
};

export const getFoodListingById = async (req, res) => {
    try {
        const foodId = req.params.id;
        const foodItem = await FoodListing.findById(foodId);

        if (!foodItem) {
            return res.status(404).json({
                status: 'fail',
                message: 'Food item not found',
            });
        }
        res.status(200).json({ foodItem });
    } catch (err) {

        console.log(err);
        res.status(400).json({
            status: 'error',
            message: 'Error fetching food item',
        });
    }
}
