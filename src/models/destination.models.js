import mongoose, { Schema } from "mongoose";

const DestinationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/vietnam-map-touristic-isometric-poster_1284-17336.jpg",
      required: true,
    },
    description: { type: String, default: "Đang cập nhật", required: true },
    address: {
      street: { type: String }, 
      wardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ward",
      },
      districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "District",
      },
      provinceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province",
      },
    },
    openingTime: {
      type: String,
      default: "Đang cập nhật",
      required: true,
    },
    ticketPrice: { type: String, default: "Đang cập nhật" },
    views: { type: Number, default: 0, min: 0 },
    category: {
      categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true,
      },
    },
    averageRating: { type: Number, default: 5 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false, strict: true }
);

DestinationSchema.index({ "address.wardId": 1 });
DestinationSchema.index({ "address.districtId": 1 });
DestinationSchema.index({ "address.provinceId": 1 });
DestinationSchema.index({ "category.categoryId": 1 });
DestinationSchema.index({ "category.subcategoryId": 1 });
DestinationSchema.index({ "address.averageRating": 1 });
DestinationSchema.index({ isDeleted: 1 });


const Destination = mongoose.model("Destination", DestinationSchema);
export default Destination;
