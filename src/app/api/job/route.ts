import Job from "@/models/job";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
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

  let uploadedImageResponse;

  if (logo) {
    uploadedImageResponse = await cloudinary.v2.uploader.upload(logo, {
      folder: "company_logos",
      resource_type: "image",
    });
  }

  try {
    await connectDatabase();

    if (title) {
      body.slug = slugify(title, { lower: true });
    }

    const job = await Job.create({
      ...body,
      logo: uploadedImageResponse?.secure_url,
    });

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

    //Filtering job results

    const { searchParams } = new URL(req.url);

    const excludeFields = ["page", "sort", "limit", "fields"];

    excludeFields.forEach((item) => searchParams.delete(item));

    let numericQuery = JSON.stringify(Object.fromEntries(searchParams));

    numericQuery = numericQuery.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`
    );

    let result = Job.find(JSON.parse(numericQuery));

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

    //search

    const searchQuery = searchParams.get("search");

    if (searchQuery) {
      jobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (jobs.length === 0)
        return NextResponse.json({
          message: "There are no jobs that match your search term.",
        });
    }

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
