"use client";
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, FormEvent } from 'react';
import axiosInstance from '@/app/utils/axios';

const DoctorProfile = () => {
    const router = useRouter();
    const [doctorId, setDoctorId] = useState("");
    const userId = localStorage.getItem("userId");
    const [doctorData, setDoctorData] = useState({
        avatar: '',
        userId: {
            fullName: '',
            phoneNumber: '',
        },
        specialtyId: {
            name: ''
        },
        licenseNumber: '',
        yearsOfExperience: '',
    });

    const [formData, setFormData] = useState({
        userId: {
            fullName: "",
            phoneNumber: "",
        },
    });

    const fetchDoctorId = async (userId: string) => {
        try {
            const res = await axiosInstance.get(`/doctors/user/${userId}`);
            setDoctorId(res.data._id);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to fetch doctor ID');
        }
    };

    const fetchDoctor = async (doctorId: string) => {
        try {
            const res = await axiosInstance.get(`/doctors/${doctorId}`);
            setDoctorData(res.data);
            setFormData({
                userId: {
                    fullName: res.data.userId.fullName,
                    phoneNumber: res.data.userId.phoneNumber,
                },
            });

        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to fetch doctor profile');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'avatar') {
            setFormData(prevState => ({
                ...prevState,
                avatar: value,
            }));
        }
        else if (name === 'fullName' || name === 'phoneNumber') {
            setFormData(prevState => ({
                ...prevState,
                userId: {
                    ...prevState.userId,
                    [name]: value,
                }
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const user = await axiosInstance.patch(`/user-auth/${userId}`, {
                fullName: formData.userId.fullName,
                phoneNumber: formData.userId.phoneNumber,
                roleId: '673d935335e97c832bfa6356'
            });

            if (user) {
                toast.success('Update successfully');
                setTimeout(() => {
                    router.back();
                }, 1500);
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data?.message || 'An error occurred while updating the profile.');
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        }
    };

    useEffect(() => {
        if (userId) fetchDoctorId(userId);
    }, [userId]);

    useEffect(() => {
        if (doctorId) fetchDoctor(doctorId);
    }, [doctorId]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-400 to-blue-500">
            <div className="w-full max-w-5xl bg-white border border-gray-300 rounded-lg p-8 shadow-2xl">
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                    Doctor Profile
                </h2>

                {/* Avatar và thông tin chung */}
                <form onSubmit={handleSubmit}>
                    {/* Avatar and information */}
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Avatar */}
                        <div className="flex-shrink-0 flex justify-center lg:justify-start">
                            {doctorData.avatar ? (
                                <img
                                    src={doctorData.avatar}
                                    alt="Doctor Avatar"
                                    className="w-52 h-52 lg:w-72 lg:h-72 object-cover rounded-full shadow-lg"
                                />
                            ) : (
                                <div className="w-52 h-52 lg:w-72 lg:h-72 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                    No Avatar
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Full Name</label>
                                    <input
                                        className="w-full text-lg font-semibold text-gray-800 border rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        name="fullName"
                                        value={formData.userId.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                                    <input
                                        className="w-full text-lg font-semibold text-gray-800 border rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.userId.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Specialty</label>
                                    <p className="w-full text-lg font-semibold text-gray-800 border rounded-lg p-4 bg-gray-200">
                                        {doctorData.specialtyId.name}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">License Number</label>
                                    <p className="w-full text-lg font-semibold text-gray-800 border rounded-lg p-4 bg-gray-200">
                                        {doctorData.licenseNumber}
                                    </p>
                                </div>
                            </div>

                            {/* Highlighted Years of Experience */}
                            <div className="mt-10">
                                <div className="border border-blue-500 bg-blue-100 rounded-lg p-6 text-center shadow-md">
                                    <label className="block text-xl font-bold text-blue-700 mb-2 uppercase">
                                        Years of Experience
                                    </label>
                                    <p className="text-3xl font-extrabold text-blue-800">{doctorData.yearsOfExperience}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => router.back()}
                        className="bg-indigo-600 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default DoctorProfile;
