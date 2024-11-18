"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const servicesData = [
    { id: 1, name: 'Khám sức khỏe tổng quát', description: '', price: '500,000 VND', department: 'Nội Khoa' },
    { id: 2, name: 'Điều trị tim mạch', description: '', price: '1,000,000 VND', department: 'Nội Khoa' },
    { id: 3, name: 'Xét nghiệm máu', description: '', price: '300,000 VND', department: 'Nội Khoa' },
    { id: 4, name: 'Điện tim (ECG)', description: '', price: '400,000 VND', department: 'Nội Khoa' },
    { id: 5, name: 'Siêu âm ổ bụng', description: '', price: '600,000 VND', department: 'Nội Khoa' },
    { id: 6, name: 'Phẫu thuật cấp cứu', description: '', price: '5,000,000 VND', department: 'Ngoại Khoa' },
    { id: 7, name: 'Điều trị xương khớp', description: '', price: '1,500,000 VND', department: 'Ngoại Khoa' },
    { id: 8, name: 'X-quang', description: '', price: '800,000 VND', department: 'Ngoại Khoa' },
    { id: 9, name: 'Khám trẻ em', description: '', price: '400,000 VND', department: 'Nhi Khoa' },
    { id: 10, name: 'Tiêm chủng cho trẻ', description: '', price: '300,000 VND', department: 'Nhi Khoa' },
    { id: 11, name: 'Điều trị bệnh lý hô hấp', description: '', price: '600,000 VND', department: 'Nhi Khoa' },
    { id: 12, name: 'Khám phụ khoa', description: '', price: '500,000 VND', department: 'Sản Phụ Khoa' },
    { id: 13, name: 'Siêu âm thai', description: '', price: '700,000 VND', department: 'Sản Phụ Khoa' },
    { id: 14, name: 'Tiêm phòng cho phụ nữ', description: '', price: '400,000 VND', department: 'Sản Phụ Khoa' },
    { id: 15, name: 'Khám răng miệng', description: '', price: '300,000 VND', department: 'Răng Hàm Mặt' },
    { id: 16, name: 'Niềng răng', description: '', price: '10,000,000 VND', department: 'Răng Hàm Mặt' },
    { id: 17, name: 'Phẫu thuật hàm mặt', description: '', price: '15,000,000 VND', department: 'Răng Hàm Mặt' },
    { id: 18, name: 'X-quang răng', description: '', price: '800,000 VND', department: 'Răng Hàm Mặt' },
    { id: 19, name: 'Khám và điều trị mụn', description: '', price: '500,000 VND', department: 'Da Liễu' },
    { id: 20, name: 'Phẫu thuật u, nốt ruồi', description: '', price: '2,000,000 VND', department: 'Da Liễu' },
    { id: 21, name: 'Xét nghiệm da liễu', description: '', price: '700,000 VND', department: 'Da Liễu' },
    { id: 22, name: 'Khám mắt', description: '', price: '400,000 VND', department: 'Mắt' },
    { id: 23, name: 'Phẫu thuật LASIK', description: '', price: '20,000,000 VND', department: 'Mắt' },
    { id: 24, name: 'Siêu âm mắt', description: '', price: '600,000 VND', department: 'Mắt' },
    { id: 25, name: 'Khám tai, mũi, họng', description: '', price: '400,000 VND', department: 'Tai Mũi Họng' },
    { id: 26, name: 'Phẫu thuật tai', description: '', price: '8,000,000 VND', department: 'Tai Mũi Họng' },
    { id: 27, name: 'Cắt amidan', description: '', price: '5,000,000 VND', department: 'Tai Mũi Họng' },
];

const departments = [
    'Nội Khoa', 'Ngoại Khoa', 'Nhi Khoa', 'Sản Phụ Khoa', 'Răng Hàm Mặt', 'Da Liễu', 'Mắt', 'Tai Mũi Họng'
];

const ServiceList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const router = useRouter();

    const handleEdit = (serviceId: number) => {
        router.push(`/service/EditService?id=${serviceId}`);
    };

    const handleDelete = () => {
        console.log("Delete service with ID:");
    };

    const filteredServices = servicesData.filter(
        (service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    return (
        <div className="p-4 flex-1">
            <h2 className="text-2xl font-semibold mb-4">Services</h2>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or department"
                    className="border rounded p-2 flex-grow mr-2"
                />
                <button
                    onClick={() => setCurrentPage(1)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Service Name</th>
                        <th className="px-6 py-3 text-left">Department</th>
                        <th className="px-6 py-3 text-left">Description</th>
                        <th className="px-6 py-3 text-left">Price</th>
                        <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentServices.map((service, index) => (
                        <tr key={service.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4">{service.id}</td>
                            <td className="px-6 py-4">{service.name}</td>
                            <td className="px-6 py-4">
                                <select className="border rounded p-2">
                                    {departments.map((dept) => (
                                        <option key={dept} selected={dept === service.department}>{dept}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4">{service.description}</td>
                            <td className="px-6 py-4">{service.price}</td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(service.id)}
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
                <Link href="/service/AddService">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Service</button>
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

                <span>Page {currentPage} of {totalPages}</span>

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

export default ServiceList;
