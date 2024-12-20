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
        { href: "/employee/EmployeeList", icon: IoPersonAddSharp, label: "Employees" },
        { href: "/specialty/SpecialtyList", icon: GiHealthNormal, label: "Specialties" },
        { href: "/service/ServiceList", icon: MdAddModerator, label: "Services" },
        { href: "/patient/PatientList", icon: FaUser, label: "Patients" },
        { href: "/appointment/AppointmentList", icon: FaClipboardList, label: "Appointments" },
        { href: "/medicalrecord/MedicalRecordList", icon: FaFileMedical, label: "Medical Records" },
        { href: "/medicine/MedicineList", icon: FaPills, label: "Medicine" },
        { href: "/bill/BillList", icon: FaFileInvoiceDollar, label: "Bills" },
        { href: "/revenuereport/RevenueReport", icon: FaChartBar, label: "Revenue" },
    ],
    doctor: [
        { href: "/", icon: TiHome, label: "Home" },
        { href: "/doctor/DoctorProfile", icon: FaUserDoctor, label: "Profile" },
        { href: "/doctor-schedule/ScheduleList", icon: FaUserDoctor, label: "Schedule" },
        { href: "/medicalrecord/MedicalRecordList", icon: FaFileMedical, label: "Medical Records" },
    ],
    receptionist: [
        { href: "/appointment/AppointmentList", icon: FaClipboardList, label: "Appointments" },
        { href: "/doctor/DoctorList", icon: FaUserDoctor, label: "Doctors" },
        { href: "/bill/BillList", icon: FaFileInvoiceDollar, label: "Bills" },
    ],
} as const;

type UserRole = keyof typeof routesByRole; // 'admin' | 'doctor' | 'receptionist'

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null); // Add userId state
    const [userRole, setUserRole] = useState<UserRole | null>(null);

    // Function to fetch user role based on userId
    const getRole = async (userId: string) => {
        try {
            const res = await axiosInstance.get(`user-auth/${userId}`);
            const nameRole = res.data.roleId.nameRole as UserRole; // Explicit type assertion
            setUserRole(nameRole);
        } catch (error) {
            console.error("Failed to fetch role", error);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                setUserId(storedUserId);
                getRole(storedUserId);
            }
        }
    }, []);

    useEffect(() => {
        if (userRole === "receptionist") {
            router.push("/appointment/AppointmentList"); // Redirect to AppointmentList for receptionist
        }
    }, [userRole, router]);

    const routes = userRole ? routesByRole[userRole] : [];

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        router.push('/login');
    };

    const isActive = (path: string) => {
        const baseClass = "flex flex-col items-center justify-center mt-4 p-3 rounded-lg transition-all duration-300 ease-in-out w-full"; // Thêm w-full để chiếm hết chiều ngang
        if (path === '/') {
            return pathname === path
                ? `${baseClass} bg-blue-800 text-white scale-110 shadow-md`
                : `${baseClass} text-gray-300 hover:bg-blue-500 hover:text-white`;
        }
        return pathname.includes(path)
            ? `${baseClass} bg-blue-800 text-white scale-110 shadow-md`
            : `${baseClass} text-gray-300 hover:bg-blue-500 hover:text-white`;
    };

    return (
        <div className="h-screen w-32 bg-blue-600 fixed top-0 left-0 flex flex-col justify-between items-center py-8 text-white overflow-y-auto overflow-x-hidden shadow-xl transition-all duration-300 ease-in-out sidebar">
            <div className="flex-grow w-full">
                {routes.map((route, index) => (
                    <Link
                        key={index}
                        href={route.href}
                        className={`flex flex-col items-center justify-center mt-4 ${isActive(route.href)}`}
                    >
                        <route.icon
                            className="w-6 h-6 cursor-pointer transition-all duration-300 ease-in-out"
                            title={route.label}
                        />
                        <span className="text-base text-center">{route.label}</span>
                    </Link>
                ))}
            </div>
            {/* Sticky Logout button */}
            <div
                onClick={handleLogout}
                className="cursor-pointer flex flex-col items-center justify-center mt-auto sticky bottom-0 p-3 rounded-lg transition-all duration-300 ease-in-out w-full bg-red-600 hover:bg-red-700"
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
