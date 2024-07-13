import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { publicRoutes, publicAuthRoutes } from "./route";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { nextUrl } = req;
  const isLoggedIn = !!token;

  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isPublicAuthRoute = publicAuthRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAdmin = token?.role === "admin";

  if (isApiRoute) {
    return null;
  }

  if (isPublicAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/jobs", nextUrl));
    }
    return null;
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isLoggedIn && nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/jobs", nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/signin", nextUrl));
  }

  return null;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
