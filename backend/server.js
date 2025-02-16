import express from 'express';
import {connectDB} from './config/connection.js';
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 3001; // Use the PORT from .env, fallback to 3001

//middleware
app.use(express.json());
app.use(cors());

//default route
app.get("/", (_req, res) => {
    res.send("Welcome to the Free Mind API");
});
// Routes
app.use("/api/users", userRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});