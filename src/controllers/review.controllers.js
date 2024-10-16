import Review from "../models/review.models.js";

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
