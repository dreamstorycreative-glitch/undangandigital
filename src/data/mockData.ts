import { 
  Theme, 
  MusicTrack, 
  PackageInfo, 
  PortfolioItem, 
  ShopProduct, 
  OrderItem, 
  User, 
  ActivityLog 
} from '../types';

export const INITIAL_PACKAGES: PackageInfo[] = [
  {
    id: 'Basic',
    name: 'Basic',
    price: 99000,
    popular: false,
    description: 'Pilihan hemat untuk undangan digital ringkas dengan fitur esensial.',
    features: [
      'Pilihan Tema Standar',
      'Nama & Tanggal Acara',
      'Hitung Mundur (Countdown)',
      'Galeri Foto (Maks 5 Foto)',
      'Navigasi Google Maps',
      'Konfirmasi RSVP Tamu',
      'Background Musik Pilihan',
      'Direct Share ke WhatsApp',
      'Masa Aktif 6 Bulan'
    ],
    cta: 'Pilih Basic'
  },
  {
    id: 'Premium',
    name: 'Premium',
    price: 199000,
    popular: true,
    badge: 'PALING POPULER',
    description: 'Paket terfavorit dengan fitur lengkap, love story, dan amplop digital.',
    features: [
      'Semua Fitur Basic',
      'Kisah Cinta (Love Story)',
      'Wedding Gift & Amplop Digital',
      'Custom Background Musik',
      'Pilihan Custom Tema Warna',
      'Sematkan Video Prewedding',
      'Buku Tamu & Ucapan Doa',
      'Animasi Transisi Premium',
      'Custom Nama Tamu Otomatis',
      'Masa Aktif 1 Tahun'
    ],
    cta: 'Pilih Premium'
  },
  {
    id: 'Exclusive',
    name: 'Exclusive',
    price: 399000,
    popular: false,
    badge: 'EKSLUSIF & VIP',
    description: 'Untuk Anda yang menginginkan kesempurnaan penuh dengan custom domain dan video opening.',
    features: [
      'Semua Fitur Premium',
      'Custom Desain & Tata Letak',
      'Dukungan Custom Domain (.com/.id)',
      'Video Opening Interaktif',
      'Animasi Partikel Eksklusif',
      'Prioritas Pengerjaan 1x24 Jam',
      'Revisi Sepuasnya',
      'Dedicated Customer Support VIP',
      'Masa Aktif Selamanya'
    ],
    cta: 'Pilih Exclusive'
  }
];

