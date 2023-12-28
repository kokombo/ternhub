import User from "@/models/user";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities";

export const POST = async (req: Request) => {
  const body = await req.json();
  const email = body.email;

  const refinedEmail = email.toLowerCase();

  try {
    await connectDatabase();

    const userExists = await User.findOne({ email: refinedEmail });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exist, please sign in." },
        { status: 401 }
      );
    }

    const user = await User.create({ ...body, email: refinedEmail });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  const allUsers = await User.find();

  return NextResponse.json({ allUsers, totalNumOfUsers: allUsers.length });
};
