import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const POST = (req: Request, res: NextApiResponse) => {
  try {
    res.clearPreviewData({});
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
