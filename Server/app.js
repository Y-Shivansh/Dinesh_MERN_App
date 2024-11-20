import express from "express"
import helmet from "helmet"
import cors from "cors"
import userRoutes from './routes/userRoutes.js';


const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors()); 


// app.use('/',auth);

app.use("/api", userRoutes);

export default app;