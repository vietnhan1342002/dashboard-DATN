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
    <StoreProvider>
      <html lang="en">
        <body>
          <div className="flex h-screen">
            {showSidebar && (
              <div className="flex-shrink-0">
                <Sidebar />
              </div>
            )}
            <main className={`flex-1 overflow-y-auto ${showSidebar ? 'ml-20' : ''}`}> {/* Thêm ml-20 để tạo khoảng cách cho phần nội dung khi có sidebar */}
              {children}
            </main>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
