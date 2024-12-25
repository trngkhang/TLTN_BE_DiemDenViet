import Trip from "../models/trip.models.js";
import { genByAI } from "../services/AImodel/genByAI.js";
import { genfromDB } from "../services/AImodel/genfromDB.js";
import CommonUtil from "../utils/CommonUtil.js";
import { getDestinationForTrip } from "../utils/function/destination.js";
import { AI_PROMPT, AI_PROMPT_2 } from "../utils/trip.js";

class TripController {
  static async generateByAI(req, res, next) {
    try {
      const { userId, location, noOfDay, traveler, budget } = req.body;
      const interest = req.body.interest || "";
       const FINAL_PROMPT = AI_PROMPT.replace("{location}", location)
        .replace("{noOfDay}", noOfDay)
        .replace("{noOfDay}", noOfDay)
        .replace("{traveler}", traveler)
        .replace("{budget}", budget)
        .replace("{interest}", interest);
       const result = await genByAI.sendMessage(FINAL_PROMPT);
      const tripData = JSON.parse(result?.response?.text());
       const newTrip = new Trip({
        userId: userId,
        selection: {
          location: location,
          noOfDay: noOfDay,
          traveler: traveler,
          budget: budget,
          interest: interest,
        },
        type: "byAI",
        data: tripData,
      });
      const savedTrip = await newTrip.save();
      return res.success("Chuyến đi đã được tạo thành công", savedTrip);
    } catch (error) {
       next(error);
    }
  }

  static async generateFromDB(req, res, next) {
     try {
      const { userId, location, noOfDay, traveler, budget, provinceId } =
        req.body;
      const interest = req.body.interest || "";
      const districtId = req.body.districtId || "";
 
      const dataDes = await getDestinationForTrip(provinceId, districtId);
       const TextDes = JSON.stringify(dataDes);
       const FINAL_PROMPT = AI_PROMPT_2.replace("{location}", location)
        .replace("{noOfDay}", noOfDay)
        .replace("{traveler}", traveler)
        .replace("{budget}", budget)
        .replace("{interest}", interest)
        .replace("_input", TextDes);
 
      const result = await genfromDB.sendMessage(FINAL_PROMPT);
      const tripData = JSON.parse(result?.response?.text());
       const newTrip = new Trip({
        userId: userId,
        selection: {
          location: location,
          noOfDay: noOfDay,
          traveler: traveler,
          budget: budget,
          interest: interest,
        },
        type: "fromDB",
        data: tripData,
      });
      const savedTrip = await newTrip.save();
      return res.success("Chuyến đi đã được tạo thành công", savedTrip);
    } catch (error) {
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
      const sortDirection = parseInt(req.query.order) || 1;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const skip = (page - 1) * pageSize;
      const query = {
        ...(userId && { userId: userId }),
        ...(isDeleted && { isDeleted: isDeleted == "true" }),
      };
      const [data, total, lastMonth] = await Promise.all([
        Trip.find(query)
          .sort({ createdAt: sortDirection })
          .skip(skip)
          .limit(pageSize)
          .populate("userId", "name"),
        Trip.find(query).countDocuments(),
        Trip.countDocuments({
          createdAt: { $gte: CommonUtil.oneMonthAgo() },
        }),
      ]);
      return res.success("Lấy danh sách chuyến đi thành công", {
        total,
        countRes: data.length,
        data,
        lastMonth,
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
