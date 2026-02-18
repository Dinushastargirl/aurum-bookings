
import React from 'react';

const StripeIntegrationPlan: React.FC = () => {
  return (
    <div className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          API Architecture & Locking Mechanism
        </h2>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-sm">
          <p className="text-indigo-600 font-bold mb-2">// POST /api/bookings</p>
          <p className="text-slate-600 mb-4">Implementation Strategy to prevent double-booking:</p>
          <pre className="whitespace-pre-wrap text-slate-800">
{`async function createBooking(data) {
  return await prisma.$transaction(async (tx) => {
    // 1. SELECT FOR UPDATE (Atomic check)
    const existing = await tx.appointment.findFirst({
      where: {
        staffId: data.staffId,
        startTime: { lt: data.endTime },
        endTime: { gt: data.startTime },
        status: { not: 'CANCELLED' }
      }
    });

    if (existing) throw new Error("Slot already taken");

    // 2. Create booking
    return await tx.appointment.create({ data });
  });
}`}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          Stripe Connect Flow
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-xl hover:bg-indigo-50 transition-colors">
            <h4 className="font-bold text-indigo-700 mb-2">1. Onboarding</h4>
            <p className="text-sm text-gray-600 leading-relaxed">Salon owners connect their bank accounts via Stripe Standard/Express accounts. We store the <code>stripe_account_id</code> in the Business model.</p>
          </div>
          <div className="p-4 border rounded-xl hover:bg-indigo-50 transition-colors">
            <h4 className="font-bold text-indigo-700 mb-2">2. Destination Charges</h4>
            <p className="text-sm text-gray-600 leading-relaxed">Consumer pays $100. Fresha takes a 20% fee ($20). $80 is automatically routed to the Salon's Stripe account using <code>transfer_data[destination]</code>.</p>
          </div>
          <div className="p-4 border rounded-xl hover:bg-indigo-50 transition-colors">
            <h4 className="font-bold text-indigo-700 mb-2">3. Locking & Payouts</h4>
            <p className="text-sm text-gray-600 leading-relaxed">Funds are held until the Appointment Status is updated to 'COMPLETED' or after 24 hours of service time via a Webhook trigger.</p>
          </div>
          <div className="p-4 border rounded-xl hover:bg-indigo-50 transition-colors">
            <h4 className="font-bold text-indigo-700 mb-2">4. Refunds</h4>
            <p className="text-sm text-gray-600 leading-relaxed">Automated refund logic based on the salon's cancellation policy (e.g. 100% back if {'>'} 24h before).</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StripeIntegrationPlan;
