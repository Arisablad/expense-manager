import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
// import routes from './routes';

dotenv.config();
const PORT = process.env.PORT || 5003;
const app = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cors());

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});

// ROUTES
app.use("/api/user", userRoutes);
