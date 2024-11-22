import Review from "../models/review.models.js";

class ReviewController {
  static async post(req, res, next) {
    try {
      const { rating, comment, userId, destinationId } = req.body;
      const review = new Review({ rating, comment, userId, destinationId });
      const newReview = await review.save();
      return res.success("Đánh giá đã được tạo thành công", newReview);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
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

      return res.success("Lấy danh sách đánh giá thành công", {
        totalReviews,
        reviews,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const deletedReview = await Review.findByIdAndDelete(id, { userId });
      if (!deletedReview) {
        return res.error(404, "Không tìm thấy đánh giá");
      }
      return res.success("Đánh giá đã bị xóa");
    } catch (error) {
      next(error);
    }
  }
}

export default ReviewController;
