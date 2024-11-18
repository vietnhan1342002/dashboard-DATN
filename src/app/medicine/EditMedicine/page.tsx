/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Medicine {
    name: string;
    stockDate: string;
    manufactureDate: string;
    expiryDate: string;
    price: number;
    quantity: number;
}

const EditMedicine = () => {

    const [medicine, setMedicine] = useState<Medicine>({
        name: '',
        stockDate: '',
        manufactureDate: '',
        expiryDate: '',
        price: 0,
        quantity: 0,
    });

    const [loading, setLoading] = useState(false);
    const [error] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMedicine((prevMedicine) => ({
            ...prevMedicine,
            [name]: name === "price" || name === "quantity" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate an async operation like API call
        setTimeout(() => {
            console.log("Medicine Data Updated:", medicine);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Edit Medicine</h2>
                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Tên</label>
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
                        <label className="block text-sm font-medium">Ngày Nhập Kho</label>
                        <input
                            type="date"
                            name="stockDate"
                            value={medicine.stockDate}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Ngày Sản Xuất</label>
                        <input
                            type="date"
                            name="manufactureDate"
                            value={medicine.manufactureDate}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Ngày Hết Hạn</label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={medicine.expiryDate}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Giá</label>
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
                        <label className="block text-sm font-medium">Số Lượng</label>
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
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading && "opacity-50"}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Medicine"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditMedicine;
