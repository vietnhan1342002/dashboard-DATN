// app/layout.tsx
'use client';

import "./globals.css";
import Sidebar from "./components/Sidebar";
import StoreProvider from "./components/StoreProvider";
import { AuthNextProvider } from "./context/AuthContext";
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <body className="h-screen">
        <StoreProvider>
          <AuthNextProvider>
            <div className="flex h-screen">
              {!isLoginPage && (
                <aside className="flex-shrink-0 bg-gray-800 text-white">
                  <Sidebar />
                </aside>
              )}
              <main className={`flex-1 overflow-y-auto bg-gray-100 ${!isLoginPage ? 'ml-32' : 'w-full'}`}>
                {children}
              </main>
            </div>
          </AuthNextProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
