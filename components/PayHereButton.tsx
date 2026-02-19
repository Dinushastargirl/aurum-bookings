
"use client";

import React from 'react';

interface PayHereProps {
  amount: number;
  bookingId: string;
  serviceName: string;
}

const PayHereButton: React.FC<PayHereProps> = ({ amount, bookingId, serviceName }) => {
  const triggerPayment = () => {
    // In a production environment, you would redirect to the PayHere sandbox/production URL
    // with MD5 hash generated from your backend for security.
    alert(`Initiating PayHere Gateway for Rs. ${amount.toLocaleString()}\nOrder ID: ${bookingId}\nItem: ${serviceName}`);
    
    // Example form submission behavior
    // window.location.href = `https://sandbox.payhere.lk/pay/checkout?merchant_id=...&amount=${amount}...`;
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={triggerPayment}
        className="w-full bg-[#EB640A] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-orange-900/10 flex items-center justify-center gap-4"
      >
        <img src="https://www.payhere.lk/downloads/images/payhere_square_banner.png" className="h-6 rounded" alt="PayHere" />
        Pay with PayHere
      </button>
      <div className="flex justify-center items-center gap-4 opacity-30 grayscale scale-75">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
        <span className="text-[10px] font-black uppercase tracking-tighter">Genie • eZCash</span>
      </div>
    </div>
  );
};

export default PayHereButton;
