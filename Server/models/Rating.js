import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        ratedBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        ratedFor: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        rating: { 
            type: Number, 
            min: 1, 
            max: 5, 
            required: true 
        },
        review: { 
            type: String, 
            required: true 
        },
    },
    { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
