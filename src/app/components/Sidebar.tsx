'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { FaUserDoctor, FaUser } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import { GiHealthNormal } from "react-icons/gi";
import { FaFileMedical, FaClipboardList, FaFileInvoiceDollar, FaChartBar, FaPills } from "react-icons/fa";
import { usePathname, useRouter } from 'next/navigation';
import axiosInstance from "../utils/axios";

const routesByRole = {
    admin: [
        { href: "/", icon: TiHome, label: "Home" },
        { href: "/doctor/DoctorList", icon: FaUserDoctor, label: "Doctors" },
        { href: "/doctor-schedule", icon: FaUserDoctor, label: "Doctor Schedule" },
        { href: "/employee/EmployeeList", icon: IoPersonAddSharp, label: "Employees" },
        { href: "/specialty/SpecialtyList", icon: GiHealthNormal, label: "Specialties" },
        { href: "/service/ServiceList", icon: MdAddModerator, label: "Services" },
        { href: "/patient/PatientList", icon: FaUser, label: "Patients" },
        { href: "/appointment/AppointmentList", icon: FaClipboardList, label: "Appointments" },
        { href: "/medicalrecord/MedicalRecordList", icon: FaFileMedical, label: "Medical Records" },
        { href: "/medicine/MedicalRecordList/MedicineList", icon: FaPills, label: "Medicine" },
        { href: "/bill/BillList", icon: FaFileInvoiceDollar, label: "Bills" },
        { href: "/revenuereport/RevenueReport", icon: FaChartBar, label: "Revenue" },
    ],
    doctor: [
        { href: "/", icon: TiHome, label: "Home" },
        { href: "/doctor-schedule/ScheduleList", icon: FaUserDoctor, label: "List Schedule" },
        { href: "/medicalrecord/MedicalRecordList", icon: FaFileMedical, label: "Medical Records" },
        { href: "/appointment/AppointmentDoctor", icon: FaClipboardList, label: "Appointment" },
    ],
    receptionist: [
        { href: "/", icon: TiHome, label: "Home" },
        { href: "/appointment/AppointmentList", icon: FaClipboardList, label: "Appointments" },
        { href: "/patient/PatientList", icon: FaUser, label: "Patients" },
    ],
} as const;

type UserRole = keyof typeof routesByRole; // 'admin' | 'doctor' | 'receptionist'

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const userId = localStorage.getItem('userId');
    const [userRole, setUserRole] = useState<UserRole | null>(null);

    const getRole = async (userId: string) => {
        try {
            const res = await axiosInstance.get(`user-auth/${userId}`);
            const nameRole = res.data.roleId.nameRole as UserRole; // Explicit type assertion
            console.log(nameRole);
            setUserRole(nameRole);
        } catch (error) {
            console.error("Failed to fetch role", error);
        }
    };

    useEffect(() => {
        if (userId) {
            getRole(userId);
        }
    }, [userId]);

    const routes = userRole ? routesByRole[userRole] : [];

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
        <div className="h-screen w-30 bg-blue-600 fixed top-0 left-0 flex flex-col justify-between items-center py-8 text-white overflow-y-auto shadow-xl transition-all duration-300 ease-in-out sidebar">
            {routes.map((route, index) => (
                <Link
                    key={index}
                    href={route.href}
                    className={`flex flex-col items-center justify-center mt-4 ${isActive(route.href)}`}
                >
                    <route.icon
                        className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out"
                        title={route.label}
                    />
                    <span className="text-xs">{route.label}</span>
                </Link>
            ))}
            <div
                onClick={handleLogout}
                className="cursor-pointer flex flex-col items-center justify-center mt-auto hover:bg-red-600 p-2 rounded-lg transition-all duration-300 ease-in-out"
            >
                <RiLogoutBoxFill
                    className="w-8 h-8 cursor-pointer transition-all duration-300 ease-in-out"
                    title="Logout"
                />
                <span className="text-xs">Logout</span>
            </div>
        </div>
    );
};

export default Sidebar;
