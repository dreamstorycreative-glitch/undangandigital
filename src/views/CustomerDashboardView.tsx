import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  MessageCircle, 
  ExternalLink, 
  Share2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  FileText, 
  Upload, 
  Calendar, 
  Eye,
  LogOut,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { OrderItem, OrderStatus } from '../types';

export const CustomerDashboardView: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    logout, 
    setActiveTab, 
    openInvitation,
    getWhatsAppPaymentUrl,
    getWhatsAppCustomerHelpUrl 
  } = useApp();

  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter orders for the current customer (or all sample customer orders if demo)
  const customerOrders = orders.filter(
    (o) => !currentUser || o.customerId === currentUser.id || o.customerEmail === currentUser.email
  );

  const activeOrdersCount = customerOrders.filter(o => o.status !== 'Selesai' && o.status !== 'Dibatalkan').length;
  const finishedOrdersCount = customerOrders.filter(o => o.status === 'Selesai').length;
  const publishedCount = customerOrders.filter(o => o.status === 'Siap Dipublikasikan' || o.status === 'Selesai').length;

  const timelineSteps: OrderStatus[] = [
    'Menunggu Pembayaran',
    'Pembayaran Dikonfirmasi',
    'Menunggu Data',
    'Sedang Diproses',
    'Revisi',
    'Siap Dipublikasikan',
    'Selesai'
  ];

  const getStepProgressIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'Menunggu Pembayaran': return 0;
      case 'Pembayaran Dikonfirmasi': return 1;
      case 'Menunggu Data': return 2;
      case 'Sedang Diproses': return 3;
      case 'Revisi': return 4;
      case 'Siap Dipublikasikan': return 5;
      case 'Selesai': return 6;
      case 'Dibatalkan': return -1;
      default: return 0;
    }
  };

  const getStatusBadgeClass = (status: OrderStatus): string => {
    switch (status) {
      case 'Menunggu Pembayaran':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Pembayaran Dikonfirmasi':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Menunggu Data':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Sedang Diproses':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Revisi':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Siap Dipublikasikan':
      case 'Selesai':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Dibatalkan':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleShareLink = (slug: string) => {
    const url = `${window.location.origin}?invitation=${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 space-y-10">
      
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9C753B]">
            Customer Area
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A18] mt-1">
            Halo, {currentUser?.name || 'Customer Terhormat'} 👋
          </h1>
          <p className="text-xs text-[#736B61] mt-1">
            Pantau status pengerjaan undangan, kelola data acara, dan bagikan tautan kepada tamu.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('order')}
            className="px-5 py-2.5 rounded-full bg-[#1C1A18] text-white text-xs font-semibold hover:bg-[#332F2A] transition-all flex items-center gap-1.5 cursor-pointer shadow"
          >
            <span>+ Buat Pesanan Baru</span>
          </button>
          <button
            onClick={logout}
            className="p-2.5 rounded-full text-[#888] hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Keluar Akun"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs">
          <span className="text-xs font-semibold text-[#8C8377] block">Pesanan Aktif</span>
          <span className="font-serif text-3xl font-bold text-[#1C1A18] block mt-1">
            {activeOrdersCount}
          </span>
          <span className="text-[11px] text-[#9C753B] mt-1 block">Dalam proses pengerjaan</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs">
          <span className="text-xs font-semibold text-[#8C8377] block">Undangan Aktif</span>
          <span className="font-serif text-3xl font-bold text-[#1C1A18] block mt-1">
            {publishedCount}
          </span>
          <span className="text-[11px] text-emerald-600 mt-1 block">Siap disebarkan ke tamu</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E9E1D2] shadow-xs">
          <span className="text-xs font-semibold text-[#8C8377] block">Pesanan Selesai</span>
          <span className="font-serif text-3xl font-bold text-[#1C1A18] block mt-1">
            {finishedOrdersCount}
          </span>
          <span className="text-[11px] text-[#777] mt-1 block">Telah berhasil diarsipkan</span>
        </div>
      </div>

      {/* Orders List Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A18]">
            Pesanan Saya
          </h2>
          <span className="text-xs text-[#777]">
            {customerOrders.length} pesanan terdaftar
          </span>
        </div>

        {customerOrders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E9E1D2] space-y-4">
            <Sparkles className="w-8 h-8 text-[#C5A880] mx-auto" />
            <h3 className="font-serif font-bold text-lg text-[#222]">Belum Ada Pesanan</h3>
            <p className="text-xs text-[#666]">Mulai buat undangan pertama Anda sekarang juga.</p>
            <button
              onClick={() => setActiveTab('order')}
              className="px-6 py-2.5 rounded-full bg-[#1C1A18] text-white text-xs font-bold"
            >
              Mulai Buat Undangan
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {customerOrders.map((order) => {
              const currentStepIdx = getStepProgressIndex(order.status);
              const waHelpUrl = getWhatsAppCustomerHelpUrl(order);
              const waPayUrl = getWhatsAppPaymentUrl(order);

              return (
                <div
                  key={order.orderId}
                  className="rounded-3xl bg-white border border-[#E9E1D2] p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-6"
                >
                  {/* Top Bar Order Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0EAE0]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm sm:text-base font-bold text-[#1C1A18]">
                          {order.orderId}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A7266]">
                        {order.eventType} • Paket {order.packageTier} • Tema: <strong className="text-[#333]">{order.themeName}</strong>
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-[#888] block">Total Pembayaran:</span>
                      <span className="font-serif text-lg font-bold text-[#1C1A18]">
                        Rp{order.totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* 7-Step Visual Timeline */}
                  <div className="py-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9C753B] block mb-3">
                      Proses Pembuatan Undangan:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                      {timelineSteps.map((step, idx) => {
                        const isDone = currentStepIdx >= idx;
                        const isCurrent = currentStepIdx === idx;

                        return (
                          <div
                            key={step}
                            className={`p-2.5 rounded-xl border text-center transition-all ${
                              isCurrent
                                ? 'border-[#9C753B] bg-[#FAF5EE] ring-1 ring-[#9C753B]'
                                : isDone
                                ? 'border-emerald-300 bg-emerald-50/60 text-emerald-900'
                                : 'border-[#EDE5D8] bg-[#FAF8F5] text-[#999]'
                            }`}
                          >
                            <span className="text-[9px] font-bold block opacity-70">Step {idx + 1}</span>
                            <span className="text-[11px] font-semibold block leading-tight mt-0.5 truncate">
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0EAE0]">
                    
                    <div className="flex flex-wrap items-center gap-2">
                      {/* WhatsApp Payment button if waiting */}
                      {order.status === 'Menunggu Pembayaran' && (
                        <a
                          href={waPayUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BA5C] text-white text-xs font-bold flex items-center gap-1.5 shadow"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Bayar via WhatsApp</span>
                        </a>
                      )}

                      {/* View Invitation */}
                      <button
                        onClick={() => openInvitation(order.invitationData.slug, currentUser?.name)}
                        className="px-4 py-2 rounded-xl bg-[#1C1A18] hover:bg-[#332F2A] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#E6D4BA]" />
                        <span>Lihat Undangan</span>
                      </button>

                      {/* Share link button */}
                      <button
                        onClick={() => handleShareLink(order.invitationData.slug)}
                        className="px-3.5 py-2 rounded-xl border border-[#D5CABE] text-[#332E2A] text-xs font-semibold hover:bg-[#FAF6F0] flex items-center gap-1.5 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan Link'}</span>
                      </button>

                      {/* Detail modal trigger */}
                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="px-3.5 py-2 rounded-xl border border-[#D5CABE] text-[#332E2A] text-xs font-semibold hover:bg-[#FAF6F0] flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Lihat Detail</span>
                      </button>
                    </div>

                    {/* Ask Admin on WhatsApp */}
                    <a
                      href={waHelpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9C753B] hover:underline"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Hubungi Admin via WhatsApp</span>
                    </a>

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E9E1D2] space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D5]">
              <div>
                <span className="text-[10px] font-bold text-[#9C753B] uppercase">Rincian Order</span>
                <h3 className="font-mono text-xl font-bold text-[#1C1A18]">
                  {selectedOrderDetails.orderId}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-xs font-semibold text-[#666] hover:text-black px-3 py-1 rounded-lg bg-[#FAF7F2]"
              >
                Tutup
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF8F5]">
                <span className="text-[#888] block">Nama Mempelai / Acara:</span>
                <span className="font-semibold text-[#111]">{selectedOrderDetails.invitationData.eventTitle}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5]">
                <span className="text-[#888] block">Tanggal Acara:</span>
                <span className="font-semibold text-[#111]">{selectedOrderDetails.invitationData.eventDate}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5]">
                <span className="text-[#888] block">Lokasi:</span>
                <span className="font-semibold text-[#111]">{selectedOrderDetails.invitationData.locationName}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5]">
                <span className="text-[#888] block">Tautan Undangan:</span>
                <span className="font-mono text-[11px] text-[#9C753B]">ruangmomen.com/{selectedOrderDetails.invitationData.slug}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E6DCCF] text-xs space-y-1">
              <span className="font-bold text-[#222] block">Catatan Pengerjaan:</span>
              <p className="text-[#666]">
                {selectedOrderDetails.notes || 'Tidak ada catatan tambahan. Undangan diproses sesuai data formulir.'}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href={getWhatsAppCustomerHelpUrl(selectedOrderDetails)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Konsultasi / Minta Revisi</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerDashboardView;
