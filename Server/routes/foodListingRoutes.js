import express from "express";
import { getAllFoodListings } from "../controllers/foodListingController.js";
import { createFoodListing } from "../controllers/foodListingController.js";
import { getFoodListingById } from "../controllers/foodListingController.js";
import { updateFoodListing } from "../controllers/foodListingController.js";
import { deleteFoodListing } from "../controllers/foodListingController.js";
const router = express.Router();

router.post("/listings", createFoodListing);
router.get("/listings", getAllFoodListings);
router.get("/listings/:id", getFoodListingById);
router.put("/listings/:id", updateFoodListing);
router.delete("/listings/:id", deleteFoodListing);

export default router;