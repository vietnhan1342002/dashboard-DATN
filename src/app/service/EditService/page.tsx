"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setServices, setLoading } from "@/redux/store/serviceSlice";
import axios from "axios";

// Định nghĩa kiểu dữ liệu cho Department
interface Department {
    _id: string;
    departmentName: string;
}

// Loại dữ liệu tạm thời cho chỉnh sửa dịch vụ
interface EditServiceData {
    name: string;
    departmentId: string;
    description: string;
}

const EditService = () => {
    const [serviceData, setServiceData] = useState<EditServiceData>({
        name: "",
        departmentId: "",
        description: "",
    });

    const [specialties, setSpecialty] = useState<Department[]>([]); // Danh sách departments để chọn
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const _id = searchParams.get("id");

    const dispatch = useDispatch();
    const { services, loading } = useSelector((state: RootState) => state.services);

    // Lấy danh sách departments và thông tin service từ API
    useEffect(() => {
        const fetchData = async () => {
            if (!_id) {
                setError("Invalid service ID.");
                return;
            }
            try {
                dispatch(setLoading(true));

                // Fetch danh sách departments và service theo ID
                const [departmentsResponse, serviceResponse] = await Promise.all([
                    axios.get("http://13.211.141.240:8080/api/v1/departments"),
                    axios.get(`http://13.211.141.240:8080/api/v1/specialties/${_id}`),
                ]);

                console.log("Departments Response:", departmentsResponse.data);
                console.log("Service Response:", serviceResponse.data);

                // Set danh sách departments
                setSpecialty(Array.isArray(departmentsResponse.data) ? departmentsResponse.data : []);

                // Kiểm tra xem serviceResponse có dữ liệu không và cập nhật form
                if (serviceResponse.data) {
                    const { name, departmentId, description } = serviceResponse.data;
                    setServiceData({
                        name: name || "",
                        departmentId: departmentId?._id || "", // Đảm bảo departmentId là chuỗi
                        description: description || "", // Đảm bảo description không bị undefined
                    });
                } else {
                    setError("Service not found.");
                }

            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data.");
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [_id, dispatch]);

    // Xử lý thay đổi input
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setServiceData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Xử lý submit form
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!_id) {
            setError("Invalid service ID.");
            return;
        }

        dispatch(setLoading(true));
        try {
            const response = await axios.put(
                `http://13.211.141.240:8080/api/v1/specialties/${_id}`,
                serviceData
            );

            console.log("Service updated:", response.data);

            // Cập nhật Redux store
            const updatedServices = services.map((service) =>
                service._id === _id ? response.data : service
            );
            dispatch(setServices(updatedServices));

            router.push("/service"); // Điều hướng sau khi cập nhật
        } catch (err) {
            console.error("Error updating service:", err);
            setError("Failed to update service.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

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
                            value={serviceData.departmentId}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                        >
                            <option value="">Select Specialty</option>
                            {specialties.map((dept) => (
                                <option key={dept._id} value={dept._id}>
                                    {dept.departmentName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={serviceData.description}
                            onChange={handleChange}
                            required
                            className="border rounded p-2 w-full"
                            rows={4}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading && "opacity-50"}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Service"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditService;
