import mongoose from "mongoose";

const URI = process.env.MONGODB_URI as string;

export const connectDatabase = async () => {
  try {
    await mongoose.connect(URI, {
      dbName: "ternhub",
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
