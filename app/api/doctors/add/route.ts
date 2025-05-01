import connectMongoDB from "@/libs/db";
import Doctor from "@/models/doctor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    await Doctor.create({
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
    });

    return NextResponse.json({message:"Doctor Created"}, {status:201});
}
