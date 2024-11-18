/* eslint-disable @next/next/no-img-element */
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const doctorsData = [
    {
        id: 39,
        fullname: 'AV Stranger',
        phone: '7865641399',
        email: 'abc123@yopmail.com',
        password: 'password123',
        gender: 'male',
        specialty: 'Xét nghiệm',
        license: 'AB123456',
        yearsOfExperience: 5,
    },
    {
        id: 41,
        fullname: 'SHAHID AFRIDI',
        phone: '7865641399',
        email: 'gmhs13@yopmail.com',
        password: 'password456',
        gender: 'male',
        specialty: 'Cơ xương khớp',
        license: 'CD789012',
        yearsOfExperience: 8,
    },
];

const DoctorList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const recordsPerPage = 5;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const filteredDoctors = doctorsData.filter(doctor =>
        doctor.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.phone.includes(searchQuery) ||
        doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentDoctor = filteredDoctors.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredDoctors.length / recordsPerPage);

    const router = useRouter();

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

    const handleEdit = (doctorId: number) => {
        router.push(`/doctor/EditDoctor?id=${doctorId}`);
    };

    const handleDelete = (doctorId: number) => {
        console.log("Delete doctor with ID:", doctorId);
    };

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Doctors</h2>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="border rounded p-2 flex-grow mr-2"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
            </div>

            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Full Name</th>
                        <th className="px-6 py-3 text-left">Phone</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Password</th>
                        <th className="px-6 py-3 text-left">Gender</th>
                        <th className="px-6 py-3 text-left">Specialty</th>
                        <th className="px-6 py-3 text-left">License</th>
                        <th className="px-6 py-3 text-left">Years of Experience</th>
                        <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDoctor.map((doctor, index) => (
                        <tr key={doctor.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4">{doctor.id}</td>
                            <td className="px-6 py-4">{doctor.fullname}</td>
                            <td className="px-6 py-4">{doctor.phone}</td>
                            <td className="px-6 py-4">{doctor.email}</td>
                            <td className="px-6 py-4">{doctor.password}</td>
                            <td className="px-6 py-4">{doctor.gender}</td>
                            <td className="px-6 py-4">{doctor.specialty}</td>
                            <td className="px-6 py-4">{doctor.license}</td>
                            <td className="px-6 py-4">{doctor.yearsOfExperience}</td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(doctor.id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(doctor.id)}
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
