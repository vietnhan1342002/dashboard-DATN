'use client'
import axiosInstance from '@/app/utils/axios';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface PrescriptionFormProps {
    medicalRecordId: string;
}

interface MedicalRecord {
    disease: string;
    treatmentPlan: string;
}

interface Prescription {
    medicationId: string;
    quantityPrescribed: number;
}

const PrescriptionForm = () => {
    const [medicationId, setMedicationId] = useState<string>('');
    const [quantityPrescribed, setQuantityPrescribed] = useState<number>(1);
    const [detailMedicalRecord, setDetailMedicalRecord] = useState<MedicalRecord | null>(null);
    const [medication, setMedicaiton] = useState<MedicalRecord | null>(null);
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

    const searchParams = useSearchParams();
    const medicalRecordId = searchParams.get('id');

    // Fetch medical record to get disease and treatment plan
    const fetchMedicalRecord = async () => {
        try {
            const response = await axiosInstance.get(`/detail-medical-record/${medicalRecordId}`);
            setDetailMedicalRecord(response.data);
        } catch (error) {
            console.error('Error fetching medical record', error);
        }
    };

    const fetchMedication = async () => {
        try {
            const response = await axiosInstance.get(`/medications?current=1&pageSize=30`);
            // setMedicaiton(response.data);
        } catch (error) {
            console.error('Error fetching medical record', error);
        }
    }
    useEffect(() => {
        fetchMedicalRecord();
    }, [medicalRecordId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/prescriptions', {
                medicalRecordId,
                medicationId,
                quantityPrescribed,
            });
            // After creating the prescription, add it to the list
            setPrescriptions([...prescriptions, response.data]);
            setMedicationId('');
            setQuantityPrescribed(1);
        } catch (error) {
            console.error('Error creating prescription', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-green-100 to-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Create Prescription</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {detailMedicalRecord ? (
                    <>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Disease</label>
                            <p className="w-full p-3 border border-gray-300 rounded-md bg-gray-100">{detailMedicalRecord.disease}</p>
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">Treatment Plan</label>
                            <p className="w-full p-3 border border-gray-300 rounded-md bg-gray-100">{detailMedicalRecord.treatmentPlan}</p>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-lg text-gray-500">Loading medical record...</p>
                )}

                <div>
                    <label htmlFor="medicationId" className="block text-lg font-medium text-gray-700">Medication</label>
                    <input
                        type="text"
                        id="medicationId"
                        value={medicationId}
                        onChange={(e) => setMedicationId(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="quantityPrescribed" className="block text-lg font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        id="quantityPrescribed"
                        value={quantityPrescribed}
                        onChange={(e) => setQuantityPrescribed(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Create Prescription
                    </button>
                </div>
            </form>

            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-green-700">Prescribed Medications</h3>
                <ul className="mt-4 space-y-4">
                    {prescriptions.map((prescription, index) => (
                        <li key={index} className="flex justify-between p-3 bg-gray-50 border border-gray-200 rounded-md">
                            <span>{prescription.medicationId}</span>
                            <span>Quantity: {prescription.quantityPrescribed}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PrescriptionForm;
