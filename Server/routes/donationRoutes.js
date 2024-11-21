import express from 'express';
import { changeStatus ,requestDonation,markDonationCompleted,getDonationDetails} from "../controllers/donationController.js";
import { authMiddleware } from "../middlewares/authenticate.js";

const router = express.Router();

router.post('/donations',requestDonation);
router.patch('/donations/:id' ,authMiddleware, changeStatus);
router.put("/donations/:id/complete",  markDonationCompleted);
router.get("/donations/:id", getDonationDetails);


export default router