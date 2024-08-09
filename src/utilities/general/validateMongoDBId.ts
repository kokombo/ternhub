import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const validateMongoDBId = (id: string) => {
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    return NextResponse.json({ message: "invalid id", status: 401 });
  }
};
