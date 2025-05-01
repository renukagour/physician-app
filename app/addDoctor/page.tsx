/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { useState } from 'react';

// export default function AddDoctorPage() {
//   const [form, setForm] = useState({
//     name: '',
//     specialty: '',
//     experience: '',
//     qualification: '',
//     city: '',
//     clinic: '',
//     imageUrl: '',
//     onlineFee: '',
//     visitFee: '',
//     onlineTime: '',
//     visitTime: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="max-w-2xl mx-auto  bg-white p-6 rounded-xl shadow">
//       <h1 className="text-2xl font-bold mb-6 text-center">Add Doctor</h1>
//       <form className="grid grid-cols-1 gap-4">

//         <input type="text" name="name" placeholder="Doctor's Name" value={form.name} onChange={handleChange} className="border p-2 rounded" />

//         <input type="text" name="specialty" placeholder="Specialty" value={form.specialty} onChange={handleChange} className="border p-2 rounded" />

//         <input type="number" name="experience" placeholder="Years of Experience" value={form.experience} onChange={handleChange} className="border p-2 rounded" />

//         <input type="text" name="qualification" placeholder="Qualification" value={form.qualification} onChange={handleChange} className="border p-2 rounded" />

//         <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 rounded" />

//         <input type="text" name="clinic" placeholder="Clinic/Hospital Name" value={form.clinic} onChange={handleChange} className="border p-2 rounded" />

//         <input type="text" name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="border p-2 rounded" />

//         <input type="number" name="onlineFee" placeholder="Online Consultation Fee (₹)" value={form.onlineFee} onChange={handleChange} className="border p-2 rounded" />

//         <input type="number" name="visitFee" placeholder="Clinic Visit Fee (₹)" value={form.visitFee} onChange={handleChange} className="border p-2 rounded" />

//         <input type="text" name="onlineTime" placeholder="Online Availability Time" value={form.onlineTime} onChange={handleChange} className="border p-2 rounded" />

//         <input type="text" name="visitTime" placeholder="Visit Availability Time" value={form.visitTime} onChange={handleChange} className="border p-2 rounded" />

//         <button type="button" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
//          Add Doctor
//         </button>
//       </form>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ import useRouter

export default function AddDoctorPage() {
  const router = useRouter(); // ✅ initialize router

  const [form, setForm] = useState({
    name: '',
    specialty: '',
    experience: '',
    qualification: '',
    city: '',
    clinic: '',
    imageUrl: '',
    onlineFee: '',
    visitFee: '',
    onlineTime: '',
    visitTime: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    // Validate all fields are filled
  for (const [key, value] of Object.entries(form)) {
    if (value.trim() === '') {
      alert(`Please fill out the ${key} field`);
      return;
    }
  }
  
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:3000/api/doctors/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          experience: parseInt(form.experience),
          onlineFee: parseInt(form.onlineFee),
          visitFee: parseInt(form.visitFee),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to add doctor');

      // ✅ Redirect to home after success
      router.push('/');
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow mt-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Doctor</h1>
      <form className="grid grid-cols-1 gap-4">
        <input type="text" name="name" placeholder="Doctor's Name" value={form.name} onChange={handleChange} className="border p-2 rounded" />

        <input type="text" name="specialty" placeholder="Specialty" value={form.specialty} onChange={handleChange} className="border p-2 rounded" />

        <input type="number" name="experience" placeholder="Years of Experience" value={form.experience} onChange={handleChange} className="border p-2 rounded" />

        <input type="text" name="qualification" placeholder="Qualification" value={form.qualification} onChange={handleChange} className="border p-2 rounded" />

        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 rounded" />

        <input type="text" name="clinic" placeholder="Clinic/Hospital Name" value={form.clinic} onChange={handleChange} className="border p-2 rounded" />

        <input type="text" name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="border p-2 rounded" />

        <input type="number" name="onlineFee" placeholder="Online Consultation Fee (₹)" value={form.onlineFee} onChange={handleChange} className="border p-2 rounded" />

        <input type="number" name="visitFee" placeholder="Clinic Visit Fee (₹)" value={form.visitFee} onChange={handleChange} className="border p-2 rounded" />

        <input type="text" name="onlineTime" placeholder="Online Availability Time" value={form.onlineTime} onChange={handleChange} className="border p-2 rounded" />

        <input type="text" name="visitTime" placeholder="Visit Availability Time" value={form.visitTime} onChange={handleChange} className="border p-2 rounded" />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Adding...' : 'Add Doctor'}
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center text-sm text-red-600 font-semibold">
          {message}
        </div>
      )}
    </div>
  );
}
