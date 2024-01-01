import User from "@/models/user";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export const PUT = async (req: Request, { params }: { params: Params }) => {
  try {
    const token = params.token;

    const { createHash } = await import("node:crypto");

    const hashedToken = createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid link." }, { status: 401 });
    }

    user.emailVerified = true;

    user.emailVerificationToken = undefined;

    user.emailVerificationExpires = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
