"use client"

import React, { useState } from 'react';

const MedicalRecordDetail = () => {
    const patientInfo = {
        id: "3",
        name: "NGUYỄN THỊ NGỌC LINH - SHS 828",
        gender: "Nữ",
        dob: "01/07/2023",
        address: "hn",
        phone: "0121 365 463",
        email: "",
        notes: "",
        totalVisits: 18,
        totalPaid: "120.000.004 ₫",

    };

    const medicalRecords = [
        { id: "20241108034831", treatmentName: "--", date: "08/11/2024", status: "Đang điều trị" },
        { id: "20241016033148", treatmentName: "--", date: "16/10/2024", status: "Đang điều trị" },
        { id: "20241014023659", treatmentName: "Xét nghiệm", date: "14/10/2024", status: "Đang điều trị" },

    ];

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = medicalRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(medicalRecords.length / recordsPerPage);

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

    const navigateToDetail = () => {
        console.log('Navigating to details for record ID: ');
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">{patientInfo.id} - {patientInfo.name}</h2>

            <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-2">THÔNG TIN BỆNH NHÂN</h3>
                <p><strong>Mã bệnh nhân:</strong> {patientInfo.id}</p>
                <p><strong>Họ tên:</strong> {patientInfo.name}</p>
                <p><strong>Số điện thoại:</strong> {patientInfo.phone}</p>
                <p><strong>Email:</strong> {patientInfo.email}</p>
                <p><strong>Địa chỉ:</strong> {patientInfo.address}</p>
                <p><strong>Ngày sinh:</strong> {patientInfo.dob}</p>
                <p><strong>Giới tính:</strong> {patientInfo.gender}</p>
                <p><strong>Ghi chú:</strong> {patientInfo.notes}</p>
            </section>

            <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-2">THÔNG TIN KHÁM</h3>
                <p><strong>Số lần khám:</strong> {patientInfo.totalVisits}</p>
                <p><strong>Tổng tiền đã trả:</strong> {patientInfo.totalPaid}</p>
            </section>

            <section className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">HỒ SƠ CŨ</h3>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b p-4 text-left font-medium">Mã bệnh án</th>
                            <th className="border-b p-4 text-left font-medium">Tên bệnh án</th>
                            <th className="border-b p-4 text-left font-medium">Ngày</th>
                            <th className="border-b p-4 text-left font-medium">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map(record => (
                            <tr
                                key={record.id}
                                onClick={() => navigateToDetail()}
                                className="cursor-pointer hover:bg-gray-100 text-black"
                            >
                                <td className="border-b p-4">{record.id}</td>
                                <td className="border-b p-4">{record.treatmentName}</td>
                                <td className="border-b p-4">{record.date}</td>
                                <td className="border-b p-4">{record.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
            </section>

            <button className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                QUAY LẠI
            </button>
        </div>
    );
};

export default MedicalRecordDetail;
