import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  MessageCircle, 
  Copy, 
  Clock, 
  Calendar, 
  MapPin, 
  Music, 
  Heart, 
  Gift, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { EventType, PackageTier, OrderItem } from '../types';

export const OrderWizardView: React.FC = () => {
  const { 
    packages, 
    themes, 
    musicTracks, 
    selectedPackageForOrder, 
    selectedThemeForOrder,
    selectedMusicForOrder,
    createOrder,
    getWhatsAppPaymentUrl,
    setActiveTab,
    openInvitation
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [createdOrder, setCreatedOrder] = useState<OrderItem | null>(null);
  const [copiedOrder, setCopiedOrder] = useState(false);

  // Form State
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [packageTier, setPackageTier] = useState<PackageTier>(selectedPackageForOrder || 'Premium');
  const [themeId, setThemeId] = useState<string>(selectedThemeForOrder || themes[0]?.id || 'thm-1');
  const [musicId, setMusicId] = useState<string>(selectedMusicForOrder || musicTracks[0]?.id || 'mus-1');

  // Customer & Event Info
  const [formData, setFormData] = useState({
    customerName: '',
    customerWhatsapp: '',
    customerEmail: '',
    eventTitle: 'The Wedding of Andi & Rina',
    brideName: '',
    groomName: '',
    brideNick: '',
    groomNick: '',
    eventDate: '2026-11-28',
    eventTime: '08:00 - 11:00 WIB',
    receptionTime: '13:00 - 17:00 WIB',
    locationName: '',
    locationAddress: '',
    mapsUrl: '',
    dressCode: 'Earth Tone / Formal',
    instagramTag: '',
    hashtag: '',
    quote: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu...',
    // Step 6: Data Tambahan
    enableLoveStory: true,
    loveStoryText: 'Pertama kali bertemu di kampus tahun 2021 dan memutuskan melangkah ke jenjang pernikahan.',
    enableGift: true,
    bankName: 'BCA (Bank Central Asia)',
    accountNumber: '',
    accountHolder: '',
    giftAddress: '',
    videoUrl: ''
  });

  const selectedPkgInfo = packages.find(p => p.id === packageTier) || packages[1];
  const selectedThemeInfo = themes.find(t => t.id === themeId) || themes[0];
  const selectedMusicInfo = musicTracks.find(m => m.id === musicId) || musicTracks[0];

  const handleInputChange = (field: string, val: any) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleNext = () => {
    if (currentStep === 5) {
      if (!formData.customerName.trim() || !formData.customerWhatsapp.trim()) {
        alert('Mohon isi Nama Pemesan dan Nomor WhatsApp untuk konfirmasi pesanan.');
        return;
      }
    }
    setCurrentStep(prev => Math.min(7, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitOrder = () => {
    const slugName = (formData.groomNick && formData.brideNick)
      ? `${formData.groomNick.toLowerCase()}-${formData.brideNick.toLowerCase()}`
      : (formData.customerName.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'undangan-saya');

    const newOrder = createOrder({
      customerName: formData.customerName,
      customerWhatsapp: formData.customerWhatsapp,
      customerEmail: formData.customerEmail || `${formData.customerName.replace(/\s+/g, '').toLowerCase()}@gmail.com`,
      eventType,
      packageTier,
      themeId,
      themeName: selectedThemeInfo.name,
      musicId,
      musicName: selectedMusicInfo.title,
      totalPrice: selectedPkgInfo.price,
      invitationData: {
        slug: slugName,
        brideName: formData.brideName || formData.customerName,
        groomName: formData.groomName || 'Pasangan',
        brideNick: formData.brideNick || 'Wanita',
        groomNick: formData.groomNick || 'Pria',
        eventTitle: formData.eventTitle || `The Wedding of ${formData.groomNick || 'Pria'} & ${formData.brideNick || 'Wanita'}`,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        receptionTime: formData.receptionTime,
        locationName: formData.locationName || 'Ballroom Hotel Mewah',
        locationAddress: formData.locationAddress || 'Jl. Jenderal Sudirman No. 1, Jakarta Pusat',
        mapsUrl: formData.mapsUrl || 'https://maps.google.com',
        dressCode: formData.dressCode,
        instagramTag: formData.instagramTag,
        hashtag: formData.hashtag,
        quote: formData.quote,
        bankAccounts: formData.enableGift && formData.accountNumber ? [
          {
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            accountHolder: formData.accountHolder || formData.customerName
          }
        ] : undefined,
        giftAddress: formData.giftAddress,
        videoUrl: formData.videoUrl
      }
    });

    setCreatedOrder(newOrder);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  // SUCCESS SCREEN
  if (createdOrder) {
    const waUrl = getWhatsAppPaymentUrl(createdOrder);

    return (
      <div className="max-w-3xl mx-auto px-4 py-12 pb-28">
        <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-xl border border-[#E9E1D2] text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
          
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-50 text-[#9C753B] text-xs font-bold tracking-wider uppercase border border-[#E8DFD1]">
              Status: Menunggu Pembayaran Manual
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A18]">
              Pesanan Berhasil Dibuat 🎉
            </h1>
            <p className="text-xs sm:text-sm text-[#666] max-w-lg mx-auto leading-relaxed">
              Pesanan Anda telah berhasil diterima oleh sistem RuangMomen. Silakan hubungi Admin RuangMomen melalui WhatsApp untuk mendapatkan informasi rekening pembayaran dan proses selanjutnya.
            </p>
          </div>

          {/* Order ID Badge Box */}
          <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E6DCCF] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-lg mx-auto">
            <div className="text-left">
              <span className="text-[10px] text-[#888] uppercase tracking-wider block font-semibold">
                Nomor Order Anda
              </span>
              <span className="font-mono text-xl font-bold text-[#1C1A18] tracking-tight">
                {createdOrder.orderId}
              </span>
            </div>
            <button
              onClick={() => handleCopyOrderId(createdOrder.orderId)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#DDD3C2] text-xs font-semibold text-[#444] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedOrder ? 'Tersalin!' : 'Salin Nomor'}</span>
            </button>
          </div>

          {/* Order Summary mini */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE5D8] text-xs text-left max-w-lg mx-auto space-y-2">
            <div className="flex justify-between py-1 border-b border-[#EAE2D5]">
              <span className="text-[#777]">Nama Pemesan:</span>
              <span className="font-semibold text-[#222]">{createdOrder.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#EAE2D5]">
              <span className="text-[#777]">Jenis Acara:</span>
              <span className="font-semibold text-[#222]">{createdOrder.eventType}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#EAE2D5]">
              <span className="text-[#777]">Paket & Tema:</span>
              <span className="font-semibold text-[#222]">{createdOrder.packageTier} • {createdOrder.themeName}</span>
            </div>
            <div className="flex justify-between py-1 text-sm font-bold text-[#1C1A18]">
              <span>Total Pembayaran:</span>
              <span className="text-[#9C753B]">Rp{createdOrder.totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Big WhatsApp Payment Button */}
          <div className="space-y-3 max-w-lg mx-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm sm:text-base shadow-xl hover:opacity-95 hover:scale-[1.02] active:scale-98 transition-all"
            >
              <MessageCircle className="w-6 h-6" />
              <span>💬 Bayar & Konfirmasi via WhatsApp</span>
            </a>

            <p className="text-[11px] text-[#888]">
              WhatsApp Admin: <strong className="text-[#222]">082211447129</strong> (Online 24/7)
            </p>
          </div>

          {/* Secondary Actions */}
          <div className="pt-4 border-t border-[#EAE2D5] flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#221F1D] text-white text-xs font-semibold hover:bg-[#38332E] transition-all cursor-pointer"
            >
              Buka Customer Dashboard
            </button>
            <button
              onClick={() => openInvitation(createdOrder.invitationData.slug, createdOrder.customerName)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#D5CABE] text-[#332E2A] text-xs font-semibold hover:bg-[#FAF6F0] transition-all cursor-pointer"
            >
              Preview Live Undangan Saya
            </button>
          </div>

        </div>
      </div>
    );
  }

  // WIZARD STEPS
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-28 space-y-8">
      
      {/* Wizard Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
          FORMULIR PEMESANAN
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A18]">
          Buat Undangan Anda Sekarang.
        </h1>
        <p className="text-xs sm:text-sm text-[#666]">
          Lengkapi detail acara di bawah ini. Kami akan menyusun undangan digital yang sempurna untuk Anda.
        </p>
      </div>

      {/* Progress Step Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E9E1D2] shadow-xs">
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#888] mb-2 px-1">
          <span>Langkah {currentStep} dari 7</span>
          <span className="text-[#9C753B]">
            {currentStep === 1 && 'Jenis Acara'}
            {currentStep === 2 && 'Pilih Paket'}
            {currentStep === 3 && 'Pilih Tema'}
            {currentStep === 4 && 'Pilih Musik'}
            {currentStep === 5 && 'Data Acara'}
            {currentStep === 6 && 'Data Tambahan'}
            {currentStep === 7 && 'Review & Selesai'}
          </span>
        </div>
        <div className="w-full h-2 bg-[#EFE9DF] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#9C753B] to-[#C99F5D] transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP CONTAINER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E1D2] shadow-sm space-y-6">
        
        {/* STEP 1: JENIS ACARA */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                Pilih Jenis Acara Anda
              </h2>
              <p className="text-xs text-[#777]">
                Pilih kategori perayaan yang akan diselenggarakan.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                'Wedding', 'Engagement', 'Birthday', 'Aqiqah', 
                'Khitanan', 'Graduation', 'Anniversary', 'Gathering', 
                'Corporate', 'Event', 'Islami', 'Lainnya'
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => setEventType(type as EventType)}
                  className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                    eventType === type
                      ? 'border-[#9C753B] bg-[#FAF5EE] ring-1 ring-[#9C753B] shadow-xs'
                      : 'border-[#E6DDD0] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-semibold block ${eventType === type ? 'text-[#9C753B]' : 'text-[#333]'}`}>
                    {type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: PILIH PAKET */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                Pilih Paket Layanan
              </h2>
              <p className="text-xs text-[#777]">
                Sesuaikan dengan kebutuhan fitur dan anggaran Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setPackageTier(pkg.id)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    packageTier === pkg.id
                      ? 'border-[#9C753B] bg-[#FAF5EE] shadow-md'
                      : 'border-[#E6DDD0] hover:border-[#CCC]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-base text-[#1C1A18]">
                        {pkg.name}
                      </h3>
                      {pkg.badge && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#1C1A18] text-[#EAD5BA]">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-serif text-2xl font-bold text-[#9C753B] block my-2">
                      Rp{pkg.price.toLocaleString('id-ID')}
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#555] my-3">
                      {pkg.features.slice(0, 5).map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#9C753B]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 text-center">
                    <span className={`text-xs font-semibold py-1.5 px-4 rounded-xl block ${
                      packageTier === pkg.id ? 'bg-[#9C753B] text-white' : 'bg-[#EAE2D5] text-[#444]'
                    }`}>
                      {packageTier === pkg.id ? 'Dipilih' : 'Pilih Paket Ini'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: PILIH TEMA */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                Pilih Tema Undangan
              </h2>
              <p className="text-xs text-[#777]">
                Pilih tema visual yang paling Anda sukai.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {themes.map((th) => (
                <div
                  key={th.id}
                  onClick={() => setThemeId(th.id)}
                  className={`rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${
                    themeId === th.id
                      ? 'border-[#9C753B] shadow-md ring-1 ring-[#9C753B]'
                      : 'border-[#E6DDD0] hover:border-[#BBB]'
                  }`}
                >
                  <div className="aspect-[4/3] bg-[#EBE4D8] overflow-hidden relative">
                    <img 
                      src={th.thumbnail} 
                      alt={th.name}
                      className="w-full h-full object-cover"
                    />
                    {th.isBestseller && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
                        Bestseller
                      </span>
                    )}
                  </div>
                  <div className="p-3 bg-white">
                    <h4 className="font-serif font-bold text-xs text-[#1C1A18] truncate">
                      {th.name}
                    </h4>
                    <span className="text-[10px] text-[#888]">{th.style} • {th.color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: PILIH MUSIK */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                Pilih Lagu & Musik Pengiring
              </h2>
              <p className="text-xs text-[#777]">
                Musik yang akan otomatis berputar saat undangan dibuka.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {musicTracks.map((trk) => (
                <div
                  key={trk.id}
                  onClick={() => setMusicId(trk.id)}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    musicId === trk.id
                      ? 'border-[#9C753B] bg-[#FAF5EE]'
                      : 'border-[#E6DDD0] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={trk.coverUrl} 
                      alt={trk.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-xs text-[#1C1A18] truncate">
                        {trk.title}
                      </h4>
                      <p className="text-[11px] text-[#777] truncate">{trk.artist}</p>
                      <span className="text-[9px] text-[#9C753B] font-semibold">{trk.category} • {trk.duration}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                    musicId === trk.id ? 'bg-[#9C753B] text-white' : 'bg-[#EAE2D5] text-[#555]'
                  }`}>
                    {musicId === trk.id ? 'Dipilih' : 'Pilih'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: DATA ACARA */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                Informasi Kontak & Detail Acara
              </h2>
              <p className="text-xs text-[#777]">
                Harap isi dengan teliti untuk kelancaran konfirmasi via WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Nama Pemesan *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Rina Marlina"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Nomor WhatsApp Pemesan * (Wajib untuk Pembayaran)
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={formData.customerWhatsapp}
                  onChange={(e) => handleInputChange('customerWhatsapp', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Email Pemesan
                </label>
                <input
                  type="email"
                  placeholder="Contoh: rina@gmail.com"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Judul Acara
                </label>
                <input
                  type="text"
                  placeholder="Contoh: The Wedding of Andi & Rina"
                  value={formData.eventTitle}
                  onChange={(e) => handleInputChange('eventTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Nama Mempelai Wanita (Lengkap + Gelar)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Rina Marlina, S.Kom"
                  value={formData.brideName}
                  onChange={(e) => handleInputChange('brideName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Nama Mempelai Pria (Lengkap + Gelar)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Andi Pratama, S.T"
                  value={formData.groomName}
                  onChange={(e) => handleInputChange('groomName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Nama Panggilan Wanita
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Rina"
                  value={formData.brideNick}
                  onChange={(e) => handleInputChange('brideNick', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Nama Panggilan Pria
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Andi"
                  value={formData.groomNick}
                  onChange={(e) => handleInputChange('groomNick', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Tanggal Acara
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Waktu / Jam Akad (atau Acara Utama)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 08:00 - 11:00 WIB"
                  value={formData.eventTime}
                  onChange={(e) => handleInputChange('eventTime', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Nama Gedung / Tempat Lokasi Acara
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Ballroom Hotel Mulia Senayan"
                  value={formData.locationName}
                  onChange={(e) => handleInputChange('locationName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Tautan Google Maps Lokasi
                </label>
                <input
                  type="text"
                  placeholder="https://maps.google.com/..."
                  value={formData.mapsUrl}
                  onChange={(e) => handleInputChange('mapsUrl', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Alamat Lengkap Tempat Acara
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Jl. Asia Afrika No. 6, Gelora, Tanah Abang, Jakarta Pusat"
                  value={formData.locationAddress}
                  onChange={(e) => handleInputChange('locationAddress', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

            </div>
          </div>
        )}

        {/* STEP 6: DATA TAMBAHAN */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                Data Tambahan & Amplop Digital (Opsional)
              </h2>
              <p className="text-xs text-[#777]">
                Fitur Love Story, Amplop Digital (nomor rekening), dan video prewedding.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Amplop Digital */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1C1A18] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#9C753B]" />
                    Sediakan Amplop Digital / Rekening Hadiah
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.enableGift}
                    onChange={(e) => handleInputChange('enableGift', e.target.checked)}
                    className="w-4 h-4 accent-[#9C753B] cursor-pointer"
                  />
                </div>

                {formData.enableGift && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <input
                      type="text"
                      placeholder="Nama Bank (BCA/Mandiri/BRI)"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#D5CABE] text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Nomor Rekening"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#D5CABE] text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Atas Nama Pemilik Rekening"
                      value={formData.accountHolder}
                      onChange={(e) => handleInputChange('accountHolder', e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#D5CABE] text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Love Story */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D2] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1C1A18] flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-[#9C753B]" />
                    Cerita Kisah Cinta (Love Story)
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.enableLoveStory}
                    onChange={(e) => handleInputChange('enableLoveStory', e.target.checked)}
                    className="w-4 h-4 accent-[#9C753B] cursor-pointer"
                  />
                </div>
                {formData.enableLoveStory && (
                  <textarea
                    rows={2}
                    placeholder="Tuliskan ringkasan singkat kisah Anda..."
                    value={formData.loveStoryText}
                    onChange={(e) => handleInputChange('loveStoryText', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CABE] text-xs"
                  />
                )}
              </div>

              {/* Video URL */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">
                  Link Video Prewedding YouTube (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

            </div>
          </div>
        )}

        {/* STEP 7: REVIEW ORDER */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1C1A18]">
                Review Pesanan Undangan Anda
              </h2>
              <p className="text-xs text-[#777]">
                Periksa kembali data sebelum menyelesaikan pesanan.
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF6F0] p-5 border border-[#E7DFD1] space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#E3D9CB]">
                <span className="text-[#666]">Nama Pemesan:</span>
                <span className="font-semibold text-[#111]">{formData.customerName || '-'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E3D9CB]">
                <span className="text-[#666]">WhatsApp Pemesan:</span>
                <span className="font-semibold text-[#111]">{formData.customerWhatsapp || '-'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E3D9CB]">
                <span className="text-[#666]">Jenis Acara:</span>
                <span className="font-semibold text-[#111]">{eventType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E3D9CB]">
                <span className="text-[#666]">Pilihan Paket:</span>
                <span className="font-semibold text-[#111]">{packageTier} (Rp{selectedPkgInfo.price.toLocaleString('id-ID')})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E3D9CB]">
                <span className="text-[#666]">Tema Undangan:</span>
                <span className="font-semibold text-[#111]">{selectedThemeInfo.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E3D9CB]">
                <span className="text-[#666]">Musik:</span>
                <span className="font-semibold text-[#111]">{selectedMusicInfo.title}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E3D9CB]">
                <span className="text-[#666]">Tanggal Acara:</span>
                <span className="font-semibold text-[#111]">{formData.eventDate}</span>
              </div>
              <div className="flex justify-between py-2 text-base font-bold text-[#1C1A18]">
                <span>Total Biaya:</span>
                <span className="text-[#9C753B]">Rp{selectedPkgInfo.price.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-[#7A5B20] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Catatan Pembayaran Manual:</strong> Setelah menekan tombol “Buat Pesanan”, Anda akan diarahkan langsung ke WhatsApp Admin RuangMomen (082211447129) untuk mendapatkan rincian rekening transfer dan konfirmasi instan.
              </span>
            </div>

          </div>
        )}

        {/* Wizard Navigation Buttons */}
        <div className="pt-6 border-t border-[#F0EAE0] flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl border border-[#D5CABE] text-[#332E2A] text-xs font-semibold hover:bg-[#FAF6F0] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 7 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#211E1C] hover:bg-[#352F2B] text-white text-xs font-semibold shadow flex items-center gap-1.5 cursor-pointer"
            >
              <span>Lanjutkan</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E6D4BA]" />
            </button>
          ) : (
            <button
              onClick={handleSubmitOrder}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#9C753B] to-[#C99F5D] text-white text-xs font-bold shadow-lg hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buat Pesanan</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default OrderWizardView;
