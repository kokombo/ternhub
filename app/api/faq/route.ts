import Faq from "@/models/faq";
import { connectDatabase } from "@/database/database";
import { NextResponse, type NextRequest } from "next/server";
import { getCurrentServerSession } from "@/utilities/auth/getCurrentServerSession";

export const POST = async (req: NextRequest) => {
  const session = await getCurrentServerSession();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  const body = await req.json();

  const { question, answer } = body;

  if (!question || !answer) {
    return NextResponse.json(
      { message: "Question and answer input is required." },
      { status: 401 }
    );
  }

  try {
    await connectDatabase();

    const faq = await Faq.create({ ...body });

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectDatabase();
    const allFaqs = await Faq.find();

    return NextResponse.json(allFaqs);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
