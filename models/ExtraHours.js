import mongoose from "mongoose";

const ExtraHoursSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
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
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    supervisorApproval: {
      type: Boolean,
      default: false,
    },
    supervisorComment: {
      type: String,
    },
    hrReviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hrApproval: {
      type: Boolean,
      default: false,
    },
    hrComment: {
      type: String,
    },
  },
  { versionKey: false }
);

export default mongoose.model("ExtraHours", ExtraHoursSchema, "extra_hours");
