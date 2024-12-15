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
    fullName: string;
    phoneNumber: string;
    specialtyId: string;
    licenseNumber: string;
    yearsOfExperience: string;
}


const DoctorList = () => {

    const pageSize = 10;

    const dispatch = useDispatch();
    const router = useRouter(); // Dùng router để điều hướng

    const doctors = useSelector((state: RootState) => state.doctors.doctors);
    const loading = useSelector((state: RootState) => state.doctors.loading);
    const [error, setError] = useState<string | null>(null); // Quản lý lỗi khi gọi API
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            dispatch(setLoading(true));
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/doctors?current=1&pageSize=${pageSize}`);
                const doctorList = response.data.result; // Truy cập vào trường `result`
                console.log("API Response:", doctorList);
                dispatch(setDoctors(doctorList)); // Cập nhật Redux với mảng từ `result`
            } catch (err) {
                console.error('Error fetching doctors:', err);
                setError('Failed to fetch doctors');
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchDoctors();
    }, [dispatch])



    const handleEdit = (doctorId: string) => {
        router.push(`/doctor/EditDoctor?id=${doctorId}`); // Chuyển hướng tới trang chỉnh sửa
    };

    const handleDelete = async (doctorId: string) => {
        try {
            const res = await axiosInstance.delete(`/doctors/${doctorId}`);
            if (res) {
                toast.success('Delete Success');
                // Tạo bản sao mới và cập nhật state
                setDoctorList(prevDoctors => prevDoctors.filter(doctor => doctor._id !== doctorId));
            }
        } catch (error) {
            toast.error('Delete Failed');
        }
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
                                <th className="px-6 py-3 text-left">ID</th>
                                <th className="px-6 py-3 text-left">Full Name</th>
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
                                    <td className="px-6 py-4">{doctor._id}</td>
                                    <td className="px-6 py-4">{doctor.userId.fullName}</td>
                                    <td className="px-6 py-4">{doctor.userId.phoneNumber}</td>
                                    <td className="px-6 py-4">{doctor.specialtyId?.name || 'NAN'}</td>
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
                </>
            )}
        </div>
    );
};

export default DoctorList;
