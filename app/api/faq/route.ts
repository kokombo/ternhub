import Faq from "@/models/faq";
import { connectDatabase } from "@/database/database";
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/utilities/auth/getSessionUser";

export const POST = async (req: NextRequest) => {
  const { sessionUser } = await getSessionUser();

  if (!sessionUser || sessionUser.role !== "admin") {
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
