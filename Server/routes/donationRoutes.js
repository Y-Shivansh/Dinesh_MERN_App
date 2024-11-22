import express from 'express';
import { changeStatusAccepted, changeStatusScheduled,requestDonation,markDonationCompleted,getDonationDetails} from "../controllers/donationController.js";
import { authMiddleware } from "../middlewares/authenticate.js";

const router = express.Router();

router.post('/donations',authMiddleware,requestDonation);
// router.patch('/donations/:id' ,authMiddleware, changeStatus);
router.put("/donations/:id/complete",  authMiddleware,markDonationCompleted);
router.get("/donations/:id",authMiddleware, getDonationDetails);
router.patch('/donations/:id' ,authMiddleware, changeStatusAccepted);
router.patch('/donations/:id/schedule',authMiddleware, changeStatusScheduled);


export default router