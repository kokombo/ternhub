import Job from "@/models/job";
import { connectDatabase } from "@/database/database";
import { NextResponse, NextRequest } from "next/server";
import slugify from "slugify";
import { NextApiRequest } from "next";
import { SortOrder } from "mongoose";

export const POST = async (req: Request, res: Response) => {
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

    const jobs = await result;

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { message: "An error has occurred, please try again." },
      { status: 500 }
    );
  }
};
