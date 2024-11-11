/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from "react";

const Dashboard = () => {
    const [admin] = useState();
    return (
        <div className="ml-[70px] p-4 bg-blue-50 h-full absolute top-0 left-0 z-20 rounded-l-2xl overflow-hidden" style={{ width: 'calc(100vw - 70px)' }}>
            {/* Header Section */}
            <div className="flex space-x-4 mb-6">
                {/* Greeting Card */}
                <div className="bg-purple-200 flex-1 p-16 rounded-lg shadow-lg flex items-center space-x-4">
                    <img src="/doc.png" alt="Doctor" className="w-16 h-16 rounded-full" />
                    <div>
                        <h2 className="text-lg font-semibold text-purple-800">
                            Hello, <span className="text-purple-600">{admin}</span>
                        </h2>
                        <p className="text-sm text-purple-700">Welcome to your dashboard. Here you can manage appointments and doctors.</p>
                    </div>
                </div>
                {/* Statistics Cards */}
                <div className="flex space-x-4">
                    <div className="bg-blue-500 text-white p-16 rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                            <p>Total Appointments</p>
                            <p className="text-2xl font-semibold">1500</p>
                        </div>
                    </div>
                    <div className="bg-white text-black p-16 rounded-lg shadow-lg flex items-center justify-center">
                        <div className="text-center">
                            <p>Registered Doctors</p>
                            <p className="text-2xl font-semibold">10</p>
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
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">Doctor</th>
                            <th className="p-3 border">Department</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Visited</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-3 border">FirstName</td>
                            <td className="p-3 border">Date</td>
                            <td className="p-3 border">First Name Doctor</td>
                            <td className="p-3 border">Department</td>
                            <td className="p-3 border">
                                <select className="p-1 border rounded">
                                    <option>Pending</option>
                                    <option>Completed</option>
                                </select>
                            </td>
                            <td className="p-3 border flex justify-center space-x-2">
                                <span className="text-green-500">&#10004;</span>
                                <span className="text-red-500">&#10008;</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 text-center text-gray-500">
                                No Appointments Found!
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
