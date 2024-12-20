'use client';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSpecialties, setLoading } from "@/redux/store/specialtySlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Component
const SpecialtyList = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleEdit = (id: string) => {
        router.push(`/specialty/EditSpecialty?id=${id}`);
    };

    const { specialties, loading } = useSelector((state: RootState) => state.specialties);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchSpecialties = async () => {
            dispatch(setLoading(true)); // Bắt đầu trạng thái loading
            try {
                const response = await axios.get("http://localhost:8080/api/v1/departments");
                dispatch(setSpecialties(response.data.result)); // Lưu specialties vào Redux
            } catch (error) {
                console.error("Error fetching specialties:", error);
            } finally {
                dispatch(setLoading(false)); // Kết thúc trạng thái loading
            }
        };

        fetchSpecialties();
    }, [dispatch]);

    const filteredSpecialties = specialties.filter((specialty) => {
        const departmentName = specialty.departmentName?.toLowerCase() || '';
        const description = specialty.description?.toLowerCase() || '';

        return departmentName.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());
    });

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

    // Hiển thị trạng thái loading khi dữ liệu đang được tải
    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDelete = async (id: string) => {
        try {
            // Thêm logic để xóa specialty (ví dụ: yêu cầu API)
            await axios.delete(`http://localhost:8080/api/v1/specialties/${id}`);
            // Sau khi xóa, lại tải lại specialties
            dispatch(setLoading(true));
            const response = await axios.get("http://localhost:8080/api/v1/departments?current=1&pageSize=30");
            dispatch(setSpecialties(response.data.result));
            dispatch(setLoading(false));
        } catch (error) {
            console.error("Error deleting specialty:", error);
        }
    };

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Specialties</h2>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Reset lại trang khi tìm kiếm
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

            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">Specialty Name</th>
                        <th className="px-6 py-3 text-left">Description</th>
                        <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSpecialties.map((specialty, index) => (
                        <tr
                            key={specialty._id}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            <td className="px-6 py-4">{specialty.departmentName}</td>
                            <td className="px-6 py-4">{specialty.description}</td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(specialty._id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(specialty._id)}
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
                <Link href="/specialty/AddSpecialty">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        + Add Specialty
                    </button>
                </Link>
            </div>

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
