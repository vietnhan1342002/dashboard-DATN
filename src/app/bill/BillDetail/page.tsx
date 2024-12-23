'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/app/utils/axios";
import { formatDateTime } from "@/app/utils/format";
import { toast } from "sonner";

export interface Bill {
    _id: string;
    prescriptionId: string;
    patientName: string;
    totalPrice: number;
    status: string;
    paymentDate: Date | null;
    createdAt: Date | null;
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

const BillDetailPage = () => {
    const [bill, setBill] = useState<Bill | null>(null);
    const [medicationsInPrescription, setMedicationsInPrescription] = useState<PrescriptionDetail[]>([]);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();

    const fetchMedicationsInPrescription = async (prescriptionDetailId: string) => {
        try {
            const response = await axiosInstance.get(`/prescription-details/prescription/${prescriptionDetailId}`);
            console.log("MedicationsInPrescription", response.data);
            setMedicationsInPrescription(response.data);
        } catch (error) {
            console.error('Error fetching medications by prescription ID', error);
        }
    };

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get(`/bills/${id}`);
            console.log(res.data);
            fetchMedicationsInPrescription(res.data.prescriptionId)
            setBill(res.data);
        } catch (error) {
            console.error("Error fetching bill data:", error);
        }
    };

    useEffect(() => {
        if (id) fetchData();
    }, [id]);

    const handlePayment = async () => {
        console.log("Payment process for bill", bill?._id);
        const res = await axiosInstance.patch(`/bills/status/${bill?._id}`)
        try {
            if (res.data) {
                toast.success("Paid Successfully!")
                router.push('/bill/PaidBillsPage')
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }

    };

    const handleBack = () => {
        router.back(); // This will take the user back to the previous page
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-8">
            <div className="flex items-center justify-between mb-8">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg focus:outline-none transition-all duration-300"
                >
                    Back
                </button>
                {/* Title */}
                <h1 className="text-4xl font-semibold text-center text-gray-900">Invoice</h1>
                {/* Empty div to balance the layout */}
                <div></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Patient Info */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patient Information</h2>
                    <ul className="space-y-3 text-lg text-gray-700">
                        <li><strong>Patient Name:</strong> {bill?.patientName}</li>
                        <li><strong>Status:</strong> {bill?.status === 'pending' ? 'Pending' : 'Paid'}</li>
                        <li><strong>Created At:</strong> {bill?.paymentDate ? new Date(bill.paymentDate).toLocaleDateString('en-US') : 'Pending'}</li>
                    </ul>
                </div>

                {/* Right: Medication List */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Medications</h2>
                    <table className="w-full mt-4 table-auto text-gray-700 border-separate border-spacing-0.5">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-2 px-4 border-b font-medium">Service Name</th>
                                <th className="text-left py-2 px-4 border-b font-medium">Price</th>
                                <th className="text-left py-2 px-4 border-b font-medium">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicationsInPrescription.map((medication, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{medication.medicationId.name}</td>
                                    <td className="py-2 px-4 border-b">{medication.medicationId.price.toLocaleString()} VND</td>
                                    <td className="py-2 px-4 border-b">{medication.quantityPrescribed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Total Price and Payment */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 mt-8 text-right">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Total Price: {bill?.totalPrice.toLocaleString()} VND</h3>
                <div className="text-center">
                    <button
                        onClick={handlePayment}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg focus:outline-none transition-all duration-300"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BillDetailPage;
