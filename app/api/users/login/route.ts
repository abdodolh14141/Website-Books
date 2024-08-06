import { NextResponse, NextRequest } from "next/server";
import User from "@models/userModel";
import { connect } from "@./dbConfig/dbConfig";
import bcrypt from "bcrypt";

// Establish a connection to the database
connect();

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Check if the email exists in the database
    const userCheck = await User.findOne({ Email: email });

    if (!userCheck) {
      // If the user does not exist, return an error response
      console.error("User not found");
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, userCheck.Password);

    if (!isPasswordValid) {
      // If the password is incorrect, return an error response
      console.error("Invalid password");
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid email or password",
      });
    }

    // If both email and password are correct, return a success response
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Success Login",
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error occurred during login:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
