import Category from "../models/category.models.js";

class CategoryController {
  static async post(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name: name });
      if (category) {
        return res.error(400, "Danh mục đã tồn tại");
      }
      const newCategory = new Category({ name });
      const savedCategory = await newCategory.save();
      return res.success("Danh mục đã được tạo thành công", savedCategory);
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

      const categories = await Category.aggregate([
        { $match: query }, // Lọc theo điều kiện isDeleted nếu có
        {
          $lookup: {
            from: "subcategories", // Tên collection của subcategories
            localField: "_id",
            foreignField: "categoryId",
            as: "subcategories",
          },
        },
        {
          $lookup: {
            from: "destinations", // Tên collection của destinations
            localField: "_id",
            foreignField: "category.categoryId",
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
            subcategoryCount: { $size: "$subcategories" },
            destinationCount: { $size: "$destinations" },
          },
        },
        { $sort: { name: sortDirection } }, // Sắp xếp theo tên
        { $skip: startIndex }, // Bỏ qua số lượng startIndex
        ...(limit ? [{ $limit: limit }] : []), // Giới hạn số lượng kết quả trả về
      ]);

      const totalCategories = await Category.countDocuments();
      const responseCategories = categories.length;
      return res.success("Lấy danh sách danh mục thành công", {
        totalCategories,
        responseCategories,
        categories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res.error(404, "Không tìm thấy danh mục");
      }
      return res.success("Lấy danh mục thành công", category);
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { id } = req.params;
      const { name, isDeleted } = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        {
          name: name,
          isDeleted: isDeleted,
        },
        { new: true }
      );
      if (!updatedCategory) {
        return res.error(404, "Không tìm thấy danh mục");
      }
      return res.success("Danh mục đã được cập nhật", updatedCategory);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedCategory = await Category.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!deletedCategory) return res.error(404, "Không tìm thấy danh mục.");
      return res.success("Danh mục đã bị xóa", null);
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
