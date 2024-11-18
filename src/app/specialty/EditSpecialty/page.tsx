/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Specialty {
    name: string;
    description: string;
}

const EditSpecialty = () => {
    const [specialty, setSpecialty] = useState<Specialty>({
        name: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [error] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSpecialty((prevSpecialty) => ({
            ...prevSpecialty,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulating a delay, replace with actual API call logic
        setTimeout(() => {
            setLoading(false);
            console.log("Specialty Data Updated:", specialty);
        }, 1000);
    };

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Edit Specialty</h2>
                {error && <p className="text-red-500">{error}</p>}

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
                        <textarea
                            name="description"
                            value={specialty.description}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                            rows={4}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading && "opacity-50"}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Specialty"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditSpecialty;
