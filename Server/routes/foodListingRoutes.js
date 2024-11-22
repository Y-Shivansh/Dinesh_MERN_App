import express from "express";
import { getAllFoodListings, getFoodListingById, createFoodListing, updateFoodListing, deleteFoodListing } from "../controllers/foodListingController.js";
import { authMiddleware } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js"; 

const router = express.Router();

router.post("/FoodListings",authMiddleware, upload.array("photos", 10), createFoodListing);
router.get("/FoodListings", authMiddleware,getAllFoodListings);
router.get("/FoodListings/:id",authMiddleware, getFoodListingById);
router.put("/FoodListings/:id",authMiddleware,updateFoodListing);
router.delete("/FoodListings/:id",authMiddleware, deleteFoodListing);

export default router;