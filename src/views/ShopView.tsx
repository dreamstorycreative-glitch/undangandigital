import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ShoppingBag, 
  Star, 
  Sparkles, 
  MessageCircle, 
  X, 
  Check, 
  ArrowRight,
  Tag
} from 'lucide-react';
import { ShopProduct } from '../types';

export const ShopView: React.FC = () => {
  const { shopProducts } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProductModal, setSelectedProductModal] = useState<ShopProduct | null>(null);

  const categories = [
    { label: 'Semua Produk', value: 'all' },
    { label: 'Video Opening', value: 'Video Opening' },
    { label: 'Add-on Domain', value: 'Add-on' },
    { label: 'Preset', value: 'Preset' },
    { label: 'Digital Product', value: 'Digital Product' },
    { label: 'Custom Design', value: 'Custom Design' }
  ];

  const filteredProducts = useMemo(() => {
    return shopProducts.filter((prod) => {
      const matchSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'all' || prod.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [shopProducts, searchQuery, selectedCategory]);

  const handleBuyProduct = (prod: ShopProduct) => {
    const text = `Halo Admin RuangMomen 👋

Saya tertarik untuk membeli produk digital / add-on di RuangMomen:

Produk: ${prod.title}
Kategori: ${prod.category}
Harga: Rp${(prod.discountPrice || prod.price).toLocaleString('id-ID')}

Mohon informasi nomor rekening dan panduan pembeliannya. Terima kasih! 🙏`;

    window.open(`https://wa.me/6282211447129?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-12 pb-24">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto pt-6 px-4 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9C753B]">
          MARKETPLACE & ADD-ON
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1816]">
          Shop & Produk Digital RuangMomen.
        </h1>
        <p className="text-sm sm:text-base text-[#635D55]">
          Tingkatkan kemewahan undangan Anda dengan add-on premium: custom domain, video opening 3D sinematik, hingga preset foto.
        </p>
      </section>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E8DFD1]">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A847C]" />
            <input
              type="text"
              placeholder="Cari produk add-on..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#DDD3C2] text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#1C1A18] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#554E46] border border-[#E0D7C8] hover:bg-[#EFE8DD]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="rounded-3xl bg-white border border-[#E9E1D2] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF6F0]">
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {prod.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1A1816]/90 text-[#EAD5BA] text-[10px] font-bold tracking-wider uppercase border border-[#C5A880]/30">
                    {prod.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px]">
                  {prod.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-bold text-[#222]">{prod.rating}</span>
                    <span className="text-[10px] text-[#888]">({prod.reviewsCount})</span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-[#1C1A18] line-clamp-2">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-[#6F685E] mt-1 line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="pt-3 border-t border-[#F2ECE1]">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-serif font-bold text-base text-[#1C1A18]">
                      Rp{(prod.discountPrice || prod.price).toLocaleString('id-ID')}
                    </span>
                    {prod.discountPrice && (
                      <span className="text-xs text-[#999] line-through">
                        Rp{prod.price.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProductModal(prod)}
                      className="flex-1 py-2 rounded-xl border border-[#D5CABE] text-[#332E2A] text-xs font-semibold hover:bg-[#FAF6F0] transition-colors cursor-pointer text-center"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleBuyProduct(prod)}
                      className="flex-1 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BA5C] text-white text-xs font-semibold shadow-xs hover:shadow transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Beli</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-[#E9E1D2] space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#9C753B] uppercase tracking-wider">
                  {selectedProductModal.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1C1A18]">
                  {selectedProductModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProductModal(null)}
                className="p-1 rounded-full text-[#888] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden bg-[#F0EBE3]">
              <img
                src={selectedProductModal.imageUrl}
                alt={selectedProductModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm text-[#554E46] leading-relaxed">
              {selectedProductModal.description}
            </p>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF5EE] border border-[#EAE0D2]">
              <div>
                <span className="text-[10px] text-[#7A7266] uppercase block">Total Harga</span>
                <span className="font-serif text-xl font-bold text-[#1C1A18]">
                  Rp{(selectedProductModal.discountPrice || selectedProductModal.price).toLocaleString('id-ID')}
                </span>
              </div>
              <button
                onClick={() => {
                  handleBuyProduct(selectedProductModal);
                  setSelectedProductModal(null);
                }}
                className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Beli via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ShopView;
