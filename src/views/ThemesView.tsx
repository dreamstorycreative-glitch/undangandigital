import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Eye, 
  ArrowRight, 
  Check, 
  X, 
  Smartphone, 
  Monitor, 
  Music, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { Theme, EventType, ThemeStyle, ThemeColor } from '../types';

export const ThemesView: React.FC = () => {
  const { themes, setSelectedThemeForOrder, setActiveTab, openInvitation } = useApp();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('populer');

  // Modal Detail State
  const [selectedThemeModal, setSelectedThemeModal] = useState<Theme | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  // Filter options
  const eventTypes: { label: string; value: string }[] = [
    { label: 'Semua Acara', value: 'all' },
    { label: 'Wedding', value: 'Wedding' },
    { label: 'Engagement', value: 'Engagement' },
    { label: 'Birthday', value: 'Birthday' },
    { label: 'Aqiqah', value: 'Aqiqah' },
    { label: 'Khitanan', value: 'Khitanan' },
    { label: 'Graduation', value: 'Graduation' },
    { label: 'Anniversary', value: 'Anniversary' },
    { label: 'Islami', value: 'Islami' }
  ];

  const styles: { label: string; value: string }[] = [
    { label: 'Semua Style', value: 'all' },
    { label: 'Luxury', value: 'Luxury' },
    { label: 'Floral', value: 'Floral' },
    { label: 'Romantic', value: 'Romantic' },
    { label: 'Minimalist', value: 'Minimalist' },
    { label: 'Islamic', value: 'Islamic' },
    { label: 'Classic', value: 'Classic' },
    { label: 'Rustic', value: 'Rustic' },
    { label: 'Modern', value: 'Modern' }
  ];

  const colors: { label: string; value: string; bg: string }[] = [
    { label: 'Semua', value: 'all', bg: '#fff' },
    { label: 'Gold', value: 'Gold', bg: '#D4AF37' },
    { label: 'Beige', value: 'Beige', bg: '#E8D8C3' },
    { label: 'Green', value: 'Green', bg: '#5B7065' },
    { label: 'Pink', value: 'Pink', bg: '#E4A5A5' },
    { label: 'Black', value: 'Black', bg: '#222222' },
    { label: 'White', value: 'White', bg: '#F5F5F5' },
    { label: 'Blue', value: 'Blue', bg: '#718EB0' },
    { label: 'Brown', value: 'Brown', bg: '#8C6239' }
  ];

  const filteredThemes = useMemo(() => {
    return themes.filter((theme) => {
      const matchSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchEvent = selectedEventType === 'all' || theme.eventType === selectedEventType;
      const matchStyle = selectedStyle === 'all' || theme.style === selectedStyle;
      const matchColor = selectedColor === 'all' || theme.color === selectedColor;
      return matchSearch && matchEvent && matchStyle && matchColor;
    }).sort((a, b) => {
      if (sortBy === 'terbaru') return b.id.localeCompare(a.id);
      if (sortBy === 'harga-rendah') return a.price - b.price;
      if (sortBy === 'harga-tinggi') return b.price - a.price;
      // Default: populer (bestsellers first)
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [themes, searchQuery, selectedEventType, selectedStyle, selectedColor, sortBy]);

  const handleUseTheme = (theme: Theme) => {
    setSelectedThemeForOrder(theme.id);
    setSelectedThemeModal(null);
    setActiveTab('order');
  };

  return (
    <div className="space-y-12 pb-24">
      
      {/* Header Banner */}
      <section className="text-center max-w-3xl mx-auto pt-6 px-4 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
          KATALOG EKSKLUSIF
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1816]">
          Temukan Tema yang Sesuai dengan Cerita Anda.
        </h1>
        <p className="text-sm sm:text-base text-[#635D55]">
          Pilihan tema modern, elegan, dan estetik yang dirancang teliti untuk setiap momen istimewa dalam hidup Anda.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Search & Sort row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E9E1D2] shadow-xs">
          
          {/* Search input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A847C]" />
            <input
              type="text"
              placeholder="Cari tema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E0D7C8] text-sm text-[#222] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-[#7A746B] whitespace-nowrap">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E0D7C8] text-xs font-medium text-[#333] focus:outline-none focus:border-[#C5A880] cursor-pointer"
            >
              <option value="populer">Terpopuler & Bestseller</option>
              <option value="terbaru">Terbaru</option>
              <option value="harga-rendah">Harga Terendah</option>
              <option value="harga-tinggi">Harga Tertinggi</option>
            </select>
          </div>

        </div>

        {/* Categories Pills: Event Type */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-[#8C8377] mr-1 hidden sm:inline">Acara:</span>
          {eventTypes.map((evt) => (
            <button
              key={evt.value}
              onClick={() => setSelectedEventType(evt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedEventType === evt.value
                  ? 'bg-[#221F1D] text-white shadow-xs'
                  : 'bg-white text-[#5F5952] border border-[#E6DDD0] hover:bg-[#F4EFE7]'
              }`}
            >
              {evt.label}
            </button>
          ))}
        </div>

        {/* Styles and Color row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Styles */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-xs font-semibold text-[#8C8377] mr-1 hidden sm:inline">Style:</span>
            {styles.map((st) => (
              <button
                key={st.value}
                onClick={() => setSelectedStyle(st.value)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedStyle === st.value
                    ? 'bg-[#C5A880] text-[#1A1816] font-bold'
                    : 'bg-white/80 text-[#6B655D] border border-[#E8DFD1] hover:bg-[#F2ECE1]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Color Palettes */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#8C8377] mr-1 hidden sm:inline">Warna:</span>
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedColor(c.value)}
                title={c.label}
                className={`w-6 h-6 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                  selectedColor === c.value
                    ? 'ring-2 ring-[#9C753B] scale-110'
                    : 'border-[#CCC] hover:scale-105'
                }`}
                style={{ backgroundColor: c.bg }}
              >
                {selectedColor === c.value && (
                  <Check className={`w-3 h-3 ${c.value === 'White' || c.value === 'Beige' ? 'text-black' : 'text-white'}`} />
                )}
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* THEMES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredThemes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E9E1D2] space-y-3">
            <Sparkles className="w-8 h-8 text-[#C5A880] mx-auto opacity-70" />
            <h3 className="font-serif text-lg font-bold text-[#222]">Tema Tidak Ditemukan</h3>
            <p className="text-xs text-[#777]">Coba ubah kata kunci pencarian atau sesuaikan filter Anda.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedEventType('all');
                setSelectedStyle('all');
                setSelectedColor('all');
              }}
              className="text-xs text-[#9C753B] underline font-medium cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filteredThemes.map((theme) => (
              <div
                key={theme.id}
                className="group rounded-3xl bg-white border border-[#E9E1D2] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Thumbnail Image Box */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F0EBE3]">
                  <img
                    src={theme.thumbnail}
                    alt={theme.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Bestseller Badge */}
                  {theme.isBestseller && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1816]/90 backdrop-blur-sm text-[#EAD5BA] text-[10px] font-bold tracking-wider uppercase border border-[#C5A880]/40 flex items-center gap-1 shadow">
                      <Sparkles className="w-3 h-3 text-[#EAD5BA]" />
                      <span>BESTSELLER</span>
                    </div>
                  )}

                  {/* Category & Style Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm font-medium">
                      {theme.eventType}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C5A880]/90 text-[#181716] font-bold">
                      {theme.style}
                    </span>
                  </div>

                  {/* Hover Overlay Button to Demo */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                    <button
                      onClick={() => setSelectedThemeModal(theme)}
                      className="px-4 py-2 rounded-full bg-white text-[#1A1816] text-xs font-semibold shadow hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Detail</span>
                    </button>
                  </div>
                </div>

                {/* Card Content Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1C1A18] group-hover:text-[#9C753B] transition-colors">
                      {theme.name}
                    </h3>
                    <p className="text-xs text-[#736B61] mt-1 line-clamp-2 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-[#F2ECE1] flex items-center gap-2">
                    <button
                      onClick={() => setSelectedThemeModal(theme)}
                      className="flex-1 py-2 rounded-xl border border-[#D5CABE] text-[#332E2A] text-xs font-semibold hover:bg-[#FAF6F0] transition-colors cursor-pointer text-center"
                    >
                      Demo
                    </button>
                    <button
                      onClick={() => handleUseTheme(theme)}
                      className="flex-1 py-2 rounded-xl bg-[#221F1D] hover:bg-[#38332E] text-white text-xs font-semibold transition-all shadow-xs hover:shadow cursor-pointer text-center flex items-center justify-center gap-1"
                    >
                      <span>Gunakan</span>
                      <ArrowRight className="w-3 h-3 text-[#E6D4BA]" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* DETAIL TEMA MODAL */}
      {selectedThemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#DED5C5] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-white border-b border-[#EAE2D5] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C753B]">
                  Detail & Preview Tema
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1C1A18]">
                  {selectedThemeModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedThemeModal(null)}
                className="p-2 rounded-full text-[#888] hover:text-black hover:bg-[#F2ECE1] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Preview Column */}
              <div className="lg:col-span-7 space-y-4">
                {/* Device switch buttons */}
                <div className="flex items-center justify-center gap-2 p-1 rounded-xl bg-[#EBE4D7] max-w-[200px] mx-auto">
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      previewDevice === 'mobile'
                        ? 'bg-white text-[#181716] shadow-xs'
                        : 'text-[#666] hover:text-black'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      previewDevice === 'desktop'
                        ? 'bg-white text-[#181716] shadow-xs'
                        : 'text-[#666] hover:text-black'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                </div>

                {/* Device preview frame */}
                <div className="flex justify-center">
                  {previewDevice === 'mobile' ? (
                    <div className="w-[280px] h-[480px] rounded-[36px] bg-[#111] p-2.5 shadow-xl border-4 border-[#333] overflow-hidden relative">
                      <div className="w-full h-full rounded-[28px] overflow-hidden bg-[#FAF7F2] relative">
                        <img 
                          src={selectedThemeModal.thumbnail} 
                          alt="preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4 text-white">
                          <span className="text-[10px] tracking-widest uppercase text-[#EAD5BA]">RuangMomen Preview</span>
                          <div className="text-center space-y-1">
                            <h4 className="font-serif text-lg font-bold">{selectedThemeModal.name}</h4>
                            <p className="text-[10px] text-[#DDD]">{selectedThemeModal.eventType} Edition</p>
                          </div>
                          <div className="py-2 text-center text-[10px] bg-white/20 backdrop-blur-sm rounded-lg">
                            Geser untuk melihat animasi
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/10] rounded-2xl bg-[#111] p-2 shadow-xl border-4 border-[#333] overflow-hidden relative">
                      <img 
                        src={selectedThemeModal.thumbnail} 
                        alt="preview desktop" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Live Fullscreen Demo CTA */}
                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setSelectedThemeModal(null);
                      openInvitation('andi-rina', 'Tamu Kehormatan');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9C753B] hover:underline cursor-pointer"
                  >
                    <span>Buka Live Demo Interaktif Fullscreen</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Right Details Column */}
              <div className="lg:col-span-5 space-y-5">
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EDE5D8] text-xs font-medium text-[#4A443D]">
                      {selectedThemeModal.eventType}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EDE5D8] text-xs font-medium text-[#4A443D]">
                      {selectedThemeModal.style}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EDE5D8] text-xs font-medium text-[#4A443D]">
                      Warna: {selectedThemeModal.color}
                    </span>
                  </div>

                  <p className="text-xs text-[#5C554E] leading-relaxed">
                    {selectedThemeModal.description}
                  </p>
                </div>

                {/* Feature checklist */}
                <div className="space-y-2 p-4 rounded-2xl bg-white border border-[#E9E1D2]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1816]">
                    Fitur Eksklusif Tema Ini:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#4F4941]">
                    {selectedThemeModal.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#9C753B] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#9C753B] shrink-0" />
                      <span>Terintegrasi RSVP & Amplop Digital</span>
                    </li>
                  </ul>
                </div>

                {/* Packages available */}
                <div className="p-3.5 rounded-2xl bg-[#F4EFE6] border border-[#DDD3C2] text-xs space-y-1">
                  <span className="font-semibold text-[#181716] block">Tersedia pada Paket:</span>
                  <p className="text-[#6D655A]">
                    Basic (Rp99.000) • Premium (Rp199.000) • Exclusive (Rp399.000)
                  </p>
                </div>

                {/* CTAs */}
                <div className="pt-3 space-y-2">
                  <button
                    onClick={() => handleUseTheme(selectedThemeModal)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#211E1C] via-[#352F2B] to-[#211E1C] text-white text-sm font-semibold shadow hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Gunakan Tema Ini</span>
                    <ArrowRight className="w-4 h-4 text-[#E6D4BA]" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedThemeModal(null);
                      openInvitation('andi-rina', 'Bpk. Budi Pratama');
                    }}
                    className="w-full py-2.5 rounded-xl border border-[#D5CABE] text-[#3A3530] text-xs font-medium hover:bg-[#EFE9DF] transition-colors cursor-pointer"
                  >
                    Lihat Demo Langsung
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ThemesView;
