import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities";
import { connectDatabase } from "@/database/database";
import { validateMongoDBId } from "@/utilities/general/validateMongoDBId";
import { sendEmail } from "@/utilities/auth/sendEmail";
import mongoose from "mongoose";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  if (!session?.user) {
    return NextResponse.json(
      { message: "Oops! Please sign in to perform action." },
      { status: 401 }
    );
  }

  try {
    await connectDatabase();

    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    }).populate("savedJobs");

    if (!user) {
      return NextResponse.json(
        { message: "User not found. please sign in again." },
        { status: 401 }
      );
    }

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
      { message: "Oops! Please sign in to perform action." },
      { status: 401 }
    );
  }

  const jobId = await req.json();

  validateMongoDBId(jobId);

  try {
    await connectDatabase();

    const user = await User.findById(userId);

    if (!session?.user.emailVerified) {
      const token = await user.createEmailVerificationToken();

      await user.save();

      const email = session?.user?.email as string;

      const data: EmailInfoType = {
        from: "TheTernHub",
        to: email,
        text: "Email verification",
        subject: "Verify your TernHub account",
        html: `Hi ${user.name}, <p>Follow this link to verify your email address to continue using TheTernHub. Link expires in 30 minutes. <a href = "${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}" >Click Here To Verify</a>.</p> <p>TheTernHub team.</p>`,
      };

      await sendEmail(data);

      return NextResponse.json(
        {
          message:
            "We've sent you a verification link. Please verify your email.",
        },
        { status: 401 }
      );
    }

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

      return NextResponse.json({ message: "Job removed!" }, { status: 200 });
    } else {
      const user = await User.findByIdAndUpdate(
        userId,

        { $push: { savedJobs: jobId } },

        { new: true }
      );

      return NextResponse.json({ message: "Job bookmarked!" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
