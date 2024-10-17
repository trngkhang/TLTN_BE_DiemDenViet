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

export const getReview = async (req, res, next) => {
  try {
    const { id, destinationId, userId } = req.query;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const reviews = await Review.find({
      ...(id && { _id: id }),
      ...(destinationId && { destinationId: destinationId }),
      ...(userId && { userId: userId }),
    })
      .skip(startIndex)
      .limit(limit);

    return res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
