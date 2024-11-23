import app from './app.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import seedAdmin from './seedAdmin.js';

dotenv.config({path:'./dotenv.env'});

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    
    // Calling the seed function after connecting to the database
    await seedAdmin();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exiting process if MongoDB connection fails
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    
});
