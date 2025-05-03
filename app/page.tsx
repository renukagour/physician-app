import DoctorCard from "@/components/DoctorsList";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-3">Find Doctors</h1>
        <p className="mb-4 text-gray-600">
          This page uses client-side filtering. Check out our new{" "}
          <Link href="https://physician-app-567a.vercel.app/filtered" className="text-teal-600 hover:underline font-semibold">
            API-based filtering page
          </Link>{" "}
          that implements server-side filtering with pagination.
        </p>
      </div>
      
      {/* Original implementation with client-side filtering */}
      <DoctorCard />
      
      {/* New implementation can be enabled by uncommenting below and commenting out the line above
      <FilteredDoctorsList />
      */}
    </div>
  );
}
