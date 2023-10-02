import BankAccount from "../models/bankAccountModel.js";
import User from "../models/userModel.js";

export const createBankAccount = async (req, res) => {
  try {
    const { name, balance } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }
    if (!name || !balance) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newBankAccount = await BankAccount.create({
      name,
      balance,
      owner: req.user._id,
    });
    await newBankAccount.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { bankAccounts: newBankAccount._id },
    });

    res
      .status(201)
      .json({ message: "Bank account created successfully", newBankAccount });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in createBankAccount: ${error.message}`);
  }
};

export const deleteBankAccount = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "You need to choose bank account to delete" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You're not authorized" });
    }

    // Delete bank account from database
    await BankAccount.findByIdAndDelete(req.params.id);

    // Delete bank account from user
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { bankAccounts: req.params.id },
    });

    res.status(200).json({ message: "Bank account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in deleteBankAccount: ${error.message}`);
  }
};
