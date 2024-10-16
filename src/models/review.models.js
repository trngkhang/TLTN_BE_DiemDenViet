import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    comment: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
  },
  { timestamps: true, minimize: false, strict: true }
);

// Middleware pre-save: kiểm tra sự tồn tại của userId và destinationId trước khi lưu
ReviewSchema.pre("save", function (next) {
  const review = this;

  // Tìm cả Province và DestinationType theo Id
  Promise.all([
    mongoose.model("User").findById(review.userId),
    mongoose.model("Destination").findById(review.destinationId),
  ])
    .then(([user, destination]) => {
      if (!user) {
        // Nếu User không tồn tại, ngăn lưu review
        return next(new Error("User id not found"));
      }
      if (!destination) {
        // Nếu Destination không tồn tại, ngăn lưu review
        return next(new Error("Destination type id not found"));
      }
      // Nếu cả user và destinationw đều tồn tại, tiếp tục lưu
      next();
    })
    .catch((err) => next(err));
});

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
