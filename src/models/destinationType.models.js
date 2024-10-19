import mongoose from "mongoose";

const DestinationTypeSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: {
      type: String,
      default: "Đang cập nhật",
    },
  },
  { timestamps: true, minimize: false, strict: true }
);

const DestinationType = mongoose.model("DestinationType", DestinationTypeSchema);
export default DestinationType;