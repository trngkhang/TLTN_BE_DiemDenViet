import Ward from "../models/ward.models.js";

class WardController {
  static async post(req, res, next) {
    try {
      const { name, districtId } = req.body;

      const ward = await Ward.findOne({ name: name, districtId: districtId });
      if (ward) {
        return res.error(400, "Phường đã tồn tại");
      }

      const newWard = new Ward({ name, districtId });
      const savedWard = await newWard.save();

      return res.success("Thêm phường thành công", savedWard);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { isDeleted, districtId } = req.query;
      const query = {
        ...(isDeleted && { isDeleted: isDeleted }),
        ...(districtId && { districtId: districtId }),
      };
      const wards = await Ward.find(query);

      if (wards.length == 0) {
        return res.error(404, "Không tìm thấy phường");
      }
      const totalWards = await Ward.countDocuments();
      const responseWards = wards.length;
      return res.success("Lấy danh sách phường thành công", {
        totalWards,
        responseWards,
        wards,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const ward = await Ward.findById(id);
      if (!ward) {
        return res.error(404, "Không tìm thấy phường");
      }
      return res.success("Lấy thông tin phường thành công", ward);
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { id } = req.params;
      const { name, districtId, isDeleted } = req.body;
      const updatedWard = await Ward.findByIdAndUpdate(
        id,
        {
          name,
          districtId,
          isDeleted,
        },
        { new: true }
      );
      if (!updatedWard) {
        return res.error(404, "Không tìm thấy phường");
      }
      return res.success("Cập nhật phường thành công", updatedWard);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedWard = await Ward.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!deletedWard) return res.error(404, "Không tìm thấy phường.");
      return res.success("Phường đã bị xóa.");
    } catch (error) {
      next(error);
    }
  }
}

export default WardController;
