import mongoose, { Schema, model, models } from "mongoose";

const ApplicationSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobTitle: { type: String, required: true }, 
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    note: { type: String },
    resume: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default models.Application || model("Application", ApplicationSchema);
