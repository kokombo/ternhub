import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { useSession } from "next-auth/react";

export const PUT = async (req: NextRequest) => {
  const { data: session } = useSession();

  const userId = session?.user.id;

  const { jobId } = await req.json();

  try {
    const user = await User.findById(userId);

    const alreadyBookmarked = user.savedJobs.find(
      (id: string) => id.toString() === jobId
    );

    if (alreadyBookmarked) {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { savedJobs: jobId },
        },
        { new: true }
      );

      return NextResponse.json(user);
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $push: { savedJobs: jobId } },
        { new: true }
      );

      return NextResponse.json(user);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const Get = async (req: NextRequest) => {
  const { data: session } = useSession();

  const userId = session?.user.id;

  try {
    const user = await User.findById(userId).populate("savedJobs");

    const userSavedJobs = user.savedJobs;

    return NextResponse.json(userSavedJobs);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
