import dotenv from 'dotenv';
dotenv.config({path:'./dotenv.env'});

export const SECRET_KEY = process.env.JWT_SECRET