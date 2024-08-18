import { NextRequest, NextResponse } from "next/server";
import User from "@models/userModel";
import { connect } from "@dbConfig/dbConfig";
import { getServerSession } from "next-auth/next";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connect();

    // Parse the request body
    const { userName, email } = await req.json();

    // Get the session data to verify the authenticated user
    const session = await getServerSession();

    if (!session?.user) {
      // Return an unauthorized response if the user is not authenticated
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    // Extract the authenticated user's name
    const authenticatedUserName = session.user.name;

    // Attempt to update the user's data in the database
    const updateResult = await User.updateOne(
      { UserName: authenticatedUserName },
      { UserName: userName, Email: email }
    );

    if (updateResult.matchedCount === 0) {
      // Return a not found response if no user was found to update
      return NextResponse.json({ error: "User Not Found", status: 404 });
    }

    // Return a success response with the update result
    return NextResponse.json({
      message: "User updated successfully",
      status: 200,
      updateResult,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    // Handle specific known errors (e.g., validation errors) here if needed

    // Return a server error response for any unexpected issues
    return NextResponse.json({
      error: "An error occurred while updating user data",
      status: 500,
    });
  }
}
