import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  User, 
  Music2, 
  Palette, 
  Layers, 
  ShoppingBag, 
  Image, 
  LogOut,
  CalendarCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  currentUser?: {
    name: string;
    email: string;
    role: 'customer' | 'admin' | 'super_admin';
  } | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  currentUser,
  onLogout
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tema', label: 'Tema' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'musik', label: 'Musik' },
    { id: 'paket', label: 'Paket' },
    { id: 'shop', label: 'Shop' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#EAE3D6] py-3'
          : 'bg-[#FAF8F5]/80 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1E1C1A] to-[#393430] flex items-center justify-center text-[#E8D5B5] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1816]">
                Ruang<span className="text-[#B58D55]">Momen</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#8A8177] font-medium -mt-1 hidden sm:block">
                Digital Invitation
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#1A1816] bg-[#EDE5D8] shadow-xs font-semibold'
                      : 'text-[#5C554E] hover:text-[#1A1816] hover:bg-[#F2ECE1]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Login or Customer Dashboard link */}
            {currentUser ? (
              <button
                onClick={() => handleItemClick('dashboard')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'text-[#1A1816] bg-[#EDE5D8] font-semibold'
                    : 'text-[#5C554E] hover:text-[#1A1816] hover:bg-[#F2ECE1]'
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#B58D55]" />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => handleItemClick('login')}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'text-[#1A1816] bg-[#EDE5D8] font-semibold'
                    : 'text-[#5C554E] hover:text-[#1A1816] hover:bg-[#F2ECE1]'
                }`}
              >
                Login
              </button>
            )}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleItemClick('order')}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#211E1C] via-[#352F2B] to-[#211E1C] hover:from-[#2B2724] hover:to-[#2B2724] shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 border border-[#C5A880]/30 cursor-pointer group"
            >
              <span>Buat Undangan</span>
              <ArrowRight className="w-4 h-4 text-[#E6D4BA] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleItemClick('order')}
              className="text-xs px-3.5 py-2 rounded-full font-semibold text-white bg-[#211E1C] shadow-sm"
            >
              Buat
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#332E29] hover:bg-[#EDE5D8] transition-colors focus:outline-none"
              aria-label="Buka navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#EAE3D6] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-1.5 pb-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EDE5D8] text-[#1A1816] font-semibold'
                      : 'text-[#5C554E] hover:bg-[#F2ECE1]'
                  }`}
                >
                  {item.id === 'home' && <Sparkles className="w-4 h-4 text-[#B58D55]" />}
                  {item.id === 'tema' && <Palette className="w-4 h-4 text-[#B58D55]" />}
                  {item.id === 'portfolio' && <Image className="w-4 h-4 text-[#B58D55]" />}
                  {item.id === 'musik' && <Music2 className="w-4 h-4 text-[#B58D55]" />}
                  {item.id === 'paket' && <Layers className="w-4 h-4 text-[#B58D55]" />}
                  {item.id === 'shop' && <ShoppingBag className="w-4 h-4 text-[#B58D55]" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#E8E0D2] flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => handleItemClick('dashboard')}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#EDE5D8] text-[#1A1816] text-sm font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#B58D55]" />
                    Dashboard ({currentUser.name})
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar Akun</span>
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => handleItemClick('login')}
                className="w-full text-center py-2.5 rounded-xl border border-[#DCD3C5] text-[#3A3530] text-sm font-medium hover:bg-[#EDE5D8]"
              >
                Login Customer
              </button>
            )}

            <button
              onClick={() => handleItemClick('order')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#211E1C] to-[#352F2B] text-white text-sm font-semibold text-center flex items-center justify-center gap-2 shadow-md"
            >
              <span>Buat Undangan Sekarang</span>
              <ArrowRight className="w-4 h-4 text-[#E6D4BA]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
