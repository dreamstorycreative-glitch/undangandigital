import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Theme, 
  MusicTrack, 
  PackageInfo, 
  PortfolioItem, 
  ShopProduct, 
  OrderItem, 
  User, 
  ActivityLog, 
  OrderStatus,
  PackageTier,
  EventType,
  RsvpEntry,
  GuestWish
} from '../types';
import { 
  INITIAL_PACKAGES, 
  INITIAL_THEMES, 
  INITIAL_MUSIC, 
  INITIAL_PORTFOLIO, 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_USERS, 
  INITIAL_ACTIVITY_LOGS 
} from '../data/mockData';
import { audioPlayer } from '../utils/audioPlayer';

interface AppContextType {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  invitationSlugParam: string | null;
  guestNameParam: string | null;
  openInvitation: (slug: string, guestName?: string) => void;
  
  // Auth
  currentUser: User | null;
  loginAsCustomer: (email: string) => boolean;
  loginAsAdmin: (email: string, password?: string) => boolean;
  logout: () => void;
  registerCustomer: (name: string, email: string, whatsapp: string) => User;

  // Data Collections
  packages: PackageInfo[];
  themes: Theme[];
  musicTracks: MusicTrack[];
  portfolio: PortfolioItem[];
  shopProducts: ShopProduct[];
  orders: OrderItem[];
  users: User[];
  activityLogs: ActivityLog[];

  // Music Player
  activeTrack: MusicTrack | null;
  isPlayingMusic: boolean;
  playMusic: (track: MusicTrack) => void;
  pauseMusic: () => void;
  toggleMusic: (track?: MusicTrack) => void;
  musicVolume: number;
  setMusicVolume: (val: number) => void;

  // Order Wizard Pre-selection
  selectedPackageForOrder: PackageTier;
  setSelectedPackageForOrder: (pkg: PackageTier) => void;
  selectedThemeForOrder: string;
  setSelectedThemeForOrder: (themeId: string) => void;
  selectedMusicForOrder: string;
  setSelectedMusicForOrder: (musicId: string) => void;
  selectedEventTypeForOrder: EventType;
  setSelectedEventTypeForOrder: (evt: EventType) => void;

  // Order Operations
  createOrder: (orderData: Partial<OrderItem>) => OrderItem;
  updateOrderStatus: (orderId: string, status: OrderStatus, adminNotes?: string) => void;
  getWhatsAppPaymentUrl: (order: OrderItem) => string;
  getWhatsAppCustomerHelpUrl: (order?: OrderItem) => string;

  // Invitation Live Operations
  getInvitationBySlug: (slug: string) => OrderItem | undefined;
  addRsvpToInvitation: (slug: string, rsvp: Omit<RsvpEntry, 'id' | 'timestamp'>) => void;
  addWishToInvitation: (slug: string, wish: Omit<GuestWish, 'id' | 'timestamp'>) => void;

