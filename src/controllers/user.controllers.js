import User from "../models/user.models.js";
import envVar from "../utils/envVariable.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const getUserByToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(errorHandler(401, "No token provided."));
    }
    const decoded = jwt.verify(token, envVar.jwtSecret);
    const userId = decoded.id;

    const user = await User.findById(userId);
    const { password: pass, ...rest } = user._doc;
    if (user) {
      return res.status(200).json(rest);
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    next(error);
  }
};

export const putUser = async (req, res, next) => {
  try {
    const { avatar, name, username, password } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }
    if (avatar !== undefined && avatar !== "") user.avatar = avatar;
    if (name !== undefined && name !== "") user.name = name;
    if (username !== undefined && username !== "") user.username = username;
    if (password !== undefined && password !== "") {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      user.password = hashedPassword;
    }
    await user.save();
    const { password: pass, ...rest } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      envVar.jwtSecret,
      { expiresIn: "1h" }
    );
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
