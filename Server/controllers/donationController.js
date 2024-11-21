import Donate from '../models/Donation.js';

export const changeStatus = async (req, res) => {
    try {
        const userId = req.user.userId; 

        
        if (!req.params.id) {
            return res.status(400).json({ msg: "Donation ID is required" });
        }

        
        const donation = await Donate.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ msg: "Donation not found" });
        }

        if (donation.status === "accepted") {
            return res.status(400).json({ msg: "Donation has already been accepted" });
        }

       
        donation.status = "accepted";
        donation.acceptedBy = userId;
        const updatedDonation = await donation.save();

        res.status(200).json({
            msg: "Donation status updated successfully",
            donation: updatedDonation,
        });
    } catch (err) {
        console.error("Error updating donation status:", err);
        res.status(500).json({
            msg: "Internal Server Error",
            error: err.message,
        });
    }
};
