/* eslint-disable @next/next/no-img-element */
"use client";

import axiosInstance from '@/app/utils/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { toast } from 'sonner';


const EditPatient = () => {
    const searchParams = useSearchParams();
    const patientId = searchParams.get('id');
    const router = useRouter();


    const [patient, setPatient] = useState({
        userId: {
            _id: "",
            fullName: "",
            phoneNumber: ""
        },
        address: "",
        dateOfBirth: "",
        gender: ""
    });

    const [error] = useState<string | null>(null);


    const fetchPatient = async (patientId: string) => {
        try {
            const response = await axiosInstance.get(`http://localhost:8080/api/v1/patients/${patientId}`);
            const patient = response.data;
            console.log('patient', patient);
            if (patient.dateOfBirth) {
                const formattedDate = patient.dateOfBirth.split('T')[0];
                patient.dateOfBirth = formattedDate;
                console.log('patient.dateOfBirth', patient.dateOfBirth);
            }
            setPatient(patient);
        } catch (error) {
            toast.error('Error')
            console.error('Error fetching patient data:', error);
        }
    }

    const fetchUpdatePatient = async (patientId: string) => {
        try {
            const res = await axiosInstance.patch(`http://localhost:8080/api/v1/patients/${patientId}`, {
                patient: {
                    dateOfBirth: patient.dateOfBirth,
                    address: patient.address,
                    gender: patient.gender,
                },
                userAuth: {
                    fullName: patient.userId.fullName,
                }
            });
            fetchPatient(patientId);
            toast.success('Patient data updated');
        } catch (error) {
            toast.error('Error updating patient data');
            console.error('Error updating patient data:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setPatient((prev) => {
            if (name === 'fullName' || name === 'phoneNumber') {
                return {
                    ...prev,
                    userId: {
                        ...prev.userId,
                        [name]: value,
                    },
                };
            }
            return {
                ...prev,
                [name]: value,
            };
        });
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('patient', patient);
        if (patientId) {
            fetchUpdatePatient(patientId);
        }
        toast.success('Update successly!')
        setTimeout(() => {
            router.back()
        }, 2000);
    };

    useEffect(() => {
        if (patientId) {
            fetchPatient(patientId);
        }
    }, [patientId]);

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Edit Patient</h2>
                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Tên</label>
                        <input
                            type="text"
                            name="fullName"
                            value={patient.userId.fullName}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Số Điện Thoại</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={patient.userId.phoneNumber}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Ngày Sinh</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={patient.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Địa Chỉ</label>
                        <input
                            name="address"
                            value={patient.address}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600`}
                    >Update Patient
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPatient;