export const INITIAL_THEMES: Theme[] = [
  {
    id: 'thm-1',
    name: 'Royal Ivory Serenity',
    slug: 'royal-ivory-serenity',
    eventType: 'Wedding',
    style: 'Luxury',
    color: 'Gold',
    price: 199000,
    isBestseller: true,
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Nuansa kemewahan kerajaan dengan aksen emas lembut, typography klasik yang megah, dan layout seremonial sempurna.',
    features: ['Emas Foil Elegan', 'Amplop Digital', 'Countdown Mewah', 'Galeri Carousel']
  },
  {
    id: 'thm-2',
    name: 'Botanical Eucalyptus',
    slug: 'botanical-eucalyptus',
    eventType: 'Wedding',
    style: 'Floral',
    color: 'Green',
    price: 149000,
    isBestseller: true,
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Sentuhan dedaunan sage green dan eucalyptus alami yang segar, cocok untuk pesta taman (garden party) dan nuansa outdoor.',
    features: ['Ilustrasi Floral Organik', 'Aksen Sage Green', 'Filter Foto Sejuk', 'RSVP WhatsApp']
  },
  {
    id: 'thm-3',
    name: 'Minimalist Charcoal Chic',
    slug: 'minimalist-charcoal-chic',
    eventType: 'Engagement',
    style: 'Minimalist',
    color: 'Black',
    price: 129000,
    isBestseller: false,
    thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Desain ultra-modern dengan ruang kosong lega, kontras charcoal dan off-white yang tajam, sangat kontemporer.',
    features: ['Monochrome Style', 'Typography Inter Modern', 'Fast Loading', 'Pilihan Dark Mode']
  },
  {
    id: 'thm-4',
    name: 'Blushing Rose & Beige',
    slug: 'blushing-rose-beige',
    eventType: 'Wedding',
    style: 'Romantic',
    color: 'Pink',
    price: 199000,
    isBestseller: true,
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Palet warna dusty rose lembut berpadu krem hangat menciptakan atmosfer yang sangat romantis dan menyentuh hati.',
    features: ['Kelopak Mawar Mengambang', 'Love Story Interaktif', 'Amplop QRIS', 'Video Player']
  },
  {
    id: 'thm-5',
    name: 'Nusantara Heritage Gold',
    slug: 'nusantara-heritage-gold',
    eventType: 'Wedding',
    style: 'Classic',
    color: 'Brown',
    price: 199000,
    isBestseller: false,
    thumbnail: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Sentuhan ornamen tradisional Indonesia dan motif ukiran luhur dengan balutan emas mewah yang sarat makna.',
    features: ['Motif Tradisional Nusantara', 'Kutipan Adat & Doa', 'Musik Gamelan/Instrumental', 'Rundown Lengkap']
  },
  {
    id: 'thm-6',
    name: 'Noor Islamic Sacred',
    slug: 'noor-islamic-sacred',
    eventType: 'Islami',
    style: 'Islamic',
    color: 'White',
    price: 149000,
    isBestseller: true,
    thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Desain Islami yang anggun, dilengkapi kaligrafi syar’i, doa pernikahan Ar-Rum 21, dan nuansa suci nan teduh.',
    features: ['Khat Kaligrafi Digital', 'Ayat Suci Interaktif', 'Buku Doa Tamu', 'Protokol Akad']
  },
  {
    id: 'thm-7',
    name: 'Rustic Warm Bohemian',
    slug: 'rustic-warm-bohemian',
    eventType: 'Wedding',
    style: 'Rustic',
    color: 'Beige',
    price: 149000,
    isBestseller: false,
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Kombinasi kayu hangat, pampas grass kering, dan cahaya senja keemasan. Memberikan kesan hangat dan akrab.',
    features: ['Tekstur Kertas Antik', 'Pampas Grass Ornaments', 'Spotify Track Ready', 'Photo Grid']
  },
  {
    id: 'thm-8',
    name: 'Little Prince & Princess Joy',
    slug: 'little-prince-princess-joy',
    eventType: 'Aqiqah',
    style: 'Modern',
    color: 'Blue',
    price: 99000,
    isBestseller: false,
    thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Didesain khusus untuk tasyakuran Aqiqah, Khitanan, dan Ulang Tahun anak tercinta dengan ilustrasi manis nan ceria.',
    features: ['Buku Doa Anak', 'Biodata Kelahiran Lengkap', 'Peta Lokasi Aqiqah', 'Gallery Bayi']
  }
];

