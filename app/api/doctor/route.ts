import connectMongoDB from "@/libs/db";
import Doctor from "@/models/doctor";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  await connectMongoDB();

  const doctors = await Doctor.find();

  return NextResponse.json({ doctors });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  await connectMongoDB();

  await Doctor.findByIdAndDelete(id);
  return NextResponse.json({ message: "Doctor Deleted" }, { status: 200 });
}
