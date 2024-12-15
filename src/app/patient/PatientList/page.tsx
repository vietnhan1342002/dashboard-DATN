/* eslint-disable @next/next/no-img-element */
"use client";

import axiosInstance from '@/app/utils/axios';
import { getFormattedDate } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const patientData = [
    { id: 1, name: 'Nguyen Van A', phone: '0912345678', dateOfBirth: '01/01/1990', address: '123 ABC Street', email: 'abc@gmail.com' },
];

const PatientList = () => {
    const initialPatient = [{
        userId: {
            _id: "",
            fullName: "",
            phoneNumber: ""
        },
        address: "",
        dateOfBirth: "",
        gender: ""
    }]

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); // Added search term state
    const pageSize = 5;

    const [patients, setPatients] = useState<any[]>(initialPatient)

    const fetchPatients = async (currentPage: number) => {

        try {
            const response = await axiosInstance.get(`/patients?current=${currentPage}&pageSize=${pageSize}`);
            const { result, totalPages } = response.data;
            console.log(result);
            if (result.dateOfBirth) {
                const formattedDate = result.dateOfBirth.split('T')[0];
                result.dateOfBirth = formattedDate;
                console.log('patient.dateOfBirth', result.dateOfBirth);
            }

            setTotalPages(totalPages);
            setPatients(result)
        } catch (err) {

        }
    };

    useEffect(() => {
        fetchPatients(currentPage)
    }, [currentPage])


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

    const router = useRouter();

    const handleEdit = (patientId: number) => {
        router.push(`/patient/EditPatient?id=${patientId}`);
    };

    const handleDelete = () => {
        console.log('Deleting patient with ID: ');
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value); // Update search term

    };

    return (
        <div className='flex'>
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Patient List</h2>

                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or address"
                        className="border rounded p-2 flex-grow mr-2"
                        value={searchTerm}  // Bind searchTerm to the input field
                        onChange={handleSearchChange}  // Handle input change
                    />
                    <button className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
                </div>

                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Phone</th>
                            <th className="px-6 py-3 text-left">Date of Birth</th>
                            <th className="px-6 py-3 text-left">Address</th>
                            <th className="px-6 py-3 text-left">Gender</th>
                            <th className="px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={patient._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4">{patient._id}</td>
                                <td className="px-6 py-4">{patient.userId.fullName}</td>
                                <td className="px-6 py-4">{patient.userId.phoneNumber}</td>
                                <td className="px-6 py-4"> {new Date(patient.dateOfBirth).toLocaleDateString('en-GB') || '01/01/1990'}</td>
                                <td className="px-6 py-4">{patient.address}</td>
                                <td className="px-6 py-4">{patient.gender}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(patient._id)}
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
                    <Link href="/patient/AddPatient">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Patient</button>
                    </Link>
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    >
                        Previous
                    </button>
                    <span className="self-center">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientList;
