import Category from "../models/category.models.js";
import Subcategory from "../models/Subcategory.models.js";

class SubcategoryController {
  static async post(req, res, next) {
    try {
      const { name, categoryId } = req.body;
      const category = await Category.findById(categoryId);
      if (!category) return res.error(400, "Không tìm thấy categoryId");

      const subcategory = await Subcategory.findOne({
        name,
        categoryId,
      });
      if (subcategory) {
        return res.error(400, "Danh mục con đã tồn tại");
      }
      const newSubcategory = new Subcategory({ name, categoryId });
      const savedSubcategory = await newSubcategory.save();
      return res.success(
        "Danh mục con đã được tạo thành công",
        savedSubcategory
      );
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { isDeleted, categoryId } = req.query;
      const query = {
        ...(isDeleted && { isDeleted: isDeleted }),
        ...(categoryId && { categoryId: categoryId }),
      };
      const subcategories = await Subcategory.find(query);
      if (!subcategories || subcategories.length === 0) {
        return res.error(404, "Không tìm thấy danh mục con");
      }
      const totalSubcategories = await Subcategory.countDocuments();
      const responseSubcategories = subcategories.length;
      return res.success("Lấy danh sách danh mục con thành công", {
        totalSubcategories,
        responseSubcategories,
        subcategories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const subcategory = await Subcategory.findById(id);
      if (!subcategory) {
        return res.error(404, "Không tìm thấy danh mục con");
      }
      return res.success("Lấy thông tin danh mục con thành công", subcategory);
    } catch (error) {
      next(error);
    }
  }

  static async put(req, res, next) {
    try {
      const { id } = req.params;
      const { name, isDeleted } = req.body;
      const updatedSubcategory = await Subcategory.findByIdAndUpdate(
        id,
        {
          name: name,
          isDeleted: isDeleted,
        },
        { new: true }
      );
      if (!updatedSubcategory) {
        return res.error(404, "Không tìm thấy danh mục con");
      }
      return res.success(
        "Danh mục con đã được cập nhật thành công",
        updatedSubcategory
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedSubcategory = await Subcategory.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!deletedSubcategory) {
        return res.error(404, "Không tìm thấy danh mục con");
      }
      return res.success("Danh mục con đã bị xóa");
    } catch (error) {
      next(error);
    }
  }
}

export default SubcategoryController;
