import mongoose from "mongoose";
import District from "../models/district.models.js";

class DistrictController {
  static async post(req, res, next) {
    try {
      const { name, provinceId } = req.body;

      const district = await District.findOne({
        name: name,
        provinceId: provinceId,
      });
      if (district) {
        return res.error(400, "Quận huyện đã tồn tại");
      }

      const newDistrict = new District({ name, provinceId });
      const savedDistrict = await newDistrict.save();

      return res.success("Quận huyện đã được tạo thành công", savedDistrict);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { isDeleted, provinceId } = req.query;
      const sortDirection = req.query.order === "asc" ? 1 : -1;
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || null;
      const query = {
        ...(isDeleted !== undefined && { isDeleted: isDeleted === "true" }),
        ...(provinceId && {
          provinceId: new mongoose.Types.ObjectId(provinceId),
        }),
      };
      const districts = await District.aggregate([
        { $match: query }, // Lọc theo điều kiện isDeleted và provinceId nếu có
        {
          $lookup: {
            from: "wards", // Tên collection Ward
            localField: "_id",
            foreignField: "districtId",
            as: "wards",
          },
        },
        {
          $lookup: {
            from: "destinations", // Tên collection Destination
            localField: "_id",
            foreignField: "address.districtId",
            as: "destinations",
          },
        },
        {
          $lookup: {
            from: "provinces", // Tên collection Province
            localField: "provinceId",
            foreignField: "_id",
            as: "province",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            isDeleted: 1,
            createdAt: 1,
            updatedAt: 1,
            province: { $arrayElemAt: ["$province", 0] }, // Chỉ lấy thông tin province đầu tiên
            wardCount: { $size: "$wards" }, // Đếm số wards
            destinationCount: { $size: "$destinations" }, // Đếm số destinations
          },
        },
        { $sort: { name: sortDirection } }, // Sắp xếp theo tên
        ...(limit ? [{ $skip: startIndex }, { $limit: limit }] : []), // Phân trang nếu limit không phải "all"
      ]);

      const totalDistricts = await District.countDocuments();
      const responseDistricts = districts.length;

      return res.success("Lấy danh sách quận huyện thành công", {
        totalDistricts,
        responseDistricts,
        districts,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const district = await District.findById(id);
      if (!district) {
        return res.error(404, "Không tìm thấy quận huyện");
      }
      return res.success("Lấy quận huyện thành công", district);
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { id } = req.params;
      const { name, regionId, isDeleted } = req.body;
      const updatedDistrict = await District.findByIdAndUpdate(
        id,
        {
          name,
          regionId,
          isDeleted,
        },
        { new: true }
      );
      if (!updatedDistrict) {
        return res.error(404, "Không tìm thấy quận huyện");
      }
      return res.success("Quận huyện đã được cập nhật", updatedDistrict);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedDistrict = await District.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      console.log(deletedDistrict)
      if (!deletedDistrict) return res.error(404, "Không tìm thấy quận huyện");
      return res.success("Quận huyện đã bị xóa",deletedDistrict);
    } catch (error) {
      next(error);
    }
  }
}

export default DistrictController;
