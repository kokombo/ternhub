import Faq from "@/models/faq";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { validateMongoDBId } from "@/utilities/general/validateMongoDBId";
import { getSessionUser } from "@/utilities/auth/getSessionUser";

export const GET = async (req: Request, { params }: { params: Params }) => {
  const { sessionUser } = await getSessionUser();

  if (!sessionUser || sessionUser.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  validateMongoDBId(params.id);

  try {
    await connectDatabase();

    const faq = await Faq.findById(params.id);

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: Request, { params }: { params: Params }) => {
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

  validateMongoDBId(params.id);

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
  const { sessionUser } = await getSessionUser();

  if (!sessionUser || sessionUser.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  validateMongoDBId(params.id);

  try {
    await connectDatabase();

    await Faq.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: "Job deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to delete job, please try again." },
      { status: 500 }
    );
  }
};
