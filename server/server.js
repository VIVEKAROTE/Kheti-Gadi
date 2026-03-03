import express from "express";
import dotenv from"dotenv";
import colors from "colors";
import cors from "cors";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";
import equipmentRoutes from './routes/equipmentRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { errorHandler } from "./middleware/errorMiddleware.js";

// loding envoriment variables
dotenv.config();

// connecting to the database
connectDB();

const app = express();

// middleware 
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/bookings',bookingRoutes);
app.use(errorHandler);

// base route
app.get('/',(req, res)=>{
    res.send('KhetiGadi is running...')
});

// starting server
const PORT  = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});