import app from './app.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config({path:'./.env'});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`);
    
});

