"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddAppointment = () => {
    const [patientName, setPatientName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [appointmentDate, setAppointmentDate] = useState<string>('');
    const [service, setService] = useState<string>('');
    const [doctor, setDoctor] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const router = useRouter();

    const handleSave = () => {
        console.log({
            patientName,
            phoneNumber,
            email,
            dob,
            address,
            gender,
            appointmentDate,
            service,
            doctor,
            notes,
        });
    };

    const handleCancel = () => {
        router.push("/appointment/AppointmentList");
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Thêm Mới Lịch Hẹn</h2>

            <div className="bg-white shadow-md rounded p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Thông Tin Bệnh Nhân</h3>
                <input
                    type="text"
                    placeholder="Họ tên bệnh nhân"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                    required
                />
                <input
                    type="text"
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                />
                <input
                    type="date"
                    placeholder="Ngày sinh"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                    required
                />
                <input
                    type="text"
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                    required
                />

                <div className="flex items-center mb-4">
                    <label className="mr-4">Giới tính:</label>
                    <label className="mr-2">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                        />
                        Nam
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                        />
                        Nữ
                    </label>
                </div>
            </div>

            <div className="bg-white shadow-md rounded p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Thông Tin Cuộc Hẹn</h3>
                <input
                    type="date"
                    placeholder="Thời gian"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                    required
                />

                <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                    required
                >
                    <option value="" disabled>Chọn loại dịch vụ</option>
                    <option value="general-checkup">Khám tổng quát</option>
                    <option value="dental">Khám nha khoa</option>
                    <option value="eye-exam">Khám mắt</option>
                </select>

                <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                    required
                >
                    <option value="" disabled>Chọn bác sĩ</option>
                    <option value="dr-nguyen">Bác sĩ Nguyễn Văn A</option>
                    <option value="dr-tran">Bác sĩ Trần Thị B</option>
                    <option value="dr-le">Bác sĩ Lê Văn C</option>
                </select>

                <textarea
                    placeholder="Nội dung"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                    rows={4}
                ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Quay lại
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default AddAppointment;
