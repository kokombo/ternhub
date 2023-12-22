import Job from "@/models/job";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req: Request, res: Response) => {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Oops! You are not authorized to perform action." },
      { status: 401 }
    );
  }

  const body = await req.json();

  const { title, site, email, description } = body;

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

export const GET = async (req: NextApiRequest) => {
  try {
    await connectDatabase();

    //Filtering job results

    let queryObject = { ...req.query };

    const excludeFields = ["sort", "page", "limit", "fields"];

    excludeFields.forEach((item) => delete queryObject[item]);

    let numericQuery = JSON.stringify(queryObject);

    numericQuery = numericQuery.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`
    );

    let result = Job.find(JSON.parse(numericQuery));

    //Sorting job results

    if (req.query.sort) {
      const sortBy = req.query.sort as string;

      result = result.sort({ [sortBy]: "desc" });
    } else {
      result = result.sort("-createdAt");
    }

    //pagination

    const page = Number(req.query.page);

    const limit = Number(req.query.limit);

    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    if (req.query.page) {
      const jobCount = await Job.countDocuments();

      if (skip >= jobCount)
        return NextResponse.json(
          { message: "Oops! This page does not exist." },
          { status: 401 }
        );
    }

    const jobs = await result;

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
