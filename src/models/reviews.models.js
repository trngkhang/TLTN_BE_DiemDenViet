import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
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
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  destinationId: {
    type: Schema.Types.ObjectId,
    ref: "Destination",
    required: true,
  },
});

const Destination = mongoose.model("Review", ReviewSchema);
export default Destination;
