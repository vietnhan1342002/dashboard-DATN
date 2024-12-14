/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function LoginPage() {

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const phone = (e.target as HTMLFormElement).phone.value;
        const password = (e.target as HTMLFormElement).password.value;

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user-auth/login', {
                phone,
                password,
            });

            const { token } = response.data;

            // Lưu token vào Local Storage
            localStorage.setItem('authToken', token);

            // Điều hướng đến trang chính
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid credentials. Please try again.');
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
                        <button className="w-full bg-white border border-gray-300 text-gray-600 rounded-lg px-4 py-2 mb-4 flex items-center justify-center shadow-sm hover:bg-gray-50">
                            <img src="/google.png" alt="Google" className="w-5 h-5 mr-2" />
                            Login with Google
                        </button>
                        <button className="w-full bg-white border border-gray-300 text-gray-600 rounded-lg px-4 py-2 mb-6 flex items-center justify-center shadow-sm hover:bg-gray-50">
                            <img
                                src="/facebook.png"
                                alt="Facebook"
                                className="w-5 h-5 mr-2"
                            />
                            Login with Facebook
                        </button>
                        <div className="text-center text-gray-500 mb-4">OR</div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
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
                                    id="password"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="********"
                                />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <input type="checkbox" id="remember" className="mr-2" />
                                    <label htmlFor="remember" className="text-sm">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-sm text-blue-700 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                            <Link
                                href="/"
                                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-center block hover:bg-blue-700 transition"
                            >
                                Login
                            </Link>
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
