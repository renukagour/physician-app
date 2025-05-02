import connectMongoDB from "@/libs/db";
import Doctor from "@/models/doctor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const doctors = await req.json();

    // Check if input is an array
    if (!Array.isArray(doctors)) {
      return NextResponse.json(
        { message: "Invalid input: expected an array of doctors" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    await Doctor.insertMany(doctors);

    return NextResponse.json({ message: "Doctors added successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add doctors", error },
      { status: 500 }
    );
  }
}
