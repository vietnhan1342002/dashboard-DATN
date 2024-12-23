// components/AuthNextProvider.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type AuthNextProviderProps = {
    children: React.ReactNode;
};

export const AuthNextProvider = ({ children }: AuthNextProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setIsAuthenticated(false);
                if (path !== '/login') {
                    router.push('/login');
                }
            } else {
                setIsAuthenticated(true);
                if (path === '/login') {
                    router.push('/home');
                }
            }
        };

        checkAuthentication();
    }, [path, router]);

    if (isAuthenticated === null) {
        return (
            <div className="flex h-screen justify-center items-center">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return <>{children}</>;
};
