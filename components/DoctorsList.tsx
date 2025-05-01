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
import Image from 'next/image';
import Link from 'next/link';
import {  HiPencilAlt } from 'react-icons/hi';
import RemoveDoctor from './RemoveDoctor';

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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/doctor', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch doctors');
        }

        const data = await res.json();
        setDoctors(data.doctors || []);
      } catch (error) {
        console.error('Error loading doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      {doctors.map((d) => (
        <div key={d._id} className="flex justify-between border rounded-xl shadow p-4 my-4 bg-white w-full max-w-3xl">
          {/* Left */}
          <div className="flex items-start gap-4">
            <Image
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
    </>
  );
}
