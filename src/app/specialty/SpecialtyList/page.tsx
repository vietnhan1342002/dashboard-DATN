/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const specialtiesData = [
    { id: 1, name: "Nội Khoa", description: "Chuyên khoa điều trị các bệnh bên trong cơ thể." },
    { id: 2, name: "Ngoại Khoa", description: "Chuyên khoa phẫu thuật và điều trị bệnh ngoại khoa." },
    { id: 3, name: "Nhi Khoa", description: "Chăm sóc sức khỏe và điều trị cho trẻ em." },
    { id: 4, name: "Sản Phụ Khoa", description: "Chuyên khoa về phụ nữ và sinh sản." },
    { id: 5, name: "Răng Hàm Mặt", description: "Chăm sóc và điều trị về răng miệng, hàm mặt." },
    { id: 6, name: "Da Liễu", description: "Điều trị các bệnh lý về da." },
    { id: 7, name: "Mắt", description: "Chăm sóc và điều trị các bệnh về mắt." },
    { id: 8, name: "Tai Mũi Họng", description: "Điều trị các bệnh lý liên quan đến tai, mũi, họng." },
];

const SpecialtyList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 10;

    const router = useRouter();

    const handleEdit = (specialtyId: number) => {
        router.push(`/specialty/EditSpecialty?id=${specialtyId}`);
    };

    const handleDelete = (specialtyId: number) => {
        console.log("Delete specialty with ID:", specialtyId);
    };

    const filteredSpecialties = specialtiesData.filter((specialty) =>
        specialty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        specialty.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSpecialties = filteredSpecialties.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredSpecialties.length / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Specialties</h2>

            {/* Search input */}
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
                    }}
                    className="border rounded p-2 flex-grow mr-2"
                />
                <button
                    onClick={() => setSearchQuery("")}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Clear
                </button>
            </div>

            {/* Specialties table */}
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Specialty Name</th>
                        <th className="px-6 py-3 text-left">Description</th>
                        <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSpecialties.map((specialty, index) => (
                        <tr
                            key={specialty.id}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            <td className="px-6 py-4">{specialty.id}</td>
                            <td className="px-6 py-4">{specialty.name}</td>
                            <td className="px-6 py-4">{specialty.description}</td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(specialty.id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(specialty.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Specialty button */}
            <div className="mt-4 flex justify-end">
                <Link href="/specialty/AddSpecialty">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        + Add Specialty
                    </button>
                </Link>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SpecialtyList;
