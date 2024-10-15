/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/register"];

const roleBasedRoutes = {
  USER: [
    /^\/dashboard$/,
    /^\/dashboard\/.*/,
    /^\/recipe$/,
    /^\/recipe\/.*/,
    /^\/premium$/,
    /^\/premium\/.*/,
  ],
  ADMIN: [
    /^\/admin/,
    /^\/admin\/.*/,
    /^\/admin-dashboard$/,
    /^\/recipe$/,
    /^\/recipe\/.*/,
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  const restrictedRoutes = [
    "/recipe",
    "/recipe/:path*",
    "/premium",
    "/premium/:path*",
  ];
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else if (restrictedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
    return NextResponse.next();
  }

  if (user.role === "USER") {
    if (roleBasedRoutes.USER.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }

    if (roleBasedRoutes.ADMIN.some((route) => pathname.match(route))) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (user.role === "ADMIN") {
    if (roleBasedRoutes.ADMIN.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }

    if (roleBasedRoutes.USER.some((route) => pathname.match(route))) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin",
    "/admin/:page*",
    "/admin-dashboard",
    "/dashboard/:page*",
    "/recipe",
    "/recipe/:path*",
    "/premium",
    "/premium/:path*",
  ],
};
