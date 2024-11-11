/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState } from 'react';


const AddDoctor = () => {
    const [doctor, setDoctor] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        gender: '',
        address: '',
        phone: '',
        department: '',
        image: '',
    });

    const handleChange = () => {

        setDoctor((prevDoctor) => ({
            ...prevDoctor,

        }));
    };

    const handleImageChange = () => {

    };

    const handleUploadClick = () => {

    };



    const handleSubmit = () => {

        console.log("Doctor Data Submitted:", doctor);

    };

    return (
        <div className="flex">

            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Add Doctor</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={doctor.firstName}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={doctor.lastName}
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
                            value={doctor.email}
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
                            value={doctor.dob}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Gender</label>
                        <select
                            name="gender"
                            value={doctor.gender}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={doctor.address}
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
                            value={doctor.phone}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={doctor.department}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Image</label>
                        <input
                            type="file"
                            accept="image/*"

                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <button
                            type="button"
                            onClick={handleUploadClick}
                            className="text-sm border border-gray-400 text-gray-700 px-2 py-1 rounded hover:border-gray-500"
                        >
                            Upload Image
                        </button>

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