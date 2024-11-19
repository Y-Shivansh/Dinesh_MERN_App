import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
    {
        foodListing: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "FoodListing", 
            required: true 
        },
        requestedBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        
        acceptedBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        }, //donor

        status: {
            type: String,
            enum: ["requested", "accepted", "scheduled", "completed", "rejected"],
            default: "requested",
        },

        scheduledPickup: { 
            type: Date 
        }, // pickup

        completionDate: { 
            type: Date 
        },
    },
    { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
