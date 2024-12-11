/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { login, validateUser } from '@/redux/actions/authAction';


export default function LoginPage() {
    const router = useRouter()
    const dispatch = useAppDispatch()

    //get data
    const isAuthenticated = useAppSelector(state => state?.auth?.isAuthenticated ?? false)
    const isAuthenticating = useAppSelector(state => state?.auth?.isAuthenticating ?? true)

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');

        // Kiểm tra nếu accessToken và userId không phải null
        if (accessToken && userId) {
            dispatch(validateUser({ accessToken: accessToken, userId }))
        } else {
            // Xử lý trường hợp không có token hoặc userId
            console.error("Token or User ID is missing!");
        }
    }, []);


    useEffect(() => {
        if (isAuthenticated && !isAuthenticating) {
            router.push('/')
        }
    }, [isAuthenticated, isAuthenticating])

    const initialState = { emailOrPhone: '', password: '' };
    const [userData, setUserData] = useState(initialState);

    const { emailOrPhone, password } = userData;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        dispatch(login(userData))
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
                                    name="emailOrPhone"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email or phone number"
                                    value={emailOrPhone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={handleChange}
                                />
                            </div>

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

