/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import axiosInstance from '@/app/utils/axios';

interface Specialty {
    departmentName: string;
    description: string;
}

const EditSpecialty = () => {
    const [specialty, setSpecialty] = useState<Specialty>({
        departmentName: '',
        description: '',
    });

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const departmentId = searchParams.get('id'); // Lấy ID từ URL

    useEffect(() => {
        const fetchSpecialty = async () => {
            if (!departmentId) {
                setError('No ID provided.');
                return;
            }

            try {
                const response = await axiosInstance.get(
                    `http://localhost:8080/api/v1/departments/${departmentId}`
                );
                console.log(response.data);

                setSpecialty(response.data); // Đảm bảo API trả về đúng định dạng
            } catch (err) {
                console.error('Error fetching specialty:', err);
                setError('Failed to fetch specialty details.');
            }
        };

        fetchSpecialty();
    }, [departmentId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSpecialty((prevSpecialty) => ({
            ...prevSpecialty,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!departmentId) {
            setError('Invalid ID.');
            return;
        }
        try {
            await axiosInstance.patch(
                `http://localhost:8080/api/v1/departments/${departmentId}`,
                {
                    departmentName: specialty.departmentName,
                    description: specialty.description
                }
            );
            console.log('Specialty updated:', specialty);
            toast.success('Update successly')
            setTimeout(() => {
                router.back();
            }, 1500);
        } catch (err) {
            console.error('Error updating specialty:', err);
        }
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
                            name="departmentName"
                            value={specialty.departmentName}
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
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600`}

                    >
                        Update Specialty
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditSpecialty;
