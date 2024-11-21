import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true
    },
    role: { 
        type: String, 
        enum: ["individual", "business", "charity"],
        default: "individual"
     },
     status: {
        type: String,
        enum: ['active', 'suspended'],
        default: 'active',
    },
     profilePicture: { 
        type: String, 
        default: "" 
    }, 
    reviews: [
        {
            reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: String,
            rating: Number,
        },
    ],
    rating: {
        type: Number,
        default: 0,
    },
    //Cloudinary 
     emailVerified: { 
        type: Boolean, 
        default: false 
    },
     donationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
 },
 { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
