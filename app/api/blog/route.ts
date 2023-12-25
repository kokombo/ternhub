import Blog from "../../../models/blog";
import { connectDatabase } from "../../../database/database";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../utilities";
import cloudinary from "../../../utilities/general/cloudinary";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  const body = await req.json();

  const { image, title, content } = body;

  if (!content) {
    return NextResponse.json(
      { message: "Blog content not found." },
      { status: 401 }
    );
  }

  const uploadedImageResponse = await cloudinary.v2.uploader.upload(image, {
    folder: "blog_images",
    resource_type: "image",
    quality_analysis: true,
  });

  if (image) {
    body.image = uploadedImageResponse.secure_url;
  }

  try {
    await connectDatabase();

    if (title) {
      body.slug = slugify(title, { lower: true });
    }

    console.log("body", body);

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

    const allBlogs = await Blog.find().sort("-createdAt");

    return NextResponse.json(allBlogs);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
};
