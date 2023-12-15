import Blog from "@/models/blog";
import { connectDatabase } from "@/database/database";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    await connectDatabase();

    const blog = await Blog.findById(params.id);
    await Blog.findByIdAndUpdate(
      params.id,
      { $inc: { numberOfViews: 1 } },
      { new: true }
    );

    return NextResponse.json(blog);
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

    const blog = await Blog.findByIdAndUpdate(params.id, body, { new: true });

    return NextResponse.json(blog);
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

    await Blog.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Job deleted successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
