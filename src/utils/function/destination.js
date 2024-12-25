import mongoose from "mongoose";
import Destination from "../../models/destination.models.js";

export const getDestinationForTrip = async (provinceId, districtId) => {
  try {
    const queryDes = {
      ...(provinceId && {
        "address.provinceId": new mongoose.Types.ObjectId(provinceId),
      }),
      ...(districtId && {
        "address.provinceId": new mongoose.Types.ObjectId(districtId),
      }),
      isDeleted: false,
    };
    const queryHotel = {
      ...(provinceId && {
        "address.provinceId": new mongoose.Types.ObjectId(provinceId),
      }),
      "category.categoryId": new mongoose.Types.ObjectId(
        "675170ac4e2ef56a8d785971"
      ),
      isDeleted: false,
    };
     const [hotels, destinations] = await Promise.all([
      Destination.aggregate([
        { $match: queryHotel },
        {
          $project: {
            _id: 1,
            name: 1,
            ticketPrice: 1,
          },
        },
        { $sample: { size: 10 } },
      ]),
      Destination.aggregate([
        { $match: queryDes },
        {
          $lookup: {
            from: "subcategories",
            localField: "category.subcategoryId",
            foreignField: "_id",
            as: "subcategoryDetails",
          },
        },
        {
          $unwind: {
            path: "$subcategoryDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            category: "$subcategoryDetails.name",
          },
        },
        { $sample: { size: 100 } },
      ]),
    ]);
    return { hotels, destinations };
  } catch (error) {
    return {};
  }
};
