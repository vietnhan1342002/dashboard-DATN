"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setServices, setLoading } from "@/redux/store/serviceSlice";
import axios from "axios";
import axiosInstance from "@/app/utils/axios";
import { toast } from "sonner";


const EditService = () => {
    const [serviceData, setServiceData] = useState({
        _id: "",
        name: "",
        description: {
            introduction: "",
            qualifications: "",
            relatedDiseases: ""
        },
        departmentId: {
            _id: "",
            departmentName: ""
        }
    });


    const [departments, setDeparment] = useState<any[]>([]); // Danh sách departments để chọn
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    const specialtyId = searchParams.get("id");

    const fetchDepartment = async () => {
        const res = await axiosInstance.get('/departments')
        setDeparment(res.data.result)
    }

    const fetchSpecialDetail = async (specialtyId: string) => {
        const res = await axiosInstance.get(`/specialties/${specialtyId}`)
        console.log(res.data);
        setServiceData(res.data)
    }

    useEffect(() => {
        fetchDepartment()
        if (specialtyId) {
            fetchSpecialDetail(specialtyId)
        }
    }, [])


    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === "departmentId") {
            const selectedDepartment = departments.find((dept) => dept._id === value);
            setServiceData((prev) => ({
                ...prev,
                departmentId: selectedDepartment || { _id: "", departmentName: "" },
            }));
        } else if (name.startsWith("description.")) {
            const fieldName = name.split(".")[1];
            setServiceData((prev) => ({
                ...prev,
                description: {
                    ...prev.description,
                    [fieldName]: value,
                },
            }));
        } else {
            setServiceData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    // Xử lý submit form
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const qualificationsArray: string[] = Array.isArray(serviceData.description.qualifications)
            ? serviceData.description.qualifications // Nếu đã là mảng thì giữ nguyên
            : serviceData.description.qualifications.split("\n").map((item) => item.trim()).filter((item) => item !== "");

        const relatedDiseasesArray: string[] = Array.isArray(serviceData.description.relatedDiseases)
            ? serviceData.description.relatedDiseases // Nếu đã là mảng thì giữ nguyên
            : serviceData.description.relatedDiseases.split("\n").map((item) => item.trim()).filter((item) => item !== "");


        const res = await axiosInstance.patch(`/specialties/${specialtyId}`, {
            name: serviceData.name,
            departmentId: serviceData.departmentId._id,
            description: {
                introduction: serviceData.description.introduction,
                qualifications: qualificationsArray,  // Đảm bảo gửi mảng chuỗi
                relatedDiseases: relatedDiseasesArray  // Đảm bảo gửi mảng chuỗi
            }
        })
        if (res) {
            toast.success('update successfully')
            setTimeout(() => {
                router.back();
            }, 2000);
        }
        console.log('res', res);
        console.log(serviceData);
    };


    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Edit Service</h2>
                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Service Name</label>
                        <input
                            type="text"
                            name="name"
                            value={serviceData.name}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Specialty</label>
                        <select
                            name="departmentId"
                            value={serviceData.departmentId._id}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        >
                            <option value="" disabled>Select specialty</option>
                            {departments.map((item) => (
                                <option key={item._id} value={item._id}>{item.departmentName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description.introduction" // Đảm bảo cập nhật đúng trường con trong description
                            value={serviceData.description.introduction}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                            rows={2}
                        />
                        <label className="block text-sm font-medium">Qualifications</label>
                        <textarea
                            name="description.qualifications" // Cập nhật name đúng cho qualifications
                            value={serviceData.description.qualifications}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                            rows={2}
                        />
                        <label className="block text-sm font-medium">Related Diseases</label>
                        <textarea
                            name="description.relatedDiseases" // Cập nhật name đúng cho relatedDiseases
                            value={serviceData.description.relatedDiseases}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                            rows={2}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 `}
                    >
                        Update Service
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditService;
