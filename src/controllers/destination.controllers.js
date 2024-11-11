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
      category,
    } = req.body;
    const existingDestination = await Destination.findOne({ name });
    if (existingDestination) {
      return next(errorHandler(400, "Destionation name already exists"));
    }
    console.log(
      name,
      image,
      introduce,
      description,
      address,
      openingTime,
      ticketPrice,
      category
    );
    const newDestination = new Destination({
      name,
      introduce,
      ...(image && { image }),
      ...(description && { description }),
      ...(address && { address }),
      ...(openingTime && { openingTime }),
      ...(ticketPrice && { ticketPrice }),
      category:  {
        categoryId: category.categoryId,
        subcategoryId: category.subcategoryId,
      },
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

    const query = {
      ...(destinationTypeId && { destinationTypeId: destinationTypeId }),
      ...(provinceId && { provinceId: provinceId }),
      ...(searchTerm && {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { introduce: { $regex: searchTerm, $options: "i" } },
        ],
      }),
    };

    const totalDestinations = await Destination.countDocuments(query);
    const destinations = await Destination.find(query)
      .skip(startIndex)
      .limit(limit);

    return res.status(200).json({
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
      category,
    } = req.body;
    console.log(
      name,
      image,
      introduce,
      description,
      address,
      openingTime,
      ticketPrice,
      category
    );
    const newDestination = await Destination.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(image && { image }),
        ...(introduce && { introduce }),
        ...(description && { description }),
        ...(address && { address }),
        ...(openingTime && { openingTime }),
        ...(ticketPrice && { ticketPrice }),
        ...(category && {
          category: {
            categoryId: category.categoryId,
            subcategoryId: category.subcategoryId,
          },
        }),
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

export const getDestinationForUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id);

    if (!destination) {
      return next(errorHandler(404, "Destination not found"));
    }

    return res.status(200).json(destination);
  } catch (error) {
    next(error);
  }
};
