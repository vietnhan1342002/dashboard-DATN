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
            const response = await axiosInstance.get(`/appointments/status?status=pending&current=${currentPage}&pageSize=${pageSize}`);
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
                // Cập nhật lại state appointments sau khi xác nhận thành công
                dispatch(setAppointments(appointments.filter(appointment => appointment._id !== appointmentId)));
                toast.success('Appointment confirmed successfully');
            }
        } catch (error) {
            console.error('Error confirming appointment:', error);
            toast.error('Error confirming appointment');
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

            {/* Phân trang */}
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

            {/* Danh sách cuộc hẹn */}
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">No.</th> {/* Đổi từ "ID" thành "No." */}
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
                    {appointments.map((appointment, index) => {
                        // Tính toán số thứ tự dựa trên trang hiện tại
                        const no = (currentPage - 1) * pageSize + index + 1;
                        return (
                            <tr key={appointment._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4">{no}</td> {/* Sử dụng số thứ tự đã tính */}
                                <td className="px-6 py-4">{appointment.patientId?.userId?.fullName}</td>
                                <td className="px-6 py-4">
                                    {appointment.patientId?.userId?.phoneNumber || 'No data available'}
                                </td>
                                <td className="px-6 py-4">{appointment.doctorId?.userId?.fullName}</td>
                                <td className="px-6 py-4">{appointment?.appointmentDate?.split(' ')[0].split('-').reverse().join('-')}</td>
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
                        );
                    })}
                </tbody>

            </table>

            <Toaster position="top-center" />
        </div>
    );
};

export default AppointmentList;
