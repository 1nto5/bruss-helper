// models/extraHours.js

import mongoose from "mongoose";

const ExtraHoursSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  supervisor: {
    type: String,
    required: true,
  },
  extraHours: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

export default mongoose.model("ExtraHours", ExtraHoursSchema, "extrahours");
