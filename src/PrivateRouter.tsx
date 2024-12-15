'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();


  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default PrivateRoute;
