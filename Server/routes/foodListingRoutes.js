import express from "express";
import { getAllFoodListings } from "../controllers/foodListingController.js";
import { createFoodListing } from "../controllers/foodListingController.js";
import { getFoodListingById } from "../controllers/foodListingController.js";
import { updateFoodListing } from "../controllers/foodListingController.js";
import { deleteFoodListing } from "../controllers/foodListingController.js";
const router = express.Router();

router.post("/FoodListings", createFoodListing);
router.get("/FoodListings", getAllFoodListings);
router.get("/FoodListings/:id", getFoodListingById);
router.put("/FoodListings/:id", updateFoodListing);
router.delete("/FoodListings/:id", deleteFoodListing);

export default router;