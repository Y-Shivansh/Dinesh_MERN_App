import express from "express"
import helmet from "helmet"
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import  foodListingRoutes from "./routes/foodListingRoutes.js"
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors()); 


// app.use('/',auth);

app.use("/api", userRoutes);
app.use("/api/listings",foodListingRoutes);

export default app;