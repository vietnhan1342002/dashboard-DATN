// pages/medicalrecord/edit.tsx
"use client";

import axiosInstance from '@/app/utils/axios';
import { formatDateTime } from '@/app/utils/format';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

interface User {
    _id: string;
    fullName: string;
    phoneNumber: string;
}

interface Doctor {
    _id: string;
    userId: User;
}

interface Appointment {
    _id: string;
    appointmentDate: string;
}

interface MedicalRecord {
    _id: string;
    patientId: {
        _id: string;
        userId: User;
    };
    doctorId: Doctor;
    appointmentId: Appointment;
    diagnosis: string;
    note: string;
}

const MedicalRecordEdit = () => {
    const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
    const [diagnosis, setDiagnosis] = useState("");
    const [note, setNote] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const fetchMedicalRecord = async (id: string) => {
        try {
            console.log(id);
            const res = await axiosInstance.get(`/medical-records/appointment/${id}`);
            if (res.data.length !== 0) {
                console.log(res);
                const medicalId = res.data._id;
                console.log("medicalId", medicalId);
                const medical = await axiosInstance.get(`/medical-records/${medicalId}`);
                console.log(medical);
                setMedicalRecord(medical.data);
                setDiagnosis(medical.data.diagnosis);
                setNote(medical.data.note);
            }
        } catch (error) {
            toast.error('Error fetching medical record');
        }
    };

    const fetchCreateDetail = async (medicalRecordId: string) => {
        try {
            const res = await axiosInstance.post(`/detail-medical-record/`, {
                medicalRecordId: medicalRecordId
            });
            console.log(res.data);
            router.push(`/medicalrecord/MedicalRecordDetail?id=${medicalRecordId}`);
        } catch (error) {
            toast.error('Error creating detail medical record');
        }
    };

    const fetchDetailMedicalRecord = async (medicalRecordId: string) => {
        try {
            const res = await axiosInstance.get(`/detail-medical-record/medical-record/${medicalRecordId}`);
            if (res.data) {
                router.push(`/medicalrecord/MedicalRecordDetail?id=${medicalRecordId}`);
            } else {
                fetchCreateDetail(medicalRecordId);
                router.push(`/medicalrecord/MedicalRecordDetail?id=${medicalRecordId}`);
            }
        } catch (error) {
            console.error('Error fetching detail medical record:', error);
            toast.error('Error fetching detail medical record');
        }
    };

    const handleSave = async () => {
        if (medicalRecord) {
            try {
                const res = await axiosInstance.put(`/medical-records/${medicalRecord._id}`, {
                    diagnosis,
                    note,
                });
                console.log(res);
                fetchDetailMedicalRecord(medicalRecord._id);
                toast.success("Medical record updated successfully");
            } catch (error) {
                toast.error('Error updating medical record');
            }
        }
    };

    useEffect(() => {
        if (id) {
            fetchMedicalRecord(id);
        }
    }, [id]);


    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Edit Medical Record</h2>
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            {medicalRecord ? (
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Patient Name</label>
                        <input
                            type="text"
                            className="border rounded p-2 w-full"
                            value={medicalRecord.patientId.userId.fullName}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Doctor</label>
                        <input
                            type="text"
                            className="border rounded p-2 w-full"
                            value={medicalRecord.doctorId.userId.fullName}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Diagnosis</label>
                        <textarea
                            className="border rounded p-2 w-full"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Note</label>
                        <textarea
                            className="border rounded p-2 w-full"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Appointment Date</label>
                        <input
                            type="text"
                            className="border rounded p-2 w-full"
                            value={formatDateTime(medicalRecord.appointmentId.appointmentDate)}
                            disabled
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                </form>
            ) : (
                <div>No medical record found</div>
            )}
            <Toaster position="top-center" />
        </div>
    );
};

export default MedicalRecordEdit;
