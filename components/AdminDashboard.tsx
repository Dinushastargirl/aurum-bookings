
"use client";

import React, { useEffect, useState } from 'react';
import { Staff, Appointment, AppointmentStatus } from '../types';

interface DashboardProps {
  staffList: Staff[];
}

const AdminDashboard: React.FC<DashboardProps> = ({ staffList }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      try {
        const response = await fetch(`${apiUrl}/bookings`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        }
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (isLoading) return <div className="flex justify-center p-20"><div className="w-8 h-8 border-4 border-[#4682B4] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <th className="p-4 md:p-6">Start Time</th>
              <th className="p-4 md:p-6">Client</th>
              <th className="p-4 md:p-6">Service</th>
              <th className="p-4 md:p-6">Professional</th>
              <th className="p-4 md:p-6 text-right">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {appointments.length > 0 ? appointments.map((appt) => (
              <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 md:p-6 font-black text-[#4682B4]">{new Date(appt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td className="p-4 md:p-6">
                  <p className="font-bold text-gray-900 text-sm md:text-base">{appt.clientName}</p>
                  <p className="text-[10px] md:text-xs text-gray-400">{appt.clientPhone}</p>
                </td>
                <td className="p-4 md:p-6">
                  <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wide">
                    {appt.serviceId}
                  </span>
                </td>
                <td className="p-4 md:p-6 font-bold text-xs md:text-sm text-gray-600">
                  {staffList.find(s => s.id === appt.staffId)?.name || appt.staffId}
                </td>
                <td className="p-4 md:p-6 text-right">
                  <span className={`px-2 md:px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase whitespace-nowrap ${appt.status === AppointmentStatus.CONFIRMED ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    {appt.status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="p-20 text-center text-gray-300 font-bold uppercase tracking-widest">No bookings found in studio records</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-gray-50/50 border-t border-gray-100 md:hidden">
        <p className="text-[9px] text-gray-400 font-bold uppercase text-center tracking-widest">Scroll horizontally to view more details</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
