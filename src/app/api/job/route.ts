import Job from "@/models/job";
import { connectDatabase } from "@/database/database";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();

  const { title } = body;
  try {
    await connectDatabase();

    if (title) {
      body.slug = slugify(title, { lower: true });
    }

    const job = await Job.create({ ...body });

    return NextResponse.json(job);
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

    const allJobs = await Job.find();

    return NextResponse.json(allJobs);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
