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
      return res.error(404, "Tên đăng nhập đã tồn tại", {
        field: "username",
        message: "Tên đăng nhập đã tồn tại",
      });
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
      { expiresIn: "24h" }
    );
    const { password: pass, ...rest } = savedUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        expiresIn: "24h",
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const validUser = await User.findOne({ username: username });
    if (!validUser) {
      return res.error(404, "Tên đăng nhập không tồn tại", {
        field: "username",
        message: "Tên đăng nhập không tồn tại",
      });
    }
    const isMatch = await bcryptjs.compare(password, validUser.password);
    if (!isMatch) {
      return res.error(401, "Mật khẩu không chính xác");
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      envVar.jwtSecret,
      { expiresIn: "24h" }
    );
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
      expiresIn: "24h",
    });
    res.success("Đăng nhập thành công", rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.success("Đăng xuất thành công");
  } catch (error) {
    next(error);
  }
};
