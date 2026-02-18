
"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_SERVICES, MOCK_STAFF, MOCK_APPOINTMENTS } from '../constants';
import LoginView from '../components/LoginView';
import AdminView from '../components/AdminView';
import ClientPortal from '../components/ClientPortal';

export default function Page() {
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRole = typeof window !== 'undefined' ? localStorage.getItem('aurum_role') : null;
    if (savedRole === 'admin' || savedRole === 'client') {
      setUserRole(savedRole as 'admin' | 'client');
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (role: 'admin' | 'client') => {
    setUserRole(role);
    localStorage.setItem('aurum_role', role);
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('aurum_role');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-steelblue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-black text-steelblue tracking-tighter uppercase">Aurum Studio.</h1>
            {userRole && (
              <span className="bg-steelblue/10 text-steelblue text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-steelblue/20">
                {userRole === 'admin' ? 'Internal Dashboard' : 'Client Portal'}
              </span>
            )}
          </div>
          {userRole && (
            <button 
              onClick={handleLogout}
              className="text-gray-400 text-xs font-black uppercase tracking-widest hover:text-steelblue transition-colors flex items-center gap-2"
            >
              Sign Out
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          {!userRole ? (
            <LoginView onLogin={handleLogin} />
          ) : userRole === 'admin' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AdminView appointments={MOCK_APPOINTMENTS} staffList={MOCK_STAFF} />
            </div>
          ) : (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center space-y-4 py-12 max-w-2xl mx-auto">
                  <h2 className="text-5xl font-black text-gray-900 tracking-tight">Your Session Awaits.</h2>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed">Book a signature experience at Colombo's premier creative studio. Minimalist grooming, maximalist results.</p>
               </div>
               <ClientPortal 
                  services={MOCK_SERVICES} 
                  staffList={MOCK_STAFF} 
                  existingAppointments={MOCK_APPOINTMENTS} 
               />
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-100 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2024 Aurum Studio - Internal Use Only</p>
             <p className="text-[9px] text-gray-300 font-medium uppercase tracking-widest opacity-60">Optimized for Vercel Deployment</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span className="hover:text-steelblue cursor-pointer transition-colors">Support</span>
            <span className="hover:text-steelblue cursor-pointer transition-colors">Security</span>
            <span className="hover:text-steelblue cursor-pointer transition-colors">PayHere SL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
