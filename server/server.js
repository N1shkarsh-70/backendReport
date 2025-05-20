import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import {dotenvVar, init} from "./config.js"
import authRoutes from "./routes/authRoutes.js"
import commonRoutes from "./routes/commonRoutes.js"
import attendenceRoutes from "./routes/attendenceRoute.js"
import cookieParser from "cookie-parser"
const app= express()
app.use(cookieParser())
app.use(express.json())

const allowedOrigins = [

    "http://localhost:5000",
    "http://192.168.29.43:5000",
    "http://192.168.29.124:5000",
     "http://192.168.29.124:5001",
    "http://82.29.162.1:3000",
    "http://82.29.162.1:5000" // Local React App
    
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

app.use('/api/user', authRoutes);
app.use('/superadmin', commonRoutes);
app.use('/api/attendence', attendenceRoutes)




mongoose.connect(dotenvVar.MONGODB_URI) // Use `process.env` for dotenv variables
    .then(() =>
        { 
            console.log("Connected to DB")
             init();
        }) // Arrow function to properly handle the resolved promise
    .catch(err => console.error("Database connection error:", err)); // Proper `.catch()` handling



app.listen(dotenvVar.PORT, ()=>{
    console.log('server is running on port',dotenvVar.PORT);
    
})