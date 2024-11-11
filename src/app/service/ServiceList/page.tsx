/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const servicesData = [
    { id: 1, name: 'Xét nghiệm máu', description: 'Kiểm tra tổng quát các chỉ số máu', price: '500,000 VND' },
    { id: 2, name: 'Chụp X-quang', description: 'Chụp X-quang vùng ngực', price: '1,000,000 VND' },
    { id: 3, name: 'Chụp CT', description: 'Chụp cắt lớp vi tính', price: '2,000,000 VND' },
    { id: 4, name: 'Siêu âm', description: 'Siêu âm bụng', price: '600,000 VND' },
    { id: 5, name: 'Xét nghiệm nước tiểu', description: 'Kiểm tra tổng quát nước tiểu', price: '300,000 VND' },
    { id: 6, name: 'Khám tổng quát', description: 'Khám tổng quát sức khỏe', price: '800,000 VND' },
    // Add more services for testing pagination
];

const ServiceList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const handleEdit = () => {
        console.log("Edit service with ID:");
    };

    const handleDelete = () => {
        console.log("Delete service with ID:");
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentServices = servicesData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(servicesData.length / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Services</h2>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="border rounded p-2 flex-grow mr-2"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
            </div>

            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Service Name</th>
                        <th className="px-6 py-3 text-left">Description</th>
                        <th className="px-6 py-3 text-left">Price</th>
                        <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentServices.map((service, index) => (
                        <tr key={service.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4">{service.id}</td>
                            <td className="px-6 py-4">{service.name}</td>
                            <td className="px-6 py-4">{service.description}</td>
                            <td className="px-6 py-4">{service.price}</td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    onClick={() => handleEdit()}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete()}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-end">
                <Link href="/service/AddService">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Service</button>
                </Link>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span>Page {currentPage} of {totalPages}</span>

                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ServiceList;
