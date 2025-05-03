import FilteredDoctorsList from "@/components/FilteredDoctorsList";

export default function FilteredPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Find Doctors (API Filtered)</h1>
      <FilteredDoctorsList />
    </div>
  );
} 