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
    },

    mode: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    logo: {
      type: String,
    },

    salary: {
      type: Number,
    },

    numberOfViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Job = models.Job || model("Job", JobSchema);

export default Job;
