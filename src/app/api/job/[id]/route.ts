import Job from "@/models/job";
import { connectDatabase } from "@/database/database";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
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
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  const body = await req.json();

  try {
    await connectDatabase();

    const job = await Job.findByIdAndUpdate(params.id, body, { new: true });

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  try {
    await connectDatabase();

    await Job.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Job deleted successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
