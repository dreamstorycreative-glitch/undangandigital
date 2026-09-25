export type EventType = 
  | 'Wedding'
  | 'Engagement'
  | 'Birthday'
  | 'Aqiqah'
  | 'Khitanan'
  | 'Graduation'
  | 'Anniversary'
  | 'Gathering'
  | 'Corporate'
  | 'Event'
  | 'Islami'
  | 'Lainnya';

export type ThemeStyle = 
  | 'Elegant'
  | 'Minimalist'
  | 'Luxury'
  | 'Floral'
  | 'Romantic'
  | 'Classic'
  | 'Modern'
  | 'Islamic'
  | 'Rustic';

export type ThemeColor = 
  | 'White'
  | 'Beige'
  | 'Black'
  | 'Gold'
  | 'Green'
  | 'Blue'
  | 'Pink'
  | 'Brown';

export type PackageTier = 'Basic' | 'Premium' | 'Exclusive';

export type OrderStatus = 
  | 'Menunggu Pembayaran'
  | 'Pembayaran Dikonfirmasi'
  | 'Menunggu Data'
  | 'Sedang Diproses'
  | 'Revisi'
  | 'Siap Dipublikasikan'
  | 'Selesai'
  | 'Dibatalkan';

export type UserRole = 'customer' | 'admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  role: UserRole;
  createdAt: string;
  status: 'active' | 'suspended';
}

export interface Theme {
  id: string;
  name: string;
  slug: string;
  eventType: EventType;
  style: ThemeStyle;
  color: ThemeColor;
  price: number;
  isBestseller: boolean;
  thumbnail: string;
  previewImages: string[];
  description: string;
  features: string[];
  previewUrl?: string;
  recommendedMusicId?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  category: 'Romantic' | 'Acoustic' | 'Piano' | 'Instrumental' | 'Islamic' | 'Classical' | 'Modern';
  duration: string;
  coverUrl: string;
  melodyNotes?: number[]; // Frequencies for realistic Web Audio preview
  audioUrl?: string;
  isPublished: boolean;
}

export interface PackageInfo {
  id: PackageTier;
  name: string;
  price: number;
  badge?: string;
  popular?: boolean;
  features: string[];
  cta: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  customerName: string;
  eventType: EventType;
  themeName: string;
  year: string;
  imageUrl: string;
  slug: string;
  date: string;
}

export interface ShopProduct {
  id: string;
  title: string;
  category: 'Template' | 'Musik' | 'Video Opening' | 'Preset' | 'Font' | 'Digital Product' | 'Add-on' | 'Custom Design';
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  badge?: string;
  description: string;
  isBestseller?: boolean;
}

export interface OrderItem {
  orderId: string;
  customerId: string;
  customerName: string;
  customerWhatsapp: string;
  customerEmail: string;
  eventType: EventType;
  packageTier: PackageTier;
  themeId: string;
  themeName: string;
  musicId: string;
  musicName: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  invitationData: InvitationData;
}

export interface InvitationData {
  slug: string;
  brideName: string;
  groomName: string;
  brideNick: string;
  groomNick: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  locationName: string;
  locationAddress: string;
  mapsUrl: string;
  dressCode?: string;
  instagramTag?: string;
  hashtag?: string;
  quote?: string;
  loveStories?: {
    year: string;
    title: string;
    story: string;
  }[];
  galleryImages?: string[];
  videoUrl?: string;
  bankAccounts?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  }[];
  qrisImageUrl?: string;
  giftAddress?: string;
  receptionTime?: string;
  receptionLocation?: string;
  liveStreamingUrl?: string;
  rsvpList?: RsvpEntry[];
  guestWishes?: GuestWish[];
}

export interface RsvpEntry {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guestCount: number;
  timestamp: string;
  message?: string;
}

export interface GuestWish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  attendance: 'hadir' | 'tidak_hadir';
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  details: string;
  ipAddress?: string;
}
