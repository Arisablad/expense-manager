import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankAccount",
    },
  },
  {
    timestamps: true,
  },
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
