"use client";

import axiosInstance from '@/app/utils/axios';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast, Toaster } from 'sonner';

const AddMedicine = () => {

    const initialMedicine = {
        name: "",
        description: "",
        usageInstructions: "",
        sideEffects: "",
        quantity: 0,
        minQuantity: 0,
        price: 0,
        unit: ""
    };

    const router = useRouter();

    const [medicine, setMedicine] = useState(initialMedicine);

    const fetchAddMedicine = async () => {
        const res = await axiosInstance.post('/medications', {
            name: medicine.name,
            description: medicine.description,
            usageInstructions: medicine.usageInstructions,
            sideEffects: medicine.sideEffects,
            quantity: medicine.quantity,
            minQuantity: medicine.minQuantity,
            price: medicine.price,
            unit: medicine.unit
        });
        console.log(res.data);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setMedicine((prevMedicine) => ({
            ...prevMedicine,
            [name]: name === "price" || name === "quantity" || name === "minQuantity" ? Number(value) : value,
        }));
    };

    const unitOptions = [
        { value: "capsule", label: "capsule" },
        { value: "tablet", label: "tablet" },
    ];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await fetchAddMedicine();
        toast.success('Add successfully');
        setTimeout(() => {
            router.back();
        }, 1000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2">
            <div className="w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-center mb-6">Add Medicine</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Medicine Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={medicine.name}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            id="description"
                            name="description"
                            value={medicine.description}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="usageInstructions" className="block text-sm font-medium text-gray-700">Usage Instructions</label>
                        <input
                            id="usageInstructions"
                            name="usageInstructions"
                            value={medicine.usageInstructions}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="sideEffects" className="block text-sm font-medium text-gray-700">Side Effects</label>
                        <input
                            id="sideEffects"
                            name="sideEffects"
                            value={medicine.sideEffects}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            id="quantity"
                            type="number"
                            name="quantity"
                            value={medicine.quantity}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="minQuantity" className="block text-sm font-medium text-gray-700">Minimum Quantity</label>
                        <input
                            id="minQuantity"
                            type="number"
                            name="minQuantity"
                            value={medicine.minQuantity}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            value={medicine.price}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit</label>
                        <select
                            id="unit"
                            name="unit"
                            value={medicine.unit}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Unit</option>
                            {unitOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Medicine
                    </button>
                </form>
                <Toaster position="top-center" />
            </div>
        </div>
    );
};

export default AddMedicine;
