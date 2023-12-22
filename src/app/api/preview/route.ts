import { NextApiResponse, NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;

  try {
    if (
      req.query.key !== process.env.PREVIEW_MODE_SECRET_TOKEN ||
      !req.query.redirect
    ) {
      return NextResponse.json({ message: "Invalid token.", status: 401 });
    }

    res.setPreviewData(data, { maxAge: 60 * 30 });

    const redirectUrl = req.query.redirect as string;

    res.redirect(redirectUrl);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
};
