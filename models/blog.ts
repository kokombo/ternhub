import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
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

    category: {
      type: String,
      required: true,
    },

    metaDescription: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    author: {
      name: {
        type: String,
        default: "admin",
      },

      twitter: {
        type: String,
      },

      portfolio: {
        type: String,
      },

      linkedin: {
        type: String,
      },
    },

    keywords: {
      type: Array,
    },

    numberOfViews: {
      type: Number,
      default: 0,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;
