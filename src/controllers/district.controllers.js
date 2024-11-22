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
      const query = {
        ...(isDeleted && { isDeleted: isDeleted }),
        ...(provinceId && { provinceId: provinceId }),
      };
      const districts = await District.find(query);

      if (districts.length == 0) {
        return res.error(404, "Không tìm thấy quận huyện");
      }
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
      if (!deletedDistrict) return res.error(404, "Không tìm thấy quận huyện");
      return res.success("Quận huyện đã bị xóa");
    } catch (error) {
      next(error);
    }
  }
}

export default DistrictController;
