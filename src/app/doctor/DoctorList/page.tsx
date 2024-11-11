/* eslint-disable @next/next/no-img-element */
"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const doctorsData = [
    {
        id: 39,
        firstName: 'AV',
        lastName: 'Stranger',
        email: 'gmhs13@yopmail.com',
        dob: '18/03/2020',
        gender: 'male',
        address: '3125 Elkview Drive, Miami, 33169',
        phone: '7865641399',
        department: 'Intensive Care Unit (ICU)',
        image: '/doc.png',
    },
    {
        id: 41,
        firstName: 'SHAHID AFRIDI',
        lastName: 'ZIHAD',
        email: 'gmhs13@yopmail.com',
        dob: '18/03/2020',
        gender: 'male',
        address: '3125 Elkview Drive, Miami, 33169',
        phone: '7865641399',
        department: 'Intensive Care Unit (ICU)',
        image: '/doc.png',
    },
    // Add more doctor objects if needed
];

const DoctorList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentDoctor = doctorsData.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(doctorsData.length / recordsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEdit = () => {
        console.log("Edit doctor with ID:");
    };

    const handleDelete = () => {
        console.log("Delete doctor with ID:");
    };

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Doctors</h2>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="border rounded p-2 flex-grow mr-2" />
                <button className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
            </div>

            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">Image</th>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">First Name</th>
                        <th className="px-6 py-3 text-left">Last Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">DOB</th>
                        <th className="px-6 py-3 text-left">Gender</th>
                        <th className="px-6 py-3 text-left">Address</th>
                        <th className="px-6 py-3 text-left">Phone</th>
                        <th className="px-6 py-3 text-left">Department</th>
                        <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDoctor.map((doctor, index) => (
                        <tr key={doctor.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4">
                                <img src={doctor.image} alt="doctor" className="w-10 h-10 rounded-full" />
                            </td>
                            <td className="px-6 py-4">{doctor.id}</td>
                            <td className="px-6 py-4">{doctor.firstName}</td>
                            <td className="px-6 py-4">{doctor.lastName}</td>
                            <td className="px-6 py-4">{doctor.email}</td>
                            <td className="px-6 py-4">{doctor.dob}</td>
                            <td className="px-6 py-4">{doctor.gender}</td>
                            <td className="px-6 py-4">{doctor.address}</td>
                            <td className="px-6 py-4">{doctor.phone}</td>
                            <td className="px-6 py-4">{doctor.department}</td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    onClick={() => handleEdit()}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete()}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-end">
                <Link href="/doctor/AddDoctor">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Doctor</button>
                </Link>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-gray-700">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DoctorList;
