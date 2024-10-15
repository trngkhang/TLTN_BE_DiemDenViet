import DestinationType from "../models/destinationType.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postdestinationType = async (req, res, next) => {
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
