import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "@/database/database";

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const { profession } = body;

  const id = "placeholder";

  try {
    await connectDatabase();

    const user = await User.findById(id);

    if (user) {
      user.profession = profession;
      const updatedProfession = await user.save();

      return NextResponse.json(updatedProfession);
    } else {
      return NextResponse.json(user);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
