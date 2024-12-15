"use client";
import { Toaster, toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/app/utils/axios';

const EditDoctor = () => {
    const searchParams = useSearchParams();
    const _id = searchParams.get('id');

    const [formData, setFormData] = useState({
        userId: {
            _id: "",
            fullName: "",
            phoneNumber: ""
        },
        specialtyId: {
            _id: ""
        },
        licenseNumber: "",
        yearsOfExperience: "",
    });

    const [specialties, setSpecialties] = useState<any[]>([]);

    const router = useRouter();

    const fetchSpecialties = async () => {
        const res = await axiosInstance.get('/specialties?pageSize=30');
        console.log(res.data.result);
        setSpecialties(res.data.result)
    }

    const fetchDoctor = async (doctorId: string) => {
        const res = await axiosInstance.get(`/doctors/${doctorId}`);
        setFormData(res.data);
    }

    useEffect(() => {
        fetchSpecialties();
        if (_id) {
            fetchDoctor(_id)
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'fullName' || name === 'phoneNumber') {
            setFormData({
                ...formData,
                userId: {
                    ...formData.userId,
                    [name]: value,
                },
            });
        } else if (name === 'specialtyId') {
            // Cập nhật specialtyId khi chọn specialty mới
            setFormData({
                ...formData,
                specialtyId: {
                    _id: value, // Gán _id của specialty đã chọn
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.yearsOfExperience.length == 0) {
            toast.error('ao ba ba')
            return false
        }

        const dataDoctor = {
            specialtyId: formData.specialtyId._id,
            licenseNumber: formData.licenseNumber,
            yearsOfExperience: Number(formData.yearsOfExperience),
        }

        const dataUser = {
            phoneNumber: formData.userId.phoneNumber,
            fullName: formData.userId.fullName
        }

        try {
            const doctor = await axiosInstance.patch(`/doctors/${_id}`, dataDoctor);
            const user = await axiosInstance.patch(`/user-auth/${formData.userId._id}`, dataUser);
            if (doctor && user) {
                toast.success('update successfully')
                setTimeout(() => {
                    router.back();
                }, 1000);
            }
        } catch (err: any) {
            toast.error(err.response.data.message)
        }
    };


    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Edit Doctor</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.userId.fullName}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.userId.phoneNumber}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Specialty</label>
                        <select
                            name="specialtyId"
                            value={formData.specialtyId?._id || ''}
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
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleChange}

                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Years of Experience (Số Năm Kinh Nghiệm)</label>
                        <input
                            type="number"
                            name="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}

                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 `}

                    >
                        Update Doctor
                    </button>
                </form>
            </div >
            <Toaster position='top-center' />
        </div >
    );
};

export default EditDoctor;