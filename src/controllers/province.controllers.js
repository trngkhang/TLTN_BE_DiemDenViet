import Province from "../models/province.models.js";

class ProvinceController {
  static async post(req, res, next) {
    try {
      const { name, regionId } = req.body;

      const province = await Province.findOne({ name: name });
      if (province) {
        return res.error(400, "Tỉnh đã tồn tại");
      }

      const newProvince = new Province({ name, regionId });
      const savedProvince = await newProvince.save();

      return res.success("Tỉnh đã được tạo thành công", savedProvince);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { isDeleted } = req.query;
      const sortDirection = req.query.order === "asc" ? 1 : -1;
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || null;

      const query = {
        ...(isDeleted !== undefined && { isDeleted: isDeleted === "true" }),
      };

      const provinces = await Province.aggregate([
        { $match: query }, // Lọc theo điều kiện isDeleted nếu có
        {
          $lookup: {
            from: "districts", // Tên collection District
            localField: "_id",
            foreignField: "provinceId",
            as: "districts",
          },
        },
        {
          $lookup: {
            from: "destinations", // Tên collection Destination
            localField: "_id",
            foreignField: "address.provinceId",
            as: "destinations",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            isDeleted: 1,
            createdAt: 1,
            updatedAt: 1,
            districtCount: { $size: "$districts" }, // Đếm số Districts
            destinationCount: { $size: "$destinations" }, // Đếm số Destinations
          },
        },
        { $sort: { name: sortDirection } }, // Sắp xếp theo tên
        ...(limit ? [{ $skip: startIndex }, { $limit: limit }] : []), // Phân trang nếu limit không phải "all"
      ]);

      const totalProvinces = await Province.countDocuments();
      const responseProvinces = provinces.length;

      return res.success("Lấy danh sách tỉnh thành công", {
        totalProvinces,
        responseProvinces,
        provinces,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const province = await Province.findById(id);
      if (!province) {
        return res.error(404, "Không tìm thấy tỉnh");
      }
      return res.success("Lấy tỉnh thành công", province);
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { id } = req.params;
      const { name, regionId, isDeleted } = req.body;
      const updatedProvince = await Province.findByIdAndUpdate(
        id,
        {
          name,
          regionId,
          isDeleted,
        },
        { new: true }
      );
      if (!updatedProvince) {
        return res.error(404, "Không tìm thấy tỉnh");
      }
      return res.success("Tỉnh đã được cập nhật", updatedProvince);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedProvince = await Province.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!deletedProvince) return res.error(404, "Không tìm thấy tỉnh");
      return res.success("Tỉnh đã bị xóa");
    } catch (error) {
      next(error);
    }
  }

  static async getForSelect(req, res, next) {
    try {
      const data = await Province.find({ isDeleted: false }, "name");
      return res.success("Lấy danh sách tỉnh thành công", {
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProvinceController;
