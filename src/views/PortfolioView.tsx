import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ExternalLink, Calendar, Heart, Award } from 'lucide-react';
import { PortfolioItem } from '../types';

export const PortfolioView: React.FC = () => {
  const { portfolio, openInvitation, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { label: 'Semua Momen', value: 'all' },
    { label: 'Wedding', value: 'Wedding' },
    { label: 'Engagement', value: 'Engagement' },
    { label: 'Birthday', value: 'Birthday' },
    { label: 'Aqiqah', value: 'Aqiqah' },
    { label: 'Graduation', value: 'Graduation' },
    { label: 'Anniversary', value: 'Anniversary' }
  ];

  const filteredPortfolio = useMemo(() => {
    if (selectedCategory === 'all') return portfolio;
    return portfolio.filter(p => p.eventType === selectedCategory);
  }, [portfolio, selectedCategory]);

  return (
    <div className="space-y-12 pb-24">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto pt-6 px-4 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
          GALERI KARYA
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1816]">
          Momen yang Telah Kami Buat.
        </h1>
        <p className="text-sm sm:text-base text-[#635D55]">
          Ratusan pasangan dan keluarga telah mempercayakan kenangan istimewa mereka bersama RuangMomen.
        </p>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-[#1C1A18] text-white shadow-md'
                  : 'bg-white text-[#554F48] border border-[#E5DDD0] hover:bg-[#F2ECE1]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-white border border-[#E9E1D2] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Box */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE9DF]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Year and Event badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                    {item.eventType}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#C5A880] text-[#181716] text-[10px] font-bold">
                    {item.year}
                  </span>
                </div>

                {/* Overlay Action */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => openInvitation(item.slug, 'Bapak/Ibu Tamu Terhormat')}
                    className="px-5 py-2.5 rounded-full bg-white text-[#1A1816] text-xs font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Lihat Undangan</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1816] group-hover:text-[#9C753B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#756E63] mt-0.5">
                    {item.customerName}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-[#827A6F]">
                  <span className="font-medium text-[#C5A880]">Tema: {item.themeName}</span>
                  <span>{item.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Want to create your own? */}
      <section className="max-w-4xl mx-auto px-4 text-center pt-8">
        <div className="p-8 rounded-3xl bg-[#FAF5EE] border border-[#E7DFD1] space-y-4">
          <Sparkles className="w-8 h-8 text-[#9C753B] mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-[#1C1A18]">
            Ingin Momen Anda Tampil Memukau Seperti Ini?
          </h2>
          <p className="text-xs sm:text-sm text-[#666] max-w-md mx-auto">
            Hanya butuh beberapa menit untuk memilih tema dan membagikan undangan digital eksklusif Anda kepada keluarga & sahabat tercinta.
          </p>
          <button
            onClick={() => setActiveTab('order')}
            className="px-7 py-3 rounded-full bg-[#1F1D1B] text-white text-xs font-semibold shadow hover:bg-[#332E2A] transition-all cursor-pointer"
          >
            Buat Undangan Sekarang
          </button>
        </div>
      </section>

    </div>
  );
};

export default PortfolioView;
