import mongoose from "mongoose";

const DistrictSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    provinceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false, strict: true }
);

const District = mongoose.model("District", DistrictSchema);
export default District;
