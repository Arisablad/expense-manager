import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import bankAccountRoutes from "./routes/bankAccountRoutes.js";
import cookieParser from "cookie-parser";
import expensesRoutes from "./routes/expensesRoutes.js";
import bodyParser from "body-parser";
// import routes from './routes';

dotenv.config();
const PORT = process.env.PORT || 5003;
const app = express();

const origin =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : `https://${process.env.DOMAIN_URL}`;

// GLOBAL MIDDLEWARES
app.use(
  cors({
    credentials: true,
    origin,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/bank", bankAccountRoutes);
app.use("/api/expenses", expensesRoutes);
