import { NextResponse } from "next/server";

export function POST() {
  try {
    const response = NextResponse.json(
      { message: "Successfully logged out" },
      { status: 200 }
    );
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
