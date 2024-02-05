import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectDatabase } from "@/database/database";
import { getSessionUser } from "@/utilities/auth/getSessionUser";

export const PUT = async (req: Request) => {
  const profession = await req.json();

  const { sessionUser, userId } = await getSessionUser();

  if (!sessionUser)
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
