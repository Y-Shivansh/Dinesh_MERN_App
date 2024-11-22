import APIFeatures from "../utils/APIFeatures.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import FoodListing from "../models/FoodListing.js";
import User from '../models/user.js'

export const createFoodListing = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            quantity,
            expirationDate,
            locationAddress,
            // longitude,
            // latitude, 
            postedBy,
        } = { ...req.body };
        const { longitude, latitude } = req.body || {}
        // console.log(location);
        // console.log(req.body);
        // console.log(req.files);
        // console.log(title);

        const photos = req.files ? req.files : [];


        if (!title || !description || !category || !quantity || !expirationDate || !locationAddress || longitude === undefined || latitude === undefined || !postedBy) {
            // if (!title || !description || !category || !quantity || !expirationDate || !locationAddress || !longitude || !latitude  || !postedBy) {
            return res.status(400).json({ error: "All required fields must be filled." });
        }
        const location = {
            address: locationAddress,
            coordinates: [parseFloat(longitude), parseFloat(latitude)], // Parse as numbers
        };

        if (
            isNaN(location.coordinates[0]) ||
            isNaN(location.coordinates[1]) ||
            location.coordinates.length !== 2
        ) {
            return res.status(400).json({ error: "Invalid coordinates provided." });
        }

        const uploadedPhotos = [];
        if (photos && photos.length > 0) {

            for (const photo of photos) {
                const uploadedImage = await uploadOnCloudinary(photo.path);

                if (uploadedImage) {
                    uploadedPhotos.push(uploadedImage.url);
                }
            }
        }
        const parsedQuantity = parseInt(quantity, 10);
        const parsedExpirationDate = new Date(expirationDate);

        if (isNaN(parsedQuantity) || parsedExpirationDate.toString() === "Invalid Date") {
            return res.status(400).json({ error: "Invalid quantity or expiration date." });
        }

        const newListing = new FoodListing({
            title,
            description,
            category,
            quantity: parsedQuantity,
            expirationDate: parsedExpirationDate,
            location,
            photos: uploadedPhotos,
            postedBy,
        });

        await newListing.save();

        const user = await User.findById(req.user._id);
        user.foodItems.push(newListing._id);
        await user.save();
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
        const photos = req.files ? req.files.photos : [];
        const uploadedPhotos = [];

        if (photos && photos.length > 0) {
            for (const photo of photos) {
                const uploadedImage = await uploadOnCloudinary(photo.path);
                if (uploadedImage) {
                    uploadedPhotos.push(uploadedImage.url);
                }
            }
        }

        if (uploadedPhotos.length > 0) {
            updateData.photos = uploadedPhotos;
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
        // Get the ID from request parameters
        const foodId = req.params.id;
    
        // Find the food item by ID
        const foodItem = await FoodListing.findById(foodId);
    
        // If the food item is not found, send a 404 response
        if (!foodItem) {
          return res.status(404).json({
            status: 'fail',
            message: 'Food item not found',
          });
        }
    
        // Return the found food item in the response
        console.log(foodItem);
        
        res.status(200).json({
          status: 'success',
          data: {
            foodItem,
          },
        });
      }catch (err) {
        // Handle any errors
        console.log(err);
        res.status(400).json({
          status: 'error',
          message: 'Error fetching food item',
        });
      }
}
