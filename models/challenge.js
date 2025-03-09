import mongoose, { Schema } from "mongoose";

const challengeSchema = new Schema(
  {
    title: { type: String, required: true },
    fundingAmount: { type: Number, required: true },
    deadline: { type: String, required: true },
    isVisible: { type: Boolean, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

const Challenge =
  mongoose.models.Challenge || mongoose.model("Challenge", challengeSchema);

export default Challenge;
