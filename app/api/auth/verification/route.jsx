import Users from "@/app/models/UserSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const requestBody = await request.json();
    const { token } = requestBody;

    const getUser = await Users.findOne({
      verifyToken: token,
      VerificationExpiry: { $gt: Date.now() },
    });

    if (!getUser) {
      return NextResponse.json(
        { mesage: "Verification failed" },
        { status: 500 }
      );
    }
    if (!getUser.VerificationExpiry) {
      return NextResponse.json(
        { mesage: "Verification time expired" },
        { status: 500 }
      );
    }

    (getUser.verifyToken = undefined), (getUser.VerificationExpiry = undefined);

    await getUser.save();

    return NextResponse.json(
      { mesage: "User has been verified" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 500 }
    );
  }
}
