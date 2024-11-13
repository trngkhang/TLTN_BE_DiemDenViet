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
      category: {
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
    const {
      searchTerm,
      destinationTypeId,
      provinceId,
      districtId,
      wardId,
      categoryId,
      subcategoryId,
      sortBy,
    } = req.query;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 12;

    // Tạo đối tượng query
    const query = {
      ...(destinationTypeId && { _id: destinationTypeId }),
      ...(provinceId && { "address.provinceId": provinceId }),
      ...(districtId && { "address.districtId": districtId }),
      ...(wardId && { "address.wardId": wardId }),
      ...(categoryId && { "category.categoryId": categoryId }),
      ...(subcategoryId && { "category.subcategoryId": subcategoryId }),
      ...(searchTerm && {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { introduce: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ],
      }),
    };

    // Thiết lập tùy chọn sắp xếp dựa trên `sortBy`
    let sortOptions = {};
    if (sortBy === "views") {
      sortOptions = { views: -1 }; // Sắp xếp giảm dần theo `views`
    } else if (sortBy === "rating") {
      sortOptions = { averageRating: -1 }; // Sắp xếp giảm dần theo `averageRating`
    }

    // Thực hiện truy vấn với sắp xếp và phân trang
    const totalDestinations = await Destination.countDocuments(query);
    const destinations = await Destination.find(query)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit);

    // Trả kết quả
    return res.status(200).json({
      totalDestinations,
      responseDestinations: destinations.length,
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
    const destination = await Destination.findById(id)
      .populate({ path: "address.wardId", select: "name" })
      .populate({ path: "address.districtId", select: "name" })
      .populate({ path: "address.provinceId", select: "name" })
      .populate({ path: "category.categoryId", select: "name" })
      .populate({ path: "category.subcategoryId", select: "name" });
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
