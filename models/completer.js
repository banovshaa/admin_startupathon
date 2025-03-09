import mongoose, { Schema } from "mongoose";

const completerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    linkedInUrl: { type: String, required: true },
    fundingAmount: { type: Number, required: true },
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    profilePicture: { type: String, required: false },
  },
  { timestamps: true }
);

const Completer =
  mongoose.models.Completer || mongoose.model("Completer", completerSchema);

export default Completer;
