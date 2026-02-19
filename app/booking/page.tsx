
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_SERVICES, MOCK_STAFF, MOCK_APPOINTMENTS } from '../../constants';
import BookingForm from '../../components/BookingForm';

export default function BookingPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('userType');
    if (!role) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center space-y-3 sm:space-y-4 py-8 sm:py-12 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">Your Session Awaits.</h1>
          <p className="text-gray-500 font-medium text-sm sm:text-base md:text-lg leading-relaxed">Book a signature experience at Colombo's premier creative studio. Minimalist grooming, maximalist results.</p>
        </div>
        
        <BookingForm 
          services={MOCK_SERVICES} 
          staffList={MOCK_STAFF} 
          existingAppointments={MOCK_APPOINTMENTS}
        />

        <button 
          onClick={() => { localStorage.clear(); router.push('/login'); }}
          className="mt-8 sm:mt-12 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-[#4682B4] transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
