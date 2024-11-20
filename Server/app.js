import express from "express"
import helmet from "helmet"
<<<<<<< HEAD
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import  foodListingRoutes from "./routes/foodListingRoutes.js"
=======

// import auth from './routes/userRoutes';
>>>>>>> 4df3a946fffe7de09fc0cf91895753e5002a9093
const app = express();

// app.use(helmet());
app.use(express.json());
app.use(cors()); 


// app.use('/',auth);

app.use("/api", userRoutes);
app.use("/api/listings",foodListingRoutes);

export default app;