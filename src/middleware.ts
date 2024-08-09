import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { publicAuthRoutes } from "./route";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { nextUrl } = req;
  const isLoggedIn = !!token;

  const isPublicAuthRoute = publicAuthRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isJobsRoute = nextUrl.pathname.startsWith("/jobs");
  const isProfileRoute = nextUrl.pathname === "/profile";
  const isAdmin = token?.role === "admin";

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isLoggedIn && nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/jobs", nextUrl));
  }

  if ((isJobsRoute || isProfileRoute) && !isLoggedIn) {
    return Response.redirect(new URL("/auth/signin", nextUrl));
  }

  if (isLoggedIn && isPublicAuthRoute) {
    return Response.redirect(new URL("/jobs", nextUrl));
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
