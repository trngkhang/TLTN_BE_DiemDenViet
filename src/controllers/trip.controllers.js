import Trip from "../models/trip.models.js";
import { chatSession } from "../services/AIModel.js";
import CommonUtil from "../utils/CommonUtil.js";
import { AI_PROMPT } from "../utils/trip.js";

class TripController {
  static async generate(req, res, next) {
    try {
      const { userId, location, noOfDay, traveler, budget } = req.body;
      console.log(userId, location, noOfDay, traveler, budget);
      const FINAL_PROMPT = AI_PROMPT.replace("{location}", location)
        .replace("{noOfDay}", noOfDay)
        .replace("{noOfDay}", noOfDay)
        .replace("{traveler}", traveler)
        .replace("{budget}", budget);
      console.log("Prompt:", FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripData = JSON.parse(result?.response?.text());
      console.log(tripData);
      const newTrip = new Trip({
        userId: userId,
        selection: {
          location: location,
          noOfDay: noOfDay,
          traveler: traveler,
          budget: budget,
        },
        data: tripData,
      });
      const savedTrip = await newTrip.save();
      return res.success("Chuyến đi đã được tạo thành công", savedTrip);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const { isDeleted } = req.query;
      const query = {
        _id: id,
        ...(isDeleted && { isDeleted: isDeleted }),
      };
      console.log(query);
      const trip = await Trip.find(query);
      if (trip.length === 0) {
        return res.error(404, "Không tìm thấy chuyến đi");
      }
      return res.success("Lấy chuyến đi thành công", trip[0]);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { userId, isDeleted } = req.query;
      const sortDirection = req.query.order === "asc" ? 1 : -1;
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const query = {
        ...(userId && { userId: userId }),
        ...(isDeleted && { isDeleted: isDeleted == "true" }),
      };
      const trips = await Trip.find(query)
        .sort({ updateAt: sortDirection })
        .skip(startIndex)
        .limit(limit)
        .populate("userId", "name");
      const totalTrips = await Trip.countDocuments();
      const responseTrips = trips.length;

      const lastMonthTrips = await Trip.countDocuments({
        createdAt: { $gte: CommonUtil.oneMonthAgo() },
      });

      return res.success("Lấy danh sách chuyến đi thành công", {
        totalTrips,
        responseTrips,
        trips,
        lastMonthTrips,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedTrip = await Trip.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      if (!deletedTrip) return res.error(404, "Không tìm thấy chuyến đi");
      return res.success("Chuyến đi đã bị xóa");
    } catch (error) {
      next(error);
    }
  }
}

export default TripController;
