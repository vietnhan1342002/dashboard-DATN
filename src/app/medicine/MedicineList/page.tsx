"use client";

import axiosInstance from '@/app/utils/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
const MedicineList = () => {


    const initialMedicine = [{
        _id: "",
        name: "",
        description: "",
        usageInstructions: "",
        sideEffects: "",
        quantity: 0,
        minQuantity: 0,
        price: 0,
        unit: ""
    }
    ]

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const pageSize = 5;
    const [medicines, setMedicines] = useState(initialMedicine);

    const fetchMedicines = async (currentPage: number) => {

        try {
            const response = await axiosInstance.get(`/medications?current=${currentPage}&pageSize=${pageSize}`);
            const { result, totalPages } = response.data;
            console.log(result);
            if (result.dateOfBirth) {
                const formattedDate = result.dateOfBirth.split('T')[0];
                result.dateOfBirth = formattedDate;
                console.log('patient.dateOfBirth', result.dateOfBirth);
            }

            setTotalPages(totalPages);
            setMedicines(result)
        } catch (err: any) {
            console.log('Error from fetchPatient', err);
            toast.error(err.response.data.message)
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEdit = (medicineId: string) => {
        router.push(`/medicine/EditMedicine?id=${medicineId}`);
    };


    const fetchDeleteMedicine = async (medicineId: string) => {
        const res = await axiosInstance.delete(`http://localhost:8080/api/v1/medications/${medicineId}`);
        if (res) {
            toast.success("Successfully deleted")
            setTimeout(function () {
                location.reload();  // Tự động reload trang sau 2 giây
            }, 1000);
        }
    }

    const handleDelete = (medicineId: string) => {
        console.log('Deleting medicine with ID: ', medicineId);
        fetchDeleteMedicine(medicineId)
    };

    useEffect(() => {
        fetchMedicines(currentPage)
    }, [currentPage])

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-bold mb-4">Quản Lý Thuốc</h2>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="border rounded p-2 flex-grow mr-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Handle search input change
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
            </div>

            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">Tên</th>
                        <th className="px-6 py-3 text-left">description</th>
                        <th className="px-6 py-3 text-left">usageInstructions</th>
                        <th className="px-6 py-3 text-left">sideEffects</th>
                        <th className="px-6 py-3 text-left">Giá</th>
                        <th className="px-6 py-3 text-left">Số Lượng</th>
                        <th className="px-6 py-3 text-left">Số Lượng giới hạn</th>
                        <th className="px-6 py-3 text-left">Unit</th>
                        <th className="px-6 py-3 text-left">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine, index) => (
                        <tr key={medicine._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4">{medicine?.name || 'No data available'}</td>
                            <td className="px-6 py-4">{medicine?.description || 'No data available'}</td>
                            <td className="px-6 py-4">{medicine?.usageInstructions || 'No data available'}</td>
                            <td className="px-6 py-4">{medicine?.sideEffects || 'No data available'}</td>
                            <td className="px-6 py-4">{medicine?.price || 'No data available'}</td>
                            <td className="px-6 py-4">{medicine?.quantity || 'No data available'}</td>
                            <td className="px-6 py-4">{medicine?.minQuantity || 'No data available'}</td>
                            <td className="px-6 py-4">{medicine?.unit || 'No data available'}</td>
                            <td className="px-6 py-4 flex justify-center items-center space-x-2 h-full align-middle">
                                <button
                                    onClick={() => handleEdit(medicine._id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(medicine._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-end">
                <Link href="/medicine/AddMedicine">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Medicine</button>
                </Link>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-gray-700">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default MedicineList;
