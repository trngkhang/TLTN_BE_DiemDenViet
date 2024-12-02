import User from "../models/user.models.js";
import envVar from "../utils/envVariable.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import CommonUtil from "../utils/CommonUtil.js";

class UserController {
  static async getByToken(req, res, next) {
    try {
      const token = req.cookies.access_token;
      if (!token) {
        return res.error(401, "Không có token.");
      }
      const decoded = jwt.verify(token, envVar.jwtSecret);
      const userId = decoded.id;

      const user = await User.findById(userId);
      const { password: pass, ...rest } = user._doc;
      if (user) {
        return res.success("Lấy thông tin người dùng thành công", rest);
      } else {
        return res.error(404, "Không tìm thấy người dùng.");
      }
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { avatar, name, username, password } = req.body;
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.error(404, "Không tìm thấy người dùng.");
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
        { expiresIn: "6h" }
      );
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          expiresIn: "6h",
        })
        .success("Cập nhật người dùng thành công", rest);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const sortDirection = req.query.order === "asc" ? 1 : -1;
      const { isDeleted } = req.query;
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;

      const query = {
        ...(isDeleted && { isDeleted: isDeleted == "true" }),
      };
      const users = await User.find(query)
        .sort({ updateAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
      const totalUsers = await User.countDocuments();
      const responseUsers = users.length;

      const lastMonthUsers = await User.countDocuments({
        createdAt: { $gte: CommonUtil.oneMonthAgo() },
      });

      return res.success("Lấy danh sách chuyến đi thành công", {
        totalUsers,
        responseUsers,
        users,
        lastMonthUsers,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
