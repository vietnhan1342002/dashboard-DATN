/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { handleLogin } from "@/redux/store/authSlice";
import { AppDispatch } from "@/redux/store";


export default function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        try {
            await dispatch(handleLogin(phoneNumber, password));
            const token = localStorage.getItem('accessToken');
            if (token) {
                router.push('/');
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError('Error')
        }
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
                        <h1 className="text-3xl font-bold mb-6 text-blue-800">
                            Welcome to <span className="text-blue-900">Design School</span>
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="emailOrPhone" className="block text-sm font-medium">
                                    Email or Phone Number
                                </label>
                                <input
                                    id="emailOrPhone"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email or phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Hiển thị thông báo lỗi nếu có */}
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-center block hover:bg-blue-700 transition"
                            >
                                Login
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <p className="text-sm">
                                Don’t have an account?{" "}
                                <a href="/register" className="text-blue-700 hover:underline">
                                    Register
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
