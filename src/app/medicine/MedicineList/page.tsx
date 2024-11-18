"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const MedicineList = () => {

    const medicines = [
        { id: 1, name: "Paracetamol", stockDate: "01/11/2024", manufactureDate: "01/10/2024", expiryDate: "01/11/2025", price: "30,000 ₫", quantity: 100 },
        { id: 2, name: "Ibuprofen", stockDate: "05/11/2024", manufactureDate: "05/10/2024", expiryDate: "05/11/2025", price: "45,000 ₫", quantity: 50 },
        { id: 3, name: "Amoxicillin", stockDate: "10/11/2024", manufactureDate: "10/10/2024", expiryDate: "10/11/2025", price: "60,000 ₫", quantity: 200 },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState("");

    const router = useRouter();

    const filteredMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.stockDate.includes(searchQuery) ||
        medicine.manufactureDate.includes(searchQuery) ||
        medicine.expiryDate.includes(searchQuery) ||
        medicine.price.includes(searchQuery) ||
        medicine.quantity.toString().includes(searchQuery)
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentItems = filteredMedicines.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredMedicines.length / recordsPerPage);

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

    const handleEdit = (medicineId: number) => {
        router.push(`/medicine/EditMedicine?id=${medicineId}`);
    };

    const handleDelete = () => {
        console.log('Deleting medicine with ID: ');
    };

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
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Tên</th>
                        <th className="px-6 py-3 text-left">Ngày Nhập Kho</th>
                        <th className="px-6 py-3 text-left">Ngày Sản Xuất</th>
                        <th className="px-6 py-3 text-left">Ngày Hết Hạn</th>
                        <th className="px-6 py-3 text-left">Giá</th>
                        <th className="px-6 py-3 text-left">Số Lượng</th>
                        <th className="px-6 py-3 text-left">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((medicine, index) => (
                        <tr key={medicine.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4">{medicine.id}</td>
                            <td className="px-6 py-4">{medicine.name}</td>
                            <td className="px-6 py-4">{medicine.stockDate}</td>
                            <td className="px-6 py-4">{medicine.manufactureDate}</td>
                            <td className="px-6 py-4">{medicine.expiryDate}</td>
                            <td className="px-6 py-4">{medicine.price}</td>
                            <td className="px-6 py-4">{medicine.quantity}</td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(medicine.id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete()}
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
