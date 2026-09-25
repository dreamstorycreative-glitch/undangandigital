import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  FileText, 
  Palette, 
  Music, 
  Image, 
  Layers, 
  Settings, 
  Activity, 
  LogOut, 
  Search, 
  Filter, 
  Check, 
  X, 
  MessageCircle, 
  ExternalLink, 
  Eye, 
  Plus, 
  Trash2, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Menu,
  ChevronRight,
  Shield,
  ShieldAlert
} from 'lucide-react';
import { OrderItem, OrderStatus, Theme, User } from '../../types';

export const AdminDashboardView: React.FC = () => {
  const { 
    currentUser, 
    logout, 
    orders, 
    updateOrderStatus, 
    themes, 
    addTheme, 
    deleteTheme,
    updateTheme,
    users, 
    updateCustomerStatus,
    activityLogs, 
    openInvitation,
    setActiveTab 
  } = useApp();

  // Active admin sidebar tab
  const [adminSection, setAdminSection] = useState<'dashboard' | 'orders' | 'themes' | 'invitations' | 'customers' | 'activity' | 'settings'>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Orders Filter & Search State
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrderModal, setSelectedOrderModal] = useState<OrderItem | null>(null);

  // New Theme Modal State
  const [showAddThemeModal, setShowAddThemeModal] = useState(false);
  const [newThemeData, setNewThemeData] = useState({
    name: '',
    slug: '',
    eventType: 'Wedding' as const,
    style: 'Luxury' as const,
    color: 'Gold' as const,
    price: 199000,
    isBestseller: true,
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    previewImages: ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'],
    description: 'Tema undangan eksklusif dengan aksen modern dan elegan.',
    features: ['Emas Foil Elegan', 'Amplop Digital', 'Countdown Mewah']
  });

  // Role Protection check
  if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'super_admin')) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1C1A18] border border-rose-900/50 p-8 rounded-3xl text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Access Denied</h2>
          <p className="text-xs text-[#888]">
            Anda tidak memiliki otorisasi untuk mengakses Admin Panel RuangMomen.
          </p>
          <button
            onClick={() => setActiveTab('admin_login')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#E9D7B7] text-[#141312] text-xs font-bold"
          >
            Halaman Login Admin
          </button>
        </div>
      </div>
    );
  }

  const isSuperAdmin = currentUser.role === 'super_admin';

  // Statistics Calculations
  const totalOrders = orders.length;
  const newOrders = orders.filter(o => o.status === 'Menunggu Pembayaran').length;
  const inProgress = orders.filter(o => o.status === 'Sedang Diproses' || o.status === 'Menunggu Data').length;
  const inRevision = orders.filter(o => o.status === 'Revisi').length;
  const completedOrders = orders.filter(o => o.status === 'Selesai' || o.status === 'Siap Dipublikasikan').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Dibatalkan' ? o.totalPrice : 0), 0);
  const totalCustomers = users.filter(u => u.role === 'customer').length;

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchSearch = o.orderId.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customerWhatsapp.includes(orderSearch);
      const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrderModal && selectedOrderModal.orderId === orderId) {
      setSelectedOrderModal({ ...selectedOrderModal, status: newStatus });
    }
  };

  const handleAddThemeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThemeData.name.trim()) return;
    addTheme({
      ...newThemeData,
      slug: newThemeData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
    });
    setShowAddThemeModal(false);
  };

  const handleWhatsAppCustomer = (order: OrderItem) => {
    const text = `Halo Kak ${order.customerName} 👋

Kami dari Tim RuangMomen ingin mengonfirmasi update pesanan undangan Anda (Order ID: ${order.orderId}).

Status Saat Ini: ${order.status}
Paket: ${order.packageTier}
Tema: ${order.themeName}

Ada yang bisa kami bantu atau diskusikan terkait desain undangan Anda? Terima kasih 🙏`;

    window.open(`https://wa.me/62${order.customerWhatsapp.replace(/^0/, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#11100F] text-[#DDD6CD] flex flex-col md:flex-row antialiased font-sans">
      
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex flex-col w-64 bg-[#181615] border-r border-[#2C2926] p-4 shrink-0 justify-between">
        <div className="space-y-6">
          
          {/* Admin Header */}
          <div className="flex items-center gap-2.5 px-2 py-3 border-b border-[#2C2926]">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C5A880] to-[#E9D7B7] text-[#111] flex items-center justify-center font-bold text-xs shadow">
              RM
            </div>
            <div>
              <span className="font-bold text-white text-sm block">RuangMomen</span>
              <span className="text-[10px] text-[#C5A880] font-semibold uppercase tracking-wider block">
                {isSuperAdmin ? '👑 Super Admin' : '🛡️ Admin Operasional'}
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#736B61] px-3 block mb-1">
              OVERVIEW
            </span>
            <button
              onClick={() => setAdminSection('dashboard')}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminSection === 'dashboard'
                  ? 'bg-[#292522] text-[#EAD5BA] shadow-xs'
                  : 'text-[#A39D94] hover:bg-[#201E1C] hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#C5A880]" />
              <span>Dashboard & Analytics</span>
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-[#736B61] px-3 block mt-5 mb-1">
              OPERASIONAL
            </span>
            <button
              onClick={() => setAdminSection('orders')}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminSection === 'orders'
                  ? 'bg-[#292522] text-[#EAD5BA] shadow-xs'
                  : 'text-[#A39D94] hover:bg-[#201E1C] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                <span>Semua Order</span>
              </div>
              {newOrders > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-bold">
                  {newOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminSection('invitations')}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminSection === 'invitations'
                  ? 'bg-[#292522] text-[#EAD5BA] shadow-xs'
                  : 'text-[#A39D94] hover:bg-[#201E1C] hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-[#C5A880]" />
              <span>Daftar Undangan</span>
            </button>

            <button
              onClick={() => setAdminSection('customers')}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminSection === 'customers'
                  ? 'bg-[#292522] text-[#EAD5BA] shadow-xs'
                  : 'text-[#A39D94] hover:bg-[#201E1C] hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-[#C5A880]" />
              <span>Customer</span>
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-[#736B61] px-3 block mt-5 mb-1">
              KONTEN & KATALOG
            </span>
            <button
              onClick={() => setAdminSection('themes')}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminSection === 'themes'
                  ? 'bg-[#292522] text-[#EAD5BA] shadow-xs'
                  : 'text-[#A39D94] hover:bg-[#201E1C] hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4 text-[#C5A880]" />
              <span>Kelola Tema</span>
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-[#736B61] px-3 block mt-5 mb-1">
              SISTEM
            </span>
            <button
              onClick={() => setAdminSection('activity')}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminSection === 'activity'
                  ? 'bg-[#292522] text-[#EAD5BA] shadow-xs'
                  : 'text-[#A39D94] hover:bg-[#201E1C] hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4 text-[#C5A880]" />
              <span>Activity Log</span>
            </button>

            <button
              onClick={() => setAdminSection('settings')}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminSection === 'settings'
                  ? 'bg-[#292522] text-[#EAD5BA] shadow-xs'
                  : 'text-[#A39D94] hover:bg-[#201E1C] hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 text-[#C5A880]" />
              <span>Pengaturan Admin</span>
            </button>
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="pt-4 border-t border-[#2C2926] space-y-2">
          <div className="px-3 py-2 rounded-xl bg-[#201E1C] border border-[#2D2A26] flex items-center justify-between">
            <div className="min-w-0">
              <span className="text-xs font-bold text-white block truncate">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-[#888] truncate block">
                {currentUser.email}
              </span>
            </div>
            <button
              onClick={() => {
                logout();
                setActiveTab('admin_login');
              }}
              className="p-1.5 rounded-lg text-[#888] hover:text-red-400 hover:bg-[#2D2422] transition-colors cursor-pointer"
              title="Logout Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#181615] border-b border-[#2C2926]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#C5A880] text-black font-bold text-xs flex items-center justify-center">
            RM
          </div>
          <span className="font-bold text-white text-sm">RuangMomen Admin</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-[#221F1C] text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-[#181615] p-4 border-b border-[#2C2926] space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button onClick={() => { setAdminSection('dashboard'); setMobileSidebarOpen(false); }} className="p-2 rounded-lg bg-[#221F1C] text-left">Dashboard</button>
            <button onClick={() => { setAdminSection('orders'); setMobileSidebarOpen(false); }} className="p-2 rounded-lg bg-[#221F1C] text-left">Order ({orders.length})</button>
            <button onClick={() => { setAdminSection('themes'); setMobileSidebarOpen(false); }} className="p-2 rounded-lg bg-[#221F1C] text-left">Tema</button>
            <button onClick={() => { setAdminSection('invitations'); setMobileSidebarOpen(false); }} className="p-2 rounded-lg bg-[#221F1C] text-left">Undangan</button>
            <button onClick={() => { setAdminSection('customers'); setMobileSidebarOpen(false); }} className="p-2 rounded-lg bg-[#221F1C] text-left">Customer</button>
            <button onClick={() => { setAdminSection('activity'); setMobileSidebarOpen(false); }} className="p-2 rounded-lg bg-[#221F1C] text-left">Activity</button>
          </div>
          <button
            onClick={() => { logout(); setActiveTab('admin_login'); }}
            className="w-full py-2 text-xs text-red-400 bg-red-950/30 rounded-lg text-center mt-2"
          >
            Logout Admin
          </button>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto space-y-8">
        
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#24211E]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A880]">
              CONTROL PANEL
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
              {adminSection === 'dashboard' && 'Dashboard Overview'}
              {adminSection === 'orders' && 'Manajemen Seluruh Order'}
              {adminSection === 'themes' && 'Katalog & Tema Desain'}
              {adminSection === 'invitations' && 'Sistem Publikasi Undangan'}
              {adminSection === 'customers' && 'Database Customer'}
              {adminSection === 'activity' && 'Catatan Aktivitas Sistem (Audit Log)'}
              {adminSection === 'settings' && 'Pengaturan & Konfigurasi'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8E877E] px-3 py-1.5 rounded-full bg-[#1A1816] border border-[#2D2A26]">
              WhatsApp Admin: <strong className="text-white">082211447129</strong>
            </span>
          </div>
        </div>

        {/* SECTION 1: DASHBOARD OVERVIEW */}
        {adminSection === 'dashboard' && (
          <div className="space-y-8">
            
            {/* 8 Statistic Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#181615] border border-[#2A2723] space-y-1">
                <span className="text-[11px] text-[#8E877E] uppercase tracking-wider font-semibold block">
                  Total Order
                </span>
                <span className="text-3xl font-bold text-white block">
                  {totalOrders}
                </span>
                <span className="text-[11px] text-[#C5A880]">Sepanjang waktu</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#181615] border border-[#2A2723] space-y-1">
                <span className="text-[11px] text-[#8E877E] uppercase tracking-wider font-semibold block">
                  Menunggu Pembayaran
                </span>
                <span className="text-3xl font-bold text-amber-400 block">
                  {newOrders}
                </span>
                <span className="text-[11px] text-[#888]">Perlu verifikasi manual</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#181615] border border-[#2A2723] space-y-1">
                <span className="text-[11px] text-[#8E877E] uppercase tracking-wider font-semibold block">
                  Sedang Diproses / Revisi
                </span>
                <span className="text-3xl font-bold text-indigo-400 block">
                  {inProgress + inRevision}
                </span>
                <span className="text-[11px] text-[#888]">Antrean produksi</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#181615] border border-[#2A2723] space-y-1">
                <span className="text-[11px] text-[#8E877E] uppercase tracking-wider font-semibold block">
                  Total Pendapatan
                </span>
                <span className="text-2xl font-bold text-emerald-400 block">
                  Rp{totalRevenue.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] text-emerald-500/80">Pembayaran manual via WA</span>
              </div>

            </div>

            {/* Visual Analytics / Charts Simulation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Order by Month Breakdown */}
              <div className="p-6 rounded-3xl bg-[#181615] border border-[#2A2723] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Distribusi Order per Bulan (2026)</h3>
                  <TrendingUp className="w-4 h-4 text-[#C5A880]" />
                </div>
                
                <div className="space-y-3 pt-2">
                  {[
                    { month: 'September 2026', count: 18, pct: '75%' },
                    { month: 'Agustus 2026', count: 14, pct: '60%' },
                    { month: 'Juli 2026', count: 11, pct: '45%' },
                    { month: 'Juni 2026', count: 8, pct: '30%' }
                  ].map((m, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#A39D94]">{m.month}</span>
                        <span className="font-bold text-white">{m.count} Order</span>
                      </div>
                      <div className="h-2 w-full bg-[#24211E] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#9C753B] to-[#E9D7B7] rounded-full" style={{ width: m.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tema Paling Populer */}
              <div className="p-6 rounded-3xl bg-[#181615] border border-[#2A2723] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Tema Paling Banyak Digunakan</h3>
                  <Palette className="w-4 h-4 text-[#C5A880]" />
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  {themes.slice(0, 4).map((th, i) => (
                    <div key={th.id} className="flex items-center justify-between p-3 rounded-xl bg-[#201E1B] border border-[#2D2A26]">
                      <div className="flex items-center gap-3">
                        <span className="w-5 text-center font-bold text-[#C5A880]">#{i+1}</span>
                        <span className="font-semibold text-white">{th.name}</span>
                      </div>
                      <span className="text-[11px] text-[#A69F96]">{th.eventType} Edition</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Recent Orders quick table */}
            <div className="p-6 rounded-3xl bg-[#181615] border border-[#2A2723] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Order Terbaru Masuk</h3>
                <button
                  onClick={() => setAdminSection('orders')}
                  className="text-xs text-[#C5A880] hover:underline"
                >
                  Lihat Semua Order →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[11px] uppercase tracking-wider text-[#736B61] border-b border-[#2C2926]">
                    <tr>
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Acara</th>
                      <th className="py-2.5 px-3">Total</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#24211E]">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-[#201E1C]">
                        <td className="py-3 px-3 font-mono font-bold text-white">{ord.orderId}</td>
                        <td className="py-3 px-3 text-[#C8C2BA]">{ord.customerName}</td>
                        <td className="py-3 px-3 text-[#A8A196]">{ord.eventType}</td>
                        <td className="py-3 px-3 font-semibold text-white">Rp{ord.totalPrice.toLocaleString('id-ID')}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#292521] text-[#EAD5BA] border border-[#3D372F]">
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => setSelectedOrderModal(ord)}
                            className="text-[#C5A880] hover:underline font-semibold"
                          >
                            Kelola
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 2: ORDER MANAGEMENT */}
        {adminSection === 'orders' && (
          <div className="space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#181615] border border-[#2A2723]">
              
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#736B61]" />
                <input
                  type="text"
                  placeholder="Cari Order ID, Nama, No WA..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#201E1C] border border-[#332F2A] text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-[#888]">Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#201E1C] border border-[#332F2A] text-xs text-white focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="all">Semua Status ({orders.length})</option>
                  <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                  <option value="Pembayaran Dikonfirmasi">Pembayaran Dikonfirmasi</option>
                  <option value="Menunggu Data">Menunggu Data</option>
                  <option value="Sedang Diproses">Sedang Diproses</option>
                  <option value="Revisi">Revisi</option>
                  <option value="Siap Dipublikasikan">Siap Dipublikasikan</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>

            </div>

            {/* Orders Table */}
            <div className="p-6 rounded-3xl bg-[#181615] border border-[#2A2723] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[11px] uppercase tracking-wider text-[#736B61] border-b border-[#2C2926]">
                    <tr>
                      <th className="py-3 px-3">Order ID</th>
                      <th className="py-3 px-3">Customer & WA</th>
                      <th className="py-3 px-3">Acara</th>
                      <th className="py-3 px-3">Paket & Tema</th>
                      <th className="py-3 px-3">Total</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Tanggal</th>
                      <th className="py-3 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#24211E]">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-[#1E1C1A]">
                        <td className="py-3.5 px-3 font-mono font-bold text-white">
                          {ord.orderId}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-semibold text-white block">{ord.customerName}</span>
                          <span className="text-[10px] text-[#888]">{ord.customerWhatsapp}</span>
                        </td>
                        <td className="py-3.5 px-3 text-[#A8A196]">{ord.eventType}</td>
                        <td className="py-3.5 px-3 text-[#A8A196]">
                          {ord.packageTier} • {ord.themeName}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-[#EAD5BA]">
                          Rp{ord.totalPrice.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#24211E] text-[#C5A880] border border-[#3C362F]">
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-[#888]">{ord.createdAt}</td>
                        <td className="py-3.5 px-3 text-right space-x-2">
                          <button
                            onClick={() => handleWhatsAppCustomer(ord)}
                            className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 hover:bg-emerald-900 transition-colors inline-block"
                            title="Chat Customer WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setSelectedOrderModal(ord)}
                            className="px-2.5 py-1 rounded-lg bg-[#2C2824] hover:bg-[#3D3730] text-xs font-semibold text-white transition-colors"
                          >
                            Kelola
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 3: THEMES MANAGEMENT */}
        {adminSection === 'themes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Daftar Tema Undangan ({themes.length})</h3>
              <button
                onClick={() => setShowAddThemeModal(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#E9D7B7] text-[#141312] text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Tema Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {themes.map((th) => (
                <div key={th.id} className="rounded-2xl bg-[#181615] border border-[#2A2723] overflow-hidden p-4 space-y-3">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#24211E] relative">
                    <img src={th.thumbnail} alt={th.name} className="w-full h-full object-cover" />
                    {th.isBestseller && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[#C5A880] text-[9px] font-bold">
                        Bestseller
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{th.name}</h4>
                    <span className="text-[10px] text-[#888]">{th.eventType} • {th.style} • {th.color}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#24211E] text-xs">
                    <button
                      onClick={() => updateTheme(th.id, { isBestseller: !th.isBestseller })}
                      className="text-[#C5A880] hover:underline text-[11px]"
                    >
                      {th.isBestseller ? 'Batalkan Bestseller' : 'Jadikan Bestseller'}
                    </button>
                    {isSuperAdmin && (
                      <button
                        onClick={() => deleteTheme(th.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Hapus Tema"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: INVITATIONS MANAGEMENT */}
        {adminSection === 'invitations' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white">Daftar Undangan Terdaftar & URL</h3>
            <div className="p-6 rounded-3xl bg-[#181615] border border-[#2A2723]">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[11px] uppercase tracking-wider text-[#736B61] border-b border-[#2C2926]">
                    <tr>
                      <th className="py-3 px-3">Judul Acara</th>
                      <th className="py-3 px-3">Slug URL</th>
                      <th className="py-3 px-3">Tanggal Acara</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#24211E]">
                    {orders.map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-[#1E1C1A]">
                        <td className="py-3.5 px-3 font-semibold text-white">
                          {ord.invitationData.eventTitle}
                        </td>
                        <td className="py-3.5 px-3 font-mono text-[#C5A880]">
                          ruangmomen.com/{ord.invitationData.slug}
                        </td>
                        <td className="py-3.5 px-3 text-[#888]">{ord.invitationData.eventDate}</td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#221F1C] text-[#DDD]">
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => openInvitation(ord.invitationData.slug, 'Admin Preview')}
                            className="px-3 py-1 rounded-lg bg-[#2A2622] hover:bg-[#3D3730] text-xs text-[#EAD5BA] inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: CUSTOMER MANAGEMENT */}
        {adminSection === 'customers' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white">Manajemen Akun Customer ({totalCustomers})</h3>
            <div className="p-6 rounded-3xl bg-[#181615] border border-[#2A2723]">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[11px] uppercase tracking-wider text-[#736B61] border-b border-[#2C2926]">
                    <tr>
                      <th className="py-3 px-3">Nama</th>
                      <th className="py-3 px-3">Email</th>
                      <th className="py-3 px-3">WhatsApp</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#24211E]">
                    {users.filter(u => u.role === 'customer').map((usr) => (
                      <tr key={usr.id} className="hover:bg-[#1E1C1A]">
                        <td className="py-3.5 px-3 font-semibold text-white">{usr.name}</td>
                        <td className="py-3.5 px-3 text-[#A8A196]">{usr.email}</td>
                        <td className="py-3.5 px-3 text-[#A8A196]">{usr.whatsapp}</td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            usr.status === 'active' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                          }`}>
                            {usr.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => updateCustomerStatus(usr.id, usr.status === 'active' ? 'suspended' : 'active')}
                            className="text-xs text-[#C5A880] hover:underline"
                          >
                            {usr.status === 'active' ? 'Suspend' : 'Aktifkan'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: ACTIVITY LOG */}
        {adminSection === 'activity' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white">System Activity & Audit Log</h3>
            <div className="p-6 rounded-3xl bg-[#181615] border border-[#2A2723] space-y-3">
              {activityLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-[#201E1C] border border-[#2D2A26] flex items-start justify-between gap-4 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{log.action}</span>
                      <span className="text-[10px] text-[#C5A880] font-mono">oleh {log.adminName}</span>
                    </div>
                    <p className="text-[#A39D94]">{log.details}</p>
                  </div>
                  <span className="text-[10px] text-[#666] shrink-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 7: SETTINGS */}
        {adminSection === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-base font-bold text-white">Pengaturan Sistem & Admin</h3>
            <div className="p-6 rounded-3xl bg-[#181615] border border-[#2A2723] space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#A39D94]">Nomor WhatsApp Admin RuangMomen</label>
                <input
                  type="text"
                  disabled
                  value="082211447129"
                  className="w-full p-2.5 rounded-xl bg-[#201E1C] border border-[#332F2A] text-white"
                />
                <span className="text-[10px] text-[#777]">Nomor ini digunakan untuk seluruh penerimaan pembayaran manual & konsultasi.</span>
              </div>

              <div className="space-y-1 pt-2">
                <label className="text-[#A39D94]">Role Akun Anda</label>
                <div className="p-3 rounded-xl bg-[#201E1C] border border-[#332F2A] font-bold text-[#C5A880]">
                  {currentUser.role.toUpperCase()}
                </div>
              </div>

              <div className="pt-4 border-t border-[#292622]">
                <button
                  onClick={() => alert('Pengaturan disimpan.')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#E9D7B7] text-[#111] font-bold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ORDER MANAGEMENT MODAL */}
      {selectedOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#181615] border border-[#2D2A26] rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#2C2926]">
              <div>
                <span className="text-[10px] font-bold text-[#C5A880] uppercase">Kelola Order</span>
                <h3 className="text-xl font-bold text-white font-mono">{selectedOrderModal.orderId}</h3>
              </div>
              <button onClick={() => setSelectedOrderModal(null)} className="p-1 text-[#888] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Changer (Menunggu Pembayaran -> Pembayaran Dikonfirmasi etc) */}
            <div className="p-4 rounded-2xl bg-[#201E1C] border border-[#2D2A26] space-y-2">
              <span className="font-bold text-white block">Ubah Status Order:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  'Menunggu Pembayaran',
                  'Pembayaran Dikonfirmasi',
                  'Menunggu Data',
                  'Sedang Diproses',
                  'Revisi',
                  'Siap Dipublikasikan',
                  'Selesai',
                  'Dibatalkan'
                ].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedOrderModal.orderId, st as OrderStatus)}
                    className={`p-2 rounded-xl text-[10px] font-semibold text-center transition-all ${
                      selectedOrderModal.status === st
                        ? 'bg-[#C5A880] text-black font-bold'
                        : 'bg-[#292622] text-[#AAA] hover:bg-[#332F2A]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#201E1C]">
                <span className="text-[#888] block">Customer:</span>
                <span className="font-bold text-white">{selectedOrderModal.customerName}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#201E1C]">
                <span className="text-[#888] block">WhatsApp:</span>
                <span className="font-bold text-white">{selectedOrderModal.customerWhatsapp}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#201E1C]">
                <span className="text-[#888] block">Paket:</span>
                <span className="font-bold text-[#C5A880]">{selectedOrderModal.packageTier}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#201E1C]">
                <span className="text-[#888] block">Total:</span>
                <span className="font-bold text-emerald-400">Rp{selectedOrderModal.totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#2C2926]">
              <button
                onClick={() => openInvitation(selectedOrderModal.invitationData.slug, selectedOrderModal.customerName)}
                className="px-4 py-2 rounded-xl bg-[#292622] text-white hover:bg-[#35302B]"
              >
                Buka Undangan Live
              </button>
              <button
                onClick={() => handleWhatsAppCustomer(selectedOrderModal)}
                className="px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Hubungi via WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ADD THEME MODAL */}
      {showAddThemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleAddThemeSubmit} className="relative w-full max-w-lg bg-[#181615] border border-[#2D2A26] rounded-3xl p-6 sm:p-8 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#2C2926]">
              <h3 className="text-base font-bold text-white">Tambah Tema Undangan Baru</h3>
              <button type="button" onClick={() => setShowAddThemeModal(false)} className="text-[#888] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[#888]">Nama Tema</label>
              <input
                type="text"
                placeholder="Contoh: Golden Serenade"
                value={newThemeData.name}
                onChange={(e) => setNewThemeData({ ...newThemeData, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#201E1C] border border-[#332F2A] text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[#888]">Kategori Acara</label>
                <select
                  value={newThemeData.eventType}
                  onChange={(e: any) => setNewThemeData({ ...newThemeData, eventType: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#201E1C] border border-[#332F2A] text-white"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Aqiqah">Aqiqah</option>
                  <option value="Islami">Islami</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#888]">Style</label>
                <select
                  value={newThemeData.style}
                  onChange={(e: any) => setNewThemeData({ ...newThemeData, style: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#201E1C] border border-[#332F2A] text-white"
                >
                  <option value="Luxury">Luxury</option>
                  <option value="Floral">Floral</option>
                  <option value="Romantic">Romantic</option>
                  <option value="Minimalist">Minimalist</option>
                  <option value="Islamic">Islamic</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[#888]">Deskripsi Tema</label>
              <textarea
                rows={2}
                value={newThemeData.description}
                onChange={(e) => setNewThemeData({ ...newThemeData, description: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#201E1C] border border-[#332F2A] text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#E9D7B7] text-[#111] font-bold mt-2"
            >
              Simpan Tema Baru
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

export default AdminDashboardView;
