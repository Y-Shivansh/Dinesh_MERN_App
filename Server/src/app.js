import express from "express"
import helmet from "helmet"
import auth from './routes/userRoutes'
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());


app.use('/',auth);

module.exports = app