'use client';

import React from "react";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { FaUserDoctor, FaUser } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import { GiHealthNormal } from "react-icons/gi";
import { FaFileMedical, FaClipboardList, FaFileInvoiceDollar, FaChartBar, FaPills } from "react-icons/fa";
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname(); // Lấy đường dẫn hiện tại từ `usePathname`
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        router.push('/login');
    };

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === path
                ? "bg-blue-700 text-white scale-110 shadow-lg"
                : "text-gray-300 hover:text-blue-500";
        }
        return pathname.includes(path)
            ? "bg-blue-700 text-white scale-110 shadow-lg"
            : "text-gray-300 hover:text-blue-500";
    };

    return (
        <div className="h-screen w-20 bg-blue-600 fixed top-0 left-0 flex flex-col justify-between items-center py-8 text-white overflow-y-auto shadow-xl transition-all duration-300 ease-in-out sidebar">

            {/* Các link trong sidebar */}
            <Link href="/" className={`flex flex-col items-center justify-center ${isActive('/')}`}>
                <TiHome className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Home" />
                <span className="text-xs">Home</span>
            </Link>
            <Link href="/doctor/DoctorList" className={`flex flex-col items-center justify-center mt-4 ${isActive('doctor/DoctorList')}`}>
                <FaUserDoctor className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Doctors" />
                <span className="text-xs">Doctors</span>
            </Link>
            <Link href="/doctor-schedule" className={`flex flex-col items-center justify-center mt-4 ${isActive('doctor/DoctorList')}`}>
                <FaUserDoctor className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Doctor-schedule" />
                <span className="text-xs">Doctor schedule</span>
            </Link>
            <Link href="/employee/EmployeeList" className={`flex flex-col items-center justify-center mt-4 ${isActive('employee/EmployeeList')}`}>
                <IoPersonAddSharp className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Employees" />
                <span className="text-xs">Employees</span>
            </Link>
            <Link href="/specialty/SpecialtyList" className={`flex flex-col items-center justify-center mt-4 ${isActive('specialty/SpecialtyList')}`}>
                <GiHealthNormal className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Specialties" />
                <span className="text-xs">Specialties</span>
            </Link>
            <Link href="/service/ServiceList" className={`flex flex-col items-center justify-center mt-4 ${isActive('service/ServiceList')}`}>
                <MdAddModerator className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Services" />
                <span className="text-xs">Services</span>
            </Link>
            <Link href="/patient/PatientList" className={`flex flex-col items-center justify-center mt-4 ${isActive('patient/PatientList')}`}>
                <FaUser className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Patients" />
                <span className="text-xs">Patients</span>
            </Link>
            <Link href="/appointment/AppointmentList" className={`flex flex-col items-center justify-center mt-4 ${isActive('appointment/AppointmentList')}`}>
                <FaClipboardList className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Appointments" />
                <span className="text-xs">Appointments</span>
            </Link>
            <Link href="/medicalrecord/MedicalRecordList" className={`flex flex-col items-center justify-center mt-4 ${isActive('medicalrecord/MedicalRecordList')}`}>
                <FaFileMedical className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Medical Records" />
                <span className="text-xs">Medical Records</span>
            </Link>
            <Link href="/medicine/MedicineList" className={`flex flex-col items-center justify-center mt-4 ${isActive('medicine/MedicineList')}`}>
                <FaPills className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Medicine Management" />
                <span className="text-xs">Medicine</span>
            </Link>
            <Link href="/bill/BillList" className={`flex flex-col items-center justify-center mt-4 ${isActive('bill/BillList')}`}>
                <FaFileInvoiceDollar className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Bills" />
                <span className="text-xs">Bills</span>
            </Link>
            <Link href="/revenuereport/RevenueReport" className={`flex flex-col items-center justify-center mt-4 ${isActive('revenuereport/RevenueReport')}`}>
                <FaChartBar className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Revenue Report" />
                <span className="text-xs">Revenue</span>
            </Link>
            <div onClick={handleLogout} className="cursor-pointer flex flex-col items-center justify-center mt-auto hover:bg-red-600 p-2 rounded-lg transition-all duration-300 ease-in-out">
                <RiLogoutBoxFill className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out" title="Logout" />
                <span className="text-xs">Logout</span>
            </div>
        </div>
    );
};

export default Sidebar;
