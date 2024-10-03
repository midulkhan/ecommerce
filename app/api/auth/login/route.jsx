import Users from "@/app/models/UserSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    if (!email && password) {
      return NextResponse.json(
        { message: "Field mustn't be empty" },
        { status: 500 }
      );
    }

    const getUser = await Users.findOne({ email });
    if (!getUser) {
      return NextResponse.json({ message: "No User found" }, { status: 404 });
    }

    const dcryptPassword = await bcrypt.compare(password, getUser.password);
    if (!dcryptPassword) {
      return NextResponse.json(
        { message: "Password doesn't match " },
        { status: 500 }
      );
    }

    const jwtData = {
      id: getUser._id,
    };
    const jwtToken = jwt.sign(jwtData, process.env.WEB_SECRET, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      { message: "user logged in successfully" },
      { status: 200 }
    );
    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      secure: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
