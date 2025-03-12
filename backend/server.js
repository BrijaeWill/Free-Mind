import express from 'express';
import {connectDB} from './config/connection.js';
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";

const app = express();
const port = process.env.PORT || 3001; // Use the PORT from .env, fallback to 3001

//middleware
app.use(express.json());

app.use(
  cors({
    origin: ["https://free-mind-2.onrender.com","https://free-mind-0.onrender.com"],
    credentials: true, // Include if you're using cookies or authentication
  })
);

//default route
app.get("/", (_req, res) => {
    res.send("Welcome to the Free Mind API");
});
// Routes
app.use("/api/users", userRoutes);
app.use("/api/journals",journalRoutes);


app.listen(port, () => {
  connectDB();
  console.log(`Server running at http://localhost:${port}`);
});