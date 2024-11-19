import mongoose from "mongoose";

const foodListingSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        category: { 
            type: String, 
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true 
        }, 
        expirationDate: { 
            type: Date, 
            required: true },
        location: {
            address: { 
                type: String, 
                required: true },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
            },
        },
        photos: [{ type: String }], // Array of Cloudinary URL

        postedBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
    },
    { timestamps: true }
);

const FoodListing = mongoose.model("FoodListing", foodListingSchema);
export default FoodListing;
