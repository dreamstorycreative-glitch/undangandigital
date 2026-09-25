import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Calendar, 
  Clock, 
  MapPin, 
  Music, 
  Volume2, 
  VolumeX, 
  Copy, 
  Send, 
  Share2, 
  Sparkles, 
  Check, 
  QrCode, 
  X, 
  ExternalLink, 
  MessageCircle,
  ArrowLeft
} from 'lucide-react';
import { audioPlayer } from '../utils/audioPlayer';

export const InvitationLiveView: React.FC = () => {
  const { 
    invitationSlugParam, 
    guestNameParam, 
    getInvitationBySlug, 
    addRsvpToInvitation, 
    addWishToInvitation,
    setActiveTab 
  } = useApp();

  const [isOpenCover, setIsOpenCover] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [copiedShareUrl, setCopiedShareUrl] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestNameParam || '');
  const [rsvpAttendance, setRsvpAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [rsvpGuestCount, setRsvpGuestCount] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Wish Form State
  const [wishName, setWishName] = useState(guestNameParam || '');
  const [wishText, setWishText] = useState('');
  const [wishSuccess, setWishSuccess] = useState(false);

  // Load invitation data
  const order = getInvitationBySlug(invitationSlugParam || 'andi-rina');
  const inv = order?.invitationData || {
    slug: 'andi-rina',
    brideName: 'Rina Marlina, S.Kom',
    groomName: 'Andi Pratama, S.T',
    brideNick: 'Rina',
    groomNick: 'Andi',
    eventTitle: 'The Wedding of Andi & Rina',
    eventDate: '2026-10-18',
    eventTime: '08:00 - 11:00 WIB',
    receptionTime: '13:00 - 17:00 WIB',
    locationName: 'Grand Ballroom Hotel Mulia Senayan',
    locationAddress: 'Jl. Asia Afrika No. 6, Gelora, Tanah Abang, Jakarta Pusat',
    mapsUrl: 'https://maps.google.com/?q=Hotel+Mulia+Senayan',
    dressCode: 'Batik Modern / Earth Tone & Gold',
    hashtag: '#AndiRinaForever',
    quote: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri...',
    bankAccounts: [
      { bankName: 'BCA (Bank Central Asia)', accountNumber: '8830192841', accountHolder: 'Rina Marlina' }
    ]
  };

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState({ days: 24, hours: 14, minutes: 36, seconds: 48 });

  useEffect(() => {
    const targetDate = new Date(inv.eventDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [inv.eventDate]);

  const handleOpenInvitation = () => {
    setIsOpenCover(true);
    // Play romantic synthesizer tones
    audioPlayer.playTrack(inv.slug);
  };

  const handleToggleAudio = () => {
    if (isAudioMuted) {
      audioPlayer.setVolume(0.25);
      setIsAudioMuted(false);
    } else {
      audioPlayer.setVolume(0);
      setIsAudioMuted(true);
    }
  };

  const handleCopyAccount = (accNum: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedBank(accNum);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleCopyShareLink = () => {
    const currentUrl = `${window.location.origin}?invitation=${inv.slug}${guestNameParam ? `&to=${encodeURIComponent(guestNameParam)}` : ''}`;
    navigator.clipboard.writeText(currentUrl);
    setCopiedShareUrl(true);
    setTimeout(() => setCopiedShareUrl(false), 2000);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    addRsvpToInvitation(inv.slug, {
      name: rsvpName,
      attendance: rsvpAttendance,
      guestCount: Number(rsvpGuestCount),
      message: rsvpMessage
    });
    setRsvpSubmitted(true);
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishText.trim()) return;
    addWishToInvitation(inv.slug, {
      name: wishName,
      message: wishText,
      attendance: 'hadir'
    });
    setWishText('');
    setWishSuccess(true);
    setTimeout(() => setWishSuccess(false), 3000);
  };

  const displayGuestName = guestNameParam || 'Tamu Undangan Terhormat';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#24211E] font-sans relative selection:bg-[#E2D2B0]">
      
      {/* Back to Platform bar for previewers */}
      <div className="fixed top-3 left-3 z-50">
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium shadow hover:bg-black transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke RuangMomen</span>
        </button>
      </div>

      {/* Floating Audio Control (when cover is opened) */}
      {isOpenCover && (
        <button
          onClick={handleToggleAudio}
          className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-[#D5CABE] text-[#1C1A18] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title={isAudioMuted ? 'Nyalakan Musik' : 'Matikan Musik'}
        >
          {isAudioMuted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5 text-[#9C753B] animate-pulse" />}
        </button>
      )}

      {/* FULLSCREEN COVER ENVELOPE (Shown prior to clicking "Buka Undangan") */}
      {!isOpenCover && (
        <div className="fixed inset-0 z-40 bg-[#1C1917] text-white flex flex-col items-center justify-between p-6 sm:p-12 text-center animate-in fade-in duration-500 overflow-hidden">
          
          {/* Background romantic photo with overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80" 
              alt="cover"
              className="w-full h-full object-cover opacity-35 scale-105 filter blur-xs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-black/40 to-[#141210]" />
          </div>

          {/* Top Title */}
          <div className="relative z-10 pt-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] tracking-widest uppercase text-[#EAD5BA]">
              <Sparkles className="w-3 h-3 text-[#EAD5BA]" />
              <span>THE WEDDING INVITATION</span>
            </div>
          </div>

          {/* Center Couple Names */}
          <div className="relative z-10 space-y-4 max-w-xl mx-auto my-auto">
            <span className="font-serif italic text-base sm:text-lg text-[#EAD5BA] block">
              Pernikahan dari
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              {inv.groomNick} & {inv.brideNick}
            </h1>
            <p className="text-xs sm:text-sm tracking-widest uppercase text-[#C5B8A8]">
              {inv.eventDate}
            </p>
          </div>

          {/* Guest Name & Open Invitation Button */}
          <div className="relative z-10 pb-8 space-y-5 max-w-sm w-full mx-auto">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-1">
              <span className="text-[10px] tracking-wider uppercase text-[#C8BFB3] block">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                {displayGuestName}
              </h2>
              <span className="text-[10px] text-[#A69E93] italic block">
                *Mohon maaf jika ada kesalahan penulisan nama/gelar
              </span>
            </div>

            <button
              onClick={handleOpenInvitation}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#E9D7B7] to-[#C5A880] text-[#181716] font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/40"
            >
              <Heart className="w-4 h-4 fill-current text-rose-700" />
              <span>Buka Undangan</span>
            </button>
          </div>

        </div>
      )}

      {/* INVITATION CONTENT (Scrollable, mobile-optimized container) */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-24">
        
        {/* HERO SECTION */}
        <section className="text-center pt-8 space-y-5 animate-in fade-in duration-700">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#9C753B]">
            THE WEDDING OF
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1A18] tracking-tight">
            {inv.groomNick} & {inv.brideNick}
          </h1>
          <p className="text-xs sm:text-sm text-[#736B61] tracking-wider uppercase">
            Minggu, 18 Oktober 2026 • Jakarta
          </p>

          <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white my-6">
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80" 
              alt="Mempelai" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-xs font-serif italic">
              {inv.hashtag}
            </div>
          </div>

          {/* Quote / Ayat Suci */}
          <div className="p-6 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs max-w-lg mx-auto text-center space-y-3">
            <p className="text-xs sm:text-sm text-[#554E46] italic leading-relaxed font-serif">
              “{inv.quote}”
            </p>
            <span className="text-[11px] font-bold text-[#9C753B] uppercase tracking-wider block">
              QS. Ar-Rum: 21
            </span>
          </div>
        </section>

        {/* MEMPELAI PROFILE SECTION */}
        <section className="text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
              PASANGAN MEMPELAI
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1C1A18]">
              Maha Suci Allah yang Menyatukan Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            
            {/* Mempelai Pria */}
            <div className="p-6 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs space-y-4">
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto border-2 border-[#C5A880] p-1">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
                  alt={inv.groomName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1C1A18]">
                  {inv.groomName}
                </h3>
                <p className="text-xs text-[#7A7266] mt-1">
                  Putra tercinta dari Bpk. Ir. Pratama & Ibu Nuraini
                </p>
                <span className="inline-block mt-2 text-xs font-semibold text-[#9C753B]">
                  {inv.instagramTag?.split('&')[0] || '@andipratama'}
                </span>
              </div>
            </div>

            {/* Mempelai Wanita */}
            <div className="p-6 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs space-y-4">
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto border-2 border-[#C5A880] p-1">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                  alt={inv.brideName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1C1A18]">
                  {inv.brideName}
                </h3>
                <p className="text-xs text-[#7A7266] mt-1">
                  Putri tercinta dari Bpk. H. Sukardi & Ibu Siti Aminah
                </p>
                <span className="inline-block mt-2 text-xs font-semibold text-[#9C753B]">
                  {inv.instagramTag?.split('&')[1] || '@rinamarlina'}
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* COUNTDOWN SECTION */}
        <section className="text-center space-y-6 p-8 rounded-3xl bg-gradient-to-b from-[#1C1A18] to-[#2B2724] text-white shadow-xl border border-[#3C3834]">
          <span className="text-xs uppercase tracking-widest text-[#E6D4BA]">
            MENGHITUNG HARI
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Menuju Hari Bahagia
          </h2>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#E6D4BA] block">
                {timeLeft.days}
              </span>
              <span className="text-[10px] text-[#DDD] uppercase tracking-wider">Hari</span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#E6D4BA] block">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] text-[#DDD] uppercase tracking-wider">Jam</span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#E6D4BA] block">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] text-[#DDD] uppercase tracking-wider">Menit</span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#E6D4BA] block">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] text-[#DDD] uppercase tracking-wider">Detik</span>
            </div>
          </div>
        </section>

        {/* RUNDOWN & LOKASI ACARA */}
        <section className="space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
              WAKTU & TEMPAT
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1C1A18]">
              Agenda Acara
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {/* Akad */}
            <div className="p-6 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] text-[#9C753B] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1A18]">Akad Nikah</h3>
              <div className="text-xs text-[#666] space-y-1">
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#9C753B]" />
                  <span>Minggu, 18 Oktober 2026</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#9C753B]" />
                  <span>{inv.eventTime}</span>
                </p>
              </div>
              <p className="text-xs text-[#555] pt-2 border-t border-[#F0EAE0]">
                {inv.locationName}
              </p>
            </div>

            {/* Resepsi */}
            <div className="p-6 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] text-[#9C753B] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1A18]">Resepsi Pernikahan</h3>
              <div className="text-xs text-[#666] space-y-1">
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#9C753B]" />
                  <span>Minggu, 18 Oktober 2026</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#9C753B]" />
                  <span>{inv.receptionTime || '13:00 - 17:00 WIB'}</span>
                </p>
              </div>
              <p className="text-xs text-[#555] pt-2 border-t border-[#F0EAE0]">
                {inv.locationName}
              </p>
            </div>
          </div>

          {/* Location Map Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs space-y-4">
            <MapPin className="w-8 h-8 text-[#9C753B] mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#1C1A18]">
              {inv.locationName}
            </h3>
            <p className="text-xs text-[#666] max-w-md mx-auto">
              {inv.locationAddress}
            </p>
            {inv.dressCode && (
              <p className="text-xs font-semibold text-[#9C753B]">
                Dress Code: {inv.dressCode}
              </p>
            )}

            <div className="pt-2">
              <a
                href={inv.mapsUrl || 'https://maps.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1C1A18] text-white text-xs font-semibold hover:bg-[#332F2A] transition-all shadow"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E6D4BA]" />
                <span>Buka Petunjuk Arah di Google Maps</span>
              </a>
            </div>
          </div>
        </section>

        {/* LOVE STORY TIMELINE */}
        {inv.loveStories && inv.loveStories.length > 0 && (
          <section className="space-y-8 text-center">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
                KISAH CINTA
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1C1A18]">
                Cerita Perjalanan Kami
              </h2>
            </div>

            <div className="space-y-6 text-left max-w-lg mx-auto">
              {inv.loveStories.map((story, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#C5A880] text-[#9C753B] font-bold text-xs flex items-center justify-center shrink-0">
                    {story.year}
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#E9E1D2] flex-1 space-y-1">
                    <h4 className="font-serif font-bold text-sm text-[#1C1A18]">{story.title}</h4>
                    <p className="text-xs text-[#666] leading-relaxed">{story.story}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GALERI FOTO */}
        <section className="space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
              GALERI MOMEN
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1C1A18]">
              Potret Kebahagiaan
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80'
            ].map((imgUrl, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all">
                <img src={imgUrl} alt="galeri" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </section>

        {/* RSVP FORM INTERAKTIF */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
              KONFIRMASI KEHADIRAN
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1C1A18]">
              Formulir RSVP Tamu
            </h2>
            <p className="text-xs text-[#777]">
              Kehadiran Anda merupakan kehormatan dan kebahagiaan bagi kami.
            </p>
          </div>

          {rsvpSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <Check className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-bold text-base text-emerald-900">
                Terima Kasih atas Konfirmasi Anda!
              </h4>
              <p className="text-xs text-emerald-700">
                Data kehadiran telah berhasil disimpan. Sampai jumpa di hari bahagia kami!
              </p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">Nama Lengkap</label>
                <input
                  type="text"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">Konfirmasi Kehadiran</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRsvpAttendance('hadir')}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      rsvpAttendance === 'hadir'
                        ? 'bg-[#1C1A18] text-white shadow-xs'
                        : 'border border-[#DDD] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    Ya, Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpAttendance('tidak_hadir')}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      rsvpAttendance === 'tidak_hadir'
                        ? 'bg-[#1C1A18] text-white shadow-xs'
                        : 'border border-[#DDD] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    Maaf, Berhalangan
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpAttendance('ragu')}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      rsvpAttendance === 'ragu'
                        ? 'bg-[#1C1A18] text-white shadow-xs'
                        : 'border border-[#DDD] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    Masih Ragu
                  </button>
                </div>
              </div>

              {rsvpAttendance === 'hadir' && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#333]">Jumlah Tamu yang Hadir</label>
                  <select
                    value={rsvpGuestCount}
                    onChange={(e) => setRsvpGuestCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#333]">Pesan Singkat (Opsional)</label>
                <textarea
                  rows={2}
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value)}
                  placeholder="Tuliskan ucapan atau doa..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CABE] text-xs focus:outline-none focus:border-[#9C753B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1C1A18] text-white text-xs font-semibold hover:bg-[#332F2A] transition-all cursor-pointer"
              >
                Kirim Konfirmasi Kehadiran
              </button>
            </form>
          )}
        </section>

        {/* BUKU TAMU & UCAPAN DOA (Interactive Feed) */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
              BUKU TAMU & DOA
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1C1A18]">
              Untaian Doa & Harapan
            </h2>
          </div>

          {/* Form Kirim Doa */}
          <form onSubmit={handleWishSubmit} className="p-6 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs space-y-3">
            <input
              type="text"
              placeholder="Nama Anda"
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#D5CABE] text-xs"
              required
            />
            <textarea
              rows={3}
              placeholder="Tuliskan doa restu dan ucapan selamat untuk kedua mempelai..."
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#D5CABE] text-xs"
              required
            />
            <div className="flex items-center justify-between">
              {wishSuccess && (
                <span className="text-xs text-emerald-600 font-semibold">
                  Doa Anda berhasil terkirim!
                </span>
              )}
              <button
                type="submit"
                className="ml-auto px-5 py-2 rounded-xl bg-[#9C753B] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-[#856330]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Doa</span>
              </button>
            </div>
          </form>

          {/* Feed Ucapan Tamu */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {(inv.guestWishes && inv.guestWishes.length > 0 ? inv.guestWishes : [
              {
                id: '1',
                name: 'Budi Santoso & Keluarga',
                message: 'Selamat berbahagia untuk kedua mempelai! Semoga sakinah mawaddah warahmah hingga akhir hayat.',
                timestamp: '2 jam yang lalu',
                attendance: 'hadir' as const
              },
              {
                id: '2',
                name: 'drg. Maya Indah',
                message: 'Barakallah Andi & Rina! Senang sekali melihat kalian berdua bersanding di pelaminan.',
                timestamp: '4 jam yang lalu',
                attendance: 'hadir' as const
              }
            ]).map((w) => (
              <div key={w.id} className="p-4 rounded-2xl bg-white border border-[#EDE5D8] shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1C1A18]">{w.name}</span>
                  <span className="text-[10px] text-[#888]">{w.timestamp}</span>
                </div>
                <p className="text-xs text-[#554E46] leading-relaxed">{w.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WEDDING GIFT / AMPLOP DIGITAL */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#FAF5EE] border border-[#E8DFD1] text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
              WEDDING GIFT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A18]">
              Tanda Kasih & Amplop Digital
            </h2>
            <p className="text-xs text-[#666] max-w-md mx-auto">
              Doa restu Anda adalah karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih secara digital, silakan transfer ke rekening berikut:
            </p>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            {(inv.bankAccounts && inv.bankAccounts.length > 0 ? inv.bankAccounts : [
              { bankName: 'BCA (Bank Central Asia)', accountNumber: '8830192841', accountHolder: 'Rina Marlina' }
            ]).map((bank, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-[#E2D6C4] shadow-xs space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#9C753B]">{bank.bankName}</span>
                  <button
                    onClick={() => handleCopyAccount(bank.accountNumber)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[#1C1A18] hover:text-[#9C753B] cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedBank === bank.accountNumber ? 'Tersalin!' : 'Salin Rekening'}</span>
                  </button>
                </div>
                <div>
                  <span className="font-mono text-base font-bold text-[#1C1A18] block tracking-wide">
                    {bank.accountNumber}
                  </span>
                  <span className="text-xs text-[#777]">a.n. {bank.accountHolder}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SHARE & QR CODE SECTION */}
        <section className="text-center pt-4 space-y-4 border-t border-[#EDE5D8]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9C753B] block">
            BAGIKAN UNDANGAN
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyShareLink}
              className="px-4 py-2 rounded-xl bg-white border border-[#D5CABE] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#FAF6F0] cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedShareUrl ? 'Tautan Tersalin!' : 'Salin Tautan'}</span>
            </button>
            <button
              onClick={() => setShowQrModal(true)}
              className="px-4 py-2 rounded-xl bg-[#1C1A18] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#332F2A] cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Code Undangan</span>
            </button>
          </div>
        </section>

      </main>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-white rounded-3xl p-6 text-center space-y-4 shadow-2xl border border-[#E9E1D2]">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9C753B]">
                QR Code Tamu
              </span>
              <button onClick={() => setShowQrModal(false)} className="p-1 text-[#888] hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD1] inline-block">
              {/* Fallback QR representation */}
              <div className="w-44 h-44 bg-white p-2 rounded-xl border border-[#DDD] flex flex-col items-center justify-center text-center space-y-2">
                <QrCode className="w-28 h-28 text-[#1C1A18]" />
                <span className="text-[10px] font-mono text-[#888] truncate max-w-[150px]">
                  {inv.slug}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#666]">
              Tunjukkan QR Code ini kepada petugas penerima tamu di lokasi resepsi.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default InvitationLiveView;
