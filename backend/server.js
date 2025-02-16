import express from 'express';
import {connectDB} from './config/connection.js';
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();


//middleware
app.use(express.json());
app.use(cors());

//default route
app.get("/", (_req, res) => {
    res.send("Welcome to the Free Mind API");
});
// Routes
app.use("/api/users", userRoutes);

app.listen(3001,() =>{
    connectDB();
    console.log("Server start at http://localhost:3001 hello");
})
