import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../data';

interface LoginGateProps {
  onAuthenticated: () => void;
}

const LoginGate: React.FC<LoginGateProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === APP_CONFIG.PASSWORD) {
      sessionStorage.setItem('km_auth_session_v1', 'true');
      setIsFading(true);
      setTimeout(() => {
        onAuthenticated();
      }, 600); 
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-gray text-white transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="w-full max-w-md p-6 md:p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 transform transition-all mx-4">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-brand-green rounded-full mb-4 shadow-lg shadow-brand-green/30">
            <ShieldCheck size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-wider mb-2">智匯中心</h1>
          <p className="text-gray-300 text-sm">Corporate Knowledge Management System</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="請輸入訪問密碼"
              className="w-full bg-white/90 text-brand-gray placeholder-gray-500 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-4 focus:ring-brand-green/50 transition-all font-mono text-lg"
              autoFocus
            />
          </div>
          {error && <div className="text-red-400 text-sm text-center font-medium animate-pulse">密碼錯誤，請聯繫管理員索取。</div>}
          <button
            type="submit"
            className="w-full bg-brand-green hover:bg-[#1f8c3c] text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 group"
          >
            <span>驗證身份</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            未經授權請勿嘗試訪問。<br />IP Address Logged for Security.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginGate;