import mongoose from "mongoose";

export const validateMongoDBId = (id: string) => {
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    throw new Error("This is not a valid id");
  }
};
