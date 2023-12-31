import Expense from "../models/expenseModel.js";
import User from "../models/userModel.js";
import BankAccount from "../models/bankAccountModel.js";

export const createExpense = async (req, res) => {
  try {
    const { name, amount, category, account, type } = req.body;
    if (!name || !amount || !category || !account || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //substract or add balance from/to bank account based on expense value and type
    const bankAccount = await BankAccount.findById(account);
    if (!bankAccount) {
      return res.status(404).json({ message: "Bank account not found" });
    }
    if (bankAccount.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }

    if (type === "expense") {
      bankAccount.balance = bankAccount.balance - amount;
    } else {
      bankAccount.balance = bankAccount.balance + amount;
    }
    await bankAccount.save();

    const expense = await Expense.create({
      name,
      amount,
      category,
      account,
      type,
      owner: req.user._id,
    });

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }

    if (!bankAccount) {
      return res.status(404).json({ message: "Bank account not found" });
    }
    if (bankAccount.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }

    // await user.updateOne({ $push: { expenses: expense._id } });
    await bankAccount.updateOne({ $push: { expenses: expense._id } });

    return res.status(200).json(expense);
  } catch (error) {
    console.log(`Error in createExpense: ${error.message}`);
    return res.status(500).json({ message: error.message });
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
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { expenses: req.params.id },
    });

    // Delete expense from bank account
    await BankAccount.findByIdAndUpdate(req.user._id, {
      $pull: { expenses: req.params.id },
    });

    // ADD OR SUBTRACT BALANCE FROM BANK ACCOUNT BASED ON EXPENSE VALUE AND TYPE
    const bankAccount = await BankAccount.findById(req.body.account);
    if (!bankAccount) {
      return res.status(404).json({ message: "Bank account not found" });
    }
    if (bankAccount.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }

    if (req.body.type === "expense") {
      bankAccount.balance = bankAccount.balance + req.body.amount;
    } else {
      bankAccount.balance = bankAccount.balance - req.body.amount;
    }
    await bankAccount.save();

    // Delete expense from database
    await Expense.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
    console.log(`Error in deleteExpense: ${error.message}`);
  }
};

export const getExpenses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "You're not authorized" });
    }
    const expenses = await Expense.find({ owner: req.user._id });
    console.log(expenses);
    return res.status(200).json(expenses);
  } catch (error) {
    console.log(`Error in getExpenses: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export const getSingleExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "You're not authorized" });
    }
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.status(200).json(expense);
  } catch (error) {
    console.log(`Error in getSingleExpense: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  const { name, amount, category, account, type } = req.body;
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "You need to choose expense to update" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "You're not authorized" });
    }

    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    if (expense.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "You're not authorized" });
    }
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id },
      { name, amount, category, type },
      { new: true },
    );

    // ADD OR SUBTRACT BALANCE FROM BANK ACCOUNT BASED ON EXPENSE VALUE AND TYPE
    const bankAccount = await BankAccount.findById(account);
    if (!bankAccount) {
      return res.status(404).json({ message: "Bank account not found" });
    }
    if (bankAccount.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }

    const previousExpense = await Expense.findById(req.params.id);

    if (!previousExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (previousExpense.type === "expense") {
      bankAccount.balance -= previousExpense.amount - expense.amount;
      await bankAccount.save();
    } else {
      bankAccount.balance += previousExpense.amount - expense.amount;
      await bankAccount.save();
    }

    return res
      .status(200)
      .json({ message: "Expense updated successfully", updatedExpense });
  } catch (error) {
    console.log(`Error in updateExpense: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};
