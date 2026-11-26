import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  Brush,
  Building2,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Eye,
  EyeOff,
  Factory,
  FlaskConical,
  Home,
  Layers,
  LayoutGrid,
  List,
  Lock,
  Minus,
  PaintBucket,
  Palette,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Tag,
  Trees,
  Truck,
  User,
  Warehouse,
  X,
} from 'lucide-react';
import {
  BRANCHES,
  PAINT_COLORS,
  PAINT_PRODUCTS,
  PRODUCT_CATEGORIES,
  PROMO_VOUCHERS,
  formatRupiah,
} from '../../data/paintData';
import {
  CartItem,
  OrderRecord,
  PaintColor,
  PaintProduct,
  ProductCategoryId,
  ScreenId,
  UserProfile,
  UserRole,
} from '../../types';
import {
  DivaLogo,
  GlobalWarnaEmblem,
  PaintCanVisual,
  RoomColorVisualizer,
} from '../DivaArtwork';

/* ============================================================================
   SCREEN 1: SPLASH SCREEN
   ============================================================================ */
export const Screen1Splash: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    const t1 = window.setTimeout(() => setProgress(75), 350);
    const t2 = window.setTimeout(() => setProgress(100), 900);
    const t3 = window.setTimeout(() => onContinue(), 1600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [onContinue]);

  return (
    <div className="flex-1 bg-white flex flex-col items-center justify-between px-6 py-10 text-center">
      <div className="pt-4 space-y-2 flex flex-col items-center">
        <DivaLogo size="lg" />
        <p className="text-base font-bold text-[#153E90] leading-snug pt-2">
          Warna untuk Kehidupan
          <br />
          yang Lebih Indah
        </p>
      </div>

      {/* Central Globe + Paint Splash Emblem */}
      <div className="my-4 relative flex items-center justify-center">
        <div className="w-56 h-56 rounded-full bg-gradient-to-b from-blue-50/70 via-amber-50/40 to-red-50/50 flex items-center justify-center p-4">
          <GlobalWarnaEmblem className="w-48 h-48" />
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="flex items-center justify-center gap-2.5">
          <GlobalWarnaEmblem className="w-9 h-9 shrink-0" />
          <div className="text-left">
            <p className="text-xs font-extrabold text-[#153E90]">
              PT. Global Warna Indonesia
            </p>
            <p className="text-[11px] text-slate-500">Warna untuk Dunia yang Lebih Baik</p>
          </div>
        </div>

        <div className="space-y-1.5 max-w-[220px] mx-auto">
          <p className="text-[11px] font-medium text-slate-500">Loading...</p>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#153E90] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="text-xs font-bold text-[#153E90] hover:underline cursor-pointer pt-1"
        >
          Masuk Sekarang
        </button>
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 2: LOGIN
   ============================================================================ */
export const Screen2Login: React.FC<{
  onLogin: (username: string, role: UserRole) => void;
}> = ({ onLogin }) => {
  const [username, setUsername] = useState('budi.santoso');
  const [password, setPassword] = useState('diva2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const roles: { role: UserRole; bg: string; icon: React.ComponentType<{ className?: string }> }[] =
    [
      { role: 'Sales', bg: 'bg-[#DC2626] hover:bg-red-700', icon: User },
      { role: 'Distributor', bg: 'bg-[#153E90] hover:bg-blue-900', icon: Store },
      { role: 'Produksi', bg: 'bg-emerald-600 hover:bg-emerald-700', icon: Factory },
      { role: 'Gudang', bg: 'bg-amber-500 hover:bg-amber-600', icon: Warehouse },
      { role: 'QC', bg: 'bg-violet-600 hover:bg-violet-700', icon: CheckCircle2 },
      { role: 'Management', bg: 'bg-slate-700 hover:bg-slate-800', icon: BarChart3 },
    ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username.trim() || 'Budi Santoso', 'Distributor');
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between">
      <div className="px-5 pt-6 pb-4 space-y-5">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <DivaLogo size="md" />
          <div className="flex items-center gap-2 pt-1">
            <GlobalWarnaEmblem className="w-8 h-8 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-extrabold text-[#153E90]">
                PT. Global Warna Indonesia
              </p>
              <p className="text-[10px] text-slate-500">Warna untuk Dunia yang Lebih Baik</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-xl font-extrabold text-[#153E90]">Selamat Datang</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Masuk untuk mengakses sistem DIVA
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="login-user" className="block text-[11px] font-semibold text-slate-600 mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="login-user"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#153E90]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-pass" className="block text-[11px] font-semibold text-slate-600 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="login-pass"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full h-10 pl-9 pr-9 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#153E90]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Tampilkan password"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#153E90]"
              />
              <span>Ingat Saya</span>
            </label>
            <button
              type="button"
              onClick={() => onLogin('Budi Santoso', 'Distributor')}
              className="text-[#153E90] font-semibold hover:underline cursor-pointer"
            >
              Lupa Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-[#153E90] hover:bg-blue-900 text-white text-sm font-extrabold rounded-xl transition-colors cursor-pointer"
          >
            MASUK
          </button>
        </form>

        {/* 6 Role Quick Login Grid */}
        <div className="space-y-2.5 pt-1">
          <p className="text-[11px] text-center text-slate-500 font-medium">
            Atau masuk sebagai
          </p>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => onLogin('Budi Santoso', item.role)}
                  className={`${item.bg} text-white rounded-xl py-2.5 px-2 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[11px] font-bold">{item.role}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Wave Banner */}
      <div className="bg-[#153E90] text-white text-center py-3 px-4">
        <p className="text-xs font-bold italic tracking-wide">
          Solusi Warna untuk Setiap Kebutuhan
        </p>
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 3: DASHBOARD UTAMA
   ============================================================================ */
export const Screen3Dashboard: React.FC<{
  profile: UserProfile;
  onNavigate: (screen: ScreenId) => void;
}> = ({ profile, onNavigate }) => {
  const [selectedYear, setSelectedYear] = useState<'2024' | '2025' | '2026'>('2025');

  const chartData =
    selectedYear === '2024'
      ? [290, 340, 360, 460, 500, 620, 650, 740]
      : selectedYear === '2025'
        ? [340, 390, 430, 510, 580, 660, 710, 780]
        : [380, 440, 490, 560, 640, 720, 770, 820];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug'];

  return (
    <div className="p-4 space-y-4">
      {/* Greeting */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-500">Halo,</p>
          <p className="text-sm font-extrabold text-slate-900 leading-tight">{profile.name}</p>
          <p className="text-[11px] font-medium text-[#153E90]">{profile.role}</p>
        </div>
      </div>

      {/* Hero Banner - Realistic Interior Room Photo */}
      <div className="relative rounded-2xl overflow-hidden bg-[#153E90] text-white min-h-[136px] p-4 grid grid-cols-12 items-center gap-2">
        <img
          src="/src/assets/images/banner_dashboard_interior_1795599021877.jpg"
          alt="Interior ruang tamu dengan cat DIVA"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2D6B]/95 via-[#153E90]/80 to-[#153E90]/25" />
        <div className="relative z-10 col-span-7 space-y-2">
          <p className="text-sm font-extrabold leading-snug drop-shadow-sm">
            Warna Membangun Masa Depan yang Lebih Baik
          </p>
          <button
            type="button"
            onClick={() => onNavigate('screen-4')}
            className="px-3 py-1.5 bg-[#DC2626] hover:bg-red-700 text-white text-[11px] font-bold rounded-lg cursor-pointer shadow-sm"
          >
            Menu Penjualan
          </button>
        </div>
        <div className="relative z-10 col-span-5 flex items-end justify-end gap-1">
          <div className="w-11 drop-shadow-md">
            <PaintCanVisual
              accentColor="#DC2626"
              labelTitle="MT - 610"
              labelSubtitle="Clear Gloss"
              className="w-full h-auto"
            />
          </div>
          <div className="w-15 drop-shadow-md">
            <PaintCanVisual
              accentColor="#153E90"
              labelTitle="MSS - 510"
              labelSubtitle="Melamine"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onNavigate('screen-4')}
          className="text-left p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-2.5 hover:border-[#153E90] cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#153E90] text-white flex items-center justify-center shrink-0">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-500">Order Hari Ini</p>
            <p className="text-lg font-extrabold font-mono text-slate-900 tabular-nums leading-tight">
              125
            </p>
            <p className="text-[10px] text-slate-500">Pesanan</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('screen-8')}
          className="text-left p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-2.5 hover:border-emerald-600 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Factory className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-500">Produksi Berjalan</p>
            <p className="text-base font-extrabold font-mono text-slate-900 tabular-nums leading-tight">
              9.800 Kg
            </p>
            <p className="text-[10px] text-slate-500">Dari 12.000 Kg</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('screen-7')}
          className="text-left p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-2.5 hover:border-[#DC2626] cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#DC2626] text-white flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-500">Pengiriman Aktif</p>
            <p className="text-lg font-extrabold font-mono text-slate-900 tabular-nums leading-tight">
              18
            </p>
            <p className="text-[10px] text-slate-500">Dalam Proses</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('screen-15')}
          className="text-left p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-2.5 hover:border-amber-500 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-500">Penjualan Bulan Ini</p>
            <p className="text-sm font-extrabold font-mono text-slate-900 tabular-nums leading-tight">
              Rp 580 Juta
            </p>
            <p className="text-[10px] font-semibold text-emerald-700">+12% dari bulan lalu</p>
          </div>
        </button>
      </div>

      {/* Grafik Penjualan Bulanan */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-slate-900">Grafik Penjualan Bulanan</h2>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value as '2024' | '2025' | '2026')}
            aria-label="Pilih tahun grafik"
            className="text-xs font-bold text-slate-700 border border-slate-200 rounded-lg px-2 py-1 bg-slate-50 cursor-pointer"
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>

        <div className="h-36 flex items-end justify-between gap-2 pt-4 pb-1 border-b border-slate-100">
          {chartData.map((val, idx) => (
            <div key={months[idx]} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <div
                className="w-full max-w-[22px] rounded-t-md bg-gradient-to-t from-[#153E90] to-blue-400 transition-all duration-300"
                style={{ height: `${Math.round((val / 850) * 100)}%` }}
                title={`${months[idx]}: Rp ${val} Juta`}
              />
              <span className="text-[10px] text-slate-500 font-medium">{months[idx]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Shortcuts to Tools & Enterprise Modules */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onNavigate('kalkulator')}
          className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#153E90] flex items-center gap-2.5 text-left cursor-pointer"
        >
          <Calculator className="w-5 h-5 text-[#153E90] shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-900">Kalkulator Cat</p>
            <p className="text-[10px] text-slate-500">Hitung otomatis m²</p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('katalog-warna')}
          className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#DC2626] flex items-center gap-2.5 text-left cursor-pointer"
        >
          <Palette className="w-5 h-5 text-[#DC2626] shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-900">Katalog Warna</p>
            <p className="text-[10px] text-slate-500">36+ Pilihan warna</p>
          </div>
        </button>
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 4: MENU PENJUALAN (BERANDA)
   ============================================================================ */
export const Screen4SalesMenu: React.FC<{
  onSelectCategory: (cat: ProductCategoryId) => void;
  onSelectProduct: (product: PaintProduct) => void;
  onQuickAdd: (product: PaintProduct, color: PaintColor) => void;
  onNavigate: (screen: ScreenId) => void;
}> = ({ onSelectCategory, onSelectProduct, onQuickAdd, onNavigate }) => {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<ProductCategoryId | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showAll, setShowAll] = useState(false);

  const defaultColor = PAINT_COLORS[0];

  const visibleProducts = PAINT_PRODUCTS.filter((p) => {
    if (activeCat !== 'all' && p.category !== activeCat) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.shortTagline.toLowerCase().includes(q)
    );
  });

  const isFiltered = activeCat !== 'all' || search.trim().length > 0;
  const displayedProducts =
    isFiltered || showAll ? visibleProducts : visibleProducts.slice(0, 24);

  const getCategoryIcon = (id: ProductCategoryId) => {
    switch (id) {
      case 'melamine-nc':
        return <Layers className="w-5 h-5" />;
      case 'pu-acrylic':
        return <Sparkles className="w-5 h-5" />;
      case 'epoxy-synthetic':
        return <PaintBucket className="w-5 h-5" />;
      case 'waterbased':
        return <Trees className="w-5 h-5" />;
      case 'thinner':
        return <FlaskConical className="w-5 h-5" />;
      case 'tembok-genteng':
        return <Home className="w-5 h-5" />;
    }
  };

  const getPackRate = (product: PaintProduct, size: number) => {
    const found = product.packs.find((pk) => pk.sizeKg === size);
    if (!found || found.pricePerLiter <= 0) return '-';
    return found.pricePerLiter.toLocaleString('id-ID');
  };

  return (
    <div className="p-3.5 space-y-4">
      {/* Promo Hero Banner - Realistic Architectural House */}
      <div className="relative rounded-2xl overflow-hidden bg-sky-100 border border-slate-200/80 min-h-[116px] p-4 flex items-center">
        <img
          src="/src/assets/images/banner_sales_house_1795599022506.jpg"
          alt="Hunian modern dengan cat eksterior DIVA"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent" />
        <div className="relative z-10 max-w-[68%] space-y-0.5">
          <p className="text-sm font-extrabold text-[#153E90] tracking-tight">DIVA</p>
          <h1 className="text-sm font-extrabold text-slate-900 leading-snug text-balance">
            Cat Berkualitas untuk Setiap Hunian
          </h1>
          <p className="text-[11px] font-medium text-slate-700 leading-tight pt-0.5">
            Lebih Indah · Lebih Tahan Lama
          </p>
        </div>
      </div>

      {/* Quick Launch Katalog Warna & Kalkulator Otomatis */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onNavigate('katalog-warna')}
          className="px-3 py-2.5 rounded-xl bg-[#153E90] text-white flex items-center gap-2 text-left cursor-pointer hover:bg-blue-900 transition-colors"
        >
          <Palette className="w-4 h-4 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-bold leading-tight truncate">Katalog Warna</p>
            <p className="text-[10px] text-blue-200 truncate">Simulasi Ruangan</p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('kalkulator')}
          className="px-3 py-2.5 rounded-xl bg-[#DC2626] text-white flex items-center gap-2 text-left cursor-pointer hover:bg-red-700 transition-colors"
        >
          <Calculator className="w-4 h-4 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-bold leading-tight truncate">Kalkulator Cat</p>
            <p className="text-[10px] text-red-100 truncate">Estimasi Otomatis</p>
          </div>
        </button>
      </div>

      {/* Kategori Produk */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
            Kategori Produk
          </h2>
          {activeCat !== 'all' && (
            <button
              type="button"
              onClick={() => setActiveCat('all')}
              className="text-[11px] font-bold text-[#153E90] cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  const next = isSelected ? 'all' : cat.id;
                  setActiveCat(next);
                  if (next !== 'all') onSelectCategory(next);
                }}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#153E90] ring-2 ring-[#153E90]/15 bg-white'
                    : 'border-slate-200/90 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center ${cat.tintBg} ${cat.iconColor}`}
                >
                  {getCategoryIcon(cat.id)}
                </div>
                <span className="text-[10px] font-bold text-slate-800 leading-tight line-clamp-1">
                  {cat.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daftar Produk + Pencarian Khusus Daftar Produk */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-sm font-extrabold text-slate-900 truncate">
              Daftar Produk
            </h2>
            <p className="text-[11px] text-slate-500 tabular-nums">
              {visibleProducts.length} produk tersedia
              {activeCat !== 'all'
                ? ` · ${PRODUCT_CATEGORIES.find((c) => c.id === activeCat)?.shortName}`
                : ''}
            </p>
          </div>
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#153E90] shadow-xs' : 'text-slate-600'
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              <span>Persegi</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-[#153E90] shadow-xs' : 'text-slate-600'
              }`}
            >
              <List className="w-3 h-3" />
              <span>Tabel</span>
            </button>
          </div>
        </div>

        {/* Pencarian di Daftar Produk */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari di daftar produk (MSS, MT, NCT, Thinner, Epoxy...)"
            aria-label="Cari di daftar produk"
            className="w-full h-10 pl-9 pr-9 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#153E90]"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Hapus pencarian"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {visibleProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2">
            <p className="text-xs font-semibold text-slate-600">
              Produk &ldquo;{search}&rdquo; tidak ditemukan.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setActiveCat('all');
              }}
              className="text-xs font-bold text-[#153E90] cursor-pointer hover:underline"
            >
              Tampilkan Semua Produk
            </button>
          </div>
        ) : viewMode === 'table' ? (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-2.5 font-extrabold">NAMA BARANG</th>
                    <th className="py-2 px-1.5 text-right font-extrabold">1 LT</th>
                    <th className="py-2 px-1.5 text-right font-extrabold">2 LT</th>
                    <th className="py-2 px-1.5 text-right font-extrabold">5 LT</th>
                    <th className="py-2 px-2 text-right font-extrabold">20 LT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedProducts.map((product) => (
                    <tr
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      className="hover:bg-blue-50/50 cursor-pointer"
                    >
                      <td className="py-2 px-2.5 font-bold text-slate-900 max-w-[140px]">
                        <span className="block truncate">{product.name}</span>
                        {product.priceNote && (
                          <span className="text-[9px] font-semibold text-amber-700">
                            {product.priceNote}
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-1.5 text-right font-mono tabular-nums text-slate-700">
                        {getPackRate(product, 1)}
                      </td>
                      <td className="py-2 px-1.5 text-right font-mono tabular-nums text-slate-700">
                        {getPackRate(product, 2)}
                      </td>
                      <td className="py-2 px-1.5 text-right font-mono tabular-nums text-slate-700">
                        {getPackRate(product, 5)}
                      </td>
                      <td className="py-2 px-2 text-right font-mono tabular-nums font-bold text-[#153E90]">
                        {getPackRate(product, 20)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {displayedProducts.map((product) => {
              const pack = product.packs[product.defaultPackIndex] || product.packs[0];
              const isQuoteOnly = Boolean(product.priceNote) && pack.pricePerLiter <= 0;
              return (
                <div
                  key={product.id}
                  className="aspect-square bg-white border border-slate-200/90 hover:border-[#153E90] rounded-xl overflow-hidden flex flex-col transition-colors"
                >
                  {/* Top Minimalist Square Preview */}
                  <div className="relative flex-1 min-h-0 bg-slate-50/70 flex items-center justify-center p-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      aria-label={`Lihat ${product.name}`}
                      className="w-full h-full flex items-center justify-center cursor-pointer"
                    >
                      <PaintCanVisual
                        accentColor={product.canAccentColor}
                        secondaryColor={product.canSecondaryColor}
                        labelTitle={product.canLabelTitle}
                        labelSubtitle={product.canLabelSubtitle}
                        sizeLabel={pack.label}
                        className="w-16 h-[74px]"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        isQuoteOnly
                          ? onSelectProduct(product)
                          : onQuickAdd(product, defaultColor)
                      }
                      aria-label={`Tambah ${product.name} ke keranjang`}
                      className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-[#153E90] hover:text-white hover:border-[#153E90] text-[#153E90] flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Compact Minimalist Footer */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="h-[70px] shrink-0 px-2.5 py-2 bg-white border-t border-slate-100 flex flex-col justify-between text-left cursor-pointer"
                  >
                    <h3 className="text-[11px] font-bold text-slate-900 leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline justify-between gap-1 w-full">
                      {isQuoteOnly ? (
                        <span className="text-[9px] font-bold text-amber-700 truncate">
                          {product.priceNote}
                        </span>
                      ) : (
                        <span className="text-[11px] font-extrabold text-[#DC2626] font-mono tabular-nums truncate">
                          {formatRupiah(pack.pricePerLiter)}
                          <span className="text-[9px] font-sans font-medium text-slate-400">
                            /LT
                          </span>
                        </span>
                      )}
                      <span className="text-[9px] font-medium text-slate-400 shrink-0 tabular-nums">
                        {product.packs.length > 1
                          ? `${product.packs[0].sizeKg}–${product.packs[product.packs.length - 1].sizeKg}L`
                          : pack.label}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {!isFiltered && !showAll && visibleProducts.length > 24 && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="w-full mt-3 py-2.5 bg-white border border-slate-200 hover:border-[#153E90] rounded-xl text-xs font-extrabold text-[#153E90] cursor-pointer"
          >
            Tampilkan Semua {visibleProducts.length} Produk
          </button>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 5: DETAIL PRODUK
   ============================================================================ */
export const Screen5ProductDetail: React.FC<{
  product: PaintProduct;
  initialColor?: PaintColor;
  onAddToCart: (product: PaintProduct, packIndex: number, color: PaintColor) => void;
  onOpenCart: () => void;
  onOpenColorCatalog: () => void;
  onOpenCalculator: (product: PaintProduct, color: PaintColor) => void;
}> = ({
  product,
  initialColor,
  onAddToCart,
  onOpenCart,
  onOpenColorCatalog,
  onOpenCalculator,
}) => {
  const [packIndex, setPackIndex] = useState(product.defaultPackIndex);
  const [selectedColor, setSelectedColor] = useState<PaintColor>(
    initialColor || PAINT_COLORS[1]
  );
  const [added, setAdded] = useState(false);

  const safePackIndex = Math.min(packIndex, product.packs.length - 1);
  const activePack = product.packs[safePackIndex] || product.packs[0];
  const isQuoteOnly = Boolean(product.priceNote) && activePack.pricePerLiter <= 0;
  const swatches = PAINT_COLORS.slice(0, 6);

  const handleAdd = () => {
    if (isQuoteOnly) {
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1800);
      return;
    }
    onAddToCart(product, safePackIndex, selectedColor);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white">
      <div className="space-y-4 pb-6">
        {/* Product Showcase Backdrop - Realistic Room Photo */}
        <div className="relative h-56 bg-slate-100 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0">
            <RoomColorVisualizer
              primaryWallHex={selectedColor.hex}
              accentWallHex="#EFE2C8"
              scene={
                product.name.toUpperCase().includes('OUTDOOR') ||
                product.name.toUpperCase().includes('GENTENG')
                  ? 'eksterior'
                  : 'interior'
              }
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-white/15 to-transparent" />
          <div className="relative z-10 drop-shadow-xl">
            <PaintCanVisual
              accentColor={product.canAccentColor}
              secondaryColor={product.canSecondaryColor}
              labelTitle={product.canLabelTitle}
              labelSubtitle={product.canLabelSubtitle}
              selectedSwatchHex={product.supportsCustomColor ? selectedColor.hex : undefined}
              sizeLabel={activePack.label}
              className="w-40 h-44"
            />
          </div>
        </div>

        <div className="px-4 space-y-4">
          {/* Title, Price, Rating */}
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">{product.name}</h1>
            <p className="text-xs text-slate-500">{product.categoryLabel}</p>
            {isQuoteOnly ? (
              <p className="text-base font-extrabold text-amber-700 mt-1.5">
                {product.priceNote}
              </p>
            ) : (
              <div className="mt-1.5">
                <p className="text-2xl font-extrabold text-[#DC2626] font-mono tabular-nums">
                  {formatRupiah(activePack.pricePerLiter)}
                  <span className="text-xs font-sans font-bold text-slate-500"> / LT</span>
                </p>
                {activePack.sizeKg > 1 && (
                  <p className="text-xs font-semibold text-slate-700 font-mono tabular-nums">
                    Total kemasan {activePack.label}: {formatRupiah(activePack.price)}
                  </p>
                )}
              </div>
            )}
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-500">({product.reviewCount.toLocaleString('id-ID')} ulasan)</span>
            </div>
          </div>

          {/* 5 Checkmark Benefits */}
          <ul className="space-y-1.5 border-y border-slate-100 py-3">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-xs text-slate-700">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Pilih Warna */}
          {product.supportsCustomColor && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">
                  Pilih Warna: <span className="text-[#153E90]">{selectedColor.name}</span>
                </span>
                <button
                  type="button"
                  onClick={onOpenColorCatalog}
                  className="text-[11px] font-bold text-[#153E90] hover:underline cursor-pointer"
                >
                  Katalog 36 Warna &gt;
                </button>
              </div>
              <div className="flex items-center gap-2.5">
                {swatches.map((color) => {
                  const active = selectedColor.code === color.code;
                  return (
                    <button
                      key={color.code}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Pilih warna ${color.name}`}
                      className={`w-9 h-9 rounded-full border cursor-pointer flex items-center justify-center ${
                        active
                          ? 'ring-2 ring-[#153E90] ring-offset-1 border-slate-400'
                          : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {active && <Check className="w-3.5 h-3.5 text-slate-900" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ukuran Kemasan */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-900 block">Ukuran Kemasan</span>
            <div className="grid grid-cols-2 gap-2">
              {product.packs.map((pack, idx) => (
                <button
                  key={pack.label}
                  type="button"
                  onClick={() => setPackIndex(idx)}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-colors text-left ${
                    safePackIndex === idx
                      ? 'bg-[#153E90] text-white border-[#153E90]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="block">{pack.label}</span>
                  <span
                    className={`block text-[10px] font-mono tabular-nums ${
                      safePackIndex === idx ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {pack.pricePerLiter > 0
                      ? `${formatRupiah(pack.pricePerLiter)}/LT`
                      : product.priceNote || 'Order khusus'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenCalculator(product, selectedColor)}
            className="w-full py-2.5 rounded-xl border border-blue-200 bg-blue-50/60 text-[#153E90] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Hitung Kebutuhan Cat Warna Ini</span>
          </button>
        </div>
      </div>

      {/* Bottom Sticky Action Bar matching Screen 5 */}
      <div className="sticky bottom-0 z-10 p-3 bg-white border-t border-slate-200 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenCart}
          aria-label="Lihat keranjang"
          className="w-12 h-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer shrink-0"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 h-11 bg-[#DC2626] hover:bg-red-700 text-white text-sm font-extrabold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>{isQuoteOnly ? 'Permintaan Hitung Dikirim!' : 'Ditambahkan!'}</span>
            </>
          ) : (
            <span>{isQuoteOnly ? 'Ajukan Hitung Harga' : 'Tambah ke Keranjang'}</span>
          )}
        </button>
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 6: KERANJANG BELANJA
   ============================================================================ */
export const Screen6Cart: React.FC<{
  items: CartItem[];
  profile: UserProfile;
  selectedBranch: string;
  activePromoCode: string;
  onApplyPromo: (code: string) => void;
  onToggleItem: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckoutSuccess: (order: OrderRecord) => void;
  onExploreProducts: () => void;
}> = ({
  items,
  profile,
  selectedBranch,
  activePromoCode,
  onApplyPromo,
  onToggleItem,
  onUpdateQty,
  onCheckoutSuccess,
  onExploreProducts,
}) => {
  const [shippingMethod, setShippingMethod] = useState<'Armada DIVA (Gratis)' | 'Ekspedisi Reguler (Rp 45.000)'>('Armada DIVA (Gratis)');
  const [showShippingPicker, setShowShippingPicker] = useState(false);
  const [showVoucherPicker, setShowVoucherPicker] = useState(false);

  const selectedItems = items.filter((i) => i.selected);
  const subtotal = selectedItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const baseShipping =
    selectedItems.length === 0
      ? 0
      : shippingMethod.includes('Gratis')
        ? 0
        : 45000;

  const voucher = PROMO_VOUCHERS.find((v) => v.code === activePromoCode);
  let discount = 0;
  if (voucher && subtotal >= voucher.minSpend) {
    if (voucher.discountType === 'percent') discount = Math.round((subtotal * voucher.value) / 100);
    else if (voucher.discountType === 'fixed') discount = voucher.value;
  }
  const shippingFee =
    voucher?.discountType === 'shipping' ? 0 : baseShipping;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    const orderNum = Math.floor(240312010 + Math.random() * 800);
    const newOrder: OrderRecord = {
      id: `DIVA${orderNum}`,
      createdAt: 'Baru saja',
      customerName: profile.name,
      customerPhone: profile.phone,
      address: profile.address,
      destinationStore: `Toko Sinar Bangunan - ${profile.city}`,
      courier: 'Global Logistik',
      driverName: 'Budi Santoso',
      vehiclePlate: 'B 9123 GWI',
      branch: selectedBranch || BRANCHES[0],
      paymentMethod: 'Transfer Virtual Account BCA',
      items: selectedItems,
      subtotal,
      discount,
      shippingFee,
      total,
      promoCode: voucher?.code,
      stage: 'Pesanan Dibuat',
      stageTimestamps: {
        'Pesanan Dibuat': 'Baru saja',
        Diproduksi: 'Menunggu antrian',
        'Dalam Pengiriman': 'Menunggu armada',
        'Sampai Tujuan': 'Estimasi besok',
      },
      estimatedArrival: 'Besok · 14:00 WIB',
    };
    onCheckoutSuccess(newOrder);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 p-4 space-y-4">
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3">
            <ShoppingCart className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-900">Keranjang Belanja Kosong</p>
            <p className="text-xs text-slate-500">
              Pilih produk cat DIVA atau gunakan Kalkulator Cat untuk mengisi keranjang.
            </p>
            <button
              type="button"
              onClick={onExploreProducts}
              className="px-4 py-2 bg-[#153E90] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Belanja Produk
            </button>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center gap-3"
            >
              <div className="w-14 h-16 shrink-0 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100">
                <PaintCanVisual
                  accentColor={item.canAccentColor}
                  labelTitle={item.productName.replace('DIVA ', '')}
                  labelSubtitle="Cat"
                  selectedSwatchHex={item.color.hex}
                  className="w-12 h-14"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-slate-900 truncate">
                      {item.productName}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {item.categoryLabel} · {item.color.name}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => onToggleItem(item.id)}
                    aria-label={`Pilih ${item.productName}`}
                    className="w-4 h-4 accent-[#153E90] cursor-pointer"
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="px-2 py-0.5 border border-slate-200 rounded-md text-[10px] font-semibold text-slate-700">
                    {item.packLabel}
                  </span>
                  <div className="inline-flex items-center border border-slate-200 rounded-lg h-7">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-6 h-full flex items-center justify-center text-slate-600 cursor-pointer"
                      aria-label="Kurangi"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-6 h-full flex items-center justify-center text-slate-600 cursor-pointer"
                      aria-label="Tambah"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="mt-1.5 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#DC2626] font-bold tabular-nums">
                    {formatRupiah(item.unitPrice)}
                  </span>
                  <span className="text-slate-900 font-extrabold tabular-nums">
                    {formatRupiah(item.unitPrice * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Shipping & Voucher Rows */}
        {items.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
            <div>
              <button
                type="button"
                onClick={() => setShowShippingPicker((v) => !v)}
                className="w-full px-3.5 py-3 flex items-center justify-between text-xs font-semibold text-slate-800 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#153E90]" />
                  <span>{shippingMethod}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              {showShippingPicker && (
                <div className="px-3.5 pb-3 space-y-1.5">
                  {(
                    [
                      'Armada DIVA (Gratis)',
                      'Ekspedisi Reguler (Rp 45.000)',
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setShippingMethod(opt);
                        setShowShippingPicker(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs border cursor-pointer ${
                        shippingMethod === opt
                          ? 'border-[#153E90] bg-blue-50 font-bold text-[#153E90]'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowVoucherPicker((v) => !v)}
                className="w-full px-3.5 py-3 flex items-center justify-between text-xs font-semibold text-slate-800 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span>{voucher ? `Voucher: ${voucher.code}` : 'Voucher / Promo'}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              {showVoucherPicker && (
                <div className="px-3.5 pb-3 flex flex-wrap gap-1.5">
                  {PROMO_VOUCHERS.map((v) => (
                    <button
                      key={v.code}
                      type="button"
                      onClick={() => {
                        onApplyPromo(v.code === activePromoCode ? '' : v.code);
                        setShowVoucherPicker(false);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border cursor-pointer ${
                        activePromoCode === v.code
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {v.code}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Totals & CHECKOUT CTA */}
      {items.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {formatRupiah(subtotal)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Diskon Promo</span>
                <span className="font-mono tabular-nums">-{formatRupiah(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Ongkir</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {formatRupiah(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold pt-2 border-t border-slate-100">
              <span>Total</span>
              <span className="font-mono text-[#DC2626] tabular-nums">
                {formatRupiah(total)}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={selectedItems.length === 0}
            onClick={handleCheckout}
            className="w-full h-11 bg-[#DC2626] hover:bg-red-700 disabled:bg-slate-300 text-white text-sm font-extrabold rounded-xl cursor-pointer transition-colors"
          >
            CHECKOUT
          </button>

          <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#153E90]" />
            <span>Transaksi Anda Aman · Didukung sistem PT. Global Warna Indonesia</span>
          </p>
        </div>
      )}
    </div>
  );
};
