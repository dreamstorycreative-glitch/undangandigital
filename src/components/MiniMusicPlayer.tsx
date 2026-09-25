import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, Volume2, X, Music2, CheckCircle2 } from 'lucide-react';

export const MiniMusicPlayer: React.FC = () => {
  const { 
    activeTrack, 
    isPlayingMusic, 
    toggleMusic, 
    musicVolume, 
    setMusicVolume, 
    pauseMusic,
    setSelectedMusicForOrder,
    setActiveTab
  } = useApp();

  if (!activeTrack) return null;

  const handleUseMusic = () => {
    setSelectedMusicForOrder(activeTrack.id);
    setActiveTab('order');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A1816]/95 backdrop-blur-md text-[#E7E2DA] border-t border-[#3A3530] px-4 py-2.5 shadow-2xl transition-all animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#3C3834] bg-[#2A2724]">
            <img 
              src={activeTrack.coverUrl} 
              alt={activeTrack.title}
              className="w-full h-full object-cover"
            />
            {isPlayingMusic && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#E5D3B8] animate-ping" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold text-white truncate max-w-[150px] sm:max-w-xs">
                {activeTrack.title}
              </h4>
              <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-[#2D2A26] text-[#C5A880] border border-[#3E3A35] shrink-0 font-medium">
                {activeTrack.category}
              </span>
            </div>
            <p className="text-[11px] text-[#A6A097] truncate max-w-[150px] sm:max-w-xs">
              {activeTrack.artist}
            </p>
          </div>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={() => toggleMusic(activeTrack)}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-[#C5A880] to-[#E9D7B7] text-[#181716] flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label={isPlayingMusic ? 'Pause' : 'Play'}
          >
            {isPlayingMusic ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Use This Music button */}
          <button
            onClick={handleUseMusic}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#2C2926] hover:bg-[#3D3833] text-[#E8D7BE] border border-[#48423B] transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Gunakan Musik Ini</span>
          </button>
        </div>

        {/* Volume & Close */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#8A847C]">
            <Volume2 className="w-4 h-4 text-[#C5A880]" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={musicVolume}
              onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
              className="w-16 sm:w-20 accent-[#C5A880] h-1 bg-[#3A3530] rounded-lg cursor-pointer"
            />
          </div>

          <button
            onClick={pauseMusic}
            className="p-1.5 rounded-lg text-[#888] hover:text-white hover:bg-[#2C2926] transition-colors cursor-pointer"
            title="Tutup Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default MiniMusicPlayer;
