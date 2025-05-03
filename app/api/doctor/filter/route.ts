/* eslint-disable @typescript-eslint/no-explicit-any */
import connectMongoDB from "@/libs/db";
import Doctor from "@/models/doctor";
import { NextResponse, NextRequest } from "next/server";

// Define more specific query type
interface FilterQuery {
  onlineFee?: { $gt: number } | { $gte: number, $lte: number };
  visitFee?: { $gt: number };
  experience?: { $gte: number, $lte: number } | { $gte: number };
  city?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Log request for debugging
    console.log('Filter API called, URL:', request.url);
    
    await connectMongoDB();

    const searchParams = request.nextUrl.searchParams;
    
    // Get filter parameters
    const modeOfConsult = searchParams.get("modeOfConsult"); // "Online Consult" or "Hospital Visit"
    const experienceRange = searchParams.get("experience"); // "0-5", "6-10", "11-16", "17+"
    const feesRange = searchParams.get("fees"); // "100-500", "500-1000", "1000+"
    const city = searchParams.get("city"); // City name
    
    // Log search parameters for debugging
    console.log('Filter params:', { 
      modeOfConsult, 
      experienceRange, 
      feesRange, 
      city,
      page: searchParams.get("page"),
      limit: searchParams.get("limit")
    });
    
    // Get pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const skip = (page - 1) * limit;
    
    // Build query object
    const query: FilterQuery = {};
    
    // Add mode of consult filter
    if (modeOfConsult) {
      if (modeOfConsult === "Online Consult") {
        query.onlineFee = { $gt: 0 };
      } else if (modeOfConsult === "Hospital Visit") {
        query.visitFee = { $gt: 0 };
      }
    }
    
    // Add experience filter
    if (experienceRange) {
      if (experienceRange === "0-5") {
        query.experience = { $gte: 0, $lte: 5 };
      } else if (experienceRange === "6-10") {
        query.experience = { $gte: 6, $lte: 10 };
      } else if (experienceRange === "11-16") {
        query.experience = { $gte: 11, $lte: 16 };
      } else if (experienceRange === "17+") {
        query.experience = { $gte: 17 };
      }
    }
    
    // Add fees filter (using onlineFee as example)
    if (feesRange) {
      if (feesRange === "100-500") {
        query.onlineFee = { $gte: 100, $lte: 500 };
      } else if (feesRange === "500-1000") {
        query.onlineFee = { $gte: 500, $lte: 1000 };
      } else if (feesRange === "1000+") {
        query.onlineFee = { $gt: 1000 };
      }
    }
    
    // Add city filter
    if (city) {
      query.city = city;
    }

    // Log the constructed query for debugging
    console.log('MongoDB query:', JSON.stringify(query));
    
    // Count total documents for pagination info
    const totalDocs = await Doctor.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);
    
    // Execute query with pagination
    const doctors = await Doctor.find(query)
      .skip(skip)
      .limit(limit);
    
    // Log result counts for debugging
    console.log(`Found ${doctors.length} doctors out of ${totalDocs} total matches`);
    
    // Return data with pagination info
    return NextResponse.json({
      doctors,
      pagination: {
        total: totalDocs,
        page,
        limit,
        totalPages
      }
    });
  } catch (error) {
    console.error("Error in filter API:", error);
    return NextResponse.json(
      { error: "Failed to fetch filtered doctors" },
      { status: 500 }
    );
  }
} 