import Category from "../models/category.models.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({ name: name });
    if (category) {
      return next(errorHandler(400, "Category already exists"));
    }
    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    return res.status(200).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const { isDeleted } = req.query;
    const query = {
      ...(isDeleted && { isDeleted: isDeleted }),
    };
    const categories = await Category.find(query);
    if (!categories) {
      return next(errorHandler(404, "No Category found"));
    }
    const totalCategories = await Category.countDocuments();
    const responseCategories = categories.length;
    return res
      .status(200)
      .json({ totalCategories, responseCategories, categories });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return next(errorHandler(404, "Category not found"));
    }
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const putCategory = async (req, res, next) => {
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
      return next(errorHandler(404, "Category not found"));
    }
    return res.status(200).json({
      message: "Category has been update",
      updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!deletedCategory) return next(errorHandler(404, "Category not found."));
    return res.status(200).json({ message: "Category has been deleted." });
  } catch (error) {
    next(error);
  }
};
