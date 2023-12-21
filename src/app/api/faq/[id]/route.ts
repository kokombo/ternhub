import Faq from "@/models/faq";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (req: Request, { params }: { params: Params }) => {
  try {
    await connectDatabase();

    const faq = await Faq.findById(params.id);

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export const PATCH = async (req: Request, { params }: { params: Params }) => {
  const body = await req.json();

  try {
    await connectDatabase();

    const faq = await Faq.findByIdAndUpdate(params.id, body, { new: true });

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request, { params }: { params: Params }) => {
  try {
    await connectDatabase();

    await Faq.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Job deleted successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to delete job, please try again." },
      { status: 500 }
    );
  }
};
