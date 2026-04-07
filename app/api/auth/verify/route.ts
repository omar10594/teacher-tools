import { NextResponse } from "next/server";
import {
  AUTH_SESSION_COOKIE,
  createAuthToken,
  validateMagicToken,
} from "@/lib/auth";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token = requestUrl.searchParams.get("token");
  const magicSession = validateMagicToken(token);

  if (!magicSession) {
    return NextResponse.redirect(new URL("/login?error=invalid-link", request.url));
  }

  const sessionToken = createAuthToken("session", magicSession.email, 14 * 24 * 60 * 60);

  const response = NextResponse.redirect(new URL("/tools/weekly-plan", request.url));
  response.cookies.set({
    name: AUTH_SESSION_COOKIE,
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 14 * 24 * 60 * 60,
  });

  return response;
}
