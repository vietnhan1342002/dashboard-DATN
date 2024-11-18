/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Service {
    name: string;
    department: string;
    description: string;
    price: number;
}

const EditService = () => {

    const [service, setService] = useState<Service>({
        name: '',
        department: '',
        description: '',
        price: 0,
    });

    const [loading, setLoading] = useState(false);
    const [error] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setService((prevService) => ({
            ...prevService,
            [name]: name === "price" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);


        setLoading(false);
    };

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Edit Service</h2>
                {error && <p className="text-red-500">{error}</p>}

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
                        <label className="block text-sm font-medium">Department</label>
                        <select
                            name="department"
                            value={service.department}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        >
                            <option value="">Select Department</option>
                            <option value="noi-khoa">Nội khoa</option>
                            <option value="ngoai-khoa">Ngoại khoa</option>
                            <option value="nhi-khoa">Nhi khoa</option>
                            <option value="san-phu-khoa">Sản phụ khoa</option>
                            <option value="rang-ham-mat">Răng hàm mặt</option>
                            <option value="da-lieu">Da liễu</option>
                            <option value="mat">Mắt</option>
                            <option value="tai-mui-hong">Tai mũi họng</option>

                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={service.description}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                            rows={4}
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
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading && "opacity-50"}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Service"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditService;
