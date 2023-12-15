import { Schema, model, models } from "mongoose";

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
    },

    company: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    site: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: ["remote", "hybrid", "onsite"],
    },

    logo: {
      type: String,
      required: true,
    },

    numberOfViews: {
      type: Number,
      default: 0,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Job = models.Job || model("Job", JobSchema);

export default Job;
