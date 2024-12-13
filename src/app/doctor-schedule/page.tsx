'use client'

export default function DoctorSchedule() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
                Doctor Schedule Management
            </h1>

            {/* Form Section */}
            <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Create a New Schedule</h2>
                <form className="space-y-4">
                    {/* Doctor Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="doctorName">
                            Doctor Name
                        </label>
                        <input
                            type="text"
                            id="doctorName"
                            name="doctorName"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter doctor's name"
                            required
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Time Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="startTime">
                                Start Time
                            </label>
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="endTime">
                                End Time
                            </label>
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Optional notes"
                        />
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
