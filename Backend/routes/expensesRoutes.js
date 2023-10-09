import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  getSingleExpense,
  updateExpense,
} from "../controllers/expenses_controller.js";
import protectRoute from "../middlewares/protectedRoute.js";

const router = express.Router();
router.post("/create", protectRoute, createExpense);
router.delete("/:id", protectRoute, deleteExpense);
router.get("/:id", protectRoute, getSingleExpense);
router.get("/", protectRoute, getExpenses);
router.put("/:id", protectRoute, updateExpense);

export default router;
