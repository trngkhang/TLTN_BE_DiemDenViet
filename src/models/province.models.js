import mongoose, { Schema } from "mongoose";

const ProvinceSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: {
      type: String,
      default: "Đang cập nhật",
    },
    regionId: {
      type: Schema.Types.ObjectId,
      ref: "Region",
      required: true,
    },
  },
  { timestamps: true, minimize: false, strict: true }
);

// Middleware pre-save: kiểm tra sự tồn tại của regionId trước khi lưu
ProvinceSchema.pre("save", function (next) {
  const province = this;
  mongoose
    .model("Region")
    .findById(province.regionId)
    .then((province) => {
      if (!province) {
        // Nếu region không tồn tại, ngăn lưu province
        return next(new Error("Region not found"));
      }
      // Nếu Region tồn tại, tiếp tục lưu
      next();
    })
    .catch((err) => next(err));
});
//Middleware pre-findOneAndUpdate: Kiểm tra sự tồn tại của regionId trước khi cập nhật
ProvinceSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.regionId) {
    mongoose
      .model("Region")
      .findById(update.regionId)
      .then((province) => {
        if (!province) {
          // Nếu region không tồn tại, ngăn lưu province
          return next(new Error("Region not found"));
        }
        // Nếu Region tồn tại, tiếp tục lưu
        next();
      })
      .catch((err) => next(err));
  } else {
    next(); // không có author trong update, tiếp tục
  }
});

const Province = mongoose.model("Province", ProvinceSchema);
export default Province;
