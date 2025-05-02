/* eslint-disable @next/next/no-img-element */
// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi';

// const getDoctors=async()=>{
//   try {
//     const res= await fetch("http://localhost:3000/api/doctor",{
//       cache:"no-store"
//     });

//     if(!res.ok){
//       throw new Error("Failed to fetch doctors");
//     }
//     return res.json();
    
    
//   } catch (error) {
//     console.log("Error loading..",error);
    
//   }
// }

// export default  function DoctorCard  () {
//   const {doctors} = getDoctors();

//   return (
//     <>
//     {doctors.map((d)=>(
//        <div key={d._id} className="flex justify-between border rounded-xl shadow p-4 my-4 bg-white w-full max-w-3xl">
//       {/* Left */}
//       <div className="flex items-start gap-4">
//         <Image
//           src={d.imageUrl}
//           alt={d.name}
//           width={64}
//           height={64}
//           className="rounded-md object-cover"
//         />
//         <div>
//           <h2 className="text-lg font-semibold">name</h2>
//           <p className="text-sm text-gray-600">specialty</p>
//           <p className="text-sm text-purple-700 font-semibold">
//             &quot;{d.experience} YEARS • {d.qualification}&quot;;
//           </p>
//           <p className="text-sm text-gray-600">{d.city}</p>
//           <p className="text-sm text-gray-500">{d.clinic}, {dcity}</p>
//         </div>
//       </div>

//       {/* Right */}
//       <div className="flex flex-col justify-between items-end gap-3">
//         <div className="flex gap-4">
//           <p className="font-semibold">₹{d.onlineFee}</p>
//           <p className="font-semibold">₹{d.visitFee}</p>
//         </div>

//         <div className="flex gap-2">
//           <button className="border border-teal-600 text-teal-700 text-sm px-4 py-1 rounded-md">
//             Consult Online
//             <div className="text-xs text-gray-500">Available at {d.onlineTime}</div>
//           </button>
//           <button className="bg-teal-700 text-white text-sm px-4 py-1 rounded-md">
//             Visit Doctor
//             <div className="text-xs text-gray-100">Available in {d.visitTime}</div>
//           </button>
//         </div>

//         {/* Edit & Delete Buttons */}
//         <div className="flex gap-2">
//           <button
           
//             className="text-sm text-blue-600 underline hover:text-blue-800"
//           ><Link href={"/editDoctor/123"}>
//           <HiPencilAlt size={20}/> </Link>
//           </button>
//           <button
          
//             className="text-sm text-red-600 underline hover:text-red-800"
//           >
            
//            <HiOutlineTrash size={20}/>
//           </button>
//         </div>
//       </div>
//     </div>
//     ))}
//     </>
   
//   );
// };

// // export default DoctorCard;

'use client';

import { useEffect, useState } from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import {  HiPencilAlt } from 'react-icons/hi';
import RemoveDoctor from './RemoveDoctor';
import DoctorFilters, { DoctorFilters as FiltersType } from './DoctorFilters';

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

export default function DoctorCard() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  // new
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    modeOfConsult: [],
    experience: [],
    fees: [],
    city: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      // new
      setIsLoading(true);
      try {
        const res = await fetch('https://physician-app-567a.vercel.app/api/doctor', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch doctors');
        }

        const data = await res.json();
        // setDoctors(data.doctors);
        // new
        const doctorsList = data.doctors || [];
        setDoctors(doctorsList);
        setFilteredDoctors(doctorsList);
      } catch (error) {
        console.error('Error loading doctors:', error);
        // new
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // new  
  // Apply filters
  const applyFilters = () => {
    let result = [...doctors];

    // Filter by mode of consult (assuming this would be implemented further via online/visit)
    if (filters.modeOfConsult.length > 0) {
      // This is a placeholder - you'd need to determine which doctors support which modes
      // For now, we'll assume all doctors support both modes if they have fees for them
      if (filters.modeOfConsult.includes('Online Consult')) {
        result = result.filter(doctor => doctor.onlineFee > 0);
      }
      if (filters.modeOfConsult.includes('Hospital Visit')) {
        result = result.filter(doctor => doctor.visitFee > 0);
      }
    }

    // Filter by experience
    if (filters.experience.length > 0) {
      result = result.filter(doctor => {
        return filters.experience.some(range => {
          if (range === '0-5') return doctor.experience >= 0 && doctor.experience <= 5;
          if (range === '6-10') return doctor.experience >= 6 && doctor.experience <= 10;
          if (range === '11-16') return doctor.experience >= 11 && doctor.experience <= 16;
          if (range === '17+') return doctor.experience >= 17;
          return false;
        });
      });
    }

    // Filter by fees (using onlineFee as an example)
    if (filters.fees.length > 0) {
      result = result.filter(doctor => {
        return filters.fees.some(range => {
          if (range === '100-500') return doctor.onlineFee >= 100 && doctor.onlineFee <= 500;
          if (range === '500-1000') return doctor.onlineFee >= 500 && doctor.onlineFee <= 1000;
          if (range === '1000+') return doctor.onlineFee > 1000;
          return false;
        });
      });
    }

    // Filter by city
    if (filters.city.length > 0) {
      result = result.filter(doctor => 
        filters.city.includes(doctor.city)
      );
    }

    setFilteredDoctors(result);
  };

  // Apply filters whenever filters change
  useEffect(() => {
    applyFilters();
  }, [filters]); // Re-run whenever filters change

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
          applyFilters={applyFilters} 
        />
      </div>

      {/* Doctors list */}
      <div className="md:w-3/4">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-10 border rounded-xl shadow p-4 bg-white">
            No doctors found matching your filters.
          </div>
        ) : (
          filteredDoctors.map((d) => (
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
          ))
        )}
      </div>
    </div>
  );
}