export const INITIAL_MUSIC: MusicTrack[] = [
  {
    id: 'mus-1',
    title: 'A Thousand Years (Acoustic Piano)',
    artist: 'RuangMomen Acoustic Ensemble',
    category: 'Piano',
    duration: '03:45',
    coverUrl: 'https://images.unsplash.com/photo-1520523839898-507127053c37?auto=format&fit=crop&w=400&q=80',
    isPublished: true,
    melodyNotes: [261.63, 329.63, 392.00, 523.25, 392.00, 329.63]
  },
  {
    id: 'mus-2',
    title: 'Until I Found You (Romantic Strings)',
    artist: 'Golden Serenade Quartet',
    category: 'Romantic',
    duration: '02:58',
    coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=400&q=80',
    isPublished: true,
    melodyNotes: [293.66, 369.99, 440.00, 587.33, 440.00]
  },
  {
    id: 'mus-3',
    title: 'Canon in D (Cello & Piano)',
    artist: 'Johann Pachelbel Tribute',
    category: 'Classical',
    duration: '04:12',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
    isPublished: true,
    melodyNotes: [293.66, 220.00, 246.94, 185.00, 196.00, 146.83, 196.00, 220.00]
  },
  {
    id: 'mus-4',
    title: 'Baraka Allahu Lakuma (Instrumental Oud)',
    artist: 'Nur Syarif Chamber',
    category: 'Islamic',
    duration: '03:30',
    coverUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80',
    isPublished: true,
    melodyNotes: [261.63, 293.66, 311.13, 392.00, 349.23, 329.63]
  },
  {
    id: 'mus-5',
    title: 'Warm Sunlight (Soft Guitar)',
    artist: 'Nusantara Breeze',
    category: 'Acoustic',
    duration: '03:15',
    coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80',
    isPublished: true,
    melodyNotes: [329.63, 392.00, 493.88, 587.33, 493.88]
  },
  {
    id: 'mus-6',
    title: 'Endless Story (Modern Lo-fi Ambient)',
    artist: 'Chillout Wedding Collective',
    category: 'Modern',
    duration: '03:02',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
    isPublished: true,
    melodyNotes: [220.00, 261.63, 329.63, 392.00, 329.63]
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'The Wedding of Andi & Rina',
    customerName: 'Andi Pratama & Rina Marlina',
    eventType: 'Wedding',
    themeName: 'Royal Ivory Serenity',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    slug: 'andi-rina',
    date: '18 Oktober 2026'
  },
  {
    id: 'port-2',
    title: 'Engagement of Dimas & Clarissa',
    customerName: 'Dimas Wijaya & Clarissa Putri',
    eventType: 'Engagement',
    themeName: 'Botanical Eucalyptus',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    slug: 'dimas-clarissa',
    date: '25 November 2026'
  },
  {
    id: 'port-3',
    title: 'Sweet 17th of Amanda Jasmine',
    customerName: 'Amanda Jasmine',
    eventType: 'Birthday',
    themeName: 'Blushing Rose & Beige',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
    slug: 'amanda-17',
    date: '12 Desember 2026'
  },
  {
    id: 'port-4',
    title: 'Aqiqah Muhammad Rayyan Al-Fatih',
    customerName: 'Keluarga Bpk. Fajar & Ibu Fitri',
    eventType: 'Aqiqah',
    themeName: 'Little Prince & Princess Joy',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    slug: 'aqiqah-rayyan',
    date: '5 September 2026'
  },
  {
    id: 'port-5',
    title: 'Graduation of dr. Kevin Sanjaya',
    customerName: 'dr. Kevin Sanjaya, Sp.A',
    eventType: 'Graduation',
    themeName: 'Minimalist Charcoal Chic',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    slug: 'dr-kevin-graduation',
    date: '14 Agustus 2026'
  },
  {
    id: 'port-6',
    title: 'Silver Anniversary: Bpk. H. Suryo & Ibu Endang',
    customerName: 'H. Suryo & Hj. Endang',
    eventType: 'Anniversary',
    themeName: 'Nusantara Heritage Gold',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
    slug: 'suryo-endang-25th',
    date: '20 Juli 2026'
  }
];

