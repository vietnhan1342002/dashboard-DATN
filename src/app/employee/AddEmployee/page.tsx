/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';


const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        id: '',
        firstName: '',
        phone: '',
        email: '',
        dob: '',
        role: '',
    });

    const handleChange = () => {

        setEmployee((prevEmployee) => ({
            ...prevEmployee,

        }));
    };

    const handleSubmit = () => {

        console.log("Employee Data Submitted:", employee);
    };

    return (
        <div className="flex">

            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={employee.firstName}
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
                        <input
                            type="text"
                            name="role"
                            value={employee.role}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
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
