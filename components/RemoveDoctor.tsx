"use client"
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
// import {useRouter} from 'next/navigation'
const RemoveDoctor = ({ id }: { id: string }) => {
    // const router = useRouter();

    const removeDoctor = async () => {
        const confirmed = confirm("Are you sure?");
        if (confirmed) {
            const res = await fetch(`https://physician-app-567a-jfnk34m6r-renukagours-projects.vercel.app/api/doctor?id=${id}`,
                {
                    method: "DELETE"
                }
            )
            if (res.ok) {
                window.location.reload();
                // router.replace(router.asPath);

            }
        }
    }
    return (

        <button onClick={removeDoctor} className="text-red-600 hover:text-red-800">
            <HiOutlineTrash size={20} />
        </button>

    )
}

export default RemoveDoctor