/* eslint-disable @next/next/no-img-element */
"use client"

import { getDataApi } from '@/utils/fetchAPI';
import React, { useState } from 'react';

const AddDoctor = () => {
    const [specialties, setSpecialties] = useState<any[]>([]);
    const [doctor, setDoctor] = useState({
        fullname: '',
        phone: '',
        password: '',
        specialtyId: '',
        license: '',
        experienceYears: '',
    });

    const fetchSpecialties = async () => {
        try {
            const response = await getDataApi(`/specialties?current=1&pageSize=10`);
            setSpecialties(response.data.result || []);
        } catch (err) {
            console.error("Error fetching specialties:", err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDoctor((prevDoctor) => ({
            ...prevDoctor,
            [name]: value,
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Doctor Data Submitted:", doctor);
    };


    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Add Doctor</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={doctor.fullname}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone (SĐT)</label>
                        <input
                            type="text"
                            name="phone"
                            value={doctor.phone}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={doctor.password}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Specialty (Chuyên Khoa)</label>
                        <select
                            name="specialtyId"
                            value={doctor.specialtyId}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        >
                            <option value="" disabled>Select a specialty</option>
                            {specialties.map((item) => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">License (Giấy Phép Hành Nghề)</label>
                        <input
                            type="text"
                            name="license"
                            value={doctor.license}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Years of Experience (Số Năm Kinh Nghiệm)</label>
                        <input
                            type="number"
                            name="experienceYears"
                            value={doctor.experienceYears}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Save Doctor
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;
