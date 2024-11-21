import express from "express"
import helmet from "helmet"
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import foodListingRoutes from "./routes/foodListingRoutes.js"
import ratingRoutes from "./routes/ratingRoutes.js";
import cookieParser from "cookie-parser";
// import auth from './routes/userRoutes';
const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend's origin
    credentials: true, // Allow cookies and other credentials
};

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())


// app.use('/',auth);

// app.use("/api", userRoutes);
app.use("/api/listings", foodListingRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/user", userRoutes);

export default app;