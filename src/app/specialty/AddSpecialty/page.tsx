/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';

const AddSpecialty = () => {
    const [specialty, setSpecialty] = useState({
        name: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSpecialty((prevSpecialty) => ({
            ...prevSpecialty,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Specialty Data Submitted:", specialty);
    };

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Add Specialty</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Specialty Name</label>
                    <input
                        type="text"
                        name="name"
                        value={specialty.name}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={specialty.description}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 w-full"

                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save Specialty
                </button>
            </form>
        </div>
    );
};

export default AddSpecialty;
