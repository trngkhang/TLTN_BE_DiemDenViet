import Region from "../models/region.models.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postRegion = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const region = await Region.findOne({ name: name });
    if (region) {
      return next(errorHandler(400, "Region already exists"));
    }

    const newRegion = new Region({ name, description });
    const savedRegion = await newRegion.save();

    return res.status(200).json(savedRegion);
  } catch (error) {
    next(error);
  }
};
