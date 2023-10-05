import express from "express";
import {
  createBankAccount,
  deleteBankAccount,
  getBankAccounts,
  updateBankAccount,
} from "../controllers/bank_controller.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const router = express.Router();

router.post("/create", protectedRoute, createBankAccount);
router.get("/", protectedRoute, getBankAccounts);
router.delete("/:id", protectedRoute, deleteBankAccount);
router.patch("/:id", protectedRoute, updateBankAccount);

export default router;
