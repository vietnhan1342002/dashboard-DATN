"use client";

import React from "react";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { FaUserDoctor, FaUser } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import { GiHealthNormal } from "react-icons/gi";
import { FaFileMedical, FaClipboardList, FaFileInvoiceDollar, FaChartBar, FaPills } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userId')
        router.push("/login");
    }

    return (
        <div className="h-screen w-20 bg-blue-600 flex">
            <div className="fixed top-0 left-0 h-full w-[70px] bg-blue-600 flex flex-col justify-center items-center space-y-8 py-8 text-white">
                <Link href="/">
                    <TiHome className="w-8 h-8 cursor-pointer" title="Home" />
                </Link>

                <Link href="/doctor/DoctorList">
                    <FaUserDoctor className="w-8 h-8 cursor-pointer" title="Doctors" />
                </Link>

                <Link href="/employee/EmployeeList">
                    <IoPersonAddSharp className="w-8 h-8 cursor-pointer" title="Employees" />
                </Link>

                <Link href="/specialty/SpecialtyList">
                    <GiHealthNormal className="w-8 h-8 cursor-pointer" title="Specialties" />
                </Link>

                <Link href="/service/ServiceList">
                    <MdAddModerator className="w-8 h-8 cursor-pointer" title="Services" />
                </Link>

                <Link href="/patient/PatientList">
                    <FaUser className="w-8 h-8 cursor-pointer" title="Patients" />
                </Link>

                <Link href="/appointment/AppointmentList">
                    <FaClipboardList className="w-8 h-8 cursor-pointer" title="Appointments" />
                </Link>

                <Link href="/medicalrecord/MedicalRecordList">
                    <FaFileMedical className="w-8 h-8 cursor-pointer" title="Medical Records" />
                </Link>

                <Link href="/medicine/MedicineList">
                    <FaPills className="w-8 h-8 cursor-pointer" title="Medicine Management" />
                </Link>

                <Link href="/bill/BillList">
                    <FaFileInvoiceDollar className="w-8 h-8 cursor-pointer" title="Bills" />
                </Link>

                <Link href="/revenuereport/RevenueReport">
                    <FaChartBar className="w-8 h-8 cursor-pointer" title="Revenue Report" />
                </Link>

                <div onClick={handleLogout} className="cursor-pointer">
                    <RiLogoutBoxFill className="w-8 h-8" title="Logout" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

