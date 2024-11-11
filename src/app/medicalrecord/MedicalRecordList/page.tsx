/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const medicalRecordsData = [
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


const MedicalRecordList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = medicalRecordsData.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(medicalRecordsData.length / recordsPerPage);

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

    const navigateToDetail = () => {
        router.push('/medicalrecord/MedicalRecordDetail');
    };

    return (
        <div className='flex'>
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Medical Records</h2>

                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border rounded p-2 flex-grow mr-2"
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
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((record, index) => (
                            <tr key={record.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td
                                    className="px-6 py-4 text-blue-500 cursor-pointer"
                                    onClick={() => navigateToDetail()}
                                >
                                    {record.id}
                                </td>
                                <td
                                    className="px-6 py-4 text-blue-500 cursor-pointer"
                                    onClick={() => navigateToDetail()}
                                >
                                    {record.name}
                                </td>
                                <td className="px-6 py-4">{record.email}</td>
                                <td className="px-6 py-4">{record.phone}</td>
                                <td className="px-6 py-4">{record.dateOfBirth}</td>
                                <td className="px-6 py-4">{record.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
        </div>
    );
};

export default MedicalRecordList;
