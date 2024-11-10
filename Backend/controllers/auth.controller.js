import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//for new users/ Rgister
export const authtest = async (req, res, next) => {
  try {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  //password encrption

  //to show an error on user side we use try and catch method

    await newUser.save(); //to save the info of new user inthe database

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(errorHandler(300, "Something went wrong"));
  }
};

export const userLogin = async (req, res) => {
  

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Didnt find same crendentials" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "wrong password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, username: user.username, _id: user._id, email: user.email});
  } catch (error) {
    console.error("Error login user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signout = (req, res) => {
  res.clearCookie("token").status(200).json("Signout success!");
};
