import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { nextUrl } = req;
  const isLoggedIn = !!token;
};
