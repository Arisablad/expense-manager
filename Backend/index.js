import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from "./db/connectDB.js";
// import routes from './routes';


dotenv.config();
const PORT = process.env.PORT || 5003;
const app = express();



app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
})
