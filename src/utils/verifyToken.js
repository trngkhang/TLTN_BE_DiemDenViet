import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyAdmin = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(errorHandler(401, "Unauthorized"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(errorHandler(401, "Unauthorized"));
      }
      req.user = user;
      if (user.isAdmin) {
        next();
      } else {
        return next(errorHandler(403, "Admin access is required"));
      }
    });
  } catch (error) {
    next(error);
  }
};
