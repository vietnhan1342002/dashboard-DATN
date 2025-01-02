'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setEmployees, setLoading, setError } from '@/redux/store/employeeSlice';
import axiosInstance from '@/app/utils/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const employees = useSelector((state: RootState) => state.employees.employees);

    const error = useSelector((state: RootState) => state.employees.error);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const pageSize = 10;

    const fetchEmployees = async (currentPage: number) => {
        try {
            const response = await axiosInstance.get(`/user-auth/employee?current=${currentPage}&pageSize=${pageSize}`);
            const { result, totalPages } = response.data; // Truy cập vào dữ liệu trả về từ API
            setTotalPages(totalPages);
            dispatch(setEmployees(result));
        } catch (err) {
            toast.error('Failed to fetch employees')
        }
    };

    const fetchDeleteEmployee = async (employeeId: string) => {
        const response = await axiosInstance.delete(`/user-auth/${employeeId}`)
        console.log(response.data);
        if (response) {
            toast.success("Successfully deleted")
            fetchEmployees(currentPage)
        }
    }

    useEffect(() => {
        fetchEmployees(currentPage);
    }, [dispatch, currentPage]);

    const handleEdit = (employeeId: string) => {
        router.push(`/employee/EditEmployee?id=${employeeId}`);
    };

    const handleDelete = (employeeId: string) => {
        console.log('Delete employee with ID:', employeeId);
        fetchDeleteEmployee(employeeId)
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.phoneNumber.includes(searchQuery) ||
        employee.roleId?.nameRole?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Employees</h2>
                <div className="flex items-center justify-between mb-6 bg-gray-100 p-4 rounded shadow">
                    {/* Search Input */}
                    <div className="flex items-center flex-grow gap-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border border-gray-300 rounded-l p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button
                            onClick={() => setSearchQuery("")}
                            className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600 transition"
                        >
                            Clear
                        </button>
                    </div>
                    <Link href="/employee/AddEmployee">
                        <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                            Add Employee
                        </button>
                    </Link>
                </div>

                <div className="flex justify-between my-4">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    >
                        Previous
                    </button>
                    <span className="self-center">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    >
                        Next
                    </button>
                </div>

                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left">No.</th> {/* Thêm cột No. */}
                            <th className="px-6 py-3 text-left">Full Name</th>
                            <th className="px-6 py-3 text-left">Phone</th>
                            <th className="px-6 py-3 text-left">Role</th>
                            <th className="px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee, index) => (
                            <tr key={employee._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4">{(currentPage - 1) * pageSize + index + 1}</td> {/* Hiển thị số thứ tự */}
                                <td className="px-6 py-4">{employee.fullName}</td>
                                <td className="px-6 py-4">{employee.phoneNumber}</td>
                                <td className="px-6 py-4">
                                    {employee.roleId?.nameRole ? employee.roleId.nameRole.charAt(0).toUpperCase() + employee.roleId.nameRole.slice(1) : 'No data available'}
                                </td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(employee._id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(employee._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
