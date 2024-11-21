import express from 'express';
import { changeStatus } from "../controllers/donationController.js";
import { authMiddleware } from "../middlewares/authenticate.js";

const router = express.Router();

router.patch('/donations/:id' ,authMiddleware, changeStatus);

export default router