/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';

const AddService = () => {
    const [service, setService] = useState({

        name: '',
        description: '',
        price: '',
        category: '',
    });

    const handleChange = () => {

        setService((prevService) => ({
            ...prevService,

        }));
    };

    const handleSubmit = () => {

        console.log("Service Data Submitted:", service);

    };

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Add Service</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Service Name</label>
                        <input
                            type="text"
                            name="name"
                            value={service.name}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={service.description}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={service.price}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save Service
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddService;
