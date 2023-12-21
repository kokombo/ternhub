import Blog from "@/models/blog";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";
import slugify from "slugify";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();

  const { title } = body;

  try {
    await connectDatabase();

    if (title) {
      body.slug = slugify(title, { lower: true });
    }

    const blog = await Blog.create({ ...body });

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request, res: Response) => {
  try {
    await connectDatabase();

    const allBlogs = await Blog.find();

    return NextResponse.json(allBlogs);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
