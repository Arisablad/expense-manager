import Expense from "../models/expenseModel.js";
import User from "../models/userModel.js";
import BankAccount from "../models/bankAccountModel.js";
import * as constants from "constants";

export const createExpense = async (req, res) => {
  try {
    const { name, amount, category, account } = req.body;
    if (!name || !amount || !category || !account) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const expense = await Expense.create({
      name,
      amount,
      category,
      account,
    });

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }

    const bankAccount = await BankAccount.findById(account);
    if (!bankAccount) {
      return res.status(404).json({ message: "Bank account not found" });
    }
    if (bankAccount.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }

    // await user.updateOne({ $push: { expenses: expense._id } });
    await bankAccount.updateOne({ $push: { expenses: expense._id } });

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in createExpense: ${error.message}`);
  }
};

export const deleteExpense = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "You need to choose expense to delete" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }

    // Delete expense from user
    // await User.findByIdAndUpdate(req.user._id, {
    //   $pull: { expenses: req.params.id },
    // })

    // Delete expense from bank account
    await BankAccount.findByIdAndUpdate(req.user._id, {
      $pull: { expenses: req.params.id },
    });

    // Delete expense from database
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in deleteExpense: ${error.message}`);
  }
};

export const getExpenses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }
    const expenses = await Expense.find({ owner: req.user._id });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in getExpenses: ${error.message}`);
  }
};

export const getSingleExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in getSingleExpense: ${error.message}`);
  }
};