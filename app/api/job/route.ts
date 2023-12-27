import Job from "@/models/job";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities";
import cloudinary from "@/utilities/general/cloudinary";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
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

export const GET = async (req: Request) => {
  try {
    await connectDatabase();

    const { searchParams } = new URL(req.url);

    let result;

    //Filtering job results

    const excludeFields = ["page", "sort", "limit", "fields", "search"];

    excludeFields.forEach((item) => searchParams.delete(item));

    let numericQuery = JSON.stringify(Object.fromEntries(searchParams));

    numericQuery = numericQuery.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`
    );

    result = Job.find(JSON.parse(numericQuery));

    //Search

    const searchQuery = searchParams.get("search");

    if (searchQuery) {
      let searchQueryToDatabase = { $text: { $search: searchQuery } };

      result = result.find(searchQueryToDatabase);
    }

    //Sorting job results

    const sort = searchParams.get("sort");

    if (sort) {
      const sortBy = sort;

      result = result.sort({ [sortBy]: "desc" });
    } else {
      result = result.sort("-createdAt");
    }

    //pagination

    const queryPage = searchParams.get("page");

    const limitQuery = searchParams.get("limit");

    const page = Number(queryPage);

    const limit = Number(limitQuery);

    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    if (page) {
      const jobCount = await Job.countDocuments();

      if (skip >= jobCount) {
        return NextResponse.json(
          { message: "Oops! This page does not exist." },
          { status: 401 }
        );
      }
    }

    let jobs = await result;

    return NextResponse.json({ jobs, numOfJobs: jobs.length });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
};