  // Admin Data Management
  addTheme: (newTheme: Omit<Theme, 'id'>) => void;
  updateTheme: (id: string, updated: Partial<Theme>) => void;
  deleteTheme: (id: string) => void;
  addMusicTrack: (newMusic: Omit<MusicTrack, 'id'>) => void;
  deleteMusicTrack: (id: string) => void;
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  deletePortfolioItem: (id: string) => void;
  updateCustomerStatus: (userId: string, status: 'active' | 'suspended') => void;
  logAdminActivity: (action: string, details: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeTab, setActiveTabState] = useState<string>(() => {
    // Check if URL has query parameters or hash
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || window.location.pathname.startsWith('/admin')) {
      return 'admin_login';
    }
    const slug = params.get('invitation');
    if (slug) return 'invitation_view';
    return 'home';
  });

  const [invitationSlugParam, setInvitationSlugParam] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('invitation') || 'andi-rina';
  });

  const [guestNameParam, setGuestNameParam] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('to') || null;
  });

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('ruangmomen_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Data Collections
  const [packages] = useState<PackageInfo[]>(INITIAL_PACKAGES);
  const [themes, setThemes] = useState<Theme[]>(() => {
    try {
      const saved = localStorage.getItem('ruangmomen_themes');
      return saved ? JSON.parse(saved) : INITIAL_THEMES;
    } catch {
      return INITIAL_THEMES;
    }
  });

  const [musicTracks, setMusicTracks] = useState<MusicTrack[]>(() => {
    try {
      const saved = localStorage.getItem('ruangmomen_music');
      return saved ? JSON.parse(saved) : INITIAL_MUSIC;
    } catch {
      return INITIAL_MUSIC;
    }
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('ruangmomen_portfolio');
      return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
    } catch {
      return INITIAL_PORTFOLIO;
    }
  });

  const [shopProducts] = useState<ShopProduct[]>(INITIAL_PRODUCTS);

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('ruangmomen_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);

  // Music Player State
  const [activeTrack, setActiveTrack] = useState<MusicTrack | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [musicVolume, setMusicVolumeState] = useState<number>(0.25);

  // Order Wizard Pre-selection
  const [selectedPackageForOrder, setSelectedPackageForOrder] = useState<PackageTier>('Premium');
  const [selectedThemeForOrder, setSelectedThemeForOrder] = useState<string>('thm-1');
  const [selectedMusicForOrder, setSelectedMusicForOrder] = useState<string>('mus-1');
  const [selectedEventTypeForOrder, setSelectedEventTypeForOrder] = useState<EventType>('Wedding');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ruangmomen_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ruangmomen_themes', JSON.stringify(themes));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [themes]);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openInvitation = (slug: string, guestName?: string) => {
    setInvitationSlugParam(slug);
    if (guestName) {
      setGuestNameParam(guestName);
    }
    setActiveTabState('invitation_view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Methods
  const loginAsCustomer = (email: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found && (found.role === 'customer' || found.role === 'super_admin')) {
      setCurrentUser(found);
      localStorage.setItem('ruangmomen_user', JSON.stringify(found));
      return true;
    }
    // Auto-create guest customer if not found
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      whatsapp: '081200000000',
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('ruangmomen_user', JSON.stringify(newUser));
    return true;
  };

  const loginAsAdmin = (email: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found && (found.role === 'admin' || found.role === 'super_admin')) {
      setCurrentUser(found);
      localStorage.setItem('ruangmomen_user', JSON.stringify(found));
      logAdminActivity('Login Admin', `${found.name} login ke admin panel.`);
      return true;
    }
    // Default fallback admin check
    if (email === 'admin@ruangmomen.com' || email === 'superadmin@ruangmomen.com') {
      const isSuper = email.includes('super');
      const adminUser: User = {
        id: isSuper ? 'super-1' : 'admin-1',
        name: isSuper ? 'Super Admin RuangMomen' : 'Admin RuangMomen',
        email,
        whatsapp: '082211447129',
        role: isSuper ? 'super_admin' : 'admin',
        createdAt: '2026-01-01',
        status: 'active'
      };
      setCurrentUser(adminUser);
      localStorage.setItem('ruangmomen_user', JSON.stringify(adminUser));
      logAdminActivity('Login Admin', `${adminUser.name} login ke admin panel.`);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentUser?.role === 'admin' || currentUser?.role === 'super_admin') {
      logAdminActivity('Logout Admin', `${currentUser.name} keluar dari admin panel.`);
    }
    setCurrentUser(null);
    localStorage.removeItem('ruangmomen_user');
    audioPlayer.stop();
    setIsPlayingMusic(false);
  };

  const registerCustomer = (name: string, email: string, whatsapp: string): User => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      whatsapp,
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('ruangmomen_user', JSON.stringify(newUser));
    return newUser;
  };

  // Music Player Methods
  const playMusic = (track: MusicTrack) => {
    setActiveTrack(track);
    setIsPlayingMusic(true);
    audioPlayer.playTrack(track.id, track.melodyNotes);
  };

  const pauseMusic = () => {
    setIsPlayingMusic(false);
    audioPlayer.stop();
  };

  const toggleMusic = (track?: MusicTrack) => {
    const target = track || activeTrack || musicTracks[0];
    if (isPlayingMusic && (!track || track.id === activeTrack?.id)) {
      pauseMusic();
    } else {
      playMusic(target);
    }
  };

  const setMusicVolume = (val: number) => {
    setMusicVolumeState(val);
    audioPlayer.setVolume(val);
  };

  // Order Operations
  const generateOrderId = (): string => {
    const today = new Date();
    const yy = String(today.getFullYear()).slice(-2);
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const randomSeq = String(Math.floor(Math.random() * 9000) + 1000);
    return `RM-${yy}${mm}${dd}-${randomSeq}`;
  };

  const createOrder = (orderData: Partial<OrderItem>): OrderItem => {
    const orderId = generateOrderId();
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const newOrder: OrderItem = {
      orderId,
      customerId: currentUser?.id || `usr-${Date.now()}`,
      customerName: orderData.customerName || currentUser?.name || 'Customer RuangMomen',
      customerWhatsapp: orderData.customerWhatsapp || currentUser?.whatsapp || '082211447129',
      customerEmail: orderData.customerEmail || currentUser?.email || 'customer@example.com',
      eventType: orderData.eventType || selectedEventTypeForOrder || 'Wedding',
      packageTier: orderData.packageTier || selectedPackageForOrder || 'Premium',
      themeId: orderData.themeId || selectedThemeForOrder,
      themeName: orderData.themeName || themes.find(t => t.id === selectedThemeForOrder)?.name || 'Royal Ivory Serenity',
      musicId: orderData.musicId || selectedMusicForOrder,
      musicName: orderData.musicName || musicTracks.find(m => m.id === selectedMusicForOrder)?.title || 'A Thousand Years',
      totalPrice: orderData.totalPrice || 199000,
      status: 'Menunggu Pembayaran',
      createdAt: dateStr,
      updatedAt: dateStr,
      notes: orderData.notes || '',
      invitationData: orderData.invitationData || {
        slug: orderData.customerName ? orderData.customerName.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'undangan-saya',
        brideName: 'Mempelai Wanita',
        groomName: 'Mempelai Pria',
        brideNick: 'Wanita',
        groomNick: 'Pria',
        eventTitle: `The Wedding of ${orderData.customerName || 'Mempelai'}`,
        eventDate: '2026-11-20',
        eventTime: '09:00 WIB',
        locationName: 'Ballroom Hotel',
        locationAddress: 'Jl. Merdeka No. 10',
        mapsUrl: 'https://maps.google.com'
      }
    };

    setOrders(prev => [newOrder, ...prev]);

    // If user is logged in, ensure their customer record exists
    if (!currentUser) {
      const guestCust: User = {
        id: newOrder.customerId,
        name: newOrder.customerName,
        email: newOrder.customerEmail,
        whatsapp: newOrder.customerWhatsapp,
        role: 'customer',
        createdAt: now.toISOString().split('T')[0],
        status: 'active'
      };
      setUsers(prev => [...prev, guestCust]);
      setCurrentUser(guestCust);
      localStorage.setItem('ruangmomen_user', JSON.stringify(guestCust));
    }

    logAdminActivity('Order Baru Masuk', `Order ${orderId} dibuat oleh ${newOrder.customerName}.`);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, adminNotes?: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.orderId === orderId) {
        return {
          ...ord,
          status,
          updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          notes: adminNotes ? `${ord.notes || ''} | ${adminNotes}` : ord.notes
        };
      }
      return ord;
    }));

    logAdminActivity('Update Status Order', `Status order ${orderId} diubah menjadi "${status}".`);
  };

  const getWhatsAppPaymentUrl = (order: OrderItem): string => {
    const text = `Halo Admin RuangMomen 👋

Saya ingin melakukan pembayaran dan konfirmasi pesanan undangan digital.

Nomor Order: ${order.orderId}
Nama: ${order.customerName}
Jenis Acara: ${order.eventType}
Paket: ${order.packageTier}
Tema: ${order.themeName}
Musik: ${order.musicName}
Total: Rp${order.totalPrice.toLocaleString('id-ID')}

Mohon informasi pembayaran dan proses selanjutnya.

Terima kasih 🙏`;

    return `https://wa.me/6282211447129?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppCustomerHelpUrl = (order?: OrderItem): string => {
    if (order) {
      const text = `Halo Admin RuangMomen 👋

Saya ingin menanyakan status pesanan saya.

Nomor Order: ${order.orderId}
Nama: ${order.customerName}

Mohon dibantu. Terima kasih.`;
      return `https://wa.me/6282211447129?text=${encodeURIComponent(text)}`;
    }
    return `https://wa.me/6282211447129?text=${encodeURIComponent('Halo Admin RuangMomen 👋 Saya ingin membuat undangan digital.')}`;
  };

  const getInvitationBySlug = (slug: string): OrderItem | undefined => {
    return orders.find(o => o.invitationData?.slug === slug) || orders[0];
  };

  const addRsvpToInvitation = (slug: string, rsvp: Omit<RsvpEntry, 'id' | 'timestamp'>) => {
    const newEntry: RsvpEntry = {
      ...rsvp,
      id: `rsvp-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setOrders(prev => prev.map(ord => {
      if (ord.invitationData?.slug === slug) {
        const curRsvp = ord.invitationData.rsvpList || [];
        return {
          ...ord,
          invitationData: {
            ...ord.invitationData,
            rsvpList: [newEntry, ...curRsvp]
          }
        };
      }
      return ord;
    }));
  };

  const addWishToInvitation = (slug: string, wish: Omit<GuestWish, 'id' | 'timestamp'>) => {
    const newWish: GuestWish = {
      ...wish,
      id: `wsh-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setOrders(prev => prev.map(ord => {
      if (ord.invitationData?.slug === slug) {
        const curWishes = ord.invitationData.guestWishes || [];
        return {
          ...ord,
          invitationData: {
            ...ord.invitationData,
            guestWishes: [newWish, ...curWishes]
          }
        };
      }
      return ord;
    }));
  };

  // Admin Data Management
  const addTheme = (newTheme: Omit<Theme, 'id'>) => {
    const item: Theme = { ...newTheme, id: `thm-${Date.now()}` };
    setThemes(prev => [item, ...prev]);
    logAdminActivity('Tambah Tema', `Menambahkan tema "${item.name}".`);
  };

  const updateTheme = (id: string, updated: Partial<Theme>) => {
    setThemes(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
    logAdminActivity('Update Tema', `Memperbarui tema ID ${id}.`);
  };

  const deleteTheme = (id: string) => {
    setThemes(prev => prev.filter(t => t.id !== id));
    logAdminActivity('Hapus Tema', `Menghapus tema ID ${id}.`);
  };

  const addMusicTrack = (newMusic: Omit<MusicTrack, 'id'>) => {
    const track: MusicTrack = { ...newMusic, id: `mus-${Date.now()}` };
    setMusicTracks(prev => [track, ...prev]);
    logAdminActivity('Tambah Musik', `Menambahkan musik "${track.title}".`);
  };

  const deleteMusicTrack = (id: string) => {
    setMusicTracks(prev => prev.filter(m => m.id !== id));
    logAdminActivity('Hapus Musik', `Menghapus musik ID ${id}.`);
  };

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = { ...item, id: `port-${Date.now()}` };
    setPortfolio(prev => [newItem, ...prev]);
    logAdminActivity('Tambah Portfolio', `Menambahkan karya "${newItem.title}".`);
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
    logAdminActivity('Hapus Portfolio', `Menghapus karya ID ${id}.`);
  };

  const updateCustomerStatus = (userId: string, status: 'active' | 'suspended') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    logAdminActivity('Update Customer', `Status customer ID ${userId} diubah menjadi ${status}.`);
  };

  const logAdminActivity = (action: string, details: string) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      adminName: currentUser?.name || 'Sistem',
      action,
      details,
      ipAddress: '127.0.0.1'
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        invitationSlugParam,
        guestNameParam,
        openInvitation,
        currentUser,
        loginAsCustomer,
        loginAsAdmin,
        logout,
        registerCustomer,
        packages,
        themes,
        musicTracks,
        portfolio,
        shopProducts,
        orders,
        users,
        activityLogs,
        activeTrack,
        isPlayingMusic,
        playMusic,
        pauseMusic,
        toggleMusic,
        musicVolume,
        setMusicVolume,
        selectedPackageForOrder,
        setSelectedPackageForOrder,
        selectedThemeForOrder,
        setSelectedThemeForOrder,
        selectedMusicForOrder,
        setSelectedMusicForOrder,
        selectedEventTypeForOrder,
        setSelectedEventTypeForOrder,
        createOrder,
        updateOrderStatus,
        getWhatsAppPaymentUrl,
        getWhatsAppCustomerHelpUrl,
        getInvitationBySlug,
        addRsvpToInvitation,
        addWishToInvitation,
        addTheme,
        updateTheme,
        deleteTheme,
        addMusicTrack,
        deleteMusicTrack,
        addPortfolioItem,
        deletePortfolioItem,
        updateCustomerStatus,
        logAdminActivity
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
