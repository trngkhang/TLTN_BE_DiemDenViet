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

export const getAllRegion = async (req, res, next) => {
  try {
    const isDeleted = req.query.isDeleted;
    const filter =
      isDeleted !== undefined ? { isDeleted: isDeleted === "true" } : {};
    const regions = await Region.find(filter);

    if (!regions.length) {
      return next(errorHandler(404, "No regions found"));
    }
    const totalRegions = await Region.countDocuments(filter);
    return res.status(200).json({ totalRegions, regions });
  } catch (error) {
    next(error);
  }
};

export const getRegion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const region = await Region.findById(id);
    if (!region) {
      return next(errorHandler(404, "Region not found"));
    }
    return res.status(200).json(region);
  } catch (error) {
    next(error);
  }
};

export const putRegion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const region = await Region.findById(id);
    if (!region) {
      return next(errorHandler(404, "Region not found"));
    }
    const { name, description } = req.body;

    const updateRegion = await Region.findByIdAndUpdate(
      id,
      {
        name: name,
        description: description,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Region has been update", updateRegion });
  } catch (error) {
    next(error);
  }
};

export const deleteRegion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRegion = await Region.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!deletedRegion) return next(errorHandler(404, "Region not found."));
    return res.status(200).json({ message: "Region has been deleted." });
  } catch (error) {
    next(error);
  }
};
