import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  otp: { type: Number, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: {type: String, required: true},
  emailVerified: {type: Boolean},
  expiry: { type: Date, required: true },
});

const Otp = mongoose.model('Otp', otpSchema);
export default Otp