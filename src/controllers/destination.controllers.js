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
    const { searchTerm, destinationTypeId, provinceId } = req.query;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const destinations = await Destination.find({
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

export const putDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
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

    const newDestination = await Destination.findByIdAndUpdate(
      id,
      {
        ...(name && name),
        ...(image && image),
        ...(introduce && introduce),
        ...(description && description),
        ...(address && address),
        ...(openingTime && openingTime),
        ...(ticketPrice && ticketPrice),
        ...(provinceId && provinceId),
        ...(destinationTypeId && destinationTypeId),
      },
      { new: true }
    );
    if (!newDestination) {
      return next(errorHandler(404, "Destination not found"));
    }
    return res.status(200).json({
      message: "Destination has been updated",
      newDestination,
    });
  } catch (error) {
    next(error);
  }
};

export const getDestinationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id);
    if (!destination) {
      return next(errorHandler(404, "Destination not found"));
    }
    destination.views += 1;
    await destination.save();

    return res.status(200).json(destination);
  } catch (error) {
    next(error);
  }
};
