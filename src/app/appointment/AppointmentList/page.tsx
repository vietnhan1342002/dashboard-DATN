'use client';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setAppointments, setLoading } from "@/redux/store/appointmentSlice"; // Giả sử bạn có slice cho cuộc hẹn
import axios from "axios";
import Link from "next/link";

const AppointmentList = () => {
    const dispatch = useDispatch();

    // Lấy dữ liệu và trạng thái loading từ Redux store
    const { appointments, loading } = useSelector((state: RootState) => state.appointments);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 10;

    // Lấy danh sách cuộc hẹn từ API
    useEffect(() => {
        const fetchAppointments = async () => {
            dispatch(setLoading(true)); // Bắt đầu loading
            try {
                const response = await axios.get("http://13.211.141.240:8080/api/v1/appointments");
                dispatch(setAppointments(response.data.result)); // Lưu dữ liệu vào Redux store
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                dispatch(setLoading(false)); // Kết thúc loading
            }
        };

        fetchAppointments();
    }, [dispatch]);

    // Lọc dữ liệu theo từ khóa tìm kiếm
    const filteredAppointments = appointments.filter((appointment) =>
        Object.values(appointment).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Nếu đang loading, hiển thị thông báo loading
    if (loading) {
        return <div>Loading...</div>;
    }

    const handleConfirm = () => {
        // Logic xử lý khi bấm Confirm
        console.log("Confirmed!");
    };

    const handleCancel = () => {
        // Logic xử lý khi bấm Cancel
        console.log("Canceled!");
    };

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Appointments</h2>

            {/* Tìm kiếm */}
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
                    {currentAppointments.map((appointment, index) => (
                        <tr key={appointment._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4">{appointment._id}</td>
                            <td className="px-6 py-4">{appointment.patientId?.userId?.fullName}</td>
                            <td className="px-6 py-4">
                                {appointment.patientId?.userId?.phoneNumber || 'N/A'}
                            </td>
                            <td className="px-6 py-4">{appointment.doctorId?.userId?.fullName}</td>
                            <td className="px-6 py-4">{appointment.appointmentDate.split(' ')[0]}</td>
                            <td className="px-6 py-4">{appointment.appointmentDate.split(' ')[1]}</td>
                            <td className="px-6 py-4">{appointment.reason}</td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    onClick={() => handleConfirm()} // Hàm handleConfirm thay thế cho handleEdit
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleCancel()} // Hàm handleCancel thay thế cho handleDelete
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
            <div className="mt-4 flex justify-end">
                <Link href="/appointment/AddAppointment">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        + Add Appointment
                    </button>
                </Link>
            </div>

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
        </div>
    );
};

export default AppointmentList;
