import Destination from "../models/destination.models.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postDestination = async (req, res, next) => {
  try {
    const {
      name,
      image,
      introduce,
      description,
      address,
      openingTime,
      ticketPrice,
      provinceId,
      destinationTypeId,
    } = req.body;
    console.log(req.body);
    const existingDestination = await Destination.findOne({ name });
    if (existingDestination) {
      return next(errorHandler(400, "Destionation name already exists"));
    }

    const newDestination = new Destination({
      name,
      ...(image && { image }),
      introduce,
      ...(description && { description }),
      ...(address && { address }),
      ...(openingTime && { openingTime }),
      ...(ticketPrice && { ticketPrice }),
      provinceId,
      destinationTypeId,
    });
    const savedDestionation = await newDestination.save();
    return res.status(200).json(savedDestionation);
  } catch (error) {
    next(error);
  }
};
