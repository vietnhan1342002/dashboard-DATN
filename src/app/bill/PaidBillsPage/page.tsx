'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios";

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

const PaidBillsPage = () => {
    const [bills, setBills] = useState<Bill[]>([]);
    const [medicationsInPrescription, setMedicationsInPrescription] = useState<PrescriptionDetail[]>([]);
    const router = useRouter();

    const fetchMedicationsInPrescription = async (prescriptionDetailId: string) => {
        try {
            const response = await axiosInstance.get(`/prescription-details/prescription/${prescriptionDetailId}`);
            setMedicationsInPrescription(response.data);
        } catch (error) {
            console.error('Error fetching medications by prescription ID', error);
        }
    };

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get(`/bills`);
            const paidBills = res.data.result.filter((bill: Bill) => bill.status === 'paid');
            setBills(paidBills);

            if (paidBills.length > 0) {
                fetchMedicationsInPrescription(paidBills[0].prescriptionId);
            }
        } catch (error) {
            console.error("Error fetching bill data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleBack = () => {
        router.back(); // This will take the user back to the previous page
    };

    return (
        <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-8">
            <div className="flex items-center justify-center mb-8">
                <h1 className="text-4xl font-semibold text-center text-gray-900">Paid Bills</h1>
            </div>

            <div className="">
                {bills.length === 0 ? (
                    <div className="col-span-2 text-center text-lg text-gray-700">No paid bills found</div>
                ) : (
                    bills.map((bill) => (
                        <div key={bill._id} className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Side: Patient Information */}
                                <div className="flex flex-col">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patient Information</h2>
                                    <ul className="space-y-3 text-lg text-gray-700">
                                        <li><strong>Patient Name:</strong> {bill.patientName}</li>
                                        <li>
                                            <strong>Status:</strong>
                                            <span className="bg-green-300 px-2 py-1 rounded">
                                                Paid
                                            </span>
                                        </li>
                                        <li><strong>Payment Date:</strong> {bill.paymentDate ? new Date(bill.paymentDate).toLocaleDateString('en-US') : 'Pending'}</li>
                                    </ul>
                                </div>

                                {/* Right Side: Medications List */}
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Medications</h3>
                                    <table className="w-full table-auto text-gray-700 border-separate border-spacing-0.5">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="text-left py-2 px-4 border-b font-medium">Medication Name</th>
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

                            {/* Bottom Section: Total Price */}
                            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 mt-8 text-right">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Total Price: {bill.totalPrice.toLocaleString()} VND</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PaidBillsPage;
