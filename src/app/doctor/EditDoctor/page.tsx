"use client";
import { Toaster, toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/app/utils/axios';

const EditDoctor = () => {
    const searchParams = useSearchParams();
    const _id = searchParams.get('id');

    const [formData, setFormData] = useState({
        avatar: '' as string | File, // Lưu file hoặc URL
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

    useEffect(() => {
        const fetchSpecialties = async () => {
            const res = await axiosInstance.get('/specialties?pageSize=30');
            setSpecialties(res.data.result);
        };

        const fetchDoctor = async (doctorId: string) => {
            const res = await axiosInstance.get(`/doctors/${doctorId}`);
            console.log(res.data);

            setFormData(res.data);
        };
        fetchSpecialties();
        if (_id) fetchDoctor(_id);
    }, [_id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'avatar' && e.target instanceof HTMLInputElement) {
            const files = e.target.files;
            if (files && files[0]) {
                setFormData({
                    ...formData,
                    avatar: files[0], // Lưu tệp avatar vào formData
                });
            }
        } else if (name === 'fullName' || name === 'phoneNumber') {
            setFormData({
                ...formData,
                userId: {
                    ...formData.userId,
                    [name]: value,
                },
            });
        } else if (name === 'specialtyId') {
            setFormData({
                ...formData,
                specialtyId: {
                    _id: value,
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
        if (!formData.yearsOfExperience || Number(formData.yearsOfExperience) <= 0) {
            toast.error('Years of experience must be a positive number');
            return;
        }

        const formDataToSend = new FormData();
        // Chỉ thêm avatar nếu người dùng đã thay đổi ảnh
        if (formData.avatar && formData.avatar instanceof File) {
            formDataToSend.append('avatar', formData.avatar); // Thêm file avatar
        }

        formDataToSend.append('specialtyId', formData.specialtyId._id);
        formDataToSend.append('licenseNumber', formData.licenseNumber);
        formDataToSend.append('yearsOfExperience', String(formData.yearsOfExperience));

        const userData = {
            phoneNumber: formData.userId.phoneNumber,
            fullName: formData.userId.fullName,
            roleId: "673d935335e97c832bfa6356"
        };

        try {
            const doctorResponse = await axiosInstance.patch(`/doctors/${_id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const userResponse = await axiosInstance.patch(`/user-auth/${formData.userId._id}`, userData);
            if (doctorResponse && userResponse) {
                toast.success('Update successfully');
            }
            router.back();
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        }
    };


    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Edit Doctor</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Avatar</label>
                        {/* Hiển thị ảnh nếu có avatar */}
                        {formData.avatar && (
                            <img
                                src={formData.avatar as string}  // Use the avatar URL directly
                                alt="Avatar Preview"
                                className="w-32 h-32 object-cover rounded mb-4"
                            />
                        )}
                        <input
                            type="file"
                            name="avatar"
                            accept="image/jpeg, image/jpg"
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
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
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Update Doctor
                    </button>
                </form>
            </div>
            <Toaster position='top-center' />
        </div>
    );
};

export default EditDoctor;
