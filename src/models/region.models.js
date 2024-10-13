import mongoose from "mongoose";

const RegionSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: {
      type: String,
      default: "Đang cập nhật",
    },
  },
  { timestamps: true, minimize: false, strict: true }
);

const Region = mongoose.model("Region", RegionSchema);
export default Region;
