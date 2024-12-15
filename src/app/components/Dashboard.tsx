/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { toast } from "sonner";

const Dashboard = () => {
    const initialData = {
        fullName: '',
        phoneNumber: ''
    }
    const [user, setUser] = useState(initialData)
    const [appointmentCount, setAppointmentCount] = useState(0)
    const [doctorCount, setDoctorCount] = useState(0)

    const [appointments, setAppointments] = useState<any[]>([])

    const userId = localStorage.getItem('userId')

    const fetchUser = async (userId: string) => {
        try {
            const res = await axiosInstance.get(`/user-auth/${userId}`)
            const user = res.data
            setUser(user)
        } catch (error) {
            toast.error('Error')
        }
    }

    const fetchSumDoctor = async () => {
        const appointment = await axiosInstance.get('/filter/count/appointments')
        const doctor = await axiosInstance.get('/filter/count/doctors')
        setAppointmentCount(appointment.data)
        setDoctorCount(doctor.data)
    }

    const handleCompleted = () => {
        // Logic xử lý khi bấm Confirm
        console.log("Confirmed!");
    };

    const handleCancel = () => {
        // Logic xử lý khi bấm Cancel
        console.log("Canceled!");
    };

    const fetchAppointment = async () => {
        try {
            // Lấy danh sách cuộc hẹn đã xác nhận
            const confirmed = await axiosInstance.get('/filter/appointment-confirmed');
            const appointments = confirmed.data;

            const mappedAppointments = await Promise.all(
                appointments.map(async (appointment: any) => {
                    const detail = await axiosInstance.get(`appointments/${appointment._id}`);
                    return {
                        detail: detail.data.result,
                    };
                })
            );
            console.log(mappedAppointments);
            setAppointments(mappedAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUser(userId)
        }
        fetchSumDoctor()
        fetchAppointment()
    }, [userId])

    return (
        <div className="ml-[70px] p-4 bg-blue-50 h-full absolute top-0 left-0 z-20 rounded-l-2xl overflow-hidden" style={{ width: 'calc(100vw - 70px)' }}>
            {/* Header Section */}
            <div className="flex space-x-4 mb-6">
                {/* Greeting Card */}
                <div className="bg-purple-200 flex-1 p-16 rounded-lg shadow-lg flex items-center space-x-4">
                    <img src="/doc.png" alt="Doctor" className="w-16 h-16 rounded-full" />
                    <div>
                        <h2 className="text-lg font-semibold text-purple-800">
                            Hello, <span className="text-purple-600">{user.fullName}</span>
                        </h2>
                        <p className="text-sm text-purple-700">Welcome to your dashboard. Here you can manage appointments and doctors.</p>
                    </div>
                </div>
                {/* Statistics Cards */}
                <div className="flex space-x-4">
                    <div className="bg-blue-500 text-white p-16 rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                            <p>Total Appointments</p>
                            <p className="text-2xl font-semibold">{appointmentCount}</p>
                        </div>
                    </div>
                    <div className="bg-white text-black p-16 rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                            <p>Registered Doctors</p>
                            <p className="text-2xl font-semibold">{doctorCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Appointments</h3>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3 border">Patient</th>
                            <th className="p-3 border">Phone number</th>
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">Doctor</th>
                            <th className="p-3 border">Reason</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Visited</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td className="p-3 border">{appointment.detail.patientId.userId.fullName}</td>
                                    <td className="p-3 border">{appointment.detail.patientId.userId.phoneNumber}</td>
                                    <td className="p-3 border">{appointment.detail.appointmentDate}</td>
                                    <td className="p-3 border">{appointment.detail.doctorId.userId.fullName} </td>
                                    <td className="p-3 border">{appointment.detail.reason}</td>
                                    <td className="p-3 border">
                                        {appointment.detail.status}
                                    </td>
                                    <td className="px-6 py-4 flex space-x-2 border">
                                        <button
                                            onClick={() => handleCompleted()}
                                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                        >
                                            Completed
                                        </button>
                                        <button
                                            onClick={() => handleCancel()}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 border"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="p-3 text-center text-gray-500" colSpan={6}>
                                    No Appointments Found!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
