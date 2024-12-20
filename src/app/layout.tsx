// app/layout.tsx
'use client';
import "./globals.css";
import Sidebar from "./components/Sidebar";
import StoreProvider from "./components/StoreProvider";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token && path !== '/login') {
      router.push('/login');
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(!!token);
    }
  }, [path, router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  const showSidebar = isAuthenticated && path !== '/login';

  return (
    <html lang="en">
      <body className={`h-screen ${showSidebar ? 'flex' : ''}`}>
        <>
          <StoreProvider>
            {showSidebar && (
              <aside className="flex-shrink-0 bg-gray-800 text-white">
                <Sidebar />
              </aside>
            )}
            <main
              className={`flex-1 overflow-y-auto bg-gray-100 ${showSidebar ? 'ml-32' : 'w-full'}`}
            >
              {children}
            </main>
          </StoreProvider>
        </>
      </body>
    </html>
  );
}
