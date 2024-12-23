'use client';

import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import axiosInstance from '@/app/utils/axios';
import { toast, Toaster } from 'sonner';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf0x3Qnxbf1x1ZFxMYl1bRXRPIiBoS35RckRhWHdccXBWRmhfWUR2")

const SchedulePage = () => {
    const [events, setEvents] = useState([]);
    const [shifts, setShifts] = useState<any[]>([]);
    const [schedule, setSchedule] = useState({
        doctorId: { _id: "", userId: { _id: "", fullName: "", phoneNumber: "" } },
        shiftId: { _id: "", name: "" },
        date: ""
    });
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
            const resSchedules = await axiosInstance.get(`/doctorSchedules?current=1&pageSize=30`);

            console.log("resSchedule", resSchedules);


            const today = new Date().setHours(0, 0, 0, 0);

            const filteredEvents = resSchedules.data.result.filter((schedule: any) => {
                const { date, shiftId } = schedule;

                console.log("schedule", schedule);

                const { StartTime } = convertToEvent(date, shiftId.name);
                console.log("StartTime", StartTime);

                return new Date(StartTime).getTime() >= today;
            });

            console.log("filteredEvents", filteredEvents);


            const events = filteredEvents.map((schedule: any) => {
                const { date, shiftId, doctorId } = schedule;
                const { StartTime, EndTime } = convertToEvent(date, shiftId.name);
                const doctorName = doctorId.userId?.fullName || "Unknown Doctor"
                return {
                    Id: schedule._id,
                    Subject: doctorName,
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


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-blue-400 flex flex-col items-center py-8">
            <header className="text-center mb-8 text-white">
                <h1 className="text-5xl font-extrabold mb-2">Doctor Schedule Management</h1>
                <p className="text-lg">Manage your doctor shifts and schedules effortlessly</p>
            </header>
            <div className="w-full h-5/6 md:w-2/3 bg-white shadow-xl rounded-xl p-6">
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
            <Toaster position="top-center" />
        </div>
    );
};

export default SchedulePage;
