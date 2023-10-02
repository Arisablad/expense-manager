import express from "express";
import {
  createBankAccount,
  deleteBankAccount,
} from "../controllers/bank_controller.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const router = express.Router();

router.post("/create", protectedRoute, createBankAccount);
router.delete("/:id", protectedRoute, deleteBankAccount);

export default router;
