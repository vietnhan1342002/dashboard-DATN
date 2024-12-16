'use client'

import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { useSearchParams } from "next/navigation";

export default function DoctorSchedule() {
    const initialSchedule = {
        doctorId: {
            _id: "",
            userId: {
                _id: "",
                fullName: "",
                phoneNumber: ""
            }
        },
        shiftId: {
            _id: "",
            name: ""
        },
        date: ""
    }
    const [schedule, setSchedule] = useState(initialSchedule)
    const [shifts, setShifts] = useState<any[]>([]);

    const searchParams = useSearchParams();
    const userId = searchParams.get('id');

    const fetchShift = async () => {
        const res = await axiosInstance.get('/shifts')
        setShifts(res.data.result);
    }

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
            // Cập nhật cho các trường khác (bao gồm cả date)
            setSchedule((prevSchedule) => ({
                ...prevSchedule,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        fetchShift()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('schedule', schedule);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
                Doctor Schedule Management
            </h1>

            {/* Form Section */}
            <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Create a New Schedule</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={schedule.date} // Gắn giá trị từ state
                            onChange={handleChange} // Xử lý sự kiện thay đổi
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Time Range */}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Schedule
                    </button>
                </form>
            </div>

            {/* Schedule List */}
            <div className="max-w-5xl mx-auto mt-12">
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">Schedules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder schedule item */}
                    <div className="bg-white p-4 shadow-md rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">Dr. John Doe</h3>
                        <p className="text-gray-600"><strong>Date:</strong> 2024-12-14</p>
                        <p className="text-gray-600"><strong>Time:</strong> 9:00 AM - 5:00 PM</p>
                        <p className="text-gray-600"><strong>Notes:</strong> Available for consultation</p>
                    </div>

                    {/* Add more placeholder items here */}
                    <div className="bg-white p-4 shadow-md rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">Dr. Jane Smith</h3>
                        <p className="text-gray-600"><strong>Date:</strong> 2024-12-15</p>
                        <p className="text-gray-600"><strong>Time:</strong> 10:00 AM - 3:00 PM</p>
                        <p className="text-gray-600"><strong>Notes:</strong> Surgery and check-ups</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
