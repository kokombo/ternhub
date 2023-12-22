import Faq from "@/models/faq";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
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

export const GET = async (req: Request) => {
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
