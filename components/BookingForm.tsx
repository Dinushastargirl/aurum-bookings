
"use client";

import React, { useState, useEffect } from 'react';
import { Service, Staff, Appointment } from '../types';
import { calculateAvailableSlots } from '../services/bookingService';
import PayHereButton from './PayHereButton';

interface FormProps {
  services: Service[];
  staffList: Staff[];
  existingAppointments: Appointment[];
}

const BookingForm: React.FC<FormProps> = ({ services, staffList, existingAppointments }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<{
    service?: Service;
    staff?: Staff;
    date: string;
    time?: string;
    name: string;
    phone: string;
  }>({ date: new Date().toISOString().split('T')[0], name: '', phone: '' });

  const [slots, setSlots] = useState<string[]>([]);

  useEffect(() => {
    if (booking.staff && booking.service && booking.date) {
      const selectedDate = new Date(booking.date);
      const s = calculateAvailableSlots(booking.staff, selectedDate, booking.service.duration, existingAppointments);
      setSlots(s);
    }
  }, [booking.staff, booking.service, booking.date, existingAppointments]);

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
    
    const payload = {
      serviceId: booking.service?.id,
      staffId: booking.staff?.id,
      clientName: booking.name,
      clientPhone: booking.phone,
      startTime: `${booking.date}T${booking.time}:00`,
      totalLKR: booking.service?.priceLKR
    };

    try {
      const response = await fetch(`${apiUrl}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Studio reservation confirmed in backend.");
        setStep(5); // Show success/PayHere screen
      } else {
        alert("Booking failed at Java Server. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Offline Mode: Syncing with Java Server failed. Proceeding to Payment Mock.");
      setStep(5);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-[32px] md:rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col min-h-[580px] md:min-h-[640px]">
      <div className="bg-[#4682B4] p-8 md:p-12 text-white">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2">Aurum Booking</h2>
        <p className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">Tue-Sun 08:30 - 19:30 • Mon Closed</p>
        <div className="flex gap-2 mt-6 md:mt-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-white' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>

      <div className="p-6 md:p-12 flex-1 flex flex-col">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-base md:text-lg font-black text-gray-900 uppercase tracking-wide mb-4 md:mb-6">Service Type</h3>
            <div className="grid gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {services.map(svc => (
                <button 
                  key={svc.id}
                  onClick={() => { setBooking({...booking, service: svc}); setStep(2); }}
                  className="w-full p-4 md:p-6 border border-gray-100 rounded-[20px] md:rounded-[24px] flex justify-between items-center hover:border-[#4682B4] hover:bg-blue-50/30 transition-all text-left group"
                >
                  <div className="pr-4">
                    <p className="font-black text-gray-900 text-sm md:text-base group-hover:text-[#4682B4] transition-colors">{svc.name}</p>
                    <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{svc.duration}m • {svc.category}</p>
                  </div>
                  <p className="font-black text-[#4682B4] whitespace-nowrap text-sm md:text-base">Rs. {svc.priceLKR.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h3 className="text-base md:text-lg font-black text-gray-900 uppercase tracking-wide">Professional</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:gap-4">
              {staffList.map(s => (
                <button 
                  key={s.id}
                  onClick={() => { setBooking({...booking, staff: s}); setStep(3); }}
                  className="p-6 md:p-8 border border-gray-100 rounded-[24px] md:rounded-[32px] flex flex-col items-center gap-3 md:gap-4 hover:border-[#4682B4] hover:bg-blue-50/30 transition-all"
                >
                  <img src={s.avatar} className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-xl" alt={s.name} />
                  <p className="font-black text-gray-900 text-xs md:text-sm">{s.name.split(' ')[0]}</p>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="text-gray-300 text-[10px] font-black uppercase tracking-widest hover:text-[#4682B4] transition-colors self-start mt-4">← Change Service</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h3 className="text-base md:text-lg font-black text-gray-900 uppercase tracking-wide">Select Slot</h3>
            <input 
              type="date" 
              className="w-full p-4 md:p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#4682B4] font-black text-sm"
              value={booking.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBooking({...booking, date: e.target.value})}
            />
            <div className="grid grid-cols-3 gap-2 max-h-[220px] md:max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
              {slots.length > 0 ? slots.map(t => (
                <button 
                  key={t}
                  onClick={() => { setBooking({...booking, time: t}); setStep(4); }}
                  className="p-3 md:p-4 border border-gray-100 rounded-xl font-black text-[10px] md:text-[11px] transition-all hover:bg-[#4682B4] hover:text-white"
                >
                  {t}
                </button>
              )) : (
                <div className="col-span-3 py-10 md:py-12 bg-gray-50 rounded-2xl text-center">
                  <p className="text-gray-300 text-[9px] md:text-[10px] font-black uppercase tracking-widest">No availability on this date</p>
                </div>
              )}
            </div>
            <button onClick={() => setStep(2)} className="text-gray-300 text-[10px] font-black uppercase tracking-widest hover:text-[#4682B4] transition-colors mt-4">← Back to Artists</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95">
            <h3 className="text-base md:text-lg font-black text-gray-900 uppercase tracking-wide">Finalize</h3>
            <div className="space-y-3">
              <input 
                placeholder="Your Full Name"
                className="w-full p-4 md:p-5 border border-gray-100 rounded-xl md:rounded-2xl font-bold text-sm outline-none focus:border-[#4682B4]"
                value={booking.name}
                onChange={(e) => setBooking({...booking, name: e.target.value})}
              />
              <input 
                placeholder="Phone Number (SL)"
                className="w-full p-4 md:p-5 border border-gray-100 rounded-xl md:rounded-2xl font-bold text-sm outline-none focus:border-[#4682B4]"
                value={booking.phone}
                onChange={(e) => setBooking({...booking, phone: e.target.value})}
              />
            </div>
            <div className="bg-gray-50 p-5 md:p-6 rounded-[20px] md:rounded-[24px] border border-gray-100 space-y-2">
              <div className="flex justify-between text-[10px] md:text-[11px] font-black uppercase tracking-widest text-gray-400"><span>Artist</span> <span className="text-gray-900">{booking.staff?.name}</span></div>
              <div className="flex justify-between text-[10px] md:text-[11px] font-black uppercase tracking-widest text-gray-400"><span>When</span> <span className="text-gray-900">{booking.time} • {new Date(booking.date).toLocaleDateString()}</span></div>
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-black">
                <span className="text-gray-900 text-sm md:text-base">Total</span>
                <span className="text-[#4682B4] text-sm md:text-base">Rs. {booking.service?.priceLKR.toLocaleString()}</span>
              </div>
            </div>
            <button 
              onClick={handleFinalSubmit}
              disabled={!booking.name || !booking.phone || isLoading}
              className="w-full bg-[#4682B4] text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest hover:brightness-95 disabled:opacity-50 transition-all flex items-center justify-center gap-3 text-sm md:text-base"
            >
              {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Confirm Reservation'}
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="text-center py-8 md:py-10 space-y-6 md:space-y-8 animate-in fade-in">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase">Reservation Secured</h3>
              <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest mt-2">Please complete payment via PayHere</p>
            </div>
            <div className="max-w-xs mx-auto w-full">
              <PayHereButton 
                bookingId="AUR-101" 
                amount={booking.service?.priceLKR || 0} 
                serviceName={booking.service?.name || "Studio Service"} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
