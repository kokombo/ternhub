import Faq from "@/models/faq";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
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
