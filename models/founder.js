import mongoose, { Schema } from "mongoose";

const founderSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    linkedInUrl: { type: String, required: true },
    description: { type: String, required: true },
    profilePicture: { type: String, required: false },
  },
  { timestamps: true }
);

const Founder =
  mongoose.models.Founder || mongoose.model("Founder", founderSchema);

export default Founder;
