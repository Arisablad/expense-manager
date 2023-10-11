import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import bankAccountRoutes from "./routes/bankAccountRoutes.js";
import cookieParser from "cookie-parser";
import expensesRoutes from "./routes/expensesRoutes.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
// import routes from './routes';

dotenv.config();
const PORT = process.env.PORT || 5003;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// const origin =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:5173"
//     : `https://${process.env.DOMAIN_URL}`;
//
// // GLOBAL MIDDLEWARES
// app.use(
//   cors({
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//     origin,
//   }),
// );

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://expense-manager-five-green.vercel.app",
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body

await connectDB().then(() => {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to Expense Manager");
});

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/bank", bankAccountRoutes);
app.use("/api/expenses", expensesRoutes);
