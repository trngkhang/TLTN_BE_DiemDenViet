import Review from "../models/review.models.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postReview = async (req, res, next) => {
  try {
    const { rating, comment, userId, destinationId } = req.body;
    const review = new Review({ rating, comment, userId, destinationId });
    const newReview = await review.save();
    return res.status(200).json(newReview);
  } catch (error) {
    next(error);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const { id, destinationId, userId } = req.query;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 12;

    const filter = {
      ...(id && { _id: id }),
      ...(destinationId && { destinationId: destinationId }),
      ...(userId && { userId: userId }),
    };

    const totalReviews = await Review.countDocuments(filter);

    const reviews = await Review.find(filter)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate("userId", "name avatar");

    return res.status(200).json({
      totalReviews,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const deletedReview = await Review.findByIdAndDelete(id, { userId });
    if (!deletedReview) {
      return next(errorHandler(404, "Review not found"));
    }
    return res.status(200).json({ message: "Review has been deleted" });
  } catch (error) {
    next(error);
  }
};
