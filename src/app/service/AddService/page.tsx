"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios";
import { toast } from "sonner";

const AddService = () => {
    const [serviceData, setServiceData] = useState({
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

    const [departments, setDepartments] = useState<any[]>([]); // Danh sách departments để chọn
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    // Fetch danh sách departments
    const fetchDepartments = async () => {
        try {
            const res = await axiosInstance.get("/departments");
            setDepartments(res.data.result);
        } catch (error) {
            setError("Failed to fetch departments.");
        }
    };

    // Gọi API fetch departments khi component load
    useEffect(() => {
        fetchDepartments();
    }, []);

    // Xử lý thay đổi input
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
            ? serviceData.description.qualifications
            : serviceData.description.qualifications.split("\n").map((item) => item.trim()).filter((item) => item !== "");

        const relatedDiseasesArray: string[] = Array.isArray(serviceData.description.relatedDiseases)
            ? serviceData.description.relatedDiseases
            : serviceData.description.relatedDiseases.split("\n").map((item) => item.trim()).filter((item) => item !== "");

        try {
            const res = await axiosInstance.post("/specialties", {
                name: serviceData.name,
                departmentId: serviceData.departmentId._id,
                description: {
                    introduction: serviceData.description.introduction,
                    qualifications: qualificationsArray,
                    relatedDiseases: relatedDiseasesArray,
                },
            });

            if (res) {
                toast.success("Service added successfully");
                setTimeout(() => {
                    router.back(); // Điều hướng về danh sách dịch vụ (hoặc trang bạn muốn)
                }, 2000);
            }
        } catch (error) {
            setError("Failed to add service.");
        }
    };

    return (
        <div className="flex">
            <div className="p-4 flex-1">
                <h2 className="text-2xl font-semibold mb-4">Add Service</h2>
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
                            name="description.introduction"
                            value={serviceData.description.introduction}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                            rows={2}
                        />
                        <label className="block text-sm font-medium">Qualifications</label>
                        <textarea
                            name="description.qualifications"
                            value={serviceData.description.qualifications}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                            rows={2}
                        />
                        <label className="block text-sm font-medium">Related Diseases</label>
                        <textarea
                            name="description.relatedDiseases"
                            value={serviceData.description.relatedDiseases}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                            rows={2}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Service
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddService;
