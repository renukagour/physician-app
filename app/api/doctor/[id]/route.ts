import connectMongoDB from "@/libs/db";
import Doctor from "@/models/doctor";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const {
    name,
    specialty,
    experience,
    qualification,
    city,
    clinic,
    imageUrl,
    onlineFee,
    visitFee,
    onlineTime,
    visitTime,
  } = await req.json();

  await connectMongoDB();

  const updatedDoctor = await Doctor.findByIdAndUpdate(
    id,
    {
      name,
      specialty,
      experience,
      qualification,
      city,
      clinic,
      imageUrl,
      onlineFee,
      visitFee,
      onlineTime,
      visitTime,
    },
    { new: true }
  );

  if (!updatedDoctor) {
    return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Doctor updated", doctor: updatedDoctor },
    { status: 200 }
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  await connectMongoDB();

  const doctor = await Doctor.findOne({ _id: id });

  if (!doctor) {
    return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
  }

  return NextResponse.json({ doctor: doctor }, { status: 200 });
}
