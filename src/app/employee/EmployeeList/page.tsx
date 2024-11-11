/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Sample data for demonstration; in a real application, this would come from an API
const employeesData = [
    {
        id: 101,
        firstName: 'John',
        phone: '1234567890',
        email: 'johndoe@example.com',
        dob: '15/06/1990',
        role: 'Manager',
    },
    {
        id: 102,
        firstName: 'Jane',
        phone: '0987654321',
        email: 'janesmith@example.com',
        dob: '22/11/1985',
        role: 'Accountant',
    },
    // Add more employee entries here for testing pagination
];

const EmployeeList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleEdit = () => {
        console.log("Edit employee with ID:");
    };

    const handleDelete = () => {
        console.log("Delete employee with ID:");
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = employeesData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(employeesData.length / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className='flex'>
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Employees</h2>

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
                            <th className="px-6 py-3 text-left">First Name</th>
                            <th className="px-6 py-3 text-left">Phone</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">DOB</th>
                            <th className="px-6 py-3 text-left">Role</th>
                            <th className="px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.map((employee, index) => (
                            <tr key={employee.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4">{employee.id}</td>
                                <td className="px-6 py-4">{employee.firstName}</td>
                                <td className="px-6 py-4">{employee.phone}</td>
                                <td className="px-6 py-4">{employee.email}</td>
                                <td className="px-6 py-4">{employee.dob}</td>
                                <td className="px-6 py-4">{employee.role}</td>
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
                    <Link href="/employee/AddEmployee">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Employee</button>
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
        </div>
    );
};

export default EmployeeList;
