import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { PackageTier } from '../types';

export const PackagesView: React.FC = () => {
  const { packages, setSelectedPackageForOrder, setActiveTab } = useApp();

  const handleSelectPackage = (tier: PackageTier) => {
    setSelectedPackageForOrder(tier);
    setActiveTab('order');
  };

  return (
    <div className="space-y-16 pb-24">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto pt-6 px-4 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
          TRANSPARAN & TERJANGKAU
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1816]">
          Pilihan Paket Terbaik untuk Hari Bahagia Anda.
        </h1>
        <p className="text-sm sm:text-base text-[#635D55]">
          Semua paket sudah termasuk hosting berkecepatan tinggi, integrasi WhatsApp, dan jaminan revisi sampai tuntas.
        </p>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#1C1A18] text-white shadow-2xl border-2 border-[#C5A880] md:-translate-y-3'
                    : 'bg-white text-[#222] border border-[#E8DFD1] shadow-xs hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#C5A880] to-[#E9D7B7] text-[#181716] text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Package title & Price */}
                  <div>
                    <h3 className={`font-serif text-2xl font-bold ${isPopular ? 'text-white' : 'text-[#1C1A18]'}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-xs mt-1.5 min-h-[36px] ${isPopular ? 'text-[#B8B1A7]' : 'text-[#70685E]'}`}>
                      {pkg.description}
                    </p>
                  </div>

                  <div className="py-2 border-y border-dashed border-[#C5A880]/30">
                    <span className="text-xs uppercase tracking-wider block opacity-70">Harga Spesial</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className={`font-serif text-3xl sm:text-4xl font-extrabold ${isPopular ? 'text-[#E8D7BE]' : 'text-[#1C1A18]'}`}>
                        Rp{pkg.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs opacity-70">/ undangan</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider block ${isPopular ? 'text-[#C5A880]' : 'text-[#9C753B]'}`}>
                      Fitur yang Didapatkan:
                    </span>
                    <ul className="space-y-2.5 text-xs">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-[#C5A880]' : 'text-[#9C753B]'}`} />
                          <span className={isPopular ? 'text-[#DDD6CC]' : 'text-[#48423B]'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <button
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`w-full py-3.5 rounded-full text-xs font-bold transition-all shadow cursor-pointer flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-gradient-to-r from-[#C5A880] to-[#E9D7B7] text-[#181716] hover:opacity-95'
                        : 'bg-[#221F1D] text-white hover:bg-[#352F2B]'
                    }`}
                  >
                    <span>{pkg.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Note Callout */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-6 rounded-2xl bg-[#FAF5EE] border border-[#EAE0D2] inline-block">
          <p className="text-xs sm:text-sm text-[#6A6256] font-medium">
            💬 “Harga dapat disesuaikan dengan kebutuhan dan request custom acara Anda.”
          </p>
          <a
            href="https://wa.me/6282211447129?text=Halo%20Admin%20RuangMomen%20%F0%9F%91%8B%20Saya%20ingin%20konsultasi%20paket%20undangan%20custom."
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#9C753B] font-bold hover:underline mt-1.5 inline-block"
          >
            Konsultasikan Kebutuhan Khusus via WhatsApp (082211447129) →
          </a>
        </div>
      </section>

    </div>
  );
};

export default PackagesView;
