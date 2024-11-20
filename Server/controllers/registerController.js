import bcrypt from 'bcrypt';
import User from '../models/user';
import { generateToken } from '../utils/generateToken';
import { validationResult } from 'express-validator';
export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() })
        }
        const { name, email, password, role } = req.body

        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        })
        await newUser.save();

        const token = generateToken(newUser._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 43200000
        })
        return res.status(201).json({ message: 'User registered successfully', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
}