import express from "express";
import { getAllFoodListings,getFilteredFoodListings, getSearchedFoodListings,getFoodListingById, createFoodListing, updateFoodListing, deleteFoodListing } from "../controllers/foodListingController.js";
import { authMiddleware } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js"; 
import {body} from 'express-validator'

const router = express.Router();

router.get("/FoodListings", authMiddleware,getAllFoodListings);
router.get("/FoodSearched-Listings/:filter", authMiddleware,getSearchedFoodListings);
router.get("/FoodListings/:id",authMiddleware, getFoodListingById);
router.put("/FoodListings/:id",authMiddleware,updateFoodListing);
router.delete("/FoodListings/:id",authMiddleware, deleteFoodListing);
router.get("/FoodListings/Filtered", authMiddleware,getFilteredFoodListings);

router.post("/FoodListings",authMiddleware, upload.array("photos", 10),[
    body('title').notEmpty().withMessage('title is required'),
    body('description').notEmpty().withMessage('your food description'),
    body('category').notEmpty().withMessage('your food category'),
    body('quantity').notEmpty().withMessage('quantity').isNumeric(),
    body('expirationDate').notEmpty().withMessage('expirationDate').isDate(),
    body('role').optional().isIn(['individual', 'business', 'charity']).withMessage('Invalid role'),
],createFoodListing);

export default router;