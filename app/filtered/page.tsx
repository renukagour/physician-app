import { Suspense } from 'react';
import FilteredDoctorsList from "@/components/FilteredDoctorsList";

// Loading component to show while FilteredDoctorsList is loading
function LoadingDoctors() {
  return (
    <div className="py-10">
      <div className="w-full max-w-3xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-xl p-4 space-y-2">
              <div className="flex gap-4">
                <div className="rounded-md bg-gray-200 h-16 w-16"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FilteredPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Find Doctors (API Filtered)</h1>
      
      {/* Wrap FilteredDoctorsList in a Suspense boundary */}
      <Suspense fallback={<LoadingDoctors />}>
        <FilteredDoctorsList />
      </Suspense>
    </div>
  );
} 