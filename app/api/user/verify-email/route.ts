import User from "@/models/user";
import emailValidator from "node-email-verifier";
import { NextResponse } from "next/server";
import { sendEmail } from "@/utilities/auth/sendEmail";

export const POST = async (req: Request, res: Response) => {
  try {
    const { email } = await req.json();

    const emailValid = await emailValidator(email);

    const refinedEmail = email.toLowerCase();

    if (!emailValid) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: refinedEmail });

    if (!user) {
      return NextResponse.json(
        { message: "No user found for this email" },
        { status: 401 }
      );
    }

    const token = await user.createEmailVerificationToken();

    await user.save();

    const data: EmailInfoType = {
      from: "TheTernHub",
      to: email,
      text: "Email verification",
      subject: "Verify your account",
      html: `Hi ${user.name}, <p>Follow this link to verify your email address to continue using TheTernHub. Link expires in 30 minutes <a href = "${process.env.NEXTAUTH_URL}/auth/verify-email/${token}" > Click Here To Verify</a>.</p> <p>TheTernHub team.</p>`,
    };

    await sendEmail(data);

    return NextResponse.json({
      message:
        "An Email verification link has been sent to your email address.",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
