import mongoose from "mongoose";

const WardSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    districtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
  },
  { timestamps: true, minimize: false, strict: true }
);

const Ward = mongoose.model("Ward", WardSchema);
export default Ward;
