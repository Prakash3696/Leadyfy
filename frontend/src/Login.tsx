import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/login', { email, password });
      // Fetch user data after setting the cookie
      const userRes = await axios.get('/api/auth/me');
      login(userRes.data);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#111111]">
      <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333] shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            <span className="text-[#111] font-bold text-xl">L</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-8">Sign in to Leadfy</p>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 bg-[#222] border border-[#333] rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 bg-[#222] border border-[#333] rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="w-full p-3 mt-4 bg-amber-500 hover:bg-amber-400 text-[#111] font-bold rounded-lg transition-colors">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
