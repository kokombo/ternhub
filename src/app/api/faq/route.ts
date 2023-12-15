import Faq from "@/models/faq";
import { connectDatabase } from "@/database/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();

  try {
    await connectDatabase();

    const faq = await Faq.create({ ...body });

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDatabase();

    const allFaqs = await Faq.find();

    return NextResponse.json(allFaqs);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
