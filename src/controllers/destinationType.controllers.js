import DestinationType from "../models/destinationType.models.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postDestinationType = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const destinationType = await DestinationType.findOne({ name: name });
    if (destinationType) {
      return next(errorHandler(400, "Destination type already exists"));
    }

    const newDestinationType = new DestinationType({ name, description });
    const savedDestinationType = await newDestinationType.save();

    return res.status(200).json(savedDestinationType);
  } catch (error) {
    next(error);
  }
};

export const getAllDestinationType = async (req, res, next) => {
  try {
    const isDeleted = req.query.isDeleted;
    const filter =
      isDeleted !== undefined ? { isDeleted: isDeleted === "true" } : {};
    const destinationTypes = await DestinationType.find(filter);
    if (!destinationTypes) {
      return next(errorHandler(404, "No destiantion type found"));
    }
    const totalDestinationTypes = await DestinationType.countDocuments();

    return res.status(200).json({ totalDestinationTypes, destinationTypes });
  } catch (error) {
    next(error);
  }
};

export const getDestinationType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const destinationTypes = await DestinationType.findById(id);
    if (!destinationTypes) {
      return next(errorHandler(404, "Destiantion type not found"));
    }

    return res.status(200).json(destinationTypes);
  } catch (error) {
    next(error);
  }
};

export const putDestinationType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, isDeleted } = req.body;

    const updatedDestinationType = await DestinationType.findByIdAndUpdate(
      id,
      {
        name: name,
        description: description,
        isDeleted: isDeleted,
      },
      { new: true }
    );
    if (!updatedDestinationType) {
      return next(errorHandler(404, "Destination Type not found"));
    }
    return res
      .status(200)
      .json({
        message: "Destination Type has been update",
        updatedDestinationType,
      });
  } catch (error) {
    next(error);
  }
};

export const deleteDestinationType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDestinationType = await DestinationType.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!deletedDestinationType)
      return next(errorHandler(404, "Destination type not found."));
    return res
      .status(200)
      .json({ message: "Destination type has been deleted." });
  } catch (error) {
    next(error);
  }
};
