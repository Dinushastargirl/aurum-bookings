
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  }, [booking.staff, booking.service, booking.date, existingAppointments]);

  const handleBookNow = async () => {
    if (!booking.service || !booking.staff || !booking.time) return;

    setIsSubmitting(true);
    
    // Constructing ISO string for startTime as expected by the Java backends
    const startTimeString = `${booking.date.toISOString().split('T')[0]}T${booking.time}:00`;
    
    const bookingData = {
      serviceId: booking.service.id,
      staffId: booking.staff.id,
      clientName: booking.name,
      clientPhone: booking.phone,
      startTime: startTimeString,
      totalLKR: booking.service.priceLKR
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const response = await fetch(`${apiUrl}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        console.log('Booking successful');
        alert("Success! Your booking has been recorded in the Aurum system. Redirecting to PayHere...");
        // In a real scenario, you'd trigger the PayHere payment gateway here.
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Booking failed:', errorData);
        alert("Server returned an error. Please check your details.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert(`Could not connect to the Java backend at ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}. Please ensure your server is running.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
      <div className="bg-[#4682B4] p-10 text-white">
        <h2 className="text-2xl font-black uppercase tracking-tight">Aurum Booking</h2>
        <p className="text-white/70 text-sm font-medium">Tue-Sun 08:30 - 19:30 • Mon Closed</p>
        <div className="flex gap-1.5 mt-6">
          {[1,2,3,4].map(s => <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-white' : 'bg-white/20'}`} />)}
        </div>
      </div>

      <div className="p-10 flex-1">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide mb-6">Select Studio Service</h3>
            <div className="grid gap-3">
              {services.map(svc => (
                <button 
                  key={svc.id}
                  onClick={() => { setBooking({...booking, service: svc}); setStep(2); }}
                  className="w-full p-5 border border-gray-100 rounded-2xl flex justify-between items-center hover:border-[#4682B4] hover:bg-blue-50/30 transition-all text-left group"
                >
                  <div>
                    <p className="font-black text-gray-900 group-hover:text-[#4682B4] transition-colors">{svc.name}</p>
                    <p className="text-xs text-gray-400 font-medium">{svc.duration} mins • {svc.category}</p>
                  </div>
                  <p className="font-black text-[#4682B4]">Rs. {svc.priceLKR.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
             <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide">Studio Professional</h3>
             <div className="grid grid-cols-2 gap-4">
                {staffList.filter(s => !booking.service || s.services.includes(booking.service.id)).map(s => (
                  <button 
                    key={s.id}
                    onClick={() => { setBooking({...booking, staff: s}); setStep(3); }}
                    className="p-6 border border-gray-100 rounded-2xl flex flex-col items-center gap-4 hover:border-[#4682B4] hover:bg-blue-50/30 transition-all"
                  >
                    <img src={s.avatar} className="w-16 h-16 rounded-full border-2 border-white shadow-md" alt={s.name} />
                    <p className="font-black text-gray-900 text-sm">{s.name}</p>
                  </button>
                ))}
             </div>
             <button onClick={() => setStep(1)} className="text-gray-400 text-xs font-black uppercase tracking-widest hover:text-[#4682B4] transition-colors">← Change Service</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide">Studio Schedule</h3>
            <input 
              type="date" 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#4682B4] font-bold mb-4"
              onChange={(e) => setBooking({...booking, date: new Date(e.target.value)})}
              min={new Date().toISOString().split('T')[0]}
              value={booking.date.toISOString().split('T')[0]}
            />
            <div className="grid grid-cols-3 gap-2">
              {slots.length > 0 ? slots.map(t => (
                <button 
                  key={t}
                  onClick={() => { setBooking({...booking, time: t}); setStep(4); }}
                  className={`p-3 border border-gray-100 rounded-xl font-bold text-xs transition-all ${booking.time === t ? 'bg-[#4682B4] text-white' : 'hover:bg-[#4682B4] hover:text-white'}`}
                >
                  {t}
                </button>
              )) : <p className="col-span-3 text-center py-10 text-gray-400 text-xs font-bold bg-gray-50 rounded-xl">No slots available for this date.</p>}
            </div>
            <button onClick={() => setStep(2)} className="text-gray-400 text-xs font-black uppercase tracking-widest hover:text-[#4682B4] transition-colors">← Change Artist</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide">Client Details</h3>
            <div className="space-y-4">
               <input 
                type="text" 
                placeholder="Full Name"
                value={booking.name}
                className="w-full p-4 border border-gray-100 rounded-xl font-medium outline-none focus:border-[#4682B4] transition-colors"
                onChange={(e) => setBooking({...booking, name: e.target.value})}
               />
               <input 
                type="tel" 
                placeholder="Phone Number"
                value={booking.phone}
                className="w-full p-4 border border-gray-100 rounded-xl font-medium outline-none focus:border-[#4682B4] transition-colors"
                onChange={(e) => setBooking({...booking, phone: e.target.value})}
               />
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
               <div className="flex justify-between text-sm"><span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Artist</span> <span className="font-black text-gray-900">{booking.staff?.name}</span></div>
               <div className="flex justify-between text-sm"><span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">When</span> <span className="font-black text-gray-900">{booking.time} • {booking.date.toLocaleDateString()}</span></div>
               <div className="flex justify-between text-sm pt-2 border-t mt-2"><span className="text-gray-900 font-black uppercase text-[10px] tracking-wider">Total Due</span> <span className="text-[#4682B4] font-black">Rs. {booking.service?.priceLKR.toLocaleString()}</span></div>
            </div>
            <button 
              onClick={handleBookNow}
              disabled={!booking.name || !booking.phone || isSubmitting}
              className="w-full bg-[#4682B4] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:brightness-95 disabled:opacity-50 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/10"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Syncing...
                </>
              ) : 'Confirm & Pay'}
            </button>
            <button onClick={() => setStep(3)} className="w-full text-gray-400 text-xs font-black uppercase tracking-widest hover:text-[#4682B4] transition-colors">Back to Schedule</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPortal;
