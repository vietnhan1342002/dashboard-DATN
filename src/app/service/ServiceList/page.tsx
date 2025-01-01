'use client';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setServices, setLoading } from "@/redux/store/serviceSlice";
import axiosInstance from "@/app/utils/axios";
import Link from "next/link";

const ServiceList = () => {
    const dispatch = useDispatch();

    // Lấy dữ liệu và trạng thái loading từ Redux store
    const { services, loading } = useSelector((state: RootState) => state.services);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 10;

    // Lấy danh sách dịch vụ từ API khi component mount
    useEffect(() => {
        const fetchServices = async () => {
            dispatch(setLoading(true)); // Bắt đầu trạng thái loading
            try {
                const response = await axiosInstance.get(`/specialties?current=1&pageSize=30`);
                dispatch(setServices(response.data.result)); // Lưu dữ liệu vào Redux store
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                dispatch(setLoading(false)); // Kết thúc trạng thái loading
            }
        };

        fetchServices();
    }, [dispatch]);

    const filteredServices = services.filter((service) => {
        const serviceName = service.name?.toLowerCase() || '';
        const department = service.departmentId?.departmentName?.toLowerCase() || ''; // Safe access
        return serviceName.includes(searchQuery.toLowerCase()) || department.includes(searchQuery.toLowerCase());
    });

    // Phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Nếu đang loading, hiển thị thông báo loading
    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/specialties/${id}`);
            // Sau khi xóa, re-fetch lại danh sách dịch vụ
            dispatch(setLoading(true));
            const response = await axiosInstance.get('/specialties');
            dispatch(setServices(response.data.result));
            dispatch(setLoading(false));
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Services</h2>

            {/* Tìm kiếm */}
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by name or department"
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
            {/* Thêm dịch vụ */}
            <div className="mt-4 flex justify-end">
                <Link href="/service/AddService">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        + Add Service
                    </button>
                </Link>
            </div>

            {/* Phân trang */}
            <div className="flex justify-between my-4">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                >
                    Previous
                </button>
                <span className="self-center">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                >
                    Next
                </button>
            </div>

            {/* Danh sách dịch vụ */}
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">No.</th>
                        <th className="px-6 py-3 text-left">Service Name</th>
                        <th className="px-6 py-3 text-left">Department</th>
                        <th className="px-6 py-3 text-left">Description</th>
                        <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentServices.map((service, index) => (
                        <tr key={service._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {/* Cột Số thứ tự */}
                            <td className="px-6 py-4">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                            <td className="px-6 py-4">{service.name}</td>
                            <td className="px-6 py-4">{service.departmentId?.departmentName}</td>
                            <td className="px-6 py-4">
                                <div>
                                    <strong>Introduction:</strong> {service.description.introduction}
                                </div>
                                <div>
                                    <strong>Qualifications:</strong> {service.description.qualifications.join(', ')}
                                </div>
                                <div>
                                    <strong>Related Diseases:</strong> {service.description.relatedDiseases.join(', ')}
                                </div>
                            </td>
                            <td className="px-6 py-4 flex space-x-2">
                                <Link href={`/service/EditService?id=${service._id}`}>
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(service._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceList;
