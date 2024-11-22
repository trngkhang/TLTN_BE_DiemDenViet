import Destination from "../models/destination.models.js";

class DestinationController {
  static async post(req, res, next) {
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
        return res.error(400, "Tên địa điểm đã tồn tại");
      }
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
      return res.success("Địa điểm đã được tạo thành công", savedDestionation);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
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

      let sortOptions = {};
      if (sortBy === "views") {
        sortOptions = { views: -1 };
      } else if (sortBy === "rating") {
        sortOptions = { averageRating: -1 };
      }

      const totalDestinations = await Destination.countDocuments(query);
      const destinations = await Destination.find(query)
        .sort(sortOptions)
        .skip(startIndex)
        .limit(limit);

      return res.success("Lấy danh sách địa điểm thành công", {
        totalDestinations,
        responseDestinations: destinations.length,
        destinations,
      });
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
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
        return res.error(404, "Không tìm thấy địa điểm");
      }
      return res.success("Địa điểm đã được cập nhật", newDestination);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const destination = await Destination.findById(id)
        .populate({ path: "address.wardId", select: "name" })
        .populate({ path: "address.districtId", select: "name" })
        .populate({ path: "address.provinceId", select: "name" })
        .populate({ path: "category.categoryId", select: "name" })
        .populate({ path: "category.subcategoryId", select: "name" });
      if (!destination) {
        return res.error(404, "Không tìm thấy địa điểm");
      }
      destination.views += 1;
      await destination.save();

      return res.success("Lấy địa điểm thành công", destination);
    } catch (error) {
      next(error);
    }
  }

  static async getForUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const destination = await Destination.findById(id);

      if (!destination) {
        return res.error(404, "Không tìm thấy địa điểm");
      }

      return res.success("Lấy địa điểm thành công", destination);
    } catch (error) {
      next(error);
    }
  }
}

export default DestinationController;
