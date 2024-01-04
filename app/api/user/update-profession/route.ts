import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectDatabase } from "@/database/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities";

export const PUT = async (req: Request) => {
  const profession = await req.json();

  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!session?.user)
    return NextResponse.json(
      { message: "Oops! You cannot perform action." },
      { status: 401 }
    );

  try {
    await connectDatabase();

    const user = await User.findById(userId);

    if (user) {
      user.profession = profession;

      await user.save();

      return NextResponse.json(
        { message: "You have updated your profession successfully!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(user);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
