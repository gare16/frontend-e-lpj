import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (typeof window !== "undefined") {
    const isLogin = window.localStorage.getItem("isLogin");
    if (isLogin !== "true") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
