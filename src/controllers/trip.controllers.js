import Trip from "../models/trip.models.js";
import { chatSession } from "../service/AIModel.js";
import { AI_PROMPT } from "../utils/trip.js";

export const generateTrip = async (req, res, next) => {
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
    return res.status(200).json(savedTrip);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getTrip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);
    if (!trip) {
      return next(errorHandler(404, "Trip not found"));
    }
    return res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};
