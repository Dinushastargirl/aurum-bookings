
import React, { useState } from 'react';
import { MOCK_SERVICES, MOCK_STAFF, MOCK_APPOINTMENTS } from './constants';
import LoginView from './components/LoginView';
import AdminView from './components/AdminView';
import ClientPortal from './components/ClientPortal';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);

  const handleLogout = () => setUserRole(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
      {/* Universal Header */}
      <header className="bg-white border-b border-aurum-grey/10 sticky top-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-black text-steelblue tracking-tighter uppercase">Aurum Studio.</h1>
            {userRole && (
              <span className="bg-steelblue/10 text-steelblue text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {userRole === 'admin' ? 'Internal Dashboard' : 'Client Portal'}
              </span>
            )}
          </div>
          {userRole && (
            <button 
              onClick={handleLogout}
              className="text-aurum-grey text-xs font-black uppercase tracking-widest hover:text-steelblue transition-colors"
            >
              Sign Out
            </button>
          )}
        </div>
      </header>

      {/* View Logic */}
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          {!userRole ? (
            <LoginView onLogin={setUserRole} />
          ) : userRole === 'admin' ? (
            <AdminView appointments={MOCK_APPOINTMENTS} staffList={MOCK_STAFF} />
          ) : (
            <div className="space-y-12">
               <div className="text-center space-y-4 py-12 max-w-2xl mx-auto">
                  <h2 className="text-5xl font-black text-gray-900 tracking-tight">Your Session Awaits.</h2>
                  <p className="text-aurum-grey font-medium text-lg leading-relaxed">Book a signature experience at Colombo's premier creative studio. Minimalist grooming, maximalist results.</p>
               </div>
               <ClientPortal 
                  services={MOCK_SERVICES} 
                  staffList={MOCK_STAFF} 
                  existingAppointments={MOCK_APPOINTMENTS} 
               />
            </div>
          )}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-aurum-grey/10 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-aurum-grey uppercase tracking-widest">© 2024 Aurum Studio - Internal Use Only</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-aurum-grey">
            <span className="hover:text-steelblue cursor-pointer">Support</span>
            <span className="hover:text-steelblue cursor-pointer">Security</span>
            <span className="hover:text-steelblue cursor-pointer">PayHere SL</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
