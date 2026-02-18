
import React, { useState } from 'react';
import { Staff, Appointment, AppointmentStatus } from '../types';

interface DashboardProps {
  staffList: Staff[];
  appointments: Appointment[];
}

const BusinessDashboard: React.FC<DashboardProps> = ({ staffList, appointments }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

  const getAppointmentsForStaff = (staffId: string) => {
    return appointments.filter(a => 
      a.staffId === staffId && 
      new Date(a.startTime).toDateString() === selectedDate.toDateString()
    );
  };

  const totalRevenue = appointments
    .filter(a => a.status === AppointmentStatus.CONFIRMED || a.status === AppointmentStatus.COMPLETED)
    .reduce((sum, a) => sum + a.totalPriceLKR, 0);

  return (
    <div className="space-y-6">
      {/* Revenue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-orange-600">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Revenue (LKR)</p>
          <h3 className="text-3xl font-black text-gray-900">Rs. {totalRevenue.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-green-500">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Confirmed Bookings</p>
          <h3 className="text-3xl font-black text-gray-900">{appointments.filter(a => a.status === AppointmentStatus.CONFIRMED).length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-blue-500">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Staff Active</p>
          <h3 className="text-3xl font-black text-gray-900">{staffList.length} Members</h3>
        </div>
      </div>

      <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Team Schedule</h2>
            <p className="text-sm text-gray-500 font-medium">{selectedDate.toDateString()}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-bold text-sm shadow-lg shadow-orange-100">Quick Add</button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-[800px] relative">
            <div className="flex border-b sticky top-0 z-20 bg-white shadow-sm">
              <div className="w-20 border-r bg-gray-50"></div>
              {staffList.map(staff => (
                <div key={staff.id} className="flex-1 p-4 text-center border-r font-bold text-gray-900 flex items-center justify-center gap-3">
                  <img src={staff.avatar} className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-100" />
                  {staff.name.split(' ')[0]}
                </div>
              ))}
            </div>

            <div className="relative">
              {hours.map(hour => (
                <div key={hour} className="flex border-b h-24 group">
                  <div className="w-20 border-r text-[10px] text-gray-400 p-3 text-right font-black">
                    {hour < 10 ? `0${hour}` : hour}:00
                  </div>
                  {staffList.map(staff => (
                    <div key={`${staff.id}-${hour}`} className="flex-1 border-r relative group-hover:bg-orange-50/30 transition-colors">
                      {getAppointmentsForStaff(staff.id).map(appt => {
                        const start = new Date(appt.startTime);
                        const end = new Date(appt.endTime);
                        if (start.getHours() === hour) {
                          const topOffset = (start.getMinutes() / 60) * 100;
                          const durationMins = (end.getTime() - start.getTime()) / 60000;
                          const height = (durationMins / 60) * 96; // 96px per hour (h-24)
                          
                          return (
                            <div 
                              key={appt.id}
                              className={`absolute left-1 right-1 z-10 p-3 rounded-xl shadow-md border-l-4 text-[11px] font-bold overflow-hidden cursor-pointer hover:scale-[1.02] transition-all
                                ${appt.status === AppointmentStatus.CONFIRMED ? 'bg-orange-600 text-white border-orange-900' : 'bg-gray-100 border-gray-400 text-gray-700'}`}
                              style={{ top: `${topOffset}%`, height: `${height}px` }}
                            >
                              <div className="truncate uppercase tracking-wider">{appt.serviceId}</div>
                              <div className="opacity-80 truncate">{start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}</div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
