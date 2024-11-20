import redis from 'redis'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import User from '../models/user'

// Connecting to Redis (used to store otps temporarily)
const redisClient = redis.createClient();

const transporter = nodemailer.createTransport({
    service: 'gamil',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
})
export const resetPassword = async(req,res) =>{
    
    try{
        const {email}= req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generating and Storing OTP using crypto and redis
        const otp = crypto.randomInt(100000, 999999).toString();

        redisClient.setex(`otp:${email}`, 600, otp);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Otp",
            text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to your email.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
}
export const verifyOtpAndReset = (req,res) => {
    try{
        const {otp, newPassword}= req.body
        redisClient.get(`otp: ${req.body.email}`, async (err,storedOtp)=>{
            if (err){
                console.error(err);
                    return res.status(500).json({ message: 'Error accessing OTP' });
            }
            if (!storedOtp) {
                return res.status(400).json({ message: 'OTP expired or invalid' });
            }
            if (otp !== storedOtp) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
    
            res.status(200).json({ message: 'Password updated successfully' });
    
            redisClient.del(`otp:${email}`);
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during OTP verification' });
    }    
}