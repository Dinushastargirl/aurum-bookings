
import React from 'react';

const PayHereIntegration: React.FC = () => {
  return (
    <div className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">PayHere Checkout API</h2>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-sm">
          <p className="text-orange-600 font-bold mb-2">// POST /api/checkout</p>
          <p className="text-slate-600 mb-4">Generating MD5 Hash for Sri Lankan Merchant Security:</p>
          <pre className="whitespace-pre-wrap text-slate-800">
{`import crypto from 'crypto';

export async function generatePayHereParams(booking) {
  const merchantId = process.env.PAYHERE_MERCHANT_ID;
  const merchantSecret = process.env.PAYHERE_SECRET;
  const orderId = booking.id;
  const amount = booking.totalLKR.toFixed(2);
  const currency = "LKR";

  // Create hash: Uppercase(MD5(MerchantID + OrderID + Amount + Currency + Uppercase(MD5(Secret))))
  const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const mainString = merchantId + orderId + amount + currency + hashedSecret;
  const hash = crypto.createHash('md5').update(mainString).digest('hex').toUpperCase();

  return {
    merchant_id: merchantId,
    order_id: orderId,
    items: booking.serviceName,
    amount: amount,
    currency: currency,
    hash: hash,
    // Notify URL for Webhook
    notify_url: "https://ayubook.lk/api/payhere-notify"
  };
}`}
          </pre>
        </div>
      </section>

      <section className="bg-orange-50 p-6 rounded-xl border border-orange-200">
        <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          PayHere Notification (Webhook)
        </h3>
        <p className="text-sm text-orange-800 leading-relaxed">
          When a client pays via <strong>Genie, eZCash, or Visa</strong>, PayHere sends a server-to-server POST request to our <code>/api/payhere-notify</code>. 
          We verify the <code>md5sig</code> signature to ensure the request is authentic before marking the appointment as <strong>CONFIRMED</strong> in our database.
        </p>
      </section>
    </div>
  );
};

export default PayHereIntegration;
