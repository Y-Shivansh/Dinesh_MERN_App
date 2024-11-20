import crypto from 'crypto'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import Otp from '../models/Otp.js'

dotenv.config();

export const sendOtp = async (email,additionalData={}) => {
    try {
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiryTime = new Date(Date.now() + 10 * 60 + 1000)
        const newOtpData = {
            email,
            otp,
            expiry: expiryTime,
            ...additionalData
        }
        const newOtp = new Otp(newOtpData);
        await newOtp.save()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Otp",
            text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes`
        };
        await transporter.sendMail(mailOptions);
        console.log("Otp Sent to email");
        return otp;
    }
    catch (err) {
        console.log("Errors: ", err);
    }
}
export const verifyOtp = async (enteredOtp, email) => {
    try {
        const otpRecord = await Otp.findOne({ email });
        if (!otpRecord) {
            return { message: 'OTP not found' };
        }
        const currentTime = new Date()
        if (otpRecord.expiry < currentTime) {
            return { message: 'OTP expired' };
        }
        if (enteredOtp !== otpRecord.otp) {
            return { message: 'Invalid OTP' };
        }
        await Otp.deleteOne({ email });
        return { message: 'OTP verified successfully' };
    }
    catch (error) {
        console.error("Error Verifying Otp: ",error);
        res.status(500).json({ message: 'Error during OTP verification' });
    }
}