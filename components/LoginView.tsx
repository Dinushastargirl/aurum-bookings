
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (role: 'admin' | 'client') => void;
}

const LoginView: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      onLogin('admin');
    } else if (username === 'client' && password === '1234') {
      onLogin('client');
    } else {
      setError('Invalid credentials. Hint: admin/1234 or client/1234');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-sm border border-aurum-grey/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-steelblue tracking-tighter uppercase">Aurum.</h1>
          <p className="text-aurum-grey font-medium mt-2">Internal Studio Bookings</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-aurum-grey mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-aurum-grey/10 rounded-xl outline-none focus:border-steelblue transition-all font-medium" 
              placeholder="e.g. admin"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-aurum-grey mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-aurum-grey/10 rounded-xl outline-none focus:border-steelblue transition-all font-medium" 
              placeholder="••••"
            />
          </div>
          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-steelblue text-white py-4 rounded-xl font-black uppercase tracking-widest hover:brightness-95 shadow-lg shadow-steelblue/20 transition-all"
          >
            Enter Studio
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
