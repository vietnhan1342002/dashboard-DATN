/* eslint-disable @next/next/no-img-element */
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const patientData = [
    { id: 1, name: 'Nguyen Van A', phone: '0912345678', dateOfBirth: '01/01/1990', address: '123 ABC Street', email: 'abc@gmail.com' },
    { id: 2, name: 'Tran Thi B', phone: '0987654321', dateOfBirth: '15/05/1985', address: '456 DEF Avenue', email: 'ctien@gmail.com' },
    { id: 3, name: 'Nguyen Van A', phone: '0912345678', dateOfBirth: '01/01/1990', address: '123 ABC Street', email: 'abc@gmail.com' },
    { id: 4, name: 'Tran Thi B', phone: '0987654321', dateOfBirth: '15/05/1985', address: '456 DEF Avenue', email: 'ctien@gmail.com' },
    { id: 5, name: 'Nguyen Van A', phone: '0912345678', dateOfBirth: '01/01/1990', address: '123 ABC Street', email: 'abc@gmail.com' },
    { id: 6, name: 'Tran Thi B', phone: '0987654321', dateOfBirth: '15/05/1985', address: '456 DEF Avenue', email: 'ctien@gmail.com' },
    { id: 7, name: 'Nguyen Van A', phone: '0912345678', dateOfBirth: '01/01/1990', address: '123 ABC Street', email: 'abc@gmail.com' },
    { id: 8, name: 'Tran Thi B', phone: '0987654321', dateOfBirth: '15/05/1985', address: '456 DEF Avenue', email: 'ctien@gmail.com' },
    { id: 9, name: 'Nguyen Van A', phone: '0912345678', dateOfBirth: '01/01/1990', address: '123 ABC Street', email: 'abc@gmail.com' },
    { id: 10, name: 'Tran Thi B', phone: '0987654321', dateOfBirth: '15/05/1985', address: '456 DEF Avenue', email: 'ctien@gmail.com' },
    { id: 11, name: 'Nguyen Van A', phone: '0912345678', dateOfBirth: '01/01/1990', address: '123 ABC Street', email: 'abc@gmail.com' },
    { id: 12, name: 'Tran Thi B', phone: '0987654321', dateOfBirth: '15/05/1985', address: '456 DEF Avenue', email: 'ctien@gmail.com' },
    { id: 13, name: 'Nguyen Van A', phone: '0912345678', dateOfBirth: '01/01/1990', address: '123 ABC Street', email: 'abc@gmail.com' },
    { id: 14, name: 'Tran Thi B', phone: '0987654321', dateOfBirth: '15/05/1985', address: '456 DEF Avenue', email: 'ctien@gmail.com' },
    { id: 15, name: 'Nguyen Van A', phone: '0912345678', dateOfBirth: '01/01/1990', address: '123 ABC Street', email: 'abc@gmail.com' },
    { id: 16, name: 'Tran Thi B', phone: '0987654321', dateOfBirth: '15/05/1985', address: '456 DEF Avenue', email: 'ctien@gmail.com' },
    { id: 17, name: 'Nguyen Van A', phone: '0912345678', dateOfBirth: '01/01/1990', address: '123 ABC Street', email: 'abc@gmail.com' },
    { id: 18, name: 'Tran Thi B', phone: '0987654321', dateOfBirth: '15/05/1985', address: '456 DEF Avenue', email: 'ctien@gmail.com' },
];

const PatientList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // Added search term state
    const recordsPerPage = 10;

    const filteredPatients = patientData.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredPatients.length / recordsPerPage);

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
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Phone</th>
                            <th className="px-6 py-3 text-left">Date of Birth</th>
                            <th className="px-6 py-3 text-left">Address</th>
                            <th className="px-6 py-3 text-left">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPatients.map((patient, index) => (
                            <tr key={patient.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4">{patient.id}</td>
                                <td className="px-6 py-4">{patient.name}</td>
                                <td className="px-6 py-4">{patient.email}</td>
                                <td className="px-6 py-4">{patient.phone}</td>
                                <td className="px-6 py-4">{patient.dateOfBirth}</td>
                                <td className="px-6 py-4">{patient.address}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(patient.id)}
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
