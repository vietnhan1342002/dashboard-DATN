/* eslint-disable @next/next/no-img-element */
"use client";

import axiosInstance from '@/app/utils/axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const medicalRecordsData = [
    { id: 1, patientName: 'Nguyen Van A', patientPhone: '0912345678', doctorName: 'Dr. A', symptom: 'Cough', disease: 'Flu', dateOfVisit: '01/01/2024', medicine: 'Paracetamol', quantity: 2, price: 100000 },
];

const MedicalRecordList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const ininitialMedical = [{
        _id: "",
        patientId: {
            _id: "",
            userId: {
                _id: "",
                fullName: "",
                phoneNumber: ""
            }
        },
        doctorId: {
            _id: "",
            userId: {
                _id: "",
                fullName: ""
            }
        },
        appointmentId: {
            _id: "",
            appointmentDate: ""
        },
        diagnosis: "",
        note: ""
    }]
    const [medicalrecords, setMedicalRecords] = useState(ininitialMedical)
    const pageSize = 10;

    const fetchMedicalRecord = async () => {
        try {
            const res = await axiosInstance.get(`http://localhost:8080/api/v1/medical-records?current=${currentPage}&pageSize=${pageSize}`)
            const { result, totalPages } = res.data
            setMedicalRecords(result)
            setTotalPages(totalPages);
        } catch (error: any) {
            console.log('Error from fetchPatient', error);
            toast.error(error.response.data.message)
        }
    }

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

    const navigateToDetail = (medicalrecordId: string) => {
        router.push(`/medicalrecord/MedicalRecordDetail?id=${medicalrecordId}`);
    };

    useEffect(() => {
        fetchMedicalRecord();
    }, [])

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
                            <th className="px-6 py-3 text-left">Note</th>
                            <th className="px-6 py-3 text-left">Diagnosis</th>
                            <th className="px-6 py-3 text-left">Date of Visit</th>
                            {/* <th className="px-6 py-3 text-left">Medicine</th>
                            <th className="px-6 py-3 text-left">Quantity</th>
                            <th className="px-6 py-3 text-left">Price</th> */}
                            <th className="px-6 py-3 text-left">View Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicalrecords.map((record, index) => (
                            <tr key={record._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 ">{record._id}</td>
                                <td className="px-6 py-4 ">{record.patientId.userId.fullName}</td>
                                <td className="px-6 py-4">{record.patientId.userId.phoneNumber}</td>
                                <td className="px-6 py-4">{record.doctorId.userId.fullName}</td>
                                <td className="px-6 py-4">{record.note}</td>
                                <td className="px-6 py-4">{record.diagnosis}</td>
                                <td className="px-6 py-4">{record.appointmentId.appointmentDate}</td>
                                <td
                                    className="px-6 py-4 text-blue-500 cursor-pointer"
                                    onClick={() => navigateToDetail(record._id)}
                                >View</td>
                                {/* <td className="px-6 py-4">{record.medicine}</td>
                                <td className="px-6 py-4">{record.quantity}</td>
                                <td className="px-6 py-4">{record.price}</td> */}
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
