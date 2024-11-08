import Category from "../models/category.models.js";
import Subcategory from "../models/Subcategory.models.js";

export const postSubcategory = async (req, res, next) => {
  try {
    const { name, categoryId } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) return next(errorHandler(400, "categoryId not found"));
    console.log("check1");
    const subcategory = await Subcategory.findOne({
      name,
      categoryId,
    });
    if (subcategory) {
      return next(errorHandler(400, "Subcategory already exists"));
    }
    const newSubcategory = new Subcategory({ name, categoryId });
    const savedSubcategory = await newSubcategory.save();
    return res.status(200).json(savedSubcategory);
  } catch (error) {
    next(error);
  }
};

export const getAllSubcategory = async (req, res, next) => {
  try {
    const { isDeleted, categoryId } = req.query;
    const query = {
      ...(isDeleted && { isDeleted: isDeleted }),
      ...(categoryId && { categoryId: categoryId }),
    };
    const subcategories = await Subcategory.find(query);
    if (!subcategories) {
      return next(errorHandler(404, "No destiantion type found"));
    }
    const totalSubcategories = await Subcategory.countDocuments();
    const responseSubcategories = subcategories.length;
    return res
      .status(200)
      .json({ totalSubcategories, responseSubcategories, subcategories });
  } catch (error) {
    next(error);
  }
};

export const getSubcategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Subcategory = await Subcategory.findById(id);
    if (!Subcategory) {
      return next(errorHandler(404, "Subcategory not found"));
    }
    return res.status(200).json(Subcategory);
  } catch (error) {
    next(error);
  }
};

export const putSubcategory = async (req, res, next) => {
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
      return next(errorHandler(404, "Subcategory not found"));
    }
    return res.status(200).json({
      message: "Subcategory has been update",
      updatedSubcategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubcategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSubcategory = await Subcategory.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!deletedSubcategory)
      return next(errorHandler(404, "Subcategory not found."));
    return res.status(200).json({ message: "Subcategory has been deleted." });
  } catch (error) {
    next(error);
  }
};
