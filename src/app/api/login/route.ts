import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json().catch(() => ({ password: "" }));
    const expected = process.env.SITE_PASSWORD;

    if (typeof password !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    if (password !== expected) {
      return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: "site_auth",
      value: "1",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}


