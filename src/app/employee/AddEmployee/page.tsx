/* eslint-disable @next/next/no-img-element */
"use client";

import axiosInstance from '@/app/utils/axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        fullName: '',
        phoneNumber: '',
        password: '',
        roleId: {
            _id: '',
            nameRole: ''
        },
    });

    useEffect(() => {
        fetchRole()
    }, [])

    const router = useRouter();

    const [roles, setRoles] = useState<any[]>([]);

    const fetchRole = async () => {
        const res = await axiosInstance.get('/roles')
        setRoles(res.data)
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await axiosInstance.post('/user-auth', {
            fullName: employee.fullName,
            phoneNumber: employee.phoneNumber,
            password: employee.password,
            roleId: employee.roleId
        })
        const doctor = await axiosInstance.get(`/doctors/user/${res.data._id}`)
        if (doctor) {
            toast.success('update successfully')
            setTimeout(() => {
                router.push(`/doctor/EditDoctor?id=${doctor.data._id}`)
            }, 2000)
        }
    };

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>

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
                            name="phoneNumber"
                            value={employee.phoneNumber}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="text"
                            name="password"
                            value={employee.password}
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
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Save Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
