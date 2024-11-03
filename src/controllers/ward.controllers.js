import Ward from "../models/ward.models.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postWard = async (req, res, next) => {
  try {
    try {
      const { name, districtId } = req.body;

      const ward = await Ward.findOne({ name: name, districtId: districtId });
      if (ward) {
        return next(errorHandler(400, "Ward already exists"));
      }

      const newWard = new Ward({ name, districtId });
      const savedWard = await newWard.save();

      return res.status(200).json(savedWard);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllWard = async (req, res, next) => {
  try {
    const { isDeleted, districtId } = req.query;
    const filter =
      isDeleted !== undefined ? { isDeleted: isDeleted === "true" } : {};
    if (districtId) {
      filter.districtId = districtId;
    }
    const wards = await Ward.find(filter);

    if (!wards) {
      return next(errorHandler(404, "Ward not found"));
    }
    const totalWards = await Ward.countDocuments();
    const responseWards = wards.length();
    return res.status(200).json({ totalWards, responseWards, wards });
  } catch (error) {
    next(error);
  }
};

export const getWard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ward = await Ward.findById(id);
    if (!ward) {
      return next(errorHandler(404, "Ward not found"));
    }
    return res.status(200).json(ward);
  } catch (error) {
    next(error);
  }
};

export const putWard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, districtId, isDeleted } = req.body;
    console.log(isDeleted);
    const updatedWard = await Ward.findByIdAndUpdate(
      id,
      {
        name,
        districtId,
        isDeleted,
      },
      { new: true }
    );
    if (!updatedWard) {
      return next(errorHandler(404, "Ward not found"));
    }
    return res.status(200).json(updatedWard);
  } catch (error) {
    next(error);
  }
};

export const deleteWard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedWard = await Ward.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!deletedWard) return next(errorHandler(404, "Ward not found."));
    return res.status(200).json({ message: "Ward has been deleted." });
  } catch (error) {
    next(error);
  }
};
