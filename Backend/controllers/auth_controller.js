import User from "../models/userModel.js";
import generateTokenAndSetCookies from "../utils/generateTokenAndSetCookies.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    // get data from request body
    const { name, username, email, password } = req.body;
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //CREATE NEW USER
    const newUser = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });
    if (newUser) {
      await generateTokenAndSetCookies(newUser._id, res);
      res
        .status(201)
        .json(
          { message: "User created successfully" },
          { name, username, email },
        );
    } else {
      res.status(500).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in signUp: ${error.message}`);
  }
};
