
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_STAFF } from '../../constants';
import AdminDashboard from '../../components/AdminDashboard';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('userType');
    if (role !== 'admin') {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">Master Agenda.</h1>
            <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">Real-time Studio Operations</p>
          </div>
          <button 
            onClick={() => { localStorage.clear(); router.push('/login'); }}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#4682B4] transition-colors"
          >
            Sign Out
          </button>
        </header>

        <AdminDashboard staffList={MOCK_STAFF} />
      </div>
    </div>
  );
}
