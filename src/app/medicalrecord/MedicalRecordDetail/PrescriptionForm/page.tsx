'use client'

import axiosInstance from '@/app/utils/axios';
import useDebounce from '@/hooks/useDebounce';
import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';

interface MedicalRecord {
    disease: string;
    treatmentPlan: string;
}

interface Prescription {
    medicationId: string;
    quantityPrescribed: number;
}

interface Medication {
    _id: string;
    name: string;
    description: string;
    usageInstructions: string;
    sideEffects: string;
    quantity: string; // Kho hàng có sẵn
    price: number;
    unit: string;
}

interface PrescriptionDetail {
    medicationId: Medication,
    quantityPrescribed: number
}



const PrescriptionForm = () => {
    const router = useRouter(); // Khởi tạo useRouter
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [medicationId, setMedicationId] = useState<string>('');
    const [quantityPrescribed, setQuantityPrescribed] = useState<number>(1);
    const [detailMedicalRecord, setDetailMedicalRecord] = useState<MedicalRecord | null>(null);
    const [medications, setMedications] = useState<Medication[]>([]);
    const [filteredMedications, setFilteredMedications] = useState<Medication[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null); // State for selected medication
    const [medicationsInPrescription, setMedicationsInPrescription] = useState<PrescriptionDetail[]>([]);

    const searchParams = useSearchParams();
    const medicalRecordId = searchParams.get('id');
    const prescriptionId = searchParams.get('prescriptionId')

    // Debounced searchTerm
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 1 second debounce

    const fetchMedicationsInPrescription = async (prescriptionDetailId: string) => {
        try {
            const response = await axiosInstance.get(`/prescription-details/prescription/${prescriptionDetailId}`);
            console.log(response.data);

            setMedicationsInPrescription(response.data); // Lưu dữ liệu vào state
        } catch (error) {
            console.error('Error fetching medications by prescription ID', error);
        }
    };

    // Fetch medical record
    const fetchMedicalRecord = async () => {
        try {
            const response = await axiosInstance.get(`/detail-medical-record/${medicalRecordId}`);
            setDetailMedicalRecord(response.data);
        } catch (error) {
            console.error('Error fetching medical record', error);
        }
    };

    // Fetch medications
    const fetchMedications = async () => {
        try {
            const response = await axiosInstance.get('/medications');
            setMedications(response.data);
            setFilteredMedications(response.data);  // Initialize with all medications
        } catch (error) {
            console.error('Error fetching medications', error);
        }
    };

    const handleSearch = async (term: string) => {
        if (term) {
            try {
                const response = await axiosInstance.get(`/search/medications?name=${term}`);
                setFilteredMedications(response.data);
            } catch (error) {
                console.error('Error fetching search results', error);
                setFilteredMedications([]);
            }
        } else {
            setFilteredMedications(medications);
        }
    };

    useEffect(() => {
        handleSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, medications]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!medicationId || quantityPrescribed <= 0) return;

        if (selectedMedication && quantityPrescribed > parseInt(selectedMedication.quantity)) {
            console.error('Quantity exceeds available stock');
            return;
        }

        try {
            const response = await axiosInstance.post('/prescription-details', {
                prescriptionId,
                medicationId,
                quantityPrescribed,
            });
            toast.success("Create Successfully")
            setPrescriptions([...prescriptions, response.data]);
            setMedicationsInPrescription(prev => [...prev, response.data]);
            setMedicationId('');
            setQuantityPrescribed(1);
        } catch (error: any) {
            toast.success(`Error creating prescription ${error.response.data.message}`)
            console.error('Error creating prescription', error.response.data.message);
        }
    };

    useEffect(() => {
        fetchMedicalRecord();
        fetchMedications();
        if (prescriptionId) {
            fetchMedicationsInPrescription(prescriptionId);
        }
    }, [medicalRecordId, prescriptionId]);

    useEffect(() => {
        if (searchTerm === '') {
            setSelectedMedication(null); // Reset selected medication when search is cleared
        }
    }, [searchTerm]);

    return (
        <div className="max-w-8xl mx-auto p-8 bg-gradient-to-r from-green-100 to-white shadow-lg rounded-lg">
            <div className="flex space-x-8">
                {/* Left */}
                <div className="flex-1">
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
                            <label htmlFor="search" className="block text-lg font-medium text-gray-700">Search Medication</label>
                            <input
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by medication name"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {/* Display search results below */}
                            {debouncedSearchTerm && filteredMedications.length > 0 && (
                                <ul className="mt-2 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto">
                                    {filteredMedications.map((medication) => (
                                        <li
                                            key={medication._id}
                                            className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                                            onClick={() => {
                                                setMedicationId(medication._id);
                                                setSearchTerm(medication.name);
                                                setFilteredMedications([]); // Clear search results
                                                setSelectedMedication(medication); // Set selected medication
                                            }}
                                        >
                                            {medication.name} - {medication.unit}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {selectedMedication && (
                            <div className="mt-4">
                                <ul>
                                    <li><strong>Quantity in Stock:</strong> {selectedMedication.quantity}</li>
                                    <li><strong>Price:</strong> {selectedMedication.price}</li>
                                </ul>
                            </div>
                        )}

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

                        <div className="flex justify-center gap-4 mb-6">
                            <button
                                onClick={() => router.back()}
                                className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={selectedMedication ? quantityPrescribed > parseInt(selectedMedication.quantity) : false} // Disable if quantity exceeds stock
                                className={`
            px-6 py-3 
            ${selectedMedication ? (quantityPrescribed > parseInt(selectedMedication.quantity) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600') : 'bg-gray-300 cursor-not-allowed'} 
            text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        `}
                            >
                                Create Prescription
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right */}
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-green-700 mb-4">Medications in Prescription</h3>
                    {medicationsInPrescription && medicationsInPrescription.length > 0 ? (
                        <ul className="space-y-4">
                            <div className="mt-6">
                                <ul className="mt-4 space-y-4">
                                    {medicationsInPrescription.map((medication) => (
                                        <li key={medication?.medicationId?._id} className="p-4 border border-gray-200 rounded-lg">
                                            <h4 className="text-lg font-semibold text-center">{medication?.medicationId?.name}</h4>
                                            <p><strong>Usage Instructions:</strong> {medication?.medicationId?.usageInstructions}</p>
                                            <p><strong>Side Effects:</strong> {medication?.medicationId?.sideEffects}</p>
                                            <p><strong>Price:</strong> {medication?.medicationId?.price}</p>
                                            <p><strong>QuantityPrescribed:</strong>{medication?.quantityPrescribed}</p>
                                            <p><strong>Total:</strong>{medication?.quantityPrescribed * medication?.medicationId?.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ul>
                    ) : (
                        <p className="text-center text-lg text-gray-500">No medications found for this prescription.</p> // Thông báo khi không có thuốc
                    )}
                </div>

            </div> {/* End of flex container */}
            <Toaster position='top-center' />
        </div>

    );
};

export default PrescriptionForm;
