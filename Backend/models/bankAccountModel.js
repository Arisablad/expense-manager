import mongoose from "mongoose";

const BankAccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const BankAccount = mongoose.model("BankAccount", BankAccountSchema);

export default BankAccount;
