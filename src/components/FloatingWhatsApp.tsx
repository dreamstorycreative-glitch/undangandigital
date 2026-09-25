import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '082211447129';
  const defaultMessage = 'Halo Admin RuangMomen 👋 Saya ingin membuat undangan digital.';
  const waUrl = `https://wa.me/6282211447129?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Greeting Popup */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 p-4 rounded-2xl bg-[#1C1B19] text-white shadow-2xl border border-[#3A3530] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between pb-2 border-b border-[#2D2A26]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Admin RuangMomen</h4>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online • Siap Membantu
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#888] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#C8C2BA] my-3 leading-relaxed">
            Ada pertanyaan tentang tema, paket, atau ingin konsultasi undangan custom? Hubungi kami via WhatsApp!
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-semibold shadow hover:opacity-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat via WhatsApp ({phoneNumber})</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#20BA5C] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20 cursor-pointer"
          aria-label="Hubungi WhatsApp Admin"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 border-2 border-emerald-600 animate-ping"></span>
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">
            Tanya Admin
          </span>
        </button>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
