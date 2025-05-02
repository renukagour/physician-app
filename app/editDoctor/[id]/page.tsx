import EditDoctorForm from '@/components/EditDoctorForm';
import React from 'react';

const getDoctorById = async (id: string) => {
  try {
    const res = await fetch(`https://physician-app-567a-jfnk34m6r-renukagours-projects.vercel.app/api/doctor/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch doctor data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const EditDoctorPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getDoctorById(id);

  if (!data || !data.doctor) {
    return <div className="text-center text-red-500">Doctor not found.</div>;
  }

  const { doctor } = data;

  return (
    <div className="max-w-2xl mx-auto py-6">
      <EditDoctorForm doctor={doctor} />
    </div>
  );
};

export default EditDoctorPage;
