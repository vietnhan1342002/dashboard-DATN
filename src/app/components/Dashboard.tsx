"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import { formatDateTime } from "../utils/format";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import ChartOne from "./Chart";

// Đăng ký các thành phần Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const socket = useSocket("https://13.211.141.240.nip.io");
    // const socket = useSocket("http://localhost:8080")
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
    const [chartData, setChartData] = useState<Number[]>([])

    useEffect(() => {
        if (!socket) return;
        socket.on('doctor-notification', (message: string) => {
            console.log('Received notification:', message);
            toast.success(`New Notification: ${message}`);
            fetchAppointment();
        });

        return () => {
            socket.off('doctor-notification');
        };
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
                if (doctorId) {
                    localStorage.setItem("doctorId", doctorId.data._id)
                }
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
        console.log(appointmentId);
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

    const getSumPaidBillsForDates = async (dates: string[]) => {
        const requests = dates.map(date =>
            fetch(`https://13.211.141.240.nip.io/api/v1/bills/sum-paid-bills?date=${date}`)
                .then(response => response.json())
                .then(data => ({ date, data }))  // Thêm ngày vào dữ liệu trả về
                .catch(error => ({ date, error }))  // Xử lý lỗi nếu có
        );

        const results = await Promise.all(requests);
        return results;
    };


    const [week, setWeek] = useState({
        startOfWeek: '',
        endOfWeek: ''
    })

    const getCurrentWeekRange = () => {
        const currentDate = new Date();

        const dayOfWeek = currentDate.getDay();
        const diffToStartOfWeek = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() + diffToStartOfWeek);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        // Lấy ra các ngày trong tuần với ngày tháng năm
        const weekDays = [];
        let currentDay = new Date(startOfWeek);

        for (let i = 0; i < 7; i++) {
            const day = currentDay.getDate();
            const month = currentDay.getMonth() + 1;
            const year = currentDay.getFullYear();
            weekDays.push(`${year}-${month}-${day}`);
            currentDay.setDate(currentDay.getDate() + 1);
        }
        getSumPaidBillsForDates(weekDays).then(results => {
            console.log("Results:", results);
            const seriesData = results.map(result => {
                if ('data' in result) {
                    return result.data.totalPaidAmountToday || 0; // Lấy giá trị hoặc mặc định là 0 nếu không có
                }
                return 0; // Mặc định là 0 nếu có lỗi
            });
            setChartData(seriesData);

        });
        const start = startOfWeek.toLocaleDateString('en-GB').replace(/\//g, '-')
        const end = endOfWeek.toLocaleDateString('en-GB').replace(/\//g, '-')
        setWeek({ startOfWeek: start, endOfWeek: end })
        // console.log("Week Days:", weekDays);


        return { startOfWeek, endOfWeek, weekDays };
    };


    useEffect(() => {
        if (userId) {
            fetchUser(userId)
        }
        getCurrentWeekRange()
        fetchSumDoctor()
    }, [userId])

    useEffect(() => {
        if (role) {
            fetchAppointment();
            fetchSumAppointment()
        }
    }, [role]);

    return (
        <div className="p-4 bg-blue-50 rounded-l-2xl w-full">
            {/* Header Section */}
            <div className="flex space-x-4 mb-6">
                {/* Greeting Card */}
                <div className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300 flex-1 p-16 rounded-lg shadow-lg flex items-center space-x-4">
                    <img src="/doc.png" alt="Doctor" className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Hello, <span className="text-yellow-300">{user.fullName || "Guest"}</span>
                        </h2>
                        <p className="mt-2 text-lg font-medium text-white">
                            Welcome to your dashboard! You are a:
                            <span className="ml-2 px-4 py-1 text-lg font-semibold bg-yellow-500 text-purple-900 rounded-full shadow-lg">
                                {role || "Unknown"}
                            </span>
                        </p>
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
            {(role === 'admin' || role === 'receptionist') && (
                <ChartOne startOfWeek={week.startOfWeek} endOfWeek={week.endOfWeek} series={[{ name: "Revenue", data: chartData }]} />
            )}

            {/* Appointments Table */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Appointments</h3>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3 border">No.</th> {/* Thay 'STT' bằng 'No.' */}
                            <th className="p-3 border">Patient</th>
                            <th className="p-3 border">Phone number</th>
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">Doctor</th>
                            <th className="p-3 border">Reason</th>
                            <th className="p-3 border">Status</th>
                            {role === "doctor" ? (
                                <>
                                    <th className="p-3 border">Medical</th>
                                    <th className="p-3 border">Visited</th>
                                </>
                            ) : null}
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment, index) => (
                                <tr key={appointment._id || index}>
                                    <td className="p-3 border">{index + 1 || 'No data available'}</td> {/* Thêm số thứ tự */}
                                    <td className="p-3 border">{appointment?.detail?.patientId?.userId?.fullName || 'No data available'}</td>
                                    <td className="p-3 border">{appointment?.detail?.patientId?.userId?.phoneNumber || 'No data available'}</td>
                                    <td className="p-3 border">{formatDateTime(appointment?.detail?.appointmentDate) || 'No data available'}</td>
                                    <td className="p-3 border">{appointment?.detail?.doctorId?.userId?.fullName || 'No data available'}</td>
                                    <td className="p-3 border">{appointment?.detail?.reason || 'No data available'}</td>
                                    <td className="p-3 border">
                                        <span className="bg-blue-300 p-1 rounded">{appointment.detail.status ? appointment.detail.status.charAt(0).toUpperCase() + appointment.detail.status.slice(1) : 'No data available'}</span>
                                    </td>
                                    {role === "doctor" ? (
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
                                    ) : null}
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
