import Blog from "@/models/blog";
import { connectDatabase } from "@/database/database";
import { NextResponse, type NextRequest } from "next/server";
import slugify from "slugify";
import cloudinary from "@/utilities/general/cloudinary";
import { getSessionUser } from "@/utilities/auth/getSessionUser";

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    await connectDatabase();

    const blog = await Blog.findOne({ slug: params.slug });

    if (!blog) {
      return NextResponse.json(
        {
          message: "Blog not found.",
        },
        { status: 404 }
      );
    }

    await Blog.findOneAndUpdate(
      { slug: params.slug },
      { $inc: { numberOfViews: 1 } },
      { new: true }
    );

    return NextResponse.json(blog);
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

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const body = await req.json();

  const { sessionUser } = await getSessionUser();

  if (!sessionUser || sessionUser.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  const { image, content } = body;

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

    if (body.title) {
      body.slug = slugify(body.title, {
        lower: true,
        strict: true,
        trim: true,
      });
    }

    const blog = await Blog.findOneAndUpdate({ slug: params.slug }, body, {
      new: true,
    });

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const { sessionUser } = await getSessionUser();

  if (!sessionUser || sessionUser.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  try {
    await connectDatabase();

    await Blog.findOneAndDelete({ slug: params.slug });

    return NextResponse.json(
      { message: "Job deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to delete, please try again." },
      { status: 500 }
    );
  }
};
