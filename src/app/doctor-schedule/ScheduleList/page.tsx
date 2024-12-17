'use client';

import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import axiosInstance from '@/app/utils/axios';
import { toast, Toaster } from 'sonner';

const SchedulePage = () => {
    const [events, setEvents] = useState([]);
    const userId = localStorage.getItem("userId");
    const [doctorId, setDoctorId] = useState('');
    const [schedule, setSchedule] = useState({
        doctorId: { _id: "", userId: { _id: "", fullName: "", phoneNumber: "" } },
        shiftId: { _id: "", name: "" },
        date: ""
    });
    const [shifts, setShifts] = useState<any[]>([]);

    const convertToEvent = (dateString: string, timeRange: string) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() + 7);  // Chuyển múi giờ về Việt Nam

        const [startTime, endTime] = timeRange.split(' - ');

        const getDateWithTime = (time: string, baseDate: Date) => {
            const [hours, minutes] = time.split(':').map(Number);
            const newDate = new Date(baseDate);
            newDate.setHours(hours, minutes, 0, 0);  // Cập nhật giờ và phút
            return newDate;
        };

        let StartTime = getDateWithTime(startTime, date);
        let EndTime = getDateWithTime(endTime, date);

        // Chuyển đổi thời gian sang múi giờ Việt Nam
        StartTime = new Date(StartTime.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
        EndTime = new Date(EndTime.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

        return { StartTime, EndTime };
    };


    const fetchData = async () => {
        try {
            const doctor = await axiosInstance.get(`/doctors/user/${userId}`);
            const doctorId = doctor.data._id;
            setDoctorId(doctorId);
            const res = await axiosInstance.get(`/filter/doctor-schedules?doctorId=${doctorId}`);
            const today = new Date().setHours(0, 0, 0, 0);

            const filteredEvents = res.data.filter((schedule: any) => {
                const { date, shiftId } = schedule;
                const { StartTime } = convertToEvent(date, shiftId.name);
                return new Date(StartTime).getTime() >= today;
            });

            const events = filteredEvents.map((schedule: any) => {
                const { date, shiftId } = schedule;
                const { StartTime, EndTime } = convertToEvent(date, shiftId.name);
                return {
                    Id: schedule._id,
                    Subject: 'Scheduled Shift',
                    StartTime,
                    EndTime,
                    Status: schedule.status,
                };
            });

            setEvents(events);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };


    const fetchShift = async () => {
        const res = await axiosInstance.get('/shifts');
        setShifts(res.data.result);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'shiftId') {
            const selectedShift = shifts.find(shift => shift._id === value);
            if (selectedShift) {
                setSchedule((prevSchedule) => ({
                    ...prevSchedule,
                    shiftId: {
                        _id: value,
                        name: selectedShift.name,
                    },
                }));
            }
        } else {
            setSchedule((prevSchedule) => ({
                ...prevSchedule,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        if (doctorId) {
            fetchData();
        }
    }, [doctorId]);

    useEffect(() => {
        fetchShift();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post(`/doctorSchedules/`, {
                doctorId: doctorId,
                shiftId: schedule.shiftId._id,
                date: schedule.date
            });
            if (res) {
                toast.success("Create Successfully");
                fetchData();
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Form Section on the Left */}
            <div className="w-1/3 p-6 overflow-auto">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Doctor Schedule Management
                </h1>
                <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4">Create a New Schedule</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={schedule.date}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Time</label>
                            <select
                                name="shiftId"
                                value={schedule.shiftId._id}
                                onChange={handleChange}
                                required
                                className="border rounded p-2 w-full"
                            >
                                <option value="" disabled>Select Shift</option>
                                {shifts.map((item) => (
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add Schedule
                        </button>
                    </form>
                </div>
            </div>

            <div className="w-2/3 p-6 overflow-auto">
                <ScheduleComponent
                    height="calc(100vh - 4rem)"
                    eventSettings={{ dataSource: events }}
                    currentView="Week"
                    selectedDate={new Date()}
                >
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
            </div>
            <Toaster position='top-center' />
        </div>
    );
};

export default SchedulePage;
