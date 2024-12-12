"use client";
import { Toaster, toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchDoctorDetail } from '@/redux/store/doctorSlice';
import { setLoading } from '@/redux/store/specialtiesSlice';
import { patchDataApi } from '@/utils/fetchAPI';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const EditDoctor = () => {

    const searchParams = useSearchParams();
    const _id = searchParams.get('id');
    const { doctorDetail } = useAppSelector(state => state.doctors);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.specialties.loading);
    const [specialties, setSpecialties] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        specialtyId: "",
        license: "",
        experienceYears: "",
    });

    // Fetch doctor detail and specialties
    useEffect(() => {
        dispatch(fetchDoctorDetail(_id as string));
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/specialties?current=1&pageSize=10`);
                setSpecialties(response.data.result || []);
            } catch (err) {
                console.error("Error fetching specialties:", err);
            }
        };

        fetchSpecialties();
    }, [_id, dispatch]);

    // Sync doctor detail with formData
    useEffect(() => {
        if (doctorDetail) {
            setFormData({
                fullName: doctorDetail.userId?.fullName || '',
                phoneNumber: doctorDetail.userId?.phoneNumber || '',
                specialtyId: doctorDetail.specialtyId?._id || '',
                license: doctorDetail.licenseNumber || '',
                experienceYears: doctorDetail.yearsOfExperience?.toString() || '',
            });
        }
    }, [doctorDetail]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        if (formData.experienceYears.length == 0) {
            toast.error('ao ba ba')
            return false
        }
        const accessToken = localStorage.getItem('accessToken');

        const dataDoctor = {
            specialtyId: formData.specialtyId,
            licenseNumber: formData.license,
            yearsOfExperience: Number(formData.experienceYears),
        }

        const dataUser = {
            phoneNumber: formData.phoneNumber,
            fullName: formData.fullName
        }
        if (doctorDetail)
            try {
                const doctor = await patchDataApi(`/doctors/${_id}`, dataDoctor, accessToken as string);
                const user = await patchDataApi(`/user-auth/${doctorDetail.userId._id}`, dataUser, accessToken as string);
                if (doctor && user) {
                    toast.success('update successfully')
                }
            } catch (err: any) {

                toast.error(err.response.data.message)

            } finally {
                setLoading(false);
            }
    };

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Edit Doctor</h2>
                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone (SĐT)</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Specialty (Chuyên Khoa)</label>
                        <select
                            name="specialtyId"
                            value={formData.specialtyId}
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
                            name="license"
                            value={formData.license}
                            onChange={handleChange}

                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Years of Experience (Số Năm Kinh Nghiệm)</label>
                        <input
                            type="number"
                            name="experienceYears"
                            value={formData.experienceYears}
                            onChange={handleChange}

                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${loading && "opacity-50"}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Doctor"}
                    </button>
                </form>
            </div>
            <Toaster position='top-right' />
        </div>
    );
};

export default EditDoctor;