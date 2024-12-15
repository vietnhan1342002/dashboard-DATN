/* eslint-disable @next/next/no-img-element */
"use client";

import axiosInstance from '@/app/utils/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { toast } from 'sonner';

const EditEmployee = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('id');
    const router = useRouter();

    const [roles, setRoles] = useState<any[]>([]);

    const [employee, setEmployee] = useState({
        _id: '',
        fullName: '',
        phoneNumber: '',
        roleId: {
            _id: '',
            nameRole: ''
        }
    });

    const fetchEmployeeDetail = async (userId: string) => {
        const res = await axiosInstance.get(`user-auth/${userId}`)
        setEmployee(res.data)
    }
    const fetchRole = async () => {
        const res = await axiosInstance.get('/roles')
        setRoles(res.data)
    }

    useEffect(() => {
        fetchRole()
        if (userId) { fetchEmployeeDetail(userId) }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setEmployee({
            ...employee,
            [name]: value,
        });
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(employee);
        const user = await axiosInstance.patch(`/user-auth/${employee._id}`, {
            fullName: employee.fullName,
            phoneNumber: employee.phoneNumber,
            roleId: employee.roleId,
        });
        if (user) {
            toast.success('update successfully')
            setTimeout(() => {
                router.back();
            }, 1500);
        }
    };

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={employee.fullName}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="text"
                            name="phoneNumer"
                            value={employee.phoneNumber}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Role</label>
                        <select
                            name="roleId"
                            value={employee.roleId._id}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        >
                            <option value="" disabled>Select role</option>
                            {roles.map((item) => (
                                <option key={item._id} value={item._id}>{item.nameRole}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 `}
                    >
                        Update Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
