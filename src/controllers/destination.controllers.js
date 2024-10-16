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

export const getDestination = async (req, res, next) => {
  try {
    const { id, searchTerm, destinationTypeId, provinceId } = req.query;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const destinations = await Destination.find({
      ...(id && { _id: id }),
      ...(destinationTypeId && { destinationTypeId: destinationTypeId }),
      ...(provinceId && { provinceId: provinceId }),
      ...(searchTerm && {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { introduce: { $regex: introduce, $options: "i" } },
          { description: { $regex: description, $options: "i" } },
        ],
      }),
    })
      .skip(startIndex)
      .limit(limit);

    const totalDestinations = destinations.length;

    res.status(200).json({
      totalDestinations,
      destinations,
    });
  } catch (error) {
    next(error);
  }
};
