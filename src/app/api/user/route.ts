import User from "@/models/user";
import { connectDatabase } from "@/database/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const email = body.email;

  try {
    await connectDatabase();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exist, please sign in." },
        { status: 401 }
      );
    }

    const user = await User.create({ ...body });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
