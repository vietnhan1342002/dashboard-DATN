'use client';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setAppointments, setLoading } from "@/redux/store/appointmentSlice"; // Giả sử bạn có slice cho cuộc hẹn
import axios from "axios";
import Link from "next/link";
import axiosInstance from "@/app/utils/axios";
import { toast, Toaster } from "sonner";

const AppointmentList = () => {
    const dispatch = useDispatch();

    // Lấy dữ liệu và trạng thái loading từ Redux store
    const { appointments, loading } = useSelector((state: RootState) => state.appointments);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const pageSize = 6;

    // Lấy danh sách cuộc hẹn từ API
    const fetchAppointments = async (currentPage: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/appointments/pending?current=${currentPage}&pageSize=${pageSize}`);
            const { result, totalPages } = response.data
            setTotalPages(totalPages)
            dispatch(setAppointments(result)); // Lưu dữ liệu vào Redux store
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    };
    useEffect(() => {
        fetchAppointments(currentPage);
    }, [dispatch, currentPage]);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const fetchConfirmedAppointment = async (appointmentId: string) => {
        try {
            const res = await axiosInstance.patch(`/appointments/status/${appointmentId}`, {
                status: 'confirmed'
            });

            if (res.status === 200) {
                alert('Appointment confirmed successfully');
                fetchAppointments(currentPage);
            }
        } catch (error) {
            console.error('Error confirming appointment:', error);
        }
    };

    const handleConfirm = (appointmentId: string) => {
        console.log("Confirmed!");
        fetchConfirmedAppointment(appointmentId)
    };

    const fetchCanceledAppointment = async (appointmentId: string) => {
        const response = await axiosInstance.delete(`/appointments/${appointmentId}`)
        console.log(response.data);
        if (response) {
            toast.success("Successfully Canceled!")
            fetchAppointments(currentPage);
        }
    }

    const handleCancel = (appointmentId: string) => {
        console.log("Canceled!");
        fetchCanceledAppointment(appointmentId)
    };



    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Appointments</h2>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border rounded p-2 flex-grow mr-2"
                />
                <button
                    onClick={() => setSearchQuery("")}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Clear
                </button>
            </div>

            {/* Danh sách cuộc hẹn */}
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Patient Name</th>
                        <th className="px-6 py-3 text-left">Phone Patient</th>
                        <th className="px-6 py-3 text-left">Doctor Name</th>
                        <th className="px-6 py-3 text-left">Date</th>
                        <th className="px-6 py-3 text-left">Time</th>
                        <th className="px-6 py-3 text-left">Reason</th>
                        <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={appointment._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4">{appointment._id}</td>
                            <td className="px-6 py-4">{appointment.patientId?.userId?.fullName}</td>
                            <td className="px-6 py-4">
                                {appointment.patientId?.userId?.phoneNumber || 'N/A'}
                            </td>
                            <td className="px-6 py-4">{appointment.doctorId?.userId?.fullName}</td>
                            <td className="px-6 py-4">{appointment?.appointmentDate?.split(' ')[0]}</td>
                            <td className="px-6 py-4">{appointment?.appointmentDate?.split(' ')[1]}</td>
                            <td className="px-6 py-4">{appointment?.reason}</td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    onClick={() => handleConfirm(appointment._id)} // Hàm handleConfirm thay thế cho handleEdit
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleCancel(appointment._id)} // Hàm handleCancel thay thế cho handleDelete
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Cancel
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Thêm cuộc hẹn */}
            {/* <div className="mt-4 flex justify-end">
                <Link href="/appointment/AddAppointment">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        + Add Appointment
                    </button>
                </Link>
            </div> */}

            {/* Phân trang */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default AppointmentList;
