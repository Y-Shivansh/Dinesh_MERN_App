import express from "express"
import helmet from "helmet"
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import  foodListingRoutes from "./routes/foodListingRoutes.js"
import ratingRoutes from "./routes/ratingRoutes.js";
import cookieParser from "cookie-parser";
// import auth from './routes/userRoutes';
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors()); 
app.use(cookieParser())


// app.use('/',auth);

// app.use("/api", userRoutes);
app.use("/api/listings",foodListingRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/user", userRoutes);

export default app;