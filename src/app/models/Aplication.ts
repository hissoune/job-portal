import mongoose, { Schema, model, models } from "mongoose";

const ApplicationSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    note: { type: String },
  },
  { timestamps: true }
);

export default models.Application || model("Application", ApplicationSchema);
