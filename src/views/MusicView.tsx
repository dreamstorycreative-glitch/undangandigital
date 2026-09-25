import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, 
  Pause, 
  Music, 
  Check, 
  Sparkles, 
  Volume2, 
  Clock, 
  ArrowRight,
  Disc3
} from 'lucide-react';
import { MusicTrack } from '../types';

export const MusicView: React.FC = () => {
  const { 
    musicTracks, 
    activeTrack, 
    isPlayingMusic, 
    toggleMusic, 
    setSelectedMusicForOrder, 
    setActiveTab 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { label: 'Semua Musik', value: 'all' },
    { label: 'Romantic', value: 'Romantic' },
    { label: 'Acoustic', value: 'Acoustic' },
    { label: 'Piano', value: 'Piano' },
    { label: 'Classical', value: 'Classical' },
    { label: 'Islamic', value: 'Islamic' },
    { label: 'Modern', value: 'Modern' }
  ];

  const filteredMusic = useMemo(() => {
    if (selectedCategory === 'all') return musicTracks;
    return musicTracks.filter(m => m.category === selectedCategory);
  }, [musicTracks, selectedCategory]);

  const handleUseMusic = (track: MusicTrack) => {
    setSelectedMusicForOrder(track.id);
    setActiveTab('order');
  };

  return (
    <div className="space-y-12 pb-24">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto pt-6 px-4 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
          AUDIO & MELODI
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1816]">
          Lengkapi Cerita dengan Musik Pilihan Anda.
        </h1>
        <p className="text-sm sm:text-base text-[#635D55]">
          Musik yang tepat menghadirkan getaran emosional mendalam saat tamu pertama kali membuka undangan Anda.
        </p>
      </section>

      {/* Categories */}
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

      {/* Music Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMusic.map((track) => {
            const isCurrent = activeTrack?.id === track.id;
            const isPlayingThis = isCurrent && isPlayingMusic;

            return (
              <div
                key={track.id}
                className={`p-5 rounded-3xl bg-white border transition-all duration-300 flex items-center justify-between gap-4 shadow-xs hover:shadow-md ${
                  isCurrent
                    ? 'border-[#C5A880] ring-1 ring-[#C5A880]/50 bg-[#FAF7F2]'
                    : 'border-[#E9E1D2] hover:border-[#D5CABE]'
                }`}
              >
                {/* Cover & Play trigger */}
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 group/cover">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleMusic(track)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center text-white hover:bg-black/50 transition-colors cursor-pointer"
                    aria-label={isPlayingThis ? 'Pause' : 'Play'}
                  >
                    {isPlayingThis ? (
                      <Pause className="w-6 h-6 fill-current animate-pulse text-[#E8D7BE]" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-0.5 group-hover/cover:scale-110 transition-transform text-[#E8D7BE]" />
                    )}
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#EDE5D8] text-[#735A33] text-[10px] font-bold uppercase tracking-wider">
                      {track.category}
                    </span>
                    <span className="text-[11px] text-[#8C8479] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {track.duration}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-[#1C1A18] truncate">
                    {track.title}
                  </h3>
                  <p className="text-xs text-[#716A5F] truncate">
                    {track.artist}
                  </p>
                </div>

                {/* Gunakan Action */}
                <button
                  onClick={() => handleUseMusic(track)}
                  className="px-3.5 py-2 rounded-xl bg-[#201D1B] hover:bg-[#342F2C] text-white text-xs font-semibold shrink-0 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Pilih</span>
                  <Check className="w-3.5 h-3.5 text-[#E6D4BA]" />
                </button>

              </div>
            );
          })}
        </div>
      </section>

      {/* Note about custom music upload */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs text-[#7A7266]">
          💡 Punya lagu spesial sendiri? Anda juga dapat mengunggah file MP3 atau tautan lagu favorit Anda pada saat pengisian form order paket Premium & Exclusive.
        </p>
      </section>

    </div>
  );
};

export default MusicView;
