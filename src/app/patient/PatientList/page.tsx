/* eslint-disable @next/next/no-img-element */
"use client";

import axiosInstance from '@/app/utils/axios';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const PatientList = () => {
    const initialPatient = [{
        userId: {
            _id: "",
            fullName: "",
            phoneNumber: ""
        },
        address: "",
        dateOfBirth: "",
        gender: "",
        email: ""
    }];

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); // State để lưu từ khóa tìm kiếm
    const pageSize = 10;

    const [patients, setPatients] = useState<any[]>(initialPatient);

    // Sử dụng debounce để giảm số lần gọi API khi nhập liệu
    const debouncedSearchQuery = useDebounce(searchTerm, 500);

    // Hàm lấy danh sách bệnh nhân
    const fetchPatients = async (currentPage: number, query: string) => {
        try {
            const response = await axiosInstance.get(`/patients`, {
                params: { current: currentPage, pageSize, query },
            });
            const { result, totalPages } = response.data;

            // Định dạng ngày sinh
            result.forEach((patient: any) => {
                if (patient.dateOfBirth) {
                    const formattedDate = new Date(patient.dateOfBirth).toISOString().split('T')[0];
                    patient.dateOfBirth = formattedDate;
                }
            });

            setTotalPages(totalPages);
            setPatients(result);
        } catch (err: any) {
            console.error('Error from fetchPatient', err);
            toast.error(err.response?.data?.message || 'Failed to fetch patients');
        }
    };

    // Gọi API mỗi khi `currentPage` hoặc `debouncedSearchQuery` thay đổi
    useEffect(() => {
        fetchPatients(currentPage, debouncedSearchQuery);
    }, [currentPage, debouncedSearchQuery]);

    // Reset currentPage khi bắt đầu tìm kiếm mới
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset trang về 1 khi tìm kiếm mới
    };

    // Chuyển sang trang kế tiếp
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Quay lại trang trước
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='flex'>
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Patient List</h2>

                {/* Input tìm kiếm */}
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="border rounded p-2 flex-grow mr-2"
                        value={searchTerm} // Bind giá trị searchTerm vào input
                        onChange={handleSearchInput} // Hàm xử lý khi nhập liệu
                    />
                    <button
                        onClick={() => setSearchTerm("")} // Xóa nội dung tìm kiếm
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Clear
                    </button>
                </div>

                {/* Điều hướng trang */}
                <div className="flex justify-between my-4">
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

                {/* Bảng danh sách bệnh nhân */}
                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Phone</th>
                            <th className="px-6 py-3 text-left">Date of Birth</th>
                            <th className="px-6 py-3 text-left">Address</th>
                            <th className="px-6 py-3 text-left">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={patient._id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4">{patient.userId?.fullName || "No data available"}</td>
                                <td className="px-6 py-4">{patient?.email || "No data available"}</td>
                                <td className="px-6 py-4">{patient.userId?.phoneNumber || "No data available"}</td>
                                <td className="px-6 py-4">
                                    {new Date(patient.dateOfBirth).toLocaleDateString('en-GB') || '01/01/1990'}
                                </td>
                                <td className="px-6 py-4">{patient.address || "No data available"}</td>
                                <td className="px-6 py-4">
                                    {patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : "No data available"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Nút thêm bệnh nhân */}
                <div className="mt-4 flex justify-end">
                    <Link href="/patient/AddPatient">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Patient</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PatientList;
