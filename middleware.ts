import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY } from "./utils";

export function middleware(request: NextRequest) {
  const isHasToken = request.cookies.has(ACCESS_TOKEN_KEY);
  if (!isHasToken) {
    return NextResponse.redirect(`${process.env.BASE_URL}/sign-in`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/users", "/roles"],
};
