'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctors, setLoading } from '@/redux/store/doctorSlice';
import { RootState } from '@/redux/store';
import axiosInstance from '@/app/utils/axios';
import { toast } from 'sonner';
import useDebounce from '@/hooks/useDebounce'; // Import useDebounce hook
import { useRouter } from 'next/navigation';

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
    const doctors = useSelector((state: RootState) => state.doctors.doctors);
    const loading = useSelector((state: RootState) => state.doctors.loading);
    const router = useRouter(); // Dùng router để điều hướng
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const pageSize = 5;

    // Apply useDebounce hook on the search query with a delay of 500ms
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Fetch doctors based on debounced search query
    const fetchDoctors = async (currentPage: number, query: string) => {

        try {
            const response = await axiosInstance.get(`/doctors?current=${currentPage}&pageSize=${pageSize}&query=${query}`);
            const { result, totalPages } = response.data;
            setTotalPages(totalPages);
            dispatch(setDoctors(result));
        } catch (err) {
            console.error('Error fetching doctors:', err);
        }
    };

    useEffect(() => {
        fetchDoctors(currentPage, debouncedSearchQuery); // Use debounced query for fetching doctors
    }, [dispatch, currentPage, debouncedSearchQuery]);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

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

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Doctors</h2>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    className="border rounded p-2 flex-grow mr-2"
                />
                <button
                    onClick={() => setSearchQuery("")}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Clear
                </button>
            </div>


            <>
                {/* Pagination controls */}
                <div className="flex justify-between my-4">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    >
                        Previous
                    </button>
                    <span className="self-center">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    >
                        Next
                    </button>
                </div>

                {/* Doctor list table */}
                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left w-1/7">Full Name</th>
                            <th className="px-6 py-3 text-left w-1/7">Avatar</th>
                            <th className="px-6 py-3 text-left w-1/7">Phone</th>
                            <th className="px-6 py-3 text-left w-1/7">Specialty</th>
                            <th className="px-6 py-3 text-left w-1/7">License</th>
                            <th className="px-6 py-3 text-left w-1/7">Years of Experience</th>
                            <th className="px-6 py-3 text-left w-1/7">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor, index) => (
                            <tr key={doctor._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4">{doctor.userId?.fullName || 'No data available'}</td>

                                {/* Sửa cột Avatar */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={doctor.avatar}
                                            alt="Avatar Preview"
                                            className="w-32 h-32 object-cover rounded" // Ảnh lớn hơn
                                        />
                                    </div>
                                </td>

                                <td className="px-6 py-4">{doctor.userId?.phoneNumber || 'No data available'}</td>
                                <td className="px-6 py-4">{doctor.specialtyId?.name || 'No data available'}</td>
                                <td className="px-6 py-4">{doctor.licenseNumber}</td>
                                <td className="px-6 py-4">{doctor.yearsOfExperience}</td>

                                {/* Sửa cột Action */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-center space-x-2">
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
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>

        </div>
    );
};

export default DoctorList;
