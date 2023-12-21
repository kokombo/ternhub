import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectDatabase } from "@/database/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const PUT = async (req: Request) => {
  const { profession } = await req.json();

  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  try {
    await connectDatabase();

    const user = await User.findById(userId);

    if (user) {
      user.profession = profession;

      const updatedProfession = await user.save();

      return NextResponse.json(updatedProfession);
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
