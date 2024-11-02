import District from "../models/district.models.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postDistrict = async (req, res, next) => {
  try {
    try {
      const { name, provinceId } = req.body;

      const district = await District.findOne({
        name: name,
        provinceId: provinceId,
      });
      if (district) {
        return next(errorHandler(400, "District already exists"));
      }

      const newDistrict = new District({ name, provinceId });
      const savedDistrict = await newDistrict.save();

      return res.status(200).json(savedDistrict);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllDistrict = async (req, res, next) => {
  try {
    const isDeleted = req.query.isDeleted;
    const filter =
      isDeleted !== undefined ? { isDeleted: isDeleted === "true" } : {};

    const districts = await District.find(filter);

    if (!districts) {
      return next(errorHandler(404, "District not found"));
    }
    const totalDistrict = await District.countDocuments();

    return res.status(200).json({ totalDistrict, districts });
  } catch (error) {
    next(error);
  }
};

export const getDistrict = async (req, res, next) => {
  try {
    const { id } = req.params;
    const district = await District.findById(id);
    if (!district) {
      return next(errorHandler(404, "District not found"));
    }
    return res.status(200).json(district);
  } catch (error) {
    next(error);
  }
};

export const putDistrict = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, regionId, isDeleted } = req.body;
    const updatedDistrict = await District.findByIdAndUpdate(
      id,
      {
        name,
        regionId,
        isDeleted,
      },
      { new: true }
    );
    if (!updatedDistrict) {
      return next(errorHandler(404, "District not found"));
    }
    return res.status(200).json(updatedDistrict);
  } catch (error) {
    next(error);
  }
};

export const deleteDistrict = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDistrict = await District.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!deletedDistrict) return next(errorHandler(404, "District not found."));
    return res.status(200).json({ message: "District has been deleted." });
  } catch (error) {
    next(error);
  }
};
