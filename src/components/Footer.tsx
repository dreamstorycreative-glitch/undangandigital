import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Instagram, 
  Mail, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Music2, 
  Palette,
  ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (tab: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#181716] text-[#E7E2DA] pt-16 pb-12 border-t border-[#312E2B] overflow-hidden">
      {/* Decorative ambient glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-[#C5A880]/10 via-[#C5A880]/3 to-transparent blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#2C2926]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C5A880] to-[#E9D7B7] flex items-center justify-center text-[#181716] shadow-sm">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="font-serif text-2xl font-bold tracking-wide text-white">
                Ruang<span className="text-[#C5A880]">Momen</span>
              </span>
            </div>
            
            <p className="text-[#C5A880] font-serif italic text-base">
              “Abadikan Momen, Bagikan dengan Elegan.”
            </p>
            
            <p className="text-[#A49F98] text-sm leading-relaxed max-w-sm">
              Platform undangan digital modern & elegan untuk pernikahan, lamaran, ulang tahun, 
              khitanan, graduation, dan perayaan istimewa Anda. Berbagi kebahagiaan kini jauh lebih praktis dan berkesan.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#242220] border border-[#3C3834] text-[#D8CFBF]">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" /> Proses Cepat 1x24 Jam
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#242220] border border-[#3C3834] text-[#D8CFBF]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /> Jaminan Revisi
              </span>
            </div>
          </div>

          {/* Quick Links Menu */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#C5A880]" />
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={(e) => handleNav('home', e)}
                  className="text-[#B5AFA7] hover:text-[#E6D4BA] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('tema', e)}
                  className="text-[#B5AFA7] hover:text-[#E6D4BA] transition-colors cursor-pointer text-left"
                >
                  Tema Katalog
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('portfolio', e)}
                  className="text-[#B5AFA7] hover:text-[#E6D4BA] transition-colors cursor-pointer text-left"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('musik', e)}
                  className="text-[#B5AFA7] hover:text-[#E6D4BA] transition-colors cursor-pointer text-left"
                >
                  Pilihan Musik
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('paket', e)}
                  className="text-[#B5AFA7] hover:text-[#E6D4BA] transition-colors cursor-pointer text-left"
                >
                  Paket Harga
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('shop', e)}
                  className="text-[#B5AFA7] hover:text-[#E6D4BA] transition-colors cursor-pointer text-left"
                >
                  Shop & Add-on
                </button>
              </li>
            </ul>
          </div>

          {/* Fitur & Kategori Acara */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#C5A880]" />
              Kategori Acara
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B5AFA7]">
              <li className="hover:text-[#E6D4BA] transition-colors cursor-pointer" onClick={(e) => handleNav('tema', e)}>
                Pernikahan (Wedding)
              </li>
              <li className="hover:text-[#E6D4BA] transition-colors cursor-pointer" onClick={(e) => handleNav('tema', e)}>
                Lamaran (Engagement)
              </li>
              <li className="hover:text-[#E6D4BA] transition-colors cursor-pointer" onClick={(e) => handleNav('tema', e)}>
                Ulang Tahun (Birthday)
              </li>
              <li className="hover:text-[#E6D4BA] transition-colors cursor-pointer" onClick={(e) => handleNav('tema', e)}>
                Aqiqah & Khitanan
              </li>
              <li className="hover:text-[#E6D4BA] transition-colors cursor-pointer" onClick={(e) => handleNav('tema', e)}>
                Graduation & Gathering
              </li>
              <li className="hover:text-[#E6D4BA] transition-colors cursor-pointer" onClick={(e) => handleNav('order', e)}>
                Request Acara Khusus
              </li>
            </ul>
          </div>

          {/* Customer Service & WhatsApp */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C5A880]" />
              Customer Service
            </h3>
            
            <p className="text-xs text-[#A49F98] mb-3">
              Konsultasi gratis, konfirmasi pembayaran manual, dan bantuan teknis setiap hari (08.00 - 22.00 WIB).
            </p>

            <a
              href="https://wa.me/6282211447129?text=Halo%20Admin%20RuangMomen%20%F0%9F%91%8B%20Saya%20ingin%20tanya%20seputar%20undangan%20digital."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-semibold hover:opacity-95 shadow-md shadow-[#25D366]/20 transition-all transform hover:-translate-y-0.5 mb-4 group"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>WhatsApp: 082211447129</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </a>

            {/* Social channels */}
            <div className="space-y-2 text-xs text-[#B5AFA7]">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#E6D4BA] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>@ruangmomen.id</span>
              </a>
              <a 
                href="mailto:halo@ruangmomen.com" 
                className="flex items-center gap-2 hover:text-[#E6D4BA] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>halo@ruangmomen.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Security Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#878179]">
          <p>© 2026 RuangMomen. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Modern • Elegant • Premium • Personal</span>
            <span className="hidden sm:inline">•</span>
            <button 
              onClick={(e) => handleNav('order', e)}
              className="text-[#C5A880] hover:underline cursor-pointer font-medium"
            >
              Mulai Buat Undangan
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
