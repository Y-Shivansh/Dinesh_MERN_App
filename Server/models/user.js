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
     profilePicture: { 
        type: String, 
        default: "" 
    }, //Cloudinary 
     emailVerified: { 
        type: Boolean, 
        default: false 
    },
     rating: { 
        type: Number, 
        default: 0 
    },
     donationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
 },
 { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