export const INITIAL_PRODUCTS: ShopProduct[] = [
  {
    id: 'prod-1',
    title: 'Cinematic 3D Video Opening Motion',
    category: 'Video Opening',
    price: 150000,
    discountPrice: 99000,
    rating: 4.9,
    reviewsCount: 84,
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=600&q=80',
    badge: 'BESTSELLER',
    description: 'Video opening elegan berdurasi 15 detik dengan efek amplify amplop emas 3D sebelum undangan terbuka.',
    isBestseller: true
  },
  {
    id: 'prod-2',
    title: 'Custom Domain .COM (Aktif 1 Tahun)',
    category: 'Add-on',
    price: 175000,
    discountPrice: 135000,
    rating: 5.0,
    reviewsCount: 120,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    badge: 'POPULAR',
    description: 'Gunakan nama Anda sendiri (contoh: andirina.com) untuk undangan digital Anda agar lebih prestisius.',
    isBestseller: true
  },
  {
    id: 'prod-3',
    title: 'Preset Foto Prewedding Golden Hour Lightroom',
    category: 'Preset',
    price: 79000,
    discountPrice: 49000,
    rating: 4.8,
    reviewsCount: 65,
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    description: '10 Preset Lightroom selaras dengan tone warna RuangMomen untuk foto prewedding yang hangat dan magis.',
    isBestseller: false
  },
  {
    id: 'prod-4',
    title: 'VIP WhatsApp Guest Invitation Blast Generator',
    category: 'Digital Product',
    price: 120000,
    discountPrice: 85000,
    rating: 4.9,
    reviewsCount: 92,
    imageUrl: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=600&q=80',
    badge: 'HEMAT WAKTU',
    description: 'Aplikasi pembagi link WhatsApp otomatis untuk ratusan tamu dengan nama yang sudah terpersonalisasi.',
    isBestseller: true
  },
  {
    id: 'prod-5',
    title: 'Custom Monogram & Typography Wedding Logo',
    category: 'Custom Design',
    price: 250000,
    discountPrice: 199000,
    rating: 5.0,
    reviewsCount: 43,
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    description: 'Desain inisial nama pengantin eksklusif berformat vektor (SVG/PNG high res) untuk souvenir dan undangan.',
    isBestseller: false
  }
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    orderId: 'RM-260925-0001',
    customerId: 'usr-1',
    customerName: 'Rina Marlina',
    customerWhatsapp: '081234567890',
    customerEmail: 'rina@example.com',
    eventType: 'Wedding',
    packageTier: 'Premium',
    themeId: 'thm-1',
    themeName: 'Royal Ivory Serenity',
    musicId: 'mus-1',
    musicName: 'A Thousand Years (Acoustic Piano)',
    totalPrice: 199000,
    status: 'Siap Dipublikasikan',
    createdAt: '2026-09-24 10:30',
    updatedAt: '2026-09-24 16:45',
    notes: 'Tema emas soft, nama pengantin Andi & Rina.',
    invitationData: {
      slug: 'andi-rina',
      brideName: 'Rina Marlina, S.Kom',
      groomName: 'Andi Pratama, S.T',
      brideNick: 'Rina',
      groomNick: 'Andi',
      eventTitle: 'The Wedding of Andi & Rina',
      eventDate: '2026-10-18',
      eventTime: '08:00 - 11:00 WIB (Akad)',
      locationName: 'Grand Ballroom Hotel Mulia Senayan',
      locationAddress: 'Jl. Asia Afrika No. 6, Gelora, Tanah Abang, Jakarta Pusat',
      mapsUrl: 'https://maps.google.com/?q=Hotel+Mulia+Senayan',
      dressCode: 'Batik Modern / Nuansa Earth Tone & Gold',
      instagramTag: '@andipratama & @rinamarlina',
      hashtag: '#AndiRinaForever',
      quote: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
      loveStories: [
        {
          year: '2020',
          title: 'Pertemuan Pertama di Kampus',
          story: 'Kami pertama kali bertegur sapa di perpustakaan fakultas saat menyelesaikan proyek akhir bersama.'
        },
        {
          year: '2023',
          title: 'Komitmen Bersama',
          story: 'Setelah tiga tahun saling menguatkan di tengah karir, kami memutuskan melangkah ke jenjang yang lebih serius.'
        },
        {
          year: '2026',
          title: 'Menuju Hari Bahagia',
          story: 'Dengan restu kedua orang tua dan sanak keluarga, kami mengikat janji suci seumur hidup.'
        }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      bankAccounts: [
        {
          bankName: 'BCA (Bank Central Asia)',
          accountNumber: '8830192841',
          accountHolder: 'Rina Marlina'
        },
        {
          bankName: 'Bank Mandiri',
          accountNumber: '1370019283741',
          accountHolder: 'Andi Pratama'
        }
      ],
      giftAddress: 'Jl. Melati Raya No. 42, RT 03/RW 07, Kebayoran Baru, Jakarta Selatan 12150 (Penerima: Ibu Siti / 081234567890)',
      receptionTime: '13:00 - 17:00 WIB (Resepsi)',
      receptionLocation: 'Grand Ballroom Hotel Mulia Senayan',
      liveStreamingUrl: 'https://youtube.com/live',
      rsvpList: [
        {
          id: 'rsvp-1',
          name: 'Budi Santoso & Pasangan',
          attendance: 'hadir',
          guestCount: 2,
          timestamp: '2026-09-24 14:20',
          message: 'Selamat berbahagia Andi & Rina! Semoga samawa selalu hingga kakek nenek.'
        },
        {
          id: 'rsvp-2',
          name: 'drg. Maya Indah',
          attendance: 'hadir',
          guestCount: 1,
          timestamp: '2026-09-24 15:10',
          message: 'Alhamdulillah akhirnya tiba hari yang dinanti. Selamat ya sahabatku!'
        }
      ],
      guestWishes: [
        {
          id: 'wsh-1',
          name: 'Budi Santoso & Pasangan',
          message: 'Selamat berbahagia Andi & Rina! Semoga samawa selalu hingga kakek nenek.',
          timestamp: '2026-09-24 14:20',
          attendance: 'hadir'
        },
        {
          id: 'wsh-2',
          name: 'drg. Maya Indah',
          message: 'Alhamdulillah akhirnya tiba hari yang dinanti. Selamat ya sahabatku!',
          timestamp: '2026-09-24 15:10',
          attendance: 'hadir'
        },
        {
          id: 'wsh-3',
          name: 'Hendra Gunawan',
          message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair.',
          timestamp: '2026-09-24 16:05',
          attendance: 'hadir'
        }
      ]
    }
  },
  {
    orderId: 'RM-260925-0002',
    customerId: 'usr-2',
    customerName: 'Dimas Wijaya',
    customerWhatsapp: '085712349988',
    customerEmail: 'dimas@example.com',
    eventType: 'Engagement',
    packageTier: 'Basic',
    themeId: 'thm-2',
    themeName: 'Botanical Eucalyptus',
    musicId: 'mus-2',
    musicName: 'Until I Found You (Romantic Strings)',
    totalPrice: 99000,
    status: 'Sedang Diproses',
    createdAt: '2026-09-24 14:15',
    updatedAt: '2026-09-24 15:00',
    notes: 'Lamaran Dimas & Clarissa, lokasi Bandung.',
    invitationData: {
      slug: 'dimas-clarissa',
      brideName: 'Clarissa Putri',
      groomName: 'Dimas Wijaya',
      brideNick: 'Clarissa',
      groomNick: 'Dimas',
      eventTitle: 'The Engagement of Dimas & Clarissa',
      eventDate: '2026-11-25',
      eventTime: '10:00 - 14:00 WIB',
      locationName: 'Pine Hill Cibodas',
      locationAddress: 'Jl. Maribaya Timur, Lembang, Bandung Barat',
      mapsUrl: 'https://maps.google.com/?q=Pine+Hill+Cibodas',
      dressCode: 'Sage Green / Cream White'
    }
  },
  {
    orderId: 'RM-260925-0003',
    customerId: 'usr-3',
    customerName: 'Amanda Jasmine',
    customerWhatsapp: '081399887766',
    customerEmail: 'amanda@example.com',
    eventType: 'Birthday',
    packageTier: 'Basic',
    themeId: 'thm-4',
    themeName: 'Blushing Rose & Beige',
    musicId: 'mus-6',
    musicName: 'Endless Story (Modern Lo-fi Ambient)',
    totalPrice: 99000,
    status: 'Menunggu Pembayaran',
    createdAt: '2026-09-24 16:30',
    updatedAt: '2026-09-24 16:30',
    notes: 'Sweet 17th Birthday Party',
    invitationData: {
      slug: 'amanda-17',
      brideName: 'Amanda Jasmine',
      groomName: '',
      brideNick: 'Amanda',
      groomNick: '',
      eventTitle: 'Amanda Jasmine Sweet 17th Party',
      eventDate: '2026-12-12',
      eventTime: '18:30 - 21:30 WIB',
      locationName: 'Skye Bar & Lounge',
      locationAddress: 'BCA Tower Lt. 56, Jl. M.H. Thamrin, Jakarta Pusat',
      mapsUrl: 'https://maps.google.com/?q=Skye+Jakarta'
    }
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Rina Marlina',
    email: 'rina@example.com',
    whatsapp: '081234567890',
    role: 'customer',
    createdAt: '2026-09-20',
    status: 'active'
  },
  {
    id: 'usr-2',
    name: 'Dimas Wijaya',
    email: 'dimas@example.com',
    whatsapp: '085712349988',
    role: 'customer',
    createdAt: '2026-09-22',
    status: 'active'
  },
  {
    id: 'admin-1',
    name: 'Admin RuangMomen',
    email: 'admin@ruangmomen.com',
    whatsapp: '082211447129',
    role: 'admin',
    createdAt: '2026-01-01',
    status: 'active'
  },
  {
    id: 'super-1',
    name: 'Super Admin RuangMomen',
    email: 'superadmin@ruangmomen.com',
    whatsapp: '082211447129',
    role: 'super_admin',
    createdAt: '2026-01-01',
    status: 'active'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    timestamp: '2026-09-24 16:45',
    adminName: 'Admin RuangMomen',
    action: 'Update Status Order',
    details: 'Mengubah status order RM-260925-0001 menjadi Siap Dipublikasikan.'
  },
  {
    id: 'act-2',
    timestamp: '2026-09-24 15:00',
    adminName: 'Admin RuangMomen',
    action: 'Konfirmasi Pembayaran Manual',
    details: 'Pembayaran manual via WhatsApp dikonfirmasi untuk order RM-260925-0002.'
  },
  {
    id: 'act-3',
    timestamp: '2026-09-24 14:10',
    adminName: 'Super Admin RuangMomen',
    action: 'Tambah Tema Baru',
    details: 'Menambahkan tema "Royal Ivory Serenity" ke katalog publik.'
  },
  {
    id: 'act-4',
    timestamp: '2026-09-24 11:20',
    adminName: 'Admin RuangMomen',
    action: 'Login Admin',
    details: 'Login berhasil dari browser terverifikasi.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Rina Marlina & Andi Pratama',
    role: 'Mempelai Pengantin',
    event: 'The Wedding of Andi & Rina',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: 'Tamu-tamu kami sangat memuji desain undangannya yang super mewah dan musiknya yang syahdu! Fitur RSVP dan amplop digitalnya sangat membantu kami mengelola tamu dengan praktis.',
    rating: 5
  },
  {
    name: 'Dimas Wijaya & Clarissa',
    role: 'Pasangan Lamaran',
    event: 'The Engagement of Dimas & Clarissa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'Pengerjaannya kilat banget, admin WhatsApp sangat ramah dan responsif saat saya minta ubah font dan lagu. Hasilnya bener-bener berkelas dan gak pasaran.',
    rating: 5
  },
  {
    name: 'Amanda Jasmine',
    role: 'Penyelenggara Acara',
    event: 'Sweet 17th Birthday Celebration',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    content: 'Desainnya estetik parah! Pas dibagikan ke temen-temen sekolah pada nanya bikin di mana. Tombol maps-nya juga akurat banget ke lokasi acara.',
    rating: 5
  }
];

