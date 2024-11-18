/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Patient {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
}

const EditPatient = () => {

    const [patient, setPatient] = useState<Patient>({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
    });

    const [loading, setLoading] = useState(false);
    const [error] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            console.log("Patient Data Updated:", patient);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Edit Patient</h2>
                {error && <p className="text-red-500">{error}</p>}

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
                        <label className="block text-sm font-medium">Số Điện Thoại</label>
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
                        <label className="block text-sm font-medium">Ngày Sinh</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={patient.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Địa Chỉ</label>
                        <textarea
                            name="address"
                            value={patient.address}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading && "opacity-50"}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Patient"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPatient;
