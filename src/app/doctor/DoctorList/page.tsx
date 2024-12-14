'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctors, setLoading } from '@/redux/store/doctorSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DoctorList = () => {

    const pageSize = 10;

    const dispatch = useDispatch();
    const router = useRouter(); // Dùng router để điều hướng

    const doctors = useSelector((state: RootState) => state.doctors.doctors);
    const loading = useSelector((state: RootState) => state.doctors.loading);
    const [error, setError] = useState<string | null>(null); // Quản lý lỗi khi gọi API



    useEffect(() => {
        const fetchDoctors = async () => {
            // console.log("Fetching doctors...");
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

    const handleDelete = (doctorId: string) => {
        console.log('Delete doctor with ID:', doctorId);
        // Bạn có thể thêm logic để thực hiện việc xóa bác sĩ từ API ở đây
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
                                <th className="px-6 py-3 text-left">Email</th>
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
                                    <td className="px-6 py-4">{doctor.userId.email}</td>
                                    <td className="px-6 py-4">{doctor.specialtyId.name}</td>
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

                    <div className="mt-4 flex justify-end">
                        <Link href="/doctor/AddDoctor">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Doctor</button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default DoctorList;
