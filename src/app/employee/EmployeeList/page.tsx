'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setEmployees, setLoading, setError } from '@/redux/store/employeeSlice';
import axiosInstance from '@/app/utils/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const employees = useSelector((state: RootState) => state.employees.employees);
    const loading = useSelector((state: RootState) => state.employees.loading);
    const error = useSelector((state: RootState) => state.employees.error);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const pageSize = 5;

    const fetchEmployees = async (currentPage: number) => {
        dispatch(setLoading(true));
        dispatch(setError(null)); // Reset lỗi trước khi fetch
        try {
            const response = await axiosInstance.get(`/user-auth/employee?current=${currentPage}&pageSize=${pageSize}`);
            const { result, totalPages } = response.data; // Truy cập vào dữ liệu trả về từ API
            setTotalPages(totalPages);
            dispatch(setEmployees(result));
        } catch (err) {
            dispatch(setError('Failed to fetch employees'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchEmployees(currentPage);
    }, [dispatch, currentPage]);

    const handleEdit = (employeeId: string) => {
        router.push(`/employee/EditEmployee?id=${employeeId}`);
    };

    const handleDelete = (employeeId: string) => {
        console.log('Delete employee with ID:', employeeId);
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
                {loading && <p>Loading employees...</p>}
                {error && <p className="text-red-500">{error}</p>} {/* Hiển thị lỗi nếu có */}

                {!loading && !error && (
                    <>
                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                placeholder="Search"
                                className="border rounded p-2 flex-grow mr-2"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
                        </div>

                        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-6 py-3 text-left">ID</th>
                                    <th className="px-6 py-3 text-left">Full Name</th>
                                    <th className="px-6 py-3 text-left">Phone</th>
                                    <th className="px-6 py-3 text-left">Role</th>
                                    <th className="px-6 py-3 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((employee, index) => (
                                    <tr key={employee._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4">{employee._id}</td>
                                        <td className="px-6 py-4">{employee.fullName}</td>
                                        <td className="px-6 py-4">{employee.phoneNumber}</td>
                                        <td className="px-6 py-4">{employee.roleId?.nameRole || 'N/A'}</td>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default EmployeeList;
