import { Schema, model, models } from "mongoose";

const FaqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Faq = models.Faq || model("Faq", FaqSchema);

export default Faq;
