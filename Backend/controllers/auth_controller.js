import User from "../models/userModel.js";
import generateTokenAndSetCookies from "../utils/generateTokenAndSetCookies.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  console.log("req.body", req.body);
  try {
    // get data from request body
    const { name, username, email, password, repeatPassword } = req.body;
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (password !== repeatPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
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
      res.status(201).json({
        message: "User created successfully",
        user: { name, username, email },
      });
    } else {
      res.status(500).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signUp: ${error.message}`);
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username: req.body.username });
    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!isMatch | !user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    console.log(user);
    generateTokenAndSetCookies(user._id, res);
    res.status(200).json({
      message: "Logged in successfully",
      user: { name: user.name, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(`Error in signIn: ${error.message}`);
  }
};

export const signout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User signed out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in signout: ${error.message}`);
  }
};
