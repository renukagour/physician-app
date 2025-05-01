// import React from 'react'

// const EditDoctorForm = () => {
//   return (
//     <div>
//          <div className="max-w-2xl mx-auto  bg-white p-6 rounded-xl shadow">
//       <h1 className="text-2xl font-bold mb-6 text-center">Edit Doctor</h1>
//       <form className="grid grid-cols-1 gap-4">

//         <input type="text" name="name" placeholder="Doctor's Name" className="border p-2 rounded" />

//         <input type="text" name="specialty" placeholder="Specialty" className="border p-2 rounded" />

//         <input type="number" name="experience" placeholder="Years of Experience"  className="border p-2 rounded" />

//         <input type="text" name="qualification" placeholder="Qualification" className="border p-2 rounded" />

//         <input type="text" name="city" placeholder="City" className="border p-2 rounded" />

//         <input type="text" name="clinic" placeholder="Clinic/Hospital Name"  className="border p-2 rounded" />

//         <input type="number" name="onlineFee" placeholder="Online Consultation Fee (₹)"  className="border p-2 rounded" />

//         <input type="number" name="visitFee" placeholder="Clinic Visit Fee (₹)" className="border p-2 rounded" />

//         <input type="text" name="onlineTime" placeholder="Online Availability Time"  className="border p-2 rounded" />

//         <input type="text" name="visitTime" placeholder="Visit Availability Time"  className="border p-2 rounded" />

//         <button type="button" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
//           Add Updated Doctor
//         </button>
//       </form>
//     </div>
//     </div>
//   )
// }

// export default EditDoctorForm

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Doctor = {
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
};

const EditDoctorForm = ({ doctor }: { doctor: Doctor }) => {
  const [form, setForm] = useState({ ...doctor });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const values = Object.values(form);
    if (values.some((val) => val === "" || val === null)) {
      alert("Please fill in all fields.");
      return;
    }

    const res = await fetch(`http://localhost:3000/api/doctor/${doctor._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to update doctor.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Doctor</h1>
      <form className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Doctor's Name"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="specialty"
          value={form.specialty}
          placeholder="Specialty"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="experience"
          value={form.experience}
          placeholder="Years of Experience"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="qualification"
          value={form.qualification}
          placeholder="Qualification"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="city"
          value={form.city}
          placeholder="City"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="clinic"
          value={form.clinic}
          placeholder="Clinic/Hospital Name"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          placeholder="Image URL"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="onlineFee"
          value={form.onlineFee}
          placeholder="Online Consultation Fee (₹)"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="visitFee"
          value={form.visitFee}
          placeholder="Clinic Visit Fee (₹)"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="onlineTime"
          value={form.onlineTime}
          placeholder="Online Availability Time"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="visitTime"
          value={form.visitTime}
          placeholder="Visit Availability Time"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Update Doctor
        </button>
      </form>
    </div>
  );
};

export default EditDoctorForm;
