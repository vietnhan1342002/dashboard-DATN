'use client'
import axiosInstance from '@/app/utils/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface MedicalRecord {
    _id: string;
    diagnosis: string;
    note: string;
}

interface DetailMedicalRecord {
    _id: string,
    symptoms: string;
    disease: string;
    treatmentPlan: string;
}

const MedicalRecordDetail = () => {
    const [record, setRecord] = useState<MedicalRecord | null>(null);
    const [diagnosis, setDiagnosis] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [detailMedicalRecord, setDetailMedicalRecord] = useState<DetailMedicalRecord>({
        _id: '',
        symptoms: '',
        disease: '',
        treatmentPlan: '',
    });

    const fetchRecord = async () => {
        const response = await axiosInstance.get(`/detail-medical-record/medical-record/${id}`);
        setDetailMedicalRecord(response.data)
        console.log(response.data);

        setRecord(response.data);
        setDiagnosis(response.data.medicalRecordId.diagnosis);
        setNote(response.data.medicalRecordId.note);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (record) {
            try {
                console.log("detailMedicalRecord", detailMedicalRecord);
                const response = await axiosInstance.put(`/detail-medical-record/${detailMedicalRecord._id}`, {
                    symptoms: detailMedicalRecord.symptoms,
                    disease: detailMedicalRecord.disease,
                    treatmentPlan: detailMedicalRecord.treatmentPlan,
                });

                console.log("response.data", response.data);
                if (response.data) {
                    try {
                        const existingPrescription = await axiosInstance.get(`/prescriptions/detail-medical-record/${detailMedicalRecord._id}`);
                        if (existingPrescription.status === 400) {
                            console.log('existingPrescription.data', existingPrescription.data);
                        }
                        if (existingPrescription.data.length > 0) {
                            const prescriptionId = existingPrescription.data[0]._id;
                            router.push(`/medicalrecord/MedicalRecordDetail/PrescriptionForm?prescriptionId=${prescriptionId}&id=${record._id}`);
                        }
                        toast.success("Update successfully");
                    } catch (error: any) {
                        const prescription = await axiosInstance.post(`/prescriptions/`, {
                            detailMedicalRecordId: detailMedicalRecord._id,
                        });
                        if (prescription.data) {
                            router.push(`/medicalrecord/MedicalRecordDetail/PrescriptionForm?prescriptionId=${prescription.data._id}&id=${record._id}`);
                        }
                        toast.success("Update successfully");
                        // toast.error(error.response.data.message)
                    }

                }
            } catch (error) {
                console.error('Error updating medical record', error);
            }
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setDetailMedicalRecord((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (id) {
            fetchRecord();
        }
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-100 to-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Update Detail Medical Record</h1>
            {record ? (
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label htmlFor="diagnosis" className="block text-lg font-medium text-gray-700">Diagnosis</label>
                        <textarea
                            id="diagnosis"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                            rows={2}
                            disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="note" className="block text-lg font-medium text-gray-700">Note</label>
                        <textarea
                            id="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                            rows={2}
                            disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="symptoms" className="block text-lg font-medium text-gray-700">Symptoms</label>
                        <textarea
                            id="symptoms"
                            name="symptoms"
                            value={detailMedicalRecord.symptoms}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label htmlFor="disease" className="block text-lg font-medium text-gray-700">Disease</label>
                        <textarea
                            id="disease"
                            name="disease"
                            value={detailMedicalRecord.disease}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label htmlFor="treatmentPlan" className="block text-lg font-medium text-gray-700">Treatment Plan</label>
                        <textarea
                            id="treatmentPlan"
                            name="treatmentPlan"
                            value={detailMedicalRecord.treatmentPlan}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Create Prescription
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-center text-lg text-gray-500">Loading...</p>
            )}
        </div>
    );
};

export default MedicalRecordDetail;
