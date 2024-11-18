/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const medicalRecordsData = [
    { id: 1, patientName: 'Nguyen Van A', patientPhone: '0912345678', doctorName: 'Dr. A', symptom: 'Cough', disease: 'Flu', dateOfVisit: '01/01/2024', medicine: 'Paracetamol', quantity: 2, price: 100000 },
    { id: 2, patientName: 'Tran Thi B', patientPhone: '0987654321', doctorName: 'Dr. B', symptom: 'Headache', disease: 'Migraine', dateOfVisit: '02/01/2024', medicine: 'Aspirin', quantity: 1, price: 50000 },
    { id: 3, patientName: 'Nguyen Van C', patientPhone: '0912345678', doctorName: 'Dr. A', symptom: 'Fever', disease: 'Cold', dateOfVisit: '03/01/2024', medicine: 'Ibuprofen', quantity: 3, price: 150000 },
    { id: 4, patientName: 'Tran Thi D', patientPhone: '0987654321', doctorName: 'Dr. B', symptom: 'Stomach pain', disease: 'Ulcer', dateOfVisit: '04/01/2024', medicine: 'Omeprazole', quantity: 1, price: 80000 },
    { id: 5, patientName: 'Nguyen Van E', patientPhone: '0912345678', doctorName: 'Dr. C', symptom: 'Back pain', disease: 'Scoliosis', dateOfVisit: '05/01/2024', medicine: 'Pain reliever', quantity: 2, price: 120000 },
    { id: 6, patientName: 'Tran Thi F', patientPhone: '0987654321', doctorName: 'Dr. D', symptom: 'Sore throat', disease: 'Tonsillitis', dateOfVisit: '06/01/2024', medicine: 'Antibiotics', quantity: 1, price: 60000 },
];

const MedicalRecordList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const recordsPerPage = 10;

    const filteredRecords = medicalRecordsData.filter((record) => {
        return (
            record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.patientPhone.includes(searchQuery) ||
            record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.symptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.dateOfVisit.includes(searchQuery) ||
            record.medicine.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.quantity.toString().includes(searchQuery) ||
            record.price.toString().includes(searchQuery)
        );
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setSearchQuery('')}
                    >
                        Search
                    </button>
                </div>

                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">Patient Name</th>
                            <th className="px-6 py-3 text-left">Phone</th>
                            <th className="px-6 py-3 text-left">Doctor</th>
                            <th className="px-6 py-3 text-left">Symptom</th>
                            <th className="px-6 py-3 text-left">Disease</th>
                            <th className="px-6 py-3 text-left">Date of Visit</th>
                            <th className="px-6 py-3 text-left">Medicine</th>
                            <th className="px-6 py-3 text-left">Quantity</th>
                            <th className="px-6 py-3 text-left">Price</th>
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
                                    {record.patientName}
                                </td>
                                <td className="px-6 py-4">{record.patientPhone}</td>
                                <td className="px-6 py-4">{record.doctorName}</td>
                                <td className="px-6 py-4">{record.symptom}</td>
                                <td className="px-6 py-4">{record.disease}</td>
                                <td className="px-6 py-4">{record.dateOfVisit}</td>
                                <td className="px-6 py-4">{record.medicine}</td>
                                <td className="px-6 py-4">{record.quantity}</td>
                                <td className="px-6 py-4">{record.price}</td>
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
