import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  getSingleExpense,
} from "../controllers/expenses_controller.js";
import protectRoute from "../middlewares/protectedRoute.js";

const router = express.Router();
router.post("/create", protectRoute, createExpense);
router.delete("/:id", protectRoute, deleteExpense);
router.get("/:id", protectRoute, getSingleExpense);
router.get("/", protectRoute, getExpenses);

export default router;
