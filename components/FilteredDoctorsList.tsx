'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';
import RemoveDoctor from './RemoveDoctor';
import DoctorFilters, { DoctorFilters as FiltersType } from './DoctorFilters';
import Pagination from './Pagination';

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  experience: number;
  qualification: string;
  city: string;
  clinic: string;
  imageUrl: string;
  onlineFee: number;
  visitFee: number;
  onlineTime: string;
  visitTime: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function FilteredDoctorsList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    modeOfConsult: [],
    experience: [],
    fees: [],
    city: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0
  });

  // Fetch filtered doctors using the API
  useEffect(() => {
    const fetchFilteredDoctors = async () => {
      setIsLoading(true);
      try {
        // Build URL with query parameters
        const queryParams = new URLSearchParams();
        
        // Add page and limit
        queryParams.append('page', currentPage.toString());
        queryParams.append('limit', '5');
        
        // Add mode of consult filter
        if (filters.modeOfConsult.length === 1) {
          queryParams.append('modeOfConsult', filters.modeOfConsult[0]);
        }
        
        // Add experience filter (only using the first selected option for simplicity)
        if (filters.experience.length > 0) {
          queryParams.append('experience', filters.experience[0]);
        }
        
        // Add fees filter (only using the first selected option for simplicity)
        if (filters.fees.length > 0) {
          queryParams.append('fees', filters.fees[0]);
        }
        
        // Add city filter (only using the first selected option for simplicity)
        if (filters.city.length > 0) {
          queryParams.append('city', filters.city[0]);
        }
        
        // Make the API request
        const res = await fetch(`https://physician-app-567a.vercel.app/api/doctor/filter?${queryParams.toString()}`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch filtered doctors');
        }

        const data = await res.json();
        setDoctors(data.doctors || []);
        setPaginationInfo(data.pagination || {
          total: 0,
          page: 1,
          limit: 5,
          totalPages: 0
        });
      } catch (error) {
        console.error('Error loading filtered doctors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredDoctors();
  }, [filters, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading doctors...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Filters sidebar */}
      <div className="md:w-1/4">
        <DoctorFilters 
          filters={filters} 
          setFilters={setFilters} 
        />
      </div>

      {/* Doctors list */}
      <div className="md:w-3/4">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">API Filtered Results</h2>
          <p className="text-sm text-blue-600">
            This page uses the server-side <code className="bg-blue-100 px-1 rounded">/api/doctor/filter</code> endpoint for filtering and pagination.
          </p>
        </div>

        {doctors.length === 0 ? (
          <div className="text-center py-10 border rounded-xl shadow p-4 bg-white">
            No doctors found matching your filters.
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-500 mb-2">
              Showing {(paginationInfo.page - 1) * paginationInfo.limit + 1}-
              {Math.min(paginationInfo.page * paginationInfo.limit, paginationInfo.total)} of {paginationInfo.total} doctors
            </div>
            
            {doctors.map((d) => (
              <div key={d._id} className="flex justify-between border rounded-xl shadow p-4 my-4 bg-white w-full">
                {/* Left */}
                <div className="flex items-start gap-4">
                  <img
                    src={d.imageUrl}
                    alt={d.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{d.name}</h2>
                    <p className="text-sm text-gray-600">{d.specialty}</p>
                    <p className="text-sm text-purple-700 font-semibold">
                      {d.experience} YEARS • {d.qualification}
                    </p>
                    <p className="text-sm text-gray-600">{d.city}</p>
                    <p className="text-sm text-gray-500">{d.clinic}, {d.city}</p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col justify-between items-center gap-3">
                  <div className="flex justify-between items-center gap-24">
                    <p className="font-semibold">₹{d.onlineFee}</p>
                    <p className="font-semibold">₹{d.visitFee}</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="border border-teal-600 text-teal-700 text-sm px-4 py-1 rounded-md">
                      Consult Online
                      <div className="text-xs text-gray-500">Available at {d.onlineTime}</div>
                    </button>
                    <button className="bg-teal-700 text-white text-sm px-4 py-1 rounded-md">
                      Visit Doctor
                      <div className="text-xs text-gray-100">Available in {d.visitTime}</div>
                    </button>
                  </div>

                  {/* Edit & Delete Buttons */}
                  <div className="flex gap-2">
                    <Link href={`/editDoctor/${d._id}`}>
                      <HiPencilAlt size={20} className="text-blue-600 hover:text-blue-800 cursor-pointer" />
                    </Link>
                    <RemoveDoctor id={d._id}/>
                  </div>
                </div>
              </div>
            ))}
            
            {paginationInfo.totalPages > 1 && (
              <Pagination 
                currentPage={paginationInfo.page}
                totalPages={paginationInfo.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
} 