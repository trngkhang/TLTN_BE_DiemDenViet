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
    introduce: { type: String, default: "Đang cập nhật", required: true },
    description: { type: String },
    address: { type: String, default: "Đang cập nhật" },
    openingTime: { type: String, default: "Đang cập nhật" },
    ticketPrice: { type: String, default: "Đang cập nhật" },
    views: { type: Number, default: 0, min: 0 },
    provinceId: {
      type: Schema.Types.ObjectId,
      ref: "Province",
      required: true,
    },
    destinationTypeId: {
      type: Schema.Types.ObjectId,
      ref: "DestinationType",
      required: true,
    },
  },
  { timestamps: true, minimize: false, strict: true }
);
// // Middleware pre-save: kiểm tra sự tồn tại của provinceId và destinationTypeId trước khi lưu
// DestinationSchema.pre("save", function (next) {
//   const destination = this;

//   // Tìm cả Province và DestinationType theo Id
//   Promise.all([
//     mongoose.model("Province").findById(destination.provinceId),
//     mongoose.model("DestinationType").findById(destination.destinationTypeId),
//   ])
//     .then(([province, destinationType]) => {
//       if (!province) {
//         // Nếu Province không tồn tại, ngăn lưu destination
//         return next(new Error("Province id not found"));
//       }
//       if (!destinationType) {
//         // Nếu DestinationType không tồn tại, ngăn lưu destination
//         return next(new Error("Destination type id not found"));
//       }
//       // Nếu cả Province và DestinationType đều tồn tại, tiếp tục lưu
//       next();
//     })
//     .catch((err) => next(err));
// });
// // Middleware pre-findOneAndUpdate: Kiểm tra sự tồn tại của provinceId và destinationTypeId trước khi cập nhật
// DestinationSchema.pre("findOneAndUpdate", function (next) {
//   const update = this.getUpdate();

//   const checks = [];

//   // Kiểm tra nếu có provinceId trong update
//   if (update.provinceId) {
//     const provinceCheck = mongoose
//       .model("Province")
//       .findById(update.provinceId);
//     checks.push(provinceCheck);
//   }

//   // Kiểm tra nếu có destinationTypeId trong update
//   if (update.destinationTypeId) {
//     const destinationTypeCheck = mongoose
//       .model("DestinationType")
//       .findById(update.destinationTypeId);
//     checks.push(destinationTypeCheck);
//   }

//   // Nếu không có bất kỳ ID nào cần kiểm tra, tiếp tục lưu
//   if (checks.length === 0) {
//     return next();
//   }

//   // Sử dụng Promise.all để kiểm tra cả hai ID song song
//   Promise.all(checks)
//     .then((results) => {
//       // Kiểm tra kết quả của cả hai promise
//       const [province, destinationType] = results;

//       if (update.provinceId && !province) {
//         return next(new Error("Province id not found"));
//       }

//       if (update.destinationTypeId && !destinationType) {
//         return next(new Error("Destination type id not found"));
//       }

//       // Nếu cả hai đều tồn tại, tiếp tục cập nhật
//       next();
//     })
//     .catch((err) => next(err));
// });

const Destination = mongoose.model("Destination", DestinationSchema);
export default Destination;
