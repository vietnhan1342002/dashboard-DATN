'use client';

import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import axiosInstance from '@/app/utils/axios';
import { toast, Toaster } from 'sonner';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf0x3Qnxbf1x1ZFxMYl1bRXRPIiBoS35RckRhWHdccXBWRmhfWUR2")

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
    const [loading, setLoading] = useState(false);

    const convertToEvent = (dateString: string, timeRange: string) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() + 7);

        const [startTime, endTime] = timeRange.split(' - ');

        const getDateWithTime = (time: string, baseDate: Date) => {
            const [hours, minutes] = time.split(':').map(Number);
            const newDate = new Date(baseDate);
            newDate.setHours(hours, minutes, 0, 0);
            return newDate;
        };

        let StartTime = getDateWithTime(startTime, date);
        let EndTime = getDateWithTime(endTime, date);

        StartTime = new Date(StartTime.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
        EndTime = new Date(EndTime.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

        return { StartTime, EndTime };
    };

    const fetchData = async () => {
        setLoading(true);
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
            toast.error("Failed to fetch schedules");
        } finally {
            setLoading(false);
        }
    };

    const fetchShift = async () => {
        try {
            const res = await axiosInstance.get('/shifts');
            setShifts(res.data.result);
        } catch (error) {
            toast.error("Failed to fetch shifts");
        }
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
        fetchData();
        fetchShift();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
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
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-blue-400 flex flex-col items-center py-8">
            <header className="text-center mb-8 text-white">
                <h1 className="text-5xl font-extrabold mb-2">Doctor Schedule Management</h1>
                <p className="text-lg">Manage your doctor shifts and schedules effortlessly</p>
            </header>

            <div className="flex gap-12 w-full max-w-7xl">
                {/* Form Section */}
                <div className="w-full md:w-1/3 bg-white shadow-xl rounded-xl p-6">
                    <h2 className="text-3xl font-semibold text-indigo-600 mb-4">Create a New Schedule</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="date" className="block text-lg font-medium text-gray-700 mb-2">Select Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={schedule.date}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="shiftId" className="block text-lg font-medium text-gray-700 mb-2">Select Shift</label>
                            <select
                                name="shiftId"
                                value={schedule.shiftId._id}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400"
                                required
                            >
                                <option value="" disabled>Select a Shift</option>
                                {shifts.map(shift => (
                                    <option key={shift._id} value={shift._id}>
                                        {shift.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-200"
                        >
                            Add Schedule
                        </button>
                    </form>
                </div>

                {/* Schedule Section */}
                <div className="w-full md:w-2/3 bg-white shadow-xl rounded-xl p-6">
                    <h2 className="text-3xl font-semibold text-indigo-600 mb-4">Your Schedule</h2>
                    <ScheduleComponent
                        height="500px"
                        eventSettings={{ dataSource: events }}
                        currentView="Week"
                        selectedDate={new Date()}
                    >
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                    </ScheduleComponent>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default SchedulePage;
