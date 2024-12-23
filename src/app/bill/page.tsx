'use client'

import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { useRouter } from "next/navigation";
import { formatDateTime } from "../utils/format";

export interface Bill {
    _id: string;
    prescriptionId: string;
    patientName: string;
    totalPrice: number;
    status: string;
    paymentDate: Date | null;
    createdAt: Date | null;
}

const BillsPage = () => {
    const [bills, setBills] = useState<Bill[]>([]);
    const router = useRouter();

    const fetchBills = async () => {
        try {
            const response = await axiosInstance.get('/bills');
            console.log("Bills data:", response.data);
            const pendingBills = response.data.filter((bill: Bill) => bill.status === 'pending');
            setBills(pendingBills);
        } catch (error) {
            console.error("Error fetching bills:", error);
        }
    };

    useEffect(() => {
        fetchBills();
    }, []);

    const handleViewBill = (billId: string) => {
        // Chuyển đến trang chi tiết của hóa đơn
        router.push(`/bill/BillDetail?id=${billId}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-8">
            <h1 className="text-4xl font-semibold text-center text-gray-900 mb-8">Bills List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white table-auto border-separate border-spacing-0.5">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4 border-b font-medium">Patient Name</th>
                            <th className="text-left py-3 px-4 border-b font-medium">Total Price</th>
                            <th className="text-left py-3 px-4 border-b font-medium">Status</th>
                            <th className="text-left py-3 px-4 border-b font-medium">Created At</th>
                            <th className="text-left py-3 px-4 border-b font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => (
                            <tr key={bill._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b">{bill.patientName}</td>
                                <td className="py-3 px-4 border-b">{bill.totalPrice.toLocaleString()} VND</td>
                                <td className="py-3 px-4 border-b">{bill.status === 'pending' ? 'Pending' : 'Paid'}</td>
                                <td className="py-3 px-4 border-b">{bill.createdAt ? new Date(bill.createdAt).toLocaleString() : 'N/A'}</td>
                                <td className="py-3 px-4 border-b">
                                    <button
                                        onClick={() => handleViewBill(bill._id)}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg focus:outline-none transition-all duration-300"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BillsPage;
