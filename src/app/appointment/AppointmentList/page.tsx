/* eslint-disable @next/next/no-img-element */
"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const appointmentsData = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        dob: '1-01-1995',
        address: 'Ngũ Hành Sơn, Đà Nẵng',
        service: 'Xét nghiệm máu',
        doctorName: 'Dr. Trần Văn B',
        date: '2024-11-15',
        time: '10:30 AM',
    },
    {
        id: 2,
        name: 'Trần Thị C',
        email: 'tranthic@example.com',
        phone: '0987654321',
        dob: '20-03-2002',
        address: 'Sơn Trà, Đà Nẵng',
        service: 'Chụp X-quang',
        doctorName: 'Dr. Phạm Văn D',
        date: '2024-11-16',
        time: '2:00 PM',
    },
    // Add more appointment data as needed
];

const recordsPerPage = 5;

const AppointmentList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Lọc danh sách dựa trên giá trị tìm kiếm
    const filteredAppointments = appointmentsData.filter((appointment) =>
        Object.values(appointment).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentAppointments = filteredAppointments.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredAppointments.length / recordsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEdit = () => {
        console.log("Edit appointment with ID:");
    };

    const handleDelete = () => {
        console.log("Delete appointment with ID:");
    };

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Appointments</h2>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="border rounded p-2 flex-grow mr-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    onClick={() => setCurrentPage(1)} // Reset về trang đầu sau khi tìm kiếm
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Phone</th>
                        <th className="px-6 py-3 text-left">Date of birth</th>
                        <th className="px-6 py-3 text-left">Address</th>
                        <th className="px-6 py-3 text-left">Service</th>
                        <th className="px-6 py-3 text-left">Doctor Name</th>
                        <th className="px-6 py-3 text-left">Date</th>
                        <th className="px-6 py-3 text-left">Time</th>
                        <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAppointments.map((appointment, index) => (
                        <tr key={appointment.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4">{appointment.id}</td>
                            <td className="px-6 py-4">{appointment.name}</td>
                            <td className="px-6 py-4">{appointment.email}</td>
                            <td className="px-6 py-4">{appointment.phone}</td>
                            <td className="px-6 py-4">{appointment.dob}</td>
                            <td className="px-6 py-4">{appointment.address}</td>
                            <td className="px-6 py-4">{appointment.service}</td>
                            <td className="px-6 py-4">{appointment.doctorName}</td>
                            <td className="px-6 py-4">{appointment.date}</td>
                            <td className="px-6 py-4">{appointment.time}</td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    onClick={() => handleEdit()}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleDelete()}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Cancle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-end">
                <Link href="/appointment/AddAppointment">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Appointment</button>
                </Link>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-gray-700">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AppointmentList;
