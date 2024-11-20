import FoodListing from "../models/foodListing.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import APIFeatures from '../utils/apiFeatures.js';

export const createFoodListing = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            quantity,
            expirationDate,
            location,
            postedBy,
        } = req.body;

        const photos = req.files ? req.files.photos : [];

        if (!title || !description || !category || !quantity || !expirationDate || !location || !postedBy) {
            return res.status(400).json({ error: "All required fields must be filled." });
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

        const newListing = new FoodListing({
            title,
            description,
            category,
            quantity,
            expirationDate,
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
