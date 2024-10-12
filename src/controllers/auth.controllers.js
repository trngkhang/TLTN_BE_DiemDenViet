import User from "../models/user.models.js";
import envVar from "../utils/envVariable.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json("Username is already exits");
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
    res.status(500).json({ error: error.message });
  }
};
