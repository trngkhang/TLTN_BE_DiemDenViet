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
      const query = {
        ...(isDeleted && { isDeleted: isDeleted }),
      };
      const categories = await Category.find(query);
      if (!categories) {
        return res.error(404, "Không tìm thấy danh mục nào");
      }
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
