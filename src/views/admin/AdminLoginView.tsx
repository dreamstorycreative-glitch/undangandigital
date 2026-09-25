import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export const AdminLoginView: React.FC = () => {
  const { loginAsAdmin, setActiveTab } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Harap masukkan email administrator.');
      return;
    }
    const success = loginAsAdmin(email, password);
    if (success) {
      setActiveTab('admin_dashboard');
    } else {
      setErrorMsg('Kredensial admin tidak valid atau akun tidak terdaftar.');
    }
  };

  const handleQuickLogin = (adminEmail: string) => {
    loginAsAdmin(adminEmail);
    setActiveTab('admin_dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0F0E0D] text-[#E0DBD5] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#181715] border border-[#2D2A26] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        
        {/* Brand & Badge */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#25221E] to-[#3D3730] border border-[#484138] text-[#C5A880] flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          
          <h1 className="text-2xl font-bold text-white tracking-tight">
            RuangMomen <span className="text-[#C5A880]">Admin</span>
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#8E877E] font-semibold">
            Administrator Portal & System Control
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#B8B1A8]">Email Admin</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D675E]" />
              <input
                type="email"
                placeholder="admin@ruangmomen.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#201E1B] border border-[#332F2A] text-xs text-white placeholder-[#5A544C] focus:outline-none focus:border-[#C5A880]"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-[#B8B1A8]">Password</label>
              <a 
                href="#forgot" 
                onClick={(e) => { e.preventDefault(); alert('Hubungi Super Admin atau Sistem IT untuk reset kunci otentikasi.'); }}
                className="text-[11px] text-[#C5A880] hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D675E]" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#201E1B] border border-[#332F2A] text-xs text-white placeholder-[#5A544C] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded bg-[#201E1B] border-[#332F2A] accent-[#C5A880] cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs text-[#8E877E] cursor-pointer">
              Remember Me pada perangkat ini
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#E9D7B7] text-[#141312] text-xs font-bold shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Login ke Admin Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Logins for Testing */}
        <div className="pt-4 border-t border-[#292622] space-y-2">
          <span className="text-[10px] text-[#736B62] uppercase tracking-wider block font-semibold text-center">
            Akses Cepat Pengujian Administrator:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('superadmin@ruangmomen.com')}
              className="p-2 rounded-xl bg-[#221F1B] hover:bg-[#2B2723] border border-[#353029] text-[11px] text-[#C5A880] font-medium transition-colors cursor-pointer text-center"
            >
              👑 Super Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@ruangmomen.com')}
              className="p-2 rounded-xl bg-[#221F1B] hover:bg-[#2B2723] border border-[#353029] text-[11px] text-[#E0DBD5] font-medium transition-colors cursor-pointer text-center"
            >
              🛡️ Admin Operasional
            </button>
          </div>
        </div>

        {/* Return to Public Website */}
        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('home')}
            className="text-[11px] text-[#7E776F] hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            ← Kembali ke Website Publik RuangMomen
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginView;
