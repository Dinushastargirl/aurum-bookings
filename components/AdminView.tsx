
import React, { useState } from 'react';
import { Appointment, Staff, AppointmentStatus } from '../types';

interface AdminProps {
  appointments: Appointment[];
  staffList: Staff[];
}

const AdminView: React.FC<AdminProps> = ({ appointments: initialAppointments, staffList }) => {
  const [view, setView] = useState<'agenda' | 'directory'>('agenda');
  const [appointments, setAppointments] = useState(initialAppointments);

  const toggleStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-aurum-grey/10 shadow-sm">
        <div className="flex gap-4">
          <button 
            onClick={() => setView('agenda')}
            className={`px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-all ${view === 'agenda' ? 'bg-steelblue text-white shadow-md' : 'text-aurum-grey hover:bg-gray-50'}`}
          >
            Master Agenda
          </button>
          <button 
            onClick={() => setView('directory')}
            className={`px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-all ${view === 'directory' ? 'bg-steelblue text-white shadow-md' : 'text-aurum-grey hover:bg-gray-50'}`}
          >
            Client Directory
          </button>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-aurum-grey uppercase tracking-[0.2em]">Operational Date</p>
          <p className="text-sm font-black text-steelblue">{new Date().toDateString()}</p>
        </div>
      </div>

      {view === 'agenda' ? (
        <div className="bg-white rounded-2xl border border-aurum-grey/10 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-aurum-grey/10 text-aurum-grey text-[10px] font-black uppercase tracking-widest">
                <th className="p-5">Time</th>
                <th className="p-5">Client</th>
                <th className="p-5">Service</th>
                <th className="p-5">Staff</th>
                <th className="p-5 text-right">Status / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aurum-grey/5">
              {appointments.sort((a,b) => a.startTime.getTime() - b.startTime.getTime()).map(appt => (
                <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5">
                    <span className="font-black text-steelblue text-sm">{appt.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}</span>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-gray-900">{appt.clientName || 'Walk-in Client'}</p>
                    <p className="text-xs text-aurum-grey">{appt.clientPhone}</p>
                  </td>
                  <td className="p-5">
                    <span className="bg-gray-100 text-aurum-grey px-3 py-1 rounded-full text-[10px] font-bold uppercase">{appt.serviceId}</span>
                  </td>
                  <td className="p-5 flex items-center gap-2">
                    <img src={staffList.find(s => s.id === appt.staffId)?.avatar} className="w-6 h-6 rounded-full" />
                    <span className="text-sm font-medium">{staffList.find(s => s.id === appt.staffId)?.name.split(' ')[0]}</span>
                  </td>
                  <td className="p-5 text-right space-x-2">
                    <select 
                      value={appt.status}
                      onChange={(e) => toggleStatus(appt.id, e.target.value as AppointmentStatus)}
                      className="bg-white border border-aurum-grey/20 rounded-lg px-2 py-1 text-xs font-bold outline-none"
                    >
                      <option value={AppointmentStatus.CONFIRMED}>Confirmed</option>
                      <option value={AppointmentStatus.COMPLETED}>Completed</option>
                      <option value={AppointmentStatus.NO_SHOW}>No-Show</option>
                      <option value={AppointmentStatus.CANCELLED}>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from(new Set(appointments.map(a => a.clientId))).map(cId => {
            const client = appointments.find(a => a.clientId === cId);
            return (
              <div key={cId} className="bg-white p-6 rounded-2xl border border-aurum-grey/10 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-steelblue/10 rounded-full flex items-center justify-center text-steelblue font-black uppercase">
                  {client?.clientName?.[0]}
                </div>
                <div>
                  <p className="font-black text-gray-900">{client?.clientName}</p>
                  <p className="text-xs text-aurum-grey font-medium">{client?.clientPhone}</p>
                  <p className="text-[10px] text-steelblue font-bold mt-1 uppercase tracking-wider">{appointments.filter(a => a.clientId === cId).length} Total Bookings</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminView;
