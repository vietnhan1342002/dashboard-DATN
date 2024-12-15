'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function LoginPage() {

    const initialLogin = {
        phoneNumber: '',
        password: ''
    }
    const router = useRouter()
    const [formLogin, setFormLogin] = useState(initialLogin)

    useEffect(() => {
        const savedPhoneNumber = localStorage.getItem('phoneNumber');
        if (savedPhoneNumber) {
            setFormLogin(prevState => ({
                ...prevState,
                phoneNumber: savedPhoneNumber
            }));
        }
    }, [])

    const fetchLogin = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/user-auth/login`, {
                phoneNumber: formLogin.phoneNumber,
                password: formLogin.password
            });
            if (res.data) {
                localStorage.setItem('accessToken', res.data.accessToken)
                localStorage.setItem('userId', res.data.userId)
            }
            toast.success('Login successful!');
            router.push('/')

        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(`Login failed: ${error.response.data.message || 'Unknown error'}`);
                } else {
                    toast.error(`An error occurred: ${error.message}`);
                }
            } else {
                toast.error('Network error or no response from server');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormLogin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formLogin.phoneNumber || !formLogin.password) {
            toast.warning("Please fill in both fields.");
            return;
        }
        fetchLogin()
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            {/* Outer Card with Rounded Border */}
            <div className="bg-white rounded-3xl shadow-lg flex w-4/5 max-w-5xl border-2 border-blue-500 overflow-hidden">
                {/* Left Section - Full Image */}
                <div className="w-1/2">
                    <img
                        src="/login.jpg" // Thay đường dẫn ảnh phù hợp
                        alt="Login Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Section */}
                <div className="w-1/2 p-10 border-l-2 border-gray-200">
                    {/* Inner Box for Right Section */}
                    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300">
                        <h1 className="text-3xl text-center font-bold mb-6 text-blue-800">
                            Welcome to <span className="text-blue-900">ZCARE</span>
                        </h1>


                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    value={formLogin.phoneNumber}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={formLogin.password}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your pasword"
                                />
                            </div>
                            <button
                                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-center block hover:bg-blue-700 transition"
                            >
                                Login
                            </button>
                        </form>
                        <Toaster className='absolute' position='top-center' />
                    </div>
                </div>
            </div>
        </div>
    );
}
