import Province from "../models/province.models.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postProvince = async (req, res, next) => {
  try {
    const { name, regionId } = req.body;

    const province = await Province.findOne({ name: name });
    if (province) {
      return next(errorHandler(400, "Province already exists"));
    }

    const newProvince = new Province({ name, regionId });
    const savedProvince = await newProvince.save();

    return res.status(200).json(savedProvince);
  } catch (error) {
    next(error);
  }
};

export const getAllProvince = async (req, res, next) => {
  try {
    const { isDeleted } = req.query;
    const query = {
      ...(isDeleted && { isDeleted: isDeleted }),
    };

    const provinces = await Province.find(query);

    if (provinces.length==0) {
      return next(errorHandler(404, "Provinces not found"));
    }
    const totalProvinces = await Province.countDocuments();
    const responseProvinces = provinces.length;

    return res
      .status(200)
      .json({ totalProvinces, responseProvinces, provinces });
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
    const { name, regionId, isDeleted } = req.body;
    const updatedProvince = await Province.findByIdAndUpdate(
      id,
      {
        name,
        regionId,
        isDeleted,
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

export const deleteProvince = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProvince = await Province.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!deletedProvince) return next(errorHandler(404, "Province not found."));
    return res.status(200).json({ message: "Province has been deleted." });
  } catch (error) {
    next(error);
  }
};
