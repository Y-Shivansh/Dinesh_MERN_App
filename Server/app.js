import express from "express"
import helmet from "helmet"
import auth from './src/routes/userRoutes';
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());


app.use('/',auth);

export default app;