import { NextRequest, NextResponse } from "next/server";
import ReportModel from "@models/reportModel";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { email: emailUser, message: msgUser } = reqBody;
  try {
    const checkEmail = await ReportModel.findOne({ Email: emailUser });
    if (!checkEmail) {
      const newReport = new ReportModel({
        Email: emailUser,
        Message: msgUser,
      });
      const saved = await newReport.save();
      console.log(saved);
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Success Send Your Message",
        saved,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 400,
      success: false,
      message: error,
    });
  }
}
