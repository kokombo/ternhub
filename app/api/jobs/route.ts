import Job from "@/models/job";
import { connectDatabase } from "@/database/database";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectDatabase();

    const { searchParams } = new URL(req.url);

    const queryObject = Object.fromEntries(searchParams);

    //Filtering job results

    const excludeFields = ["page", "sort", "limit", "fields", "search"];

    excludeFields.forEach((item) => delete queryObject[item]);

    let numericQuery = JSON.stringify(queryObject);

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

    //Search

    const searchQuery = searchParams.get("search");

    if (searchQuery) {
      let queryToDatabase = { $text: { $search: searchQuery } };

      result = result.find(queryToDatabase);
    }

    const totalDocumentsCountBeforePagination = await Job.countDocuments();

    //pagination

    const pageQuery = searchParams.get("page");

    const limitQuery = searchParams.get("limit");

    const page = Number(pageQuery);

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

    return NextResponse.json({
      jobs,
      numOfJobsAfterQuery: jobs.length,
      totalJobsCountBeforePagination: totalDocumentsCountBeforePagination,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
};
