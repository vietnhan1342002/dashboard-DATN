// hooks/useSocket.ts
import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = (serverUrl: string): ReturnType<typeof io> | null => {
    const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        const socketIo = io(serverUrl, {
            auth: {
                token: token
            }
        });

        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        };
    }, [serverUrl]);

    return socket;
};

export default useSocket;
