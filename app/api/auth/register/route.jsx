import ConnectDB from "@/app/dbconfig/dbconnect";
import Users from "@/app/models/UserSchema";
import { genSalt } from "bcryptjs";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sendEmail from "@/app/utils/sendemail/sendemail";
import { v4 as uuidv4 } from "uuid";

ConnectDB();
export async function POST(request) {
  try {
    const RequestBody = await request.json();
    const { username, email, password } = RequestBody;

    const nothing = await Users.findOne({ email });
    if (nothing) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 500 }
      );
    }

    if (!username) {
      return NextResponse.json(
        { message: "username can't be empty" },
        { status: 500 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: "password can't be empty" },
        { status: 500 }
      );
    }
    const salt = await genSalt(8);
    const hashedPassWord = await bcrypt.hash(password, salt);

    const token = uuidv4();

    // const generatedOTP = OtpGenerator.generate(6, {
    //   specialChars: false,
    //   upperCaseAlphabets: false,
    //   lowerCaseAlphabets: false,
    // });

    // const HashedOTP = await bcrypt.hash(generatedOTP, salt);

    await sendEmail({
      username,
      email,
      token,
    });

    const CompleteAuthenticationData = await new Users({
      username,
      email,
      password: hashedPassWord,
      verifyToken: token,
      VerificationExpiry: Date.now() + 300000,
    });

    await CompleteAuthenticationData.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
