/* eslint-disable @next/next/no-img-element */
"use client";

import axiosInstance from '@/app/utils/axios';
import { formatDateTime } from '@/app/utils/format';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

interface User {
    _id: string;
    fullName: string;
    phoneNumber: string;
}

interface Doctor {
    _id: string;
    userId: User;
}

interface Appointment {
    _id: string;
    appointmentDate: string;
}

interface MedicalRecord {
    _id: string;
    patientId: {
        _id: string;
        userId: User;
    };
    doctorId: Doctor;
    appointmentId: Appointment;
    diagnosis: string;
    note: string;
}

const MedicalRecordList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [medicalrecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [doctorId, setDoctorId] = useState("")

    const pageSize = 10;
    const router = useRouter();

    useEffect(() => {
        const doctorId = localStorage.getItem("doctorId")
        if (doctorId) {
            setDoctorId(doctorId)
        }
        fetchMedicalRecord();
    }, [currentPage, searchQuery, doctorId]);

    const fetchMedicalRecord = async () => {
        try {
            let res;
            console.log(doctorId);

            if (doctorId) {
                res = await axiosInstance.get(`/medical-records/doctor/${doctorId}`)
            } else {
                res = await axiosInstance.get(`/medical-records?current=${currentPage}&pageSize=${pageSize}`);
            }
            const { result, totalPages } = res.data;
            setMedicalRecords(result);
            setTotalPages(totalPages);
        } catch (error: any) {
            console.log('Error from fetchMedicalRecord', error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleDelete = async (medicalrecordId: string) => {
        try {
            setLoading(true);
            await axiosInstance.delete(`/medical-records/${medicalrecordId}`);
            toast.success("Successfully Deleted!");
            fetchMedicalRecord();
        } catch (error: any) {
            toast.error('Error deleting record');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (appointmentId: string) => {
        router.push(`/medicalrecord/MedicalRecordList/EditMedical?id=${appointmentId}`);
    };

    const handleViewMore = (recordId: string) => {
        router.push(`/medicalrecord/MoreDetail?id=${recordId}`)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRecord(null);
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
                        Clear
                    </button>
                </div>

                <div className="flex justify-between my-4">
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

                {loading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : medicalrecords.length === 0 ? (
                    <div className="text-center py-4">No records found</div>
                ) : (
                    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left">No.</th> {/* Cột số thứ tự */}
                                <th className="px-6 py-3 text-left">Patient Name</th>
                                <th className="px-6 py-3 text-left">Phone</th>
                                {!doctorId ?
                                    <th className="px-6 py-3 text-left">Doctor</th> : <></>
                                }
                                <th className="px-6 py-3 text-left">Note</th>
                                <th className="px-6 py-3 text-left">Diagnosis</th>
                                <th className="px-6 py-3 text-left">Date of Visit</th>
                                <th className="px-6 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicalrecords.map((record, index) => {
                                // Tính toán số thứ tự
                                const no = (currentPage - 1) * pageSize + index + 1;
                                return (
                                    <tr key={record._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4">{no}</td> {/* Hiển thị số thứ tự */}
                                        <td className="px-6 py-4">{record?.patientId?.userId?.fullName || ''}</td>
                                        <td className="px-6 py-4">{record?.patientId?.userId?.phoneNumber || ''}</td>
                                        {!doctorId ?
                                            <td className="px-6 py-4">{record?.doctorId?.userId?.fullName || ''}</td> : <></>
                                        }
                                        <td className="px-6 h-14 py-4 w-72 overflow-hidden">{record?.note || ''}</td>
                                        <td className="px-6 py-4">{record?.diagnosis || ''}</td>
                                        <td className="px-6 py-4">{formatDateTime(record?.appointmentId?.appointmentDate) || ''}</td>
                                        <td className="px-6 py-4 flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(record.appointmentId._id)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(record._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handleViewMore(record._id)}
                                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                            >
                                                View More
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}


            </div>
            <Toaster position='top-center' />

            {/* Modal */}
            {isModalOpen && selectedRecord && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
                        <h2 className="text-xl font-bold mb-4">Record Details</h2>
                        <p><strong>Patient Name:</strong> {selectedRecord.patientId.userId.fullName}</p>
                        <p><strong>Phone:</strong> {selectedRecord.patientId.userId.phoneNumber}</p>
                        <p><strong>Doctor:</strong> {selectedRecord.doctorId.userId.fullName}</p>
                        <p><strong>Diagnosis:</strong> {selectedRecord.diagnosis}</p>
                        <p><strong>Note:</strong> {selectedRecord.note}</p>
                        <p><strong>Date of Visit:</strong> {formatDateTime(selectedRecord.appointmentId.appointmentDate)}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={closeModal}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicalRecordList;
