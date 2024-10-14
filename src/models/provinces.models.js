import mongoose from "mongoose";

const ProvinceSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: {
      type: String,
      default: "Đang cập nhật",
    },
  },
  { timestamps: true, minimize: false, strict: true }
);

const Province = mongoose.model("Province", ProvinceSchema);
export default Province;
