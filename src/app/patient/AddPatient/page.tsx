/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';

const AddPatient = () => {

    const [patient, setPatient] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Patient Data Submitted:", patient);
    };

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Add Patient</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Tên</label>
                        <input
                            type="text"
                            name="name"
                            value={patient.name}
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
                            value={patient.email}
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
                            value={patient.phone}
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
                            value={patient.dob}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={patient.address}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save Patient
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPatient;
