import Review from "../models/review.models.js";
import CommonUtil from "../utils/CommonUtil.js";

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

  static async getAll(req, res, next) {
    try {
      const { id, destinationId, userId } = req.query;
      const sortDirection = req.query.order === "asc" ? 1 : -1;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const skip = (page - 1) * pageSize;

      const query = {
        ...(id && { _id: id }),
        ...(destinationId && { destinationId: destinationId }),
        ...(userId && { userId: userId }),
      };

      const [data, total, lastMonth] = await Promise.all([
        Review.find(query)
          .sort({ updateAt: sortDirection })
          .skip(skip)
          .limit(pageSize)
          .populate("userId", "name avatar"),
        Review.find(query).countDocuments(),
        Review.countDocuments({
          createdAt: { $gte: CommonUtil.oneMonthAgo() },
        }),
      ]);
      return res.success("Lấy danh sách đánh giá thành công", {
        total: total,
        countRes: data.length,
        data,
        lastMonth,
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
