import Blog from "@/models/blog";
import { connectDatabase } from "@/database/database";
import { NextResponse, type NextRequest } from "next/server";
import slugify from "slugify";
import cloudinary from "@/utilities/general/cloudinary";
import { getSessionUser } from "@/utilities/auth/getSessionUser";

export const POST = async (req: NextRequest) => {
  const { sessionUser } = await getSessionUser();

  if (!sessionUser || sessionUser.role !== "admin") {
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

  if (image) {
    const uploadedImageResponse = await cloudinary.v2.uploader.upload(image, {
      folder: "blog_images",
      resource_type: "image",
      quality_analysis: true,
      format: "png",
    });

    body.image = uploadedImageResponse.secure_url;
  }

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

export const GET = async (req: NextRequest) => {
  try {
    await connectDatabase();

    const allBlogs = await Blog.find().sort("-createdAt");

    return NextResponse.json(allBlogs);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong, please try again.",
      },
      { status: 500 }
    );
  }
};
