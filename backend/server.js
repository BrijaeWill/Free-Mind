import express from 'express';
import {connectDB} from './config/connection.js';

const app = express();


//app.get("/",(req,res)=>{
    //res.send("Server is ready123")
//});
console.log(process.env.MONGO_URI);
app.listen(3001,() =>{
    connectDB();
    console.log("Server start at http://localhost:3001 hello");
})
