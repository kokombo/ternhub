import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities";
import { connectDatabase } from "@/database/database";
import { validateMongoDBId } from "@/utilities/general/validateMongoDBId";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  if (!session?.user) {
    return NextResponse.json(
      { message: "Oops! You cannot perform action. Please sign in" },
      { status: 401 }
    );
  }

  try {
    await connectDatabase();

    const user = await User.findById(userId).populate("savedJobs");

    const userSavedJobs = user.savedJobs;

    return NextResponse.json(userSavedJobs);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  if (!session?.user) {
    return NextResponse.json(
      { message: "Oops! You cannot perform action." },
      { status: 401 }
    );
  }

  const jobId = await req.json();

  validateMongoDBId(jobId);

  try {
    await connectDatabase();

    const user = await User.findById(userId);

    const alreadyBookmarked = user.savedJobs.find(
      (_id: string) => _id.toString() === jobId.toString()
    );

    if (alreadyBookmarked) {
      const user = await User.findByIdAndUpdate(
        userId,

        {
          $pull: { savedJobs: jobId },
        },

        { new: true }
      );

      const userAgain = await User.findById(userId).populate("savedJobs");

      const userSavedJobs = userAgain.savedJobs;

      return NextResponse.json(userSavedJobs);
    } else {
      const user = await User.findByIdAndUpdate(
        userId,

        { $push: { savedJobs: jobId } },

        { new: true }
      );

      const userAgain = await User.findById(userId).populate("savedJobs");

      const userSavedJobs = userAgain.savedJobs;

      return NextResponse.json(userSavedJobs);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
