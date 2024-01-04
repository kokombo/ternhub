import { connectDatabase } from "@/database/database";
import User from "@/models/user";
import { sendEmail } from "@/utilities/auth/sendEmail";
import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const POST = async (req: Request) => {
  const email = await req.json();

  const refinedEmail = email.toLowerCase();

  if (!refinedEmail) {
    return NextResponse.json(
      { message: "Please provide your email address." },
      { status: 401 }
    );
  }

  try {
    await connectDatabase();

    const user = await User.findOne({ email: refinedEmail });

    if (!user) {
      return NextResponse.json(
        { message: "User with this email not found." },
        { status: 401 }
      );
    }

    const token = await user.createPasswordResetToken();

    await user.save();

    const data: EmailInfoType = {
      from: "TheTernHub",
      to: refinedEmail,
      text: "Password Reset",
      subject: "Reset Your Password",
      html: `Hi ${user.name}, <p>Follow this link to reset your password for TheTernHub. Link expires in 15 minutes <a href = "${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}" > Click Here To Reset</a>.</p> <p>If you did not initiate a password reset, please ignore or contact support.</p> <p>TheTernHub team.</p>`,
    };

    await sendEmail(data);

    return NextResponse.json(
      { message: "We have sent a password reset link to your email." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Someting went wrong, please try again." },
      { status: 200 }
    );
  }
};

export const PUT = async (req: Request) => {
  const password = await req.json();

  const { searchParams } = new URL(req.url);

  const token = searchParams.get("token") as string;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    await connectDatabase();

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "Invalid password reset link. Link must have expired. Please try again!",
        },
        { status: 401 }
      );
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "You have successfully changed your password.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Someting went wrong, please try again." },
      { status: 200 }
    );
  }
};
