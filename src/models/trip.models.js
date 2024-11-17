import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selection: {
      location: { type: String, required: true },
      noOfDay: { type: Number, required: true, min: 1, max: 5 },
      traveler: { type: String, required: true },
      budget: { type: String, required: true },
    },
    data: { type: Object },
  },
  { timestamps: true, minimize: false, strict: true }
);

const Trip = mongoose.model("Trip", TripSchema);
export default Trip;
