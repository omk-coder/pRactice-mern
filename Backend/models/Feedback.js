import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
       email: {
      type: String,
      required: true,
    
    },
    text: {
        type: String,
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;