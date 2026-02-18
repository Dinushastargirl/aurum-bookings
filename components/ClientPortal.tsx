
import React, { useState, useEffect } from 'react';
import { Service, Staff, Appointment, AppointmentStatus } from '../types';
import { calculateAvailableSlots } from '../services/bookingService';

interface PortalProps {
  services: Service[];
  staffList: Staff[];
  existingAppointments: Appointment[];
}

const ClientPortal: React.FC<PortalProps> = ({ services, staffList, existingAppointments }) => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<{
    service?: Service;
    staff?: Staff;
    date: Date;
    time?: string;
    name: string;
    phone: string;
  }>({ date: new Date(), name: '', phone: '' });

  const [slots, setSlots] = useState<string[]>([]);

  useEffect(() => {
    if (booking.staff && booking.service && booking.date) {
      const s = calculateAvailableSlots(booking.staff, booking.date, booking.service.duration, existingAppointments);
      setSlots(s);
    }
  }, [booking.staff, booking.service, booking.date]);

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl border border-aurum-grey/10 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
      <div className="bg-steelblue p-10 text-white">
        <h2 className="text-2xl font-black uppercase tracking-tight">Aurum Booking</h2>
        <p className="text-white/70 text-sm font-medium">Tue-Sun 08:30 - 19:30 • Mon Closed</p>
        <div className="flex gap-1.5 mt-6">
          {[1,2,3,4].map(s => <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-white' : 'bg-white/20'}`} />)}
        </div>
      </div>

      <div className="p-10 flex-1">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide mb-6">Select Studio Service</h3>
            {services.map(svc => (
              <button 
                key={svc.id}
                onClick={() => { setBooking({...booking, service: svc}); setStep(2); }}
                className="w-full p-5 border border-aurum-grey/10 rounded-2xl flex justify-between items-center hover:border-steelblue transition-all text-left"
              >
                <div>
                  <p className="font-black text-gray-900">{svc.name}</p>
                  <p className="text-xs text-aurum-grey font-medium">{svc.duration} mins • {svc.category}</p>
                </div>
                <p className="font-black text-steelblue">Rs. {svc.priceLKR.toLocaleString()}</p>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
             <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide">Studio Professional</h3>
             <div className="grid grid-cols-2 gap-4">
                {staffList.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => { setBooking({...booking, staff: s}); setStep(3); }}
                    className="p-6 border border-aurum-grey/10 rounded-2xl flex flex-col items-center gap-4 hover:border-steelblue transition-all"
                  >
                    <img src={s.avatar} className="w-16 h-16 rounded-full border-2 border-white shadow-md" />
                    <p className="font-black text-gray-900 text-sm">{s.name}</p>
                  </button>
                ))}
             </div>
             <button onClick={() => setStep(1)} className="text-aurum-grey text-xs font-black uppercase tracking-widest hover:text-steelblue">← Change Service</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide">Studio Schedule</h3>
            <input 
              type="date" 
              className="w-full p-4 bg-gray-50 border border-aurum-grey/10 rounded-xl outline-none focus:border-steelblue font-bold mb-4"
              onChange={(e) => setBooking({...booking, date: new Date(e.target.value)})}
              min={new Date().toISOString().split('T')[0]}
            />
            <div className="grid grid-cols-3 gap-2">
              {slots.length > 0 ? slots.map(t => (
                <button 
                  key={t}
                  onClick={() => { setBooking({...booking, time: t}); setStep(4); }}
                  className="p-3 border border-aurum-grey/10 rounded-xl font-bold text-xs hover:bg-steelblue hover:text-white transition-all"
                >
                  {t}
                </button>
              )) : <p className="col-span-3 text-center py-10 text-aurum-grey text-xs font-bold bg-gray-50 rounded-xl">Studio is closed on selected date.</p>}
            </div>
            <button onClick={() => setStep(2)} className="text-aurum-grey text-xs font-black uppercase tracking-widest hover:text-steelblue">← Change Artist</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide">Client Details</h3>
            <div className="space-y-4">
               <input 
                type="text" 
                placeholder="Full Name"
                className="w-full p-4 border border-aurum-grey/10 rounded-xl font-medium outline-none focus:border-steelblue"
                onChange={(e) => setBooking({...booking, name: e.target.value})}
               />
               <input 
                type="tel" 
                placeholder="Phone Number"
                className="w-full p-4 border border-aurum-grey/10 rounded-xl font-medium outline-none focus:border-steelblue"
                onChange={(e) => setBooking({...booking, phone: e.target.value})}
               />
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-aurum-grey/10 space-y-2">
               <p className="flex justify-between text-sm"><span className="text-aurum-grey font-bold">Artist:</span> <span className="font-black">{booking.staff?.name}</span></p>
               <p className="flex justify-between text-sm"><span className="text-aurum-grey font-bold">When:</span> <span className="font-black">{booking.time} • {booking.date.toDateString()}</span></p>
               <p className="flex justify-between text-sm pt-2 border-t mt-2"><span className="text-gray-900 font-black">Total Due:</span> <span className="text-steelblue font-black">Rs. {booking.service?.priceLKR.toLocaleString()}</span></p>
            </div>
            <button 
              onClick={() => alert("Booking confirmed. Redirecting to PayHere...")}
              disabled={!booking.name || !booking.phone}
              className="w-full bg-steelblue text-white py-4 rounded-xl font-black uppercase tracking-widest hover:brightness-95 disabled:opacity-50 transition-all"
            >
              Pay with PayHere
            </button>
            <button onClick={() => setStep(3)} className="w-full text-aurum-grey text-xs font-black uppercase tracking-widest">Back to Schedule</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPortal;
