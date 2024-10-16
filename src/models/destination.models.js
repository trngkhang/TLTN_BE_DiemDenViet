import mongoose, { Schema } from "mongoose";

const DestinationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 100,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/vietnam-map-touristic-isometric-poster_1284-17336.jpg",
    },
    introduce: { type: String, default: "Đang cập nhật" },
    description: { type: String },
    address: { type: String, default: "Đang cập nhật" },
    openingTime: { type: String, default: "Đang cập nhật" },
    ticketPrice: { type: String },
    views: { type: Number, default: 0, min: 0 },
    provinceId: {
      type: Schema.Types.ObjectId,
      ref: "Province",
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "DestinationType",
      required: true,
    },
  },
  { timestamps: true, minimize: false, strict: true }
);

// Middleware để tăng views sau khi findById hoặc findOne
DestinationSchema.post("findOne", async function (doc) {
  if (doc) {
    doc.views += 1;
    await doc.save();
  }
});

const Destination = mongoose.model("Destination", DestinationSchema);
export default Destination;
