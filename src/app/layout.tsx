'use client'
import "./globals.css";
import Sidebar from "./components/Sidebar";
import StoreProvider from "./components/StoreProvider";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token && path !== '/login') {
      router.push('/login');
    }
  }, [path, router]);
  const showSidebar = path !== '/login';
  return (
    <html lang="en">
      <body>
        <div className="flex">
          {showSidebar && <Sidebar />}
          <main className="flex-1">
            <StoreProvider>{children}</StoreProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
