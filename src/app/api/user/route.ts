import User from "@/models/user";
import { connectDatabase } from "@/database/database";
import { NextResponse, type NextRequest } from "next/server";
import emailValidator from "node-email-verifier";
import { sendEmail } from "@/utilities/auth/sendEmail";
import { getServerSession } from "@/utilities/auth/getServerSession";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const email = body.email;
  const refinedEmail = email.toLowerCase();
  const emailValid = await emailValidator(email);

  if (!emailValid) {
    return NextResponse.json(
      { message: "Please provide a valid email address." },
      { status: 401 }
    );
  }

  try {
    await connectDatabase();

    const userExists = await User.findOne({ email: refinedEmail });

    if (userExists) {
      return NextResponse.json(
        { message: "User account already exist, please sign in." },
        { status: 401 }
      );
    }

    const user = await User.create({
      ...body,
      email: refinedEmail,
      authMethod: "credentials",
    });

    const token = await user.createEmailVerificationToken();

    await user.save();

    const data: EmailInfoType = {
      from: "TheTernHub",
      to: refinedEmail,
      text: "Verify your email address",
      subject: "Welcome to TheTernHub - Verify your email",
      html: `Hi ${user.name}, <p>Thank you for joining TheTernHub.</p>  <p>Follow this link to verify your email address to continue using TheTernHub. Link expires in 30 minutes. <a href = "${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}" > Click Here To Verify</a>.</p> <p>TheTernHub team.</p>`,
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

export const GET = async (req: NextRequest) => {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  await connectDatabase();

  const allUsers = await User.find();

  return NextResponse.json({ allUsers, totalNumOfUsers: allUsers.length });
};
