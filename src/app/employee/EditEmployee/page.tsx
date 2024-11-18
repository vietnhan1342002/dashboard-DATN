/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';


const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        id: '',
        fullName: '',
        phone: '',
        email: '',
        dob: '',
        role: 'admin',
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: name === "experienceYears" ? Number(value) : value,
        }));
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

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
                            name="phone"
                            value={employee.phone}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={employee.dob}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Role</label>
                        <select
                            name="role"
                            value={employee.role}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        >
                            <option value="admin">Admin</option>
                            <option value="doctor">Doctor</option>
                            <option value="receptionist">Receptionist</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${loading && "opacity-50"}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Employee"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
