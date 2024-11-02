import mongoose from "mongoose";

const ProvinceSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    regionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false, strict: true }
);

const Province = mongoose.model("Province", ProvinceSchema);
export default Province;
