
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the Java backend returns { role: 'admin' | 'client', token: '...' }
        localStorage.setItem('userType', data.role);
        localStorage.setItem('authToken', data.token || 'dummy_token');

        if (data.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/booking');
        }
      } else {
        setError('Invalid credentials. Check your Java backend logs.');
      }
    } catch (err) {
      console.error('Login error:', err);
      // Fallback for demo/prototype if Java server isn't running
      if (username === 'admin' && password === '1234') {
        localStorage.setItem('userType', 'admin');
        router.push('/admin');
      } else if (username === 'client' && password === '1234') {
        localStorage.setItem('userType', 'client');
        router.push('/booking');
      } else {
        setError('Could not connect to Java Backend. Ensure it is running on :8080');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md p-6 sm:p-10 bg-white rounded-[32px] shadow-2xl border border-gray-100">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-[#4682B4] tracking-tighter uppercase mb-2">Aurum.</h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Studio Management System</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Username</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#4682B4] transition-all font-bold text-gray-900 text-sm md:text-base"
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#4682B4] transition-all font-bold text-gray-900 text-sm md:text-base"
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4682B4] text-white py-4 sm:py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-95 transition-all shadow-xl shadow-blue-900/10 flex justify-center items-center text-sm md:text-base"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Enter Studio'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-[9px] text-gray-300 font-bold uppercase tracking-widest">
          Secure Internal Access Only
        </p>
      </div>
    </div>
  );
}
