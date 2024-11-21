import APIFeatures from "../utils/APIFeatures.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import FoodListing from "../models/FoodListing.js";

export const createFoodListing = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            quantity,
            expirationDate,
            locationAddress, 
            longitude, 
            latitude, 
            postedBy,
        } = {...req.body};
        // console.log(location);
        
        
        // console.log(req.body);
        // console.log(req.files);
        // console.log(title);
        
        const photos = req.files ? req.files.photos : [];
        
        
        if (!title || !description || !category || !quantity || !expirationDate || !locationAddress || !longitude || !latitude  || !postedBy) {
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

export const getAllFoodListings = async (req, res) => {
    try {
        const features = new APIFeatures(FoodListing.find(), req.query)
            .filter()
            .sort()
            .fieldLimiting();

        const newFood = await features.query;

        res.status(200).json({
            status: 'success',
            length: newFood.length,
            data: {
                newFood,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'error coming',
            message: err,
        });
    }
};
