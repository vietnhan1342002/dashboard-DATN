'use client';

import React from 'react';

export default function Checkout() {
    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
                    Checkout
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Thông tin khách hàng */}
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                            Customer Information
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="(123) 456-7890"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Shipping Address
                                </label>
                                <textarea
                                    id="address"
                                    placeholder="123 Main St, City, Country"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                            Payment Details
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label
                                    htmlFor="cardName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Cardholder Name
                                </label>
                                <input
                                    id="cardName"
                                    type="text"
                                    placeholder="John Doe"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="cardNumber"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Card Number
                                </label>
                                <input
                                    id="cardNumber"
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="expiry"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Expiry Date
                                    </label>
                                    <input
                                        id="expiry"
                                        type="text"
                                        placeholder="MM/YY"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="cvv"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        CVV
                                    </label>
                                    <input
                                        id="cvv"
                                        type="text"
                                        placeholder="123"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Chi tiết đơn hàng */}
                <div className="bg-white shadow-lg rounded-lg p-8 mt-8">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                        Order Summary
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Product 1</span>
                            <span>$100</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Product 2</span>
                            <span>$50</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$10</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>$160</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="mt-6 w-full bg-blue-600 text-white text-xl font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                        Confirm & Pay
                    </button>
                </div>
            </div>
        </div>
    );
}
