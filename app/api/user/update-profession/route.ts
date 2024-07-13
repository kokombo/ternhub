import User from "@/models/user";
import { NextResponse, type NextRequest } from "next/server";
import { connectDatabase } from "@/database/database";
import { getCurrentServerSession } from "@/utilities/auth/getCurrentServerSession";

export const PUT = async (req: NextRequest) => {
  const profession = await req.json();
  const session = await getCurrentServerSession();

  if (!session)
    return NextResponse.json(
      { message: "Oops! You cannot perform action." },
      { status: 401 }
    );

  try {
    await connectDatabase();

    const user = await User.findById(session.user.id);

    if (user) {
      user.profession = profession;

      await user.save();

      return NextResponse.json(
        { message: "You have updated your profession successfully!" },
        { status: 200 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
