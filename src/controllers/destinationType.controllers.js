import DestinationType from "../models/destinationType.js";
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
    const destinationTypes = await DestinationType.find({});
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
