'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctors, setLoading } from '@/redux/store/doctorSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/utils/axios';
import { toast } from 'sonner';

interface Doctor {
    _id: string;
    avatar: string;
    userId: {
        _id: string;
        fullName: string;
        phoneNumber: string;
    },
    specialtyId: {
        _id: string;
        name: string;
    };
    licenseNumber: string;
    yearsOfExperience: string;
}


const DoctorList = () => {

    const dispatch = useDispatch();
    const router = useRouter(); // Dùng router để điều hướng

    const doctors = useSelector((state: RootState) => state.doctors.doctors);
    const loading = useSelector((state: RootState) => state.doctors.loading);
    const [error, setError] = useState<string | null>(null); // Quản lý lỗi khi gọi API
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const pageSize = 5;

    const fetchDoctors = async (currentPage: number) => {
        dispatch(setLoading(true));
        try {
            const response = await axiosInstance.get(`http://localhost:8080/api/v1/doctors?current=${currentPage}&pageSize=${pageSize}`);
            const { result, totalPages } = response.data; // Truy cập vào trường `result`
            console.log(result);

            setTotalPages(totalPages);
            dispatch(setDoctors(result)); // Cập nhật Redux với mảng từ `result`
        } catch (err) {
            console.error('Error fetching doctors:', err);
            setError('Failed to fetch doctors');
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchDoctors(currentPage);
    }, [dispatch, currentPage])



    const handleEdit = (doctorId: string) => {
        router.push(`/doctor/EditDoctor?id=${doctorId}`); // Chuyển hướng tới trang chỉnh sửa
    };

    const handleDelete = async (doctorId: string) => {
        try {
            const res = await axiosInstance.delete(`/doctors/${doctorId}`);
            if (res) {
                toast.success('Successfully deleted');
                // Tạo bản sao mới và cập nhật state
                setDoctorList(prevDoctors => prevDoctors.filter(doctor => doctor._id !== doctorId));
            }
        } catch (error) {
            toast.error('Delete Failed');
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Doctors</h2>

            {loading && <p>Loading doctors...</p>}
            {error && <p className="text-red-500">{error}</p>} {/* Hiển thị lỗi nếu có */}

            {!loading && !error && (
                <>
                    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left">Full Name</th>
                                <th className="px-6 py-3 text-left">Avatar</th>
                                <th className="px-6 py-3 text-left">Phone</th>
                                <th className="px-6 py-3 text-left">Specialty</th>
                                <th className="px-6 py-3 text-left">License</th>
                                <th className="px-6 py-3 text-left">Years of Experience</th>
                                <th className="px-6 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor, index) => (
                                <tr key={doctor._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4">{doctor.userId?.fullName || 'N/A'}</td>
                                    <img
                                        src={doctor.avatar}  // Use the avatar URL directly
                                        alt="Avatar Preview"
                                        className="w-32 h-32 object-cover rounded mb-4"
                                    />
                                    <td className="px-6 py-4">{doctor.userId?.phoneNumber || 'No data available'}</td>
                                    <td className="px-6 py-4">{doctor.specialtyId?.name || 'No data available'}</td>
                                    <td className="px-6 py-4">{doctor.licenseNumber}</td>
                                    <td className="px-6 py-4">{doctor.yearsOfExperience}</td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(doctor._id)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doctor._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span>Page {currentPage} of {totalPages}</span>

                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DoctorList;
