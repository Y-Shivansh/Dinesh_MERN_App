import express from 'express';
import { changeStatus ,requestDonation} from "../controllers/donationController.js";
import { authMiddleware } from "../middlewares/authenticate.js";

const router = express.Router();

router.post('/donations',requestDonation);
router.patch('/donations/:id' ,authMiddleware, changeStatus);

export default router