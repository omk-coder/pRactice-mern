import mongoose from "mongoose";

const DocsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      //prevent using same username for different user
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Docs = mongoose.model("Docs", DocsSchema);

export default Docs;
