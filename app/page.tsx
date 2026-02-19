
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userType');
    if (!role) {
      router.push('/login');
    } else if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/booking');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-4 border-[#4682B4] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
