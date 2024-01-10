import User from "@/models/user";
import { NextResponse } from "next/server";
import { sendEmail } from "@/utilities/auth/sendEmail";
import crypto from "node:crypto";
import { connectDatabase } from "@/database/database";

export const POST = async (req: Request, res: Response) => {
  const email = await req.json();

  const refinedEmail = email.toLowerCase();

  try {
    await connectDatabase();

    const user = await User.findOne({ email: refinedEmail });

    if (!user) {
      return NextResponse.json(
        { message: "No user found for this email" },
        { status: 401 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        {
          message:
            "User email has already been verified. Please continue to TernHub.",
        },
        { status: 401 }
      );
    }

    const token = await user.createEmailVerificationToken();

    await user.save();

    const data: EmailInfoType = {
      from: "TheTernHub",
      to: refinedEmail,
      text: "Email verification",
      subject: "Verify your account",
      html: `Hi ${user.name}, <p>Follow this link to verify your email address to continue using TheTernHub. Link expires in 30 minutes. <a href = "${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}" > Click Here To Verify</a>.</p> <p>TheTernHub team.</p>`,
    };

    await sendEmail(data);

    return NextResponse.json(
      {
        message:
          "An Email verification link has been sent to your email address.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const token = searchParams.get("token") as string;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    await connectDatabase();

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email verification link!" },
        { status: 401 }
      );
    }

    user.emailVerified = true;

    user.emailVerificationToken = undefined;

    user.emailVerificationTokenExpires = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
