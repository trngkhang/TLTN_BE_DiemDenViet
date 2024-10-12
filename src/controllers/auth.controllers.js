import User from "../models/user.models.js";
import envVar from "../utils/envVariable.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (user) {
      return next(errorHandler(400, "Username already exists"));
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      envVar.jwtSecret,
      { expiresIn: "1h" }
    );
    const { password: pass, ...rest } = savedUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        expiresIn: "1h",
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
