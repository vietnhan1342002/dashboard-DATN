/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import { formatDateTime } from "../utils/format";

const Dashboard = () => {
    const socket = useSocket("http://localhost:8080");
    const router = useRouter()

    const initialData = {
        fullName: '',
        phoneNumber: ''
    }
    const [user, setUser] = useState(initialData)
    const [role, setRole] = useState("")
    const [appointmentCount, setAppointmentCount] = useState(0)
    const [doctorCount, setDoctorCount] = useState(0)
    const [appointments, setAppointments] = useState<any[]>([])
    const [userId, setUserId] = useState<string | null>()

    useEffect(() => {
        if (socket) {
            socket.on('doctor-notification', (message: string) => {
                console.log('Received notification:', message);
                toast.success(`New Notification: ${message}`);
            });

            return () => {
                socket.off('doctor-notification');
            };
        }
    }, [socket]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem('userId');
            setUserId(storedUserId);
        }
    }, [userId]);

    const fetchUser = async (userId: string) => {
        try {
            const res = await axiosInstance.get(`/user-auth/${userId}`)
            const user = res.data
            const role = user.roleId.nameRole
            setRole(role)
            setUser(user)
        } catch (error) {
            toast.error('Error fetching user details');
        }
    }

    const fetchSumDoctor = async () => {
        try {
            const doctor = await axiosInstance.get('/filter/count/doctors')
            setDoctorCount(doctor.data)
        } catch (error) {
            toast.error('Error fetching doctor count');
        }
    };

    const fetchSumAppointment = async () => {
        try {
            let appointment;
            if (role === "doctor") {
                const doctorId = await axiosInstance.get(`/doctors/user/${userId}`)
                appointment = await axiosInstance.get(`filter/count/appointments?doctorId=${doctorId.data._id}`);
            } else {
                appointment = await axiosInstance.get('/filter/count/appointments');
            }
            setAppointmentCount(appointment.data)
        } catch (error) {
            toast.error('Error fetching appointment count');
        }
    }

    const fetchCompletedAppointment = async (appointmentId: string) => {
        try {
            const res = await axiosInstance.patch(`/appointments/status/${appointmentId}`, {
                status: 'completed'
            });

            if (res.status === 200) {
                toast.success('Appointment marked as completed successfully');
                fetchAppointment();
            }
        } catch (error) {
            toast.error('Error marking appointment as completed');
        }
    };

    const handleCompleted = (appointmentId: string) => {
        fetchCompletedAppointment(appointmentId)
    };

    const fetchCanceledAppointment = async (appointmentId: string) => {
        try {
            const res = await axiosInstance.patch(`/appointments/status/${appointmentId}`, {
                status: 'canceled'
            });
            if (res.status === 200) {
                toast.success('Appointment canceled successfully');
                fetchAppointment();
            }
        } catch (error) {
            toast.error('Error canceling appointment');
        }
    };

    const handleCancel = (appointmentId: string) => {
        fetchCanceledAppointment(appointmentId)
    };

    const handleEdit = (appointmentId: string) => {
        router.push(`/medicalrecord/MedicalRecordList/EditMedical?id=${appointmentId}`)
    };

    const fetchAppointment = async () => {
        try {
            let confirmed;
            if (role === "doctor") {
                const doctorId = await axiosInstance.get(`/doctors/user/${userId}`)
                confirmed = await axiosInstance.get(`/filter/appointment-confirmed?doctorId=${doctorId.data._id}`);
            } else {
                confirmed = await axiosInstance.get('/filter/appointment-confirmed');
            }
            const appointments = confirmed.data;

            const mappedAppointments = await Promise.all(
                appointments.map(async (appointment: any) => {
                    const detail = await axiosInstance.get(`appointments/${appointment._id}`);
                    return {
                        ...appointment,
                        detail: detail.data.result,
                    };
                })
            );
            setAppointments(mappedAppointments);
        } catch (error) {
            toast.error('Error fetching appointments');
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUser(userId)
        }
        fetchSumDoctor()
    }, [userId])

    useEffect(() => {
        if (role) {
            fetchAppointment();
            fetchSumAppointment()
        }
    }, [role, appointmentCount]);

    return (
        <div className="p-4 bg-blue-50 rounded-l-2xl w-full">
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
                    {role === "admin" ? <div className="bg-white text-black p-16 rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                            <p>Registered Doctors</p>
                            <p className="text-2xl font-semibold">{doctorCount}</p>
                        </div>
                    </div> : <></>
                    }
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
                            {
                                role === "doctor" ? <>
                                    <th className="p-3 border">Medical</th>
                                    <th className="p-3 border">Visited</th>
                                </> : <></>
                            }


                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment, index) => (
                                <tr key={appointment._id || index}>
                                    <td className="p-3 border">{appointment?.detail?.patientId?.userId?.fullName || 'No data available'}</td>
                                    <td className="p-3 border">{appointment?.detail?.patientId?.userId?.phoneNumber || 'No data available'}</td>
                                    <td className="p-3 border">{formatDateTime(appointment?.detail?.appointmentDate) || 'No data available'}</td>
                                    <td className="p-3 border">{appointment?.detail?.doctorId?.userId?.fullName || 'No data available'} </td>
                                    <td className="p-3 border">{appointment?.detail?.reason || 'No data available'}</td>
                                    <td className="p-3 border">{appointment.detail.status}</td>
                                    {role === "doctor" ?
                                        <>
                                            <td className="p-3 border">
                                                <button
                                                    onClick={() => handleEdit(appointment._id)}
                                                    className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 border"
                                                >
                                                    Edit Medical
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 flex space-x-2 border">
                                                <button
                                                    onClick={() => handleCompleted(appointment._id)}
                                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                                >
                                                    Completed
                                                </button>
                                                <button
                                                    onClick={() => handleCancel(appointment._id)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 border"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                        : <></>
                                    }
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
            <Toaster position="top-center" />
        </div>
    );
};

export default Dashboard;
