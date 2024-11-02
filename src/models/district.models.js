import mongoose from "mongoose";

const DistrictSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    provinceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
      required: true,
    },
  },
  { timestamps: true, minimize: false, strict: true }
);

const District = mongoose.model("District", DistrictSchema);
export default District;
