import { NextRequest, NextResponse } from "next/server";
import { connect } from "@./dbConfig/dbConfig";
import User from "@./models/userModel";
import bcrypt from "bcrypt";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { userName, email, password } = reqBody;

    console.log(reqBody);

    // check if user already exist
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return NextResponse.json(
        { error: "User Already Exsist" },
        { status: 500 }
      );
    }

    // hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      UserName: userName,
      Email: email,
      Password: hashPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User Created Success",
      status: 200,
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
