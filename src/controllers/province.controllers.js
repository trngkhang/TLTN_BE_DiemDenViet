import Province from "../models/province.models.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postProvince = async (req, res, next) => {
  try {
    const { name, description, regionId } = req.body;

    const province = await Province.findOne({ name: name });
    if (province) {
      return next(errorHandler(400, "Province already exists"));
    }

    const newProvince = new Province({ name, description, regionId });
    const savedProvince = await newProvince.save();

    return res.status(200).json(savedProvince);
  } catch (error) {
    next(error);
  }
};
