import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, UserCheck, Lock, Mail, Phone, User as UserIcon } from 'lucide-react';

export const CustomerAuthView: React.FC = () => {
  const { loginAsCustomer, registerCustomer, setActiveTab } = useApp();
  const [isRegister, setIsRegister] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regWhatsapp, setRegWhatsapp] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setErrorMsg('Harap masukkan email Anda.');
      return;
    }
    const success = loginAsCustomer(loginEmail);
    if (success) {
      setActiveTab('dashboard');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regWhatsapp.trim()) {
      setErrorMsg('Harap lengkapi semua kolom pendaftaran.');
      return;
    }
    if (regPassword && regPassword !== regConfirmPassword) {
      setErrorMsg('Konfirmasi password tidak cocok.');
      return;
    }
    registerCustomer(regName, regEmail, regWhatsapp);
    setActiveTab('dashboard');
  };

  const handleQuickDemoLogin = (email: string) => {
    loginAsCustomer(email);
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 pb-28">
      <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-xl border border-[#E9E1D2] space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD1] text-[#9C753B] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1C1A18]">
            {isRegister ? 'Daftar Akun RuangMomen' : 'Selamat Datang'}
          </h1>
          <p className="text-xs text-[#736B61]">
            {isRegister
              ? 'Buat akun untuk memantau pengerjaan dan bagikan undangan Anda.'
              : 'Masuk ke dashboard untuk mengelola pesanan & undangan digital Anda.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-xl bg-[#FAF6F0] border border-[#E8DFD1]">
          <button
            onClick={() => { setIsRegister(false); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              !isRegister ? 'bg-white text-[#181716] shadow-xs' : 'text-[#777]'
            }`}
          >
            Masuk
          </button>
          <button
            onClick={() => { setIsRegister(true); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isRegister ? 'bg-white text-[#181716] shadow-xs' : 'text-[#777]'
            }`}
          >
            Daftar Baru
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        {!isRegister ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#333]">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A847C]" />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#333]">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Silakan hubungi WhatsApp Admin di 082211447129 untuk bantuan reset akun.'); }} className="text-[11px] text-[#9C753B] hover:underline">
                  Lupa Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A847C]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#1C1A18] hover:bg-[#322E2A] text-white text-xs font-semibold shadow transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Login ke Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E6D4BA]" />
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#333]">Nama Lengkap</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A847C]" />
                <input
                  type="text"
                  placeholder="Contoh: Rina Marlina"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D5CABE] text-xs"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#333]">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A847C]" />
                <input
                  type="email"
                  placeholder="rina@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D5CABE] text-xs"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#333]">Nomor WhatsApp</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A847C]" />
                <input
                  type="tel"
                  placeholder="081234567890"
                  value={regWhatsapp}
                  onChange={(e) => setRegWhatsapp(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D5CABE] text-xs"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#333]">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A847C]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D5CABE] text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#333]">Konfirmasi Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A847C]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D5CABE] text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#1C1A18] hover:bg-[#322E2A] text-white text-xs font-semibold shadow transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span>Daftar Akun Baru</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E6D4BA]" />
            </button>
          </form>
        )}

        {/* Demo Fast Login Box */}
        <div className="pt-4 border-t border-[#F0EAE0] text-center space-y-2">
          <span className="text-[11px] text-[#888] block">Akun Demo Pelanggan Cepat:</span>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('rina@example.com')}
            className="w-full py-2 rounded-xl border border-[#DCD3C5] bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#332E2A] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#9C753B]" />
            <span>Masuk sebagai Rina Marlina (Demo Order Aktif)</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomerAuthView;
