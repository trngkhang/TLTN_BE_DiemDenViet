import User from "../models/user.models.js";
import envVar from "../utils/envVariable.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

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
