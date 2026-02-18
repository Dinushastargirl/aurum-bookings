
import React, { useState, useEffect } from 'react';
import { Service, Staff, Appointment, AppointmentStatus } from '../types';
import { calculateAvailableSlots } from '../services/bookingService';

interface BookingProps {
  services: Service[];
  staffList: Staff[];
  existingAppointments: Appointment[];
}

const ConsumerBooking: React.FC<BookingProps> = ({ services, staffList, existingAppointments }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<{
    service?: Service;
    staff?: Staff;
    date?: Date;
    time?: string;
  }>({ date: new Date() });

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    if (bookingData.staff && bookingData.service && bookingData.date) {
      const slots = calculateAvailableSlots(
        bookingData.staff,
        bookingData.date,
        bookingData.service.duration,
        existingAppointments
      );
      setAvailableSlots(slots);
    }
  }, [bookingData.staff, bookingData.service, bookingData.date, existingAppointments]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col border border-orange-50">
      {/* Progress Header */}
      <div className="bg-orange-600 p-8 text-white relative">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Ayubook.</h2>
            <p className="text-orange-100 text-sm font-medium">Safe & Secure SL Booking</p>
          </div>
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Step {step} of 4</span>
        </div>
        <div className="flex gap-2">
          {[1,2,3,4].map(s => (
            <div key={s} className={`h-2 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-white' : 'bg-orange-400'}`} />
          ))}
        </div>
      </div>

      <div className="p-8 flex-1 bg-white">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Select Your Treatment</h3>
            {services.map(svc => (
              <button
                key={svc.id}
                onClick={() => { setBookingData({...bookingData, service: svc}); nextStep(); }}
                className={`w-full p-5 border-2 rounded-2xl flex justify-between items-center transition-all ${bookingData.service?.id === svc.id ? 'border-orange-600 bg-orange-50' : 'border-gray-100 hover:border-orange-200'}`}
              >
                <div className="text-left">
                  <p className="font-extrabold text-gray-900 text-lg">{svc.name}</p>
                  <p className="text-sm text-gray-500 font-medium">{svc.duration} mins • {svc.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-orange-600 text-xl">Rs. {svc.priceLKR.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold text-gray-900">Choose Your Stylist</h3>
            <div className="grid grid-cols-2 gap-4">
              {staffList.filter(s => s.services.includes(bookingData.service?.id || '')).map(staff => (
                <button
                  key={staff.id}
                  onClick={() => { setBookingData({...bookingData, staff}); nextStep(); }}
                  className={`p-6 border-2 rounded-2xl flex flex-col items-center gap-4 transition-all ${bookingData.staff?.id === staff.id ? 'border-orange-600 bg-orange-50' : 'border-gray-100 hover:border-orange-300'}`}
                >
                  <div className="relative">
                    <img src={staff.avatar} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" alt={staff.name} />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <p className="font-bold text-gray-900">{staff.name}</p>
                </button>
              ))}
            </div>
            <button onClick={prevStep} className="mt-6 text-gray-400 hover:text-orange-600 font-bold text-sm uppercase tracking-widest transition-colors">← Back to services</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold text-gray-900">Available Times (24h)</h3>
            <div className="grid grid-cols-4 gap-2">
              {availableSlots.length > 0 ? (
                availableSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => { setBookingData({...bookingData, time}); nextStep(); }}
                    className={`p-3 border-2 rounded-xl text-center font-bold text-sm transition-all ${bookingData.time === time ? 'bg-orange-600 text-white border-orange-600' : 'hover:border-orange-600 border-gray-100 text-gray-700'}`}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p className="col-span-4 text-center py-12 text-gray-400 font-medium bg-gray-50 rounded-2xl">No slots left for today. Try tomorrow!</p>
              )}
            </div>
            <button onClick={prevStep} className="text-gray-400 hover:text-orange-600 font-bold text-sm uppercase tracking-widest transition-colors">← Back to experts</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-bold text-gray-900">Payment Summary</h3>
            <div className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-100 space-y-4">
              <div className="flex justify-between items-center"><span className="text-gray-500 font-bold uppercase text-xs">Service</span> <span className="font-black text-gray-900">{bookingData.service?.name}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 font-bold uppercase text-xs">Stylist</span> <span className="font-black text-gray-900">{bookingData.staff?.name}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 font-bold uppercase text-xs">Schedule</span> <span className="font-black text-gray-900">{bookingData.time} today</span></div>
              <div className="border-t-2 border-orange-200/50 pt-4 flex justify-between items-end">
                <span className="text-orange-900 font-black text-lg">Total</span>
                <div className="text-right">
                  <p className="text-orange-600 font-black text-3xl">Rs. {bookingData.service?.priceLKR.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => alert("Redirecting to PayHere Sri Lanka Secure Gateway...")}
                className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all uppercase tracking-widest"
              >
                Pay with PayHere
              </button>
              <div className="flex justify-center gap-4 grayscale opacity-50">
                <img src="https://www.payhere.lk/downloads/images/payhere_square_banner.png" className="h-8" alt="PayHere" />
              </div>
            </div>
            <button onClick={prevStep} className="w-full text-gray-400 hover:text-orange-600 font-bold text-sm uppercase tracking-widest transition-colors">Change Booking Details</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerBooking;
