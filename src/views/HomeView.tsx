import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Smartphone, 
  Clock, 
  Users, 
  MapPin, 
  Music, 
  Image as ImageIcon, 
  Heart, 
  Gift, 
  MessageCircle, 
  Video, 
  Globe, 
  QrCode, 
  Check, 
  ChevronDown, 
  Star,
  Play,
  Share2
} from 'lucide-react';
import { FAQS, TESTIMONIALS } from '../data/mockData';

export const HomeView: React.FC = () => {
  const { setActiveTab, openInvitation } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Animated counters
  const [counts, setCounts] = useState({
    invitations: 0,
    themes: 0,
    music: 0,
    events: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounts({
        invitations: 500,
        themes: 100,
        music: 50,
        events: 10
      });
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Smartphone className="w-5 h-5 text-[#C5A880]" />,
      title: 'Responsive',
      desc: 'Nyaman dibuka dengan sempurna di smartphone, tablet, maupun layar desktop.'
    },
    {
      icon: <Clock className="w-5 h-5 text-[#C5A880]" />,
      title: 'Countdown Timer',
      desc: 'Penghitung waktu mundur otomatis menuju detik-detik hari bahagia Anda.'
    },
    {
      icon: <Users className="w-5 h-5 text-[#C5A880]" />,
      title: 'RSVP Interaktif',
      desc: 'Tamu dapat langsung konfirmasi kehadiran dan jumlah rombongan secara praktis.'
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#C5A880]" />,
      title: 'Google Maps Presisi',
      desc: 'Integrasi navigasi langsung ke titik lokasi acara tanpa risiko tersesat.'
    },
    {
      icon: <Music className="w-5 h-5 text-[#C5A880]" />,
      title: 'Latar Musik Syahdu',
      desc: 'Pilihan musik romantis, akustik, dan instrumental yang otomatis menyapa tamu.'
    },
    {
      icon: <ImageIcon className="w-5 h-5 text-[#C5A880]" />,
      title: 'Galeri Foto & Carousel',
      desc: 'Tampilkan foto-foto prewedding dan momen kenangan terindah dalam resolusi tajam.'
    },
    {
      icon: <Heart className="w-5 h-5 text-[#C5A880]" />,
      title: 'Love Story Timeline',
      desc: 'Abadikan perjalanan kisah asmara Anda dari perjumpaan pertama hingga pelaminan.'
    },
    {
      icon: <Gift className="w-5 h-5 text-[#C5A880]" />,
      title: 'Wedding Gift Digital',
      desc: 'Salin nomor rekening satu-klik dan QRIS untuk kemudahan amplop digital tamu.'
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-[#C5A880]" />,
      title: 'WhatsApp Broadcast',
      desc: 'Bagikan undangan terpersonalisasi langsung ke kontak WhatsApp kerabat Anda.'
    },
    {
      icon: <Video className="w-5 h-5 text-[#C5A880]" />,
      title: 'Sematkan Video',
      desc: 'Tautkan video prewedding sinematik YouTube atau rekaman teaser acara Anda.'
    },
    {
      icon: <Globe className="w-5 h-5 text-[#C5A880]" />,
      title: 'Custom Domain Pribadi',
      desc: 'Gunakan alamat website unik seperti namakamu.com untuk kesan lebih eksklusif.'
    },
    {
      icon: <QrCode className="w-5 h-5 text-[#C5A880]" />,
      title: 'QR Code Tamu',
      desc: 'Kode QR instan untuk kemudahan check-in kehadiran di meja registrasi resepsi.'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 lg:pt-24 overflow-hidden">
        {/* Ambient floating blur ornaments */}
        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#EEDDC4]/40 via-[#F3E9D9]/30 to-transparent blur-3xl -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-40 right-10 w-48 h-48 bg-[#D4AF37]/10 blur-2xl rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DD] border border-[#DDD3C3] text-[11px] font-semibold tracking-wider text-[#735A33] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#B89255]" />
                <span>UNDANGAN DIGITAL • MODERN • ELEGAN • PERSONAL</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1816] leading-[1.15]">
                Setiap Momen Layak Dikenang dengan{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] via-[#C99F5D] to-[#9C753B]">
                  Indah.
                  <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-[#C99F5D]/0 via-[#C99F5D] to-[#C99F5D]/0 rounded-full" />
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#5A544D] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Buat undangan digital modern, elegan, dan personal untuk membagikan momen spesial Anda. 
                Dilengkapi katalog tema eksklusif, musik pilihan, RSVP real-time, dan konfirmasi praktis via WhatsApp.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setActiveTab('order')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1E1C1A] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:bg-[#2C2926] transition-all transform hover:-translate-y-0.5 border border-[#C5A880]/30 cursor-pointer group"
                >
                  <span>Buat Undangan</span>
                  <ArrowRight className="w-4 h-4 text-[#E6D4BA] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('tema')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#2C2825] text-sm font-semibold shadow-sm hover:shadow border border-[#E3DACB] hover:bg-[#FAF7F2] transition-all cursor-pointer"
                >
                  <span>Lihat Tema</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#E8DFCFA0] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#6F675D]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#EAE2D3] flex items-center justify-center text-[#9C753B]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Proses Cepat 1x24 Jam</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#EAE2D3] flex items-center justify-center text-[#9C753B]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Garansi Revisi Sepuasnya</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#EAE2D3] flex items-center justify-center text-[#9C753B]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Tanpa Biaya Admin Tambahan</span>
                </div>
              </div>

            </div>

            {/* Right Mockup Phone Preview */}
            <div className="lg:col-span-5 flex justify-center relative">
              
              {/* Floating Decorative Elements */}
              <div className="absolute -top-6 -left-6 z-20 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-[#EAE2D3] text-xs flex items-center gap-2 animate-bounce duration-1000">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-[#222]">Live RSVP Aktif</span>
              </div>

              <div className="absolute -bottom-4 -right-4 z-20 px-3.5 py-2 rounded-2xl bg-[#1C1A18]/90 backdrop-blur-md shadow-xl border border-[#3C3833] text-xs text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#D6A76E] fill-current" />
                <span>Andi & Rina Wedding</span>
              </div>

              {/* Phone Frame Container */}
              <div className="relative w-[285px] sm:w-[315px] h-[590px] bg-[#1A1816] rounded-[44px] p-3 shadow-2xl ring-1 ring-white/10 border-4 border-[#2E2A27]">
                
                {/* Speaker Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#111] rounded-full z-30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#222] mr-2" />
                  <div className="w-8 h-1 rounded-full bg-[#222]" />
                </div>

                {/* Inner Screen */}
                <div className="w-full h-full rounded-[36px] overflow-hidden bg-[#FAF7F2] relative flex flex-col border border-[#D5CABE]/40 text-[#222]">
                  
                  {/* Digital Invitation Header Banner */}
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" 
                      alt="Wedding Couple"
                      className="w-full h-full object-cover brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1C18] via-black/30 to-transparent" />
                    
                    <div className="absolute bottom-3 left-4 right-4 text-center text-white">
                      <span className="text-[10px] tracking-widest uppercase text-[#EAD5BA] font-light">
                        The Wedding of
                      </span>
                      <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                        Andi & Rina
                      </h3>
                      <p className="text-[11px] text-[#DDD]">
                        Minggu, 18 Oktober 2026
                      </p>
                    </div>
                  </div>

                  {/* Body Content in Screen */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-center bg-[#FAF8F5]">
                    
                    {/* Guest name personal greeting */}
                    <div className="p-2.5 rounded-xl bg-white border border-[#E9E1D2] shadow-xs">
                      <span className="text-[9px] uppercase tracking-wider text-[#8A8177]">
                        Kepada Yth. Tamu Undangan
                      </span>
                      <p className="text-xs font-semibold text-[#1C1A18] mt-0.5">
                        Bapak/Ibu/Saudara/i
                      </p>
                    </div>

                    {/* Countdown mini */}
                    <div className="grid grid-cols-4 gap-1 text-center py-1">
                      <div className="p-1 rounded bg-[#EFEAE1] border border-[#DDD4C4]">
                        <span className="block text-xs font-bold text-[#1A1816]">24</span>
                        <span className="text-[8px] text-[#736B61]">Hari</span>
                      </div>
                      <div className="p-1 rounded bg-[#EFEAE1] border border-[#DDD4C4]">
                        <span className="block text-xs font-bold text-[#1A1816]">14</span>
                        <span className="text-[8px] text-[#736B61]">Jam</span>
                      </div>
                      <div className="p-1 rounded bg-[#EFEAE1] border border-[#DDD4C4]">
                        <span className="block text-xs font-bold text-[#1A1816]">36</span>
                        <span className="text-[8px] text-[#736B61]">Menit</span>
                      </div>
                      <div className="p-1 rounded bg-[#EFEAE1] border border-[#DDD4C4]">
                        <span className="block text-xs font-bold text-[#1A1816]">48</span>
                        <span className="text-[8px] text-[#736B61]">Detik</span>
                      </div>
                    </div>

                    {/* Open Invitation CTA */}
                    <button
                      onClick={() => openInvitation('andi-rina', 'Bapak Joko Santoso')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#E9D7B7] text-[#181716] font-semibold text-xs shadow hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Buka Undangan Live</span>
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION STATISTIK */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#211E1C] via-[#2A2623] to-[#1E1C1A] text-white shadow-xl border border-[#3C3732]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#3C3834]">
              
              <div className="space-y-1">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E6D4BA] block">
                  {counts.invitations}+
                </span>
                <p className="text-xs sm:text-sm text-[#A8A29A]">
                  Undangan Dibuat
                </p>
              </div>

              <div className="pt-6 md:pt-0 space-y-1">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E6D4BA] block">
                  {counts.themes}+
                </span>
                <p className="text-xs sm:text-sm text-[#A8A29A]">
                  Pilihan Tema
                </p>
              </div>

              <div className="pt-6 md:pt-0 space-y-1">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E6D4BA] block">
                  {counts.music}+
                </span>
                <p className="text-xs sm:text-sm text-[#A8A29A]">
                  Lagu & Musik
                </p>
              </div>

              <div className="pt-6 md:pt-0 space-y-1">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E6D4BA] block">
                  {counts.events}+
                </span>
                <p className="text-xs sm:text-sm text-[#A8A29A]">
                  Jenis Acara
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION KEUNGGULAN */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
              FITUR TERLENGKAP
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816]">
              Semua yang Anda Butuhkan dalam Satu Undangan.
            </h2>
            <p className="text-sm sm:text-base text-[#686158]">
              Dirancang dengan perhatian mendalam pada keindahan visual dan kenyamanan setiap tamu undangan yang membukanya.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E9E1D2] hover:border-[#C5A880] shadow-xs hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF5ED] group-hover:bg-[#F2E8D7] flex items-center justify-center mb-4 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="font-semibold text-base text-[#1E1C1A] mb-2 group-hover:text-[#9C753B] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#6F685E] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative bg-[#FAF5EE] py-20 border-y border-[#E9DFCFA0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
              TESTIMONIAL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816]">
              Cerita Mereka Bersama RuangMomen.
            </h2>
            <p className="text-sm text-[#6A6359]">
              Kebahagiaan klien adalah dedikasi utama kami dalam mempersembahkan undangan terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div 
                key={idx}
                className="p-7 rounded-2xl bg-white border border-[#E7DFD1] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#4E4841] italic leading-relaxed">
                    “{item.content}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0E9DD] flex items-center gap-3">
                  <img 
                    src={item.avatar} 
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#C5A880]/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1816]">{item.name}</h4>
                    <p className="text-[11px] text-[#867E73]">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
              FAQ & PANDUAN
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1A1816]">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-sm text-[#666]">
              Jawaban cepat seputar pemesanan dan layanan RuangMomen.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-white border border-[#EAE2D5] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base text-[#1E1C1A]">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#9C753B] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C554E] leading-relaxed border-t border-[#F2ECE1]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#1E1C1A] via-[#2F2925] to-[#1E1C1A] text-white p-10 sm:p-16 overflow-hidden text-center shadow-2xl border border-[#3A3530]">
            
            <div className="max-w-2xl mx-auto space-y-5 relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#3C352E] text-[#D8C7B0] text-xs font-semibold tracking-wider uppercase">
                Mulai Sekarang
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Siap Membagikan Kebahagiaan Anda?
              </h2>
              <p className="text-sm text-[#BDB6AC] leading-relaxed">
                Pilih tema impian Anda, sesuaikan data acara, dan nikmati kemudahan berbagi undangan digital dengan elegan.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setActiveTab('order')}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#E9D7B7] text-[#181716] font-bold text-sm shadow hover:scale-105 transition-all cursor-pointer"
                >
                  Buat Undangan Sekarang
                </button>
                <button
                  onClick={() => setActiveTab('tema')}
                  className="px-6 py-3.5 rounded-full bg-[#2A2623] hover:bg-[#38332E] text-white font-medium text-sm border border-[#443E37] transition-all cursor-pointer"
                >
                  Eksplor Tema Katalog
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeView;
