import Job from "@/models/job";
import { connectDatabase } from "@/database/database";
import { NextResponse, type NextRequest } from "next/server";
import slugify from "slugify";
import { validateMongoDBId } from "@/utilities/general/validateMongoDBId";
import cloudinary from "@/utilities/general/cloudinary";
import { getServerSession } from "@/utilities/auth/getServerSession";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  const body = await req.json();

  const { logo, site, email, description, title } = body;

  if (!description) {
    return NextResponse.json(
      {
        message:
          "Please provide some details about the job in the job description box.",
      },
      { status: 401 }
    );
  }

  if (!site && !email) {
    return NextResponse.json(
      {
        message: "Please add either the job's application link or apply email.",
      },
      { status: 401 }
    );
  }

  if (logo) {
    const uploadedImageResponse = await cloudinary.v2.uploader.upload(logo, {
      folder: "company_logos",
      resource_type: "image",
      quality_analysis: true,
    });

    body.logo = uploadedImageResponse.secure_url;
  }

  try {
    await connectDatabase();

    if (title) {
      body.slug = slugify(title, { lower: true });
    }

    const job = await Job.create({ ...body });

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const jobId = searchParams.get("listing_id") as string;

  validateMongoDBId(jobId);

  try {
    await connectDatabase();

    const job = await Job.findById(jobId);

    if (!job) {
      return NextResponse.json(
        {
          message: "Job not found.",
        },
        { status: 404 }
      );
    }

    await Job.findByIdAndUpdate(
      jobId,
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

export const PATCH = async (req: NextRequest) => {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);

  const jobId = searchParams.get("listing_id") as string;

  const body = await req.json();

  const { description, site, email, logo } = body;

  if (!description) {
    return NextResponse.json(
      {
        message:
          "Please provide some details about the job in the job description box.",
      },
      { status: 401 }
    );
  }

  if (!site && !email) {
    return NextResponse.json(
      {
        message: "Please add either the job's application link or apply email.",
      },
      { status: 401 }
    );
  }

  if (logo) {
    const uploadedImageResponse = await cloudinary.v2.uploader.upload(logo, {
      folder: "company_logos",
      resource_type: "image",
      quality_analysis: true,
    });

    body.logo = uploadedImageResponse.secure_url;
  }

  validateMongoDBId(jobId);

  try {
    await connectDatabase();

    if (body.title) {
      body.slug = slugify(body.title, { lower: true });
    }

    const job = await Job.findByIdAndUpdate(jobId, body, { new: true });

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);

  const jobId = searchParams.get("listing_id") as string;

  validateMongoDBId(jobId);

  try {
    await connectDatabase();

    await Job.findByIdAndDelete(jobId);

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
