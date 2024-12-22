'use client'
import axiosInstance from '@/app/utils/axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Medication {
    _id: string;
    name: string;
    description: string;
    usageInstructions: string;
    sideEffects: string;
    quantity: string; // Available stock
    price: number;
    unit: string;
}

interface PrescriptionDetail {
    _id: string,
    medicationId: Medication,
    quantityPrescribed: number
}

interface Prescription {
    _id: string,
    medicationId: string;
    quantityPrescribed: number;
}


const MoreDetail = () => {

    const [detailMedicalRecord, setDetailMedicalRecord] = useState<any>({
        _id: '',
        symptoms: '',
        disease: '',
        treatmentPlan: '',
    });
    const [prescription, setPrescription] = useState<Prescription | null>(null);
    const [medicationsInPrescription, setMedicationsInPrescription] = useState<PrescriptionDetail[]>([]);

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();

    // Fetch medical record details
    const fetchRecord = async () => {
        const response = await axiosInstance.get(`/detail-medical-record/medical-record/${id}`);
        setDetailMedicalRecord(response.data);
    };

    const fetchMedicationsInPrescription = async (prescriptionDetailId: string) => {
        try {
            const response = await axiosInstance.get(`/prescription-details/prescription/${prescriptionDetailId}`);
            setMedicationsInPrescription(response.data);
        } catch (error) {
            console.error('Error fetching medications by prescription ID', error);
        }
    };

    // Fetch prescriptions
    const fetchPrescriptions = async () => {
        if (!detailMedicalRecord._id) {
            console.error('Detail Medical Record ID is missing');
            return;
        }

        try {
            const response = await axiosInstance.get(`/prescriptions/detail-medical-record/${detailMedicalRecord._id}`);
            setPrescription(response.data[0]);
        } catch (error) {
            console.error("Error fetching prescriptions", error);
        }
    };


    useEffect(() => {
        if (id) {
            fetchRecord();
        }
    }, [id]);

    useEffect(() => {
        if (detailMedicalRecord._id) {
            fetchPrescriptions();
        }
    }, [detailMedicalRecord]);

    useEffect(() => {
        if (prescription) {
            fetchMedicationsInPrescription(prescription._id)
        }
    }, [prescription])

    // Edit button handler
    const handleEditRecord = () => {
        router.push(`/medicalrecord/MedicalRecordDetail?id=${id}`);
    };

    const handleEditPrescription = () => {
        router.push(`/edit-prescription/${prescription?._id}`);
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50">
            <h2 className="text-3xl font-semibold text-gray-800">Medical Record & Prescription Details</h2>
            {/* Medical Record Details */}
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-2xl font-medium text-gray-800 mb-4">Medical Record Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="symptoms" className="block text-sm font-medium text-gray-600">Symptoms</label>
                            <input
                                type="text"
                                name="symptoms"
                                value={detailMedicalRecord.symptoms}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                                readOnly
                            />
                        </div>

                        <div>
                            <label htmlFor="disease" className="block text-sm font-medium text-gray-600">Disease</label>
                            <input
                                type="text"
                                name="disease"
                                value={detailMedicalRecord.disease}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                                readOnly
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="treatmentPlan" className="block text-sm font-medium text-gray-600">Treatment Plan</label>
                        <textarea
                            name="treatmentPlan"
                            value={detailMedicalRecord.treatmentPlan}
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md bg-gray-100 text-gray-700 h-32"
                            readOnly
                        />
                    </div>
                </div>
                <button
                    onClick={handleEditRecord}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200"
                >
                    Edit Record
                </button>
            </div>

            {/* Prescriptions List */}
            <div className="bg-white shadow-lg rounded-xl p-6 mt-8">
                <h3 className="text-2xl font-medium text-green-600 mb-4">Prescription Medications List</h3>
                {medicationsInPrescription && medicationsInPrescription.length > 0 ? (
                    <ul className="space-y-6">
                        {medicationsInPrescription.map((medication, index) => (
                            <li
                                key={medication?.medicationId?._id || `medication-${index}`}
                                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50"
                            >
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-800">{medication?.medicationId?.name}</h4>
                                    <p className="text-sm text-gray-600"><strong>Usage Instructions:</strong> {medication?.medicationId?.usageInstructions}</p>
                                    <p className="text-sm text-gray-600"><strong>Side Effects:</strong> {medication?.medicationId?.sideEffects}</p>
                                    <p className="text-sm text-gray-600"><strong>Price:</strong> {medication?.medicationId?.price} VND</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600"><strong>Quantity:</strong> {medication?.quantityPrescribed}</p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        <strong>Total Price:</strong> {medication?.quantityPrescribed * medication?.medicationId?.price} VND
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-lg text-gray-500">No medications in this prescription.</p>
                )}
                <button
                    onClick={handleEditPrescription}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200"
                >
                    Edit Prescription
                </button>
            </div>
        </div>
    );
};

export default MoreDetail;