export const FAQS = [
  {
    question: 'Apa itu undangan digital RuangMomen?',
    answer: 'Undangan digital RuangMomen adalah website undangan interaktif modern dan berkelas yang dirancang khusus untuk membagikan momen istimewa Anda (pernikahan, lamaran, ulang tahun, aqiqah, dll) dengan mudah melalui tautan WhatsApp dan media sosial.'
  },
  {
    question: 'Berapa lama proses pengerjaan undangan?',
    answer: 'Proses pengerjaan normal memakan waktu 1x24 jam setelah data acara lengkap dan pembayaran manual terkonfirmasi. Untuk paket Exclusive, kami memprioritaskan pengerjaan kilat dalam hitungan jam.'
  },
  {
    question: 'Bagaimana cara melakukan pembayaran?',
    answer: 'Pembayaran dilakukan secara MANUAL langsung ke Admin RuangMomen via WhatsApp di nomor 082211447129. Setelah membuat pesanan di website, klik tombol WhatsApp untuk menerima rincian rekening transfer dan konfirmasi instan tanpa biaya platform tambahan.'
  },
  {
    question: 'Apakah bisa revisi jika ada kesalahan data acara?',
    answer: 'Tentu saja! Kami memberikan garansi revisi gratis sampai data acara, penulisan nama keluarga, jam, dan lokasi benar-benar sesuai dengan keinginan Anda.'
  },
  {
    question: 'Apakah bisa menggunakan nama tamu otomatis di tautan undangan?',
    answer: 'Bisa! RuangMomen memiliki fitur smart guest name parameter (?to=NamaTamu). Setiap tamu yang membuka link akan melihat nama mereka tertulis secara personal dan terhormat di halaman cover undangan.'
  },
  {
    question: 'Apakah bisa menggunakan musik dan foto sendiri?',
    answer: 'Bisa. Pada paket Premium dan Exclusive, Anda dapat mengunggah musik favorit Anda sendiri serta galeri foto berkualitas tinggi tanpa batas kompresi yang merusak resolusi.'
  },
  {
    question: 'Apakah tersedia fitur Amplop Digital & RSVP?',
    answer: 'Ya, seluruh paket kami dilengkapi dengan konfirmasi kehadiran (RSVP) real-time serta fitur Wedding Gift / Amplop Digital dengan tombol satu-klik untuk menyalin nomor rekening bank & QRIS.'
  },
  {
    question: 'Apakah bisa menggunakan Custom Domain sendiri (contoh: andirina.com)?',
    answer: 'Bisa! Layanan custom domain tersedia langsung pada paket Exclusive atau dapat dibeli sebagai add-on terpisah melalui halaman Shop RuangMomen.'
  }
];
