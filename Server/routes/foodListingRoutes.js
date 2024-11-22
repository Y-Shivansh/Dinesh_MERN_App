import express from "express";
import { getAllFoodListings,getFilteredFoodListings, getFoodListingById, createFoodListing, updateFoodListing, deleteFoodListing } from "../controllers/foodListingController.js";
import { authMiddleware } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js"; 

const router = express.Router();

router.get("/FoodListings", authMiddleware,getAllFoodListings);
router.get("/FoodListings/:id",authMiddleware, getFoodListingById);
router.put("/FoodListings/:id",authMiddleware,updateFoodListing);
router.delete("/FoodListings/:id",authMiddleware, deleteFoodListing);
router.get("/FoodListings/Filtered", authMiddleware,getFilteredFoodListings);
router.post("/FoodListings",authMiddleware, upload.array("photos", 10), createFoodListing);

export default router;