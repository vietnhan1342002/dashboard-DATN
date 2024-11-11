/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';

const AddMedicine = () => {

    const [medicine, setMedicine] = useState({
        name: '',
        saledate: '',
        expirydate: '',
        price: '',
        quantity: '',
    });

    const handleChange = () => {

        setMedicine((prevMedicine) => ({
            ...prevMedicine,

        }));
    };

    const handleSubmit = () => {

        console.log("Medicine Data Submitted:", medicine);

    };


    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Add Medicine</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Medicine Name</label>
                        <input
                            type="text"
                            name="name"
                            value={medicine.name}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Sale Date</label>
                        <input
                            type="date"
                            name="saledate"
                            value={medicine.saledate}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Expiry Date</label>
                        <input
                            type="date"
                            name="expirydate"
                            value={medicine.expirydate}
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
                            value={medicine.price}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={medicine.quantity}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save Medicine
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMedicine;
