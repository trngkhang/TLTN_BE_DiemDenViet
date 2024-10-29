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

export const getAllProvince = async (req, res, next) => {
  try {
    const isDeleted = req.query.isDeleted;
    const filter =
      isDeleted !== undefined ? { isDeleted: isDeleted === "true" } : {};

    const provinces = await Province.find(filter).populate("regionId", "name");

    if (!provinces) {
      return next(errorHandler(404, "Provinces not found"));
    }
    const totalProvinces = await Province.countDocuments();

    return res.status(200).json({ totalProvinces, provinces });
  } catch (error) {
    next(error);
  }
};

export const getProvince = async (req, res, next) => {
  try {
    const { id } = req.params;
    const province = await Province.findById(id);
    if (!province) {
      return next(errorHandler(404, "Province not found"));
    }
    return res.status(200).json(province);
  } catch (error) {
    next(error);
  }
};

export const putProvince = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, regionId } = req.body;
    const updatedProvince = await Province.findByIdAndUpdate(
      id,
      {
        name,
        description,
        regionId,
      },
      { new: true }
    );
    if (!updatedProvince) {
      return next(errorHandler(404, "Province not found"));
    }
    return res.status(200).json(updatedProvince);
  } catch (error) {
    next(error);
  }
};
