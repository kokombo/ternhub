import Job from "@/models/job";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import slugify from "slugify";
import { validateMongoDBId } from "@/utilities/general/validateMongoDBId";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities";

export const GET = async (req: Request, { params }: { params: Params }) => {
  validateMongoDBId(params.id);

  try {
    await connectDatabase();

    const job = await Job.findById(params.id);

    await Job.findByIdAndUpdate(
      params.id,
      { $inc: { numberOfViews: 1 } },
      { new: true }
    );

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Something went wrong. We are having issues loading this page.",
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: Request, { params }: { params: Params }) => {
  const body = await req.json();

  const session = await getServerSession(authOptions);

  if (!session?.user || session?.user.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  validateMongoDBId(params.id);

  try {
    await connectDatabase();

    if (body.title) {
      body.slug = slugify(body.title, { lower: true });
    }

    const job = await Job.findByIdAndUpdate(params.id, body, { new: true });

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request, { params }: { params: Params }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user || session?.user.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  validateMongoDBId(params.id);

  try {
    await connectDatabase();

    await Job.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Job deleted successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to delete, please try again." },
      { status: 500 }
    );
  }
};
