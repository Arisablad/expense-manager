import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
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

const Income = mongoose.model("Income", IncomeSchema);
export default Income;
