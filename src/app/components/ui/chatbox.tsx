'use client';

import { useState } from 'react';

export default function ChatBox() {
    const [isChatboxVisible, setChatboxVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);

    // Hàm để toggle chatbox khi nhấn nút
    const toggleChatbox = () => {
        setChatboxVisible(!isChatboxVisible);
    };

    // Hàm gửi tin nhắn
    const handleSendMessage = async () => {
        if (message.trim()) {
            // Cập nhật chat history
            setChatHistory([...chatHistory, message]);
            setMessage('');

            // Gọi API để gửi tin nhắn (sẽ cập nhật sau)
            // await sendMessageToServer(message);
        }
    };

    return (
        <div>
            {/* Icon chat */}
            <div className="fixed bottom-6 right-6">
                <button
                    onClick={toggleChatbox} // Gọi hàm toggle khi nhấn
                    className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-400 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 22.1 95.2 60.16 131.1c-13.45 52.4-54.56 95.1-55.02 95.56C2.162 470.2 0 475.1 0 480c0 8.625 6.953 16 16 16c66.69 0 116.7-31.58 141.7-51.86C185.1 455.9 220.7 464 256 464c141.4 0 256-93.12 256-208S397.4 32 256 32zM380.1 285.2l-112 64C264.1 350.5 260 352 256 352s-8.125-1.469-12.12-2.844l-112-64C122.1 282.6 118.7 272.4 123.2 264.1s16.28-10.09 24.03-5.562L256 311.8l108.8-61.29c7.75-4.531 17.97-2.219 22.5 5.562S387.9 280.7 380.1 285.2z" />
                    </svg>
                </button>
            </div>

            {/* Chatbox */}
            {isChatboxVisible && (
                <div className="fixed bottom-24 right-6 bg-white w-80 h-96 border border-gray-300 shadow-lg rounded-lg p-4 z-40 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Chat với chúng tôi</h3>
                        <button
                            onClick={toggleChatbox} // Đóng chatbox
                            className="text-gray-500 hover:text-gray-700"
                        >
                            X
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto mb-4">
                        {/* Hiển thị lịch sử chat */}
                        {chatHistory.map((msg, index) => (
                            <div key={index} className="mb-2">
                                <p className="text-sm bg-gray-200 p-2 rounded-lg">{msg}</p>
                            </div>
                        ))}
                    </div>
                    {/* Input gửi tin nhắn trong khung chat */}
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} // Cập nhật tin nhắn
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring focus:border-sky-500"
                        />
                        <button
                            onClick={handleSendMessage} // Gửi tin nhắn
                            className="bg-blue-500 text-white p-2 ml-2 rounded-md hover:bg-blue-400 transition"
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
