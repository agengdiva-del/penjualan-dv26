import React from 'react';
import {
  ArrowLeft,
  Bell,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Factory,
  FlaskConical,
  Heart,
  HelpCircle,
  Home,
  LayoutGrid,
  MapPin,
  Menu,
  Package,
  Palette,
  ScanLine,
  ShoppingCart,
  Trash2,
  User,
} from 'lucide-react';
import { ScreenId } from '../types';
import { DivaLogo, GlobalWarnaEmblem } from './DivaArtwork';

interface MobileHeaderProps {
  screen: ScreenId;
  title?: string;
  unreadCount: number;
  cartCount: number;
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  onOpenMenu?: () => void;
  onClearCart?: () => void;
}

export const MobileTopHeader: React.FC<MobileHeaderProps> = ({
  screen,
  title,
  unreadCount,
  cartCount,
  onNavigate,
  onBack,
  onOpenMenu,
  onClearCart,
}) => {
  // Screens 1 & 2 have no sticky app top bar
  if (screen === 'screen-1' || screen === 'screen-2') return null;

  // Screen 3: Hamburger + DIVA + Bell + Avatar
  if (screen === 'screen-3') {
    return (
      <header className="sticky top-0 z-20 h-13 bg-white border-b border-slate-100 px-3.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Menu navigasi"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate('screen-4')}
          className="cursor-pointer"
          aria-label="DIVA Beranda"
        >
          <DivaLogo size="sm" />
        </button>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onNavigate('screen-17')}
            aria-label="Notifikasi"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#DC2626] text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('screen-16')}
            aria-label="Profil"
            className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold cursor-pointer"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </header>
    );
  }

  // Screen 4: Hamburger + DIVA + Cart icon with badge
  if (screen === 'screen-4') {
    return (
      <header className="sticky top-0 z-20 h-13 bg-white border-b border-slate-100 px-3.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Menu navigasi"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <DivaLogo size="sm" />
        <button
          type="button"
          onClick={() => onNavigate('screen-6')}
          aria-label="Keranjang Belanja"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 relative cursor-pointer"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-[#DC2626] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
              {cartCount}
            </span>
          )}
        </button>
      </header>
    );
  }

  // Screen 5: Back + Favorite & Share
  if (screen === 'screen-5') {
    return (
      <header className="sticky top-0 z-20 h-13 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-3.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-800 hover:bg-slate-100 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-bold text-slate-900">Detail Produk</span>
        <button
          type="button"
          onClick={() => onNavigate('katalog-warna')}
          aria-label="Buka Katalog Warna"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#DC2626] hover:bg-red-50 cursor-pointer"
        >
          <Heart className="w-5 h-5" />
        </button>
      </header>
    );
  }

  // Screen 6: Back + Keranjang Belanja + Clear
  if (screen === 'screen-6') {
    return (
      <header className="sticky top-0 z-20 h-13 bg-white border-b border-slate-100 px-3.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-800 hover:bg-slate-100 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-extrabold text-slate-900">Keranjang Belanja</span>
        <button
          type="button"
          onClick={onClearCart}
          aria-label="Kosongkan keranjang"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-[#DC2626] hover:bg-red-50 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </header>
    );
  }

  // Enterprise Screens 7–18, Katalog Warna, Kalkulator: DIVA + PT. Global Warna Indonesia header matching reference sheets 2 & 3
  const showBackSubRow =
    screen === 'screen-9' ||
    screen === 'screen-16' ||
    screen === 'screen-17' ||
    screen === 'screen-18' ||
    screen === 'katalog-warna' ||
    screen === 'kalkulator';

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-100">
      <div className="h-12 px-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {onOpenMenu && (
            <button
              type="button"
              onClick={onOpenMenu}
              aria-label="Menu navigasi"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigate('screen-3')}
            className="cursor-pointer flex items-center"
            aria-label="Ke Dashboard Utama"
          >
            <DivaLogo size="sm" />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <GlobalWarnaEmblem className="w-6 h-6 shrink-0" />
          <div className="leading-none">
            <p className="text-[10px] font-extrabold text-[#153E90]">
              PT. Global Warna Indonesia
            </p>
            <p className="text-[8px] text-slate-500">Warna untuk Dunia yang Lebih Baik</p>
          </div>
        </div>
      </div>
      {showBackSubRow && (
        <div className="px-3.5 pb-2.5 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#153E90] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{title || 'Kembali'}</span>
          </button>
          {screen === 'screen-18' && (
            <button
              type="button"
              onClick={() => onNavigate('katalog-warna')}
              className="text-slate-400 hover:text-[#153E90] cursor-pointer"
              aria-label="Buka Katalog Warna"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </header>
  );
};

interface MobileBottomNavProps {
  screen: ScreenId;
  cartCount: number;
  unreadCount: number;
  onNavigate: (screen: ScreenId) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  screen,
  cartCount,
  unreadCount,
  onNavigate,
}) => {
  // No bottom nav on Splash, Login, PDP, Cart
  if (
    screen === 'screen-1' ||
    screen === 'screen-2' ||
    screen === 'screen-5' ||
    screen === 'screen-6'
  ) {
    return null;
  }

  // Sales / Catalog / Calculator bottom bar matching Screen 4
  if (
    screen === 'screen-4' ||
    screen === 'katalog-warna' ||
    screen === 'kalkulator'
  ) {
    const tabs = [
      { id: 'screen-4' as ScreenId, label: 'Beranda', icon: Home },
      { id: 'katalog-warna' as ScreenId, label: 'Warna', icon: Palette },
      { id: 'kalkulator' as ScreenId, label: 'Kalkulator', icon: Calculator },
      { id: 'screen-6' as ScreenId, label: 'Keranjang', icon: ShoppingCart, badge: cartCount },
      { id: 'screen-7' as ScreenId, label: 'Pesanan', icon: ClipboardList },
    ];
    return (
      <nav className="sticky bottom-0 z-20 h-15 bg-white border-t border-slate-200 grid grid-cols-5 items-center shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = screen === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              className={`h-full flex flex-col items-center justify-center gap-0.5 relative cursor-pointer ${
                active ? 'text-[#DC2626]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className="w-4.5 h-4.5" />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-1 rounded-full bg-[#DC2626] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  // Enterprise / Factory / Management / AI Matching bottom bar matching Screens 3 & 7-18
  const middleTab = (() => {
    if (screen === 'screen-7') return { id: 'screen-7' as ScreenId, label: 'Lacak', icon: MapPin };
    if (screen === 'screen-8' || screen === 'screen-9')
      return { id: 'screen-8' as ScreenId, label: 'Produksi', icon: Factory };
    if (screen === 'screen-10') return { id: 'screen-10' as ScreenId, label: 'Formula', icon: FlaskConical };
    if (screen === 'screen-11') return { id: 'screen-11' as ScreenId, label: 'QC', icon: CheckCircle2 };
    if (screen === 'screen-12') return { id: 'screen-12' as ScreenId, label: 'Bahan Baku', icon: Package };
    if (screen === 'screen-13') return { id: 'screen-13' as ScreenId, label: 'Gudang', icon: Package };
    if (screen === 'screen-14') return { id: 'screen-14' as ScreenId, label: 'Approval', icon: CheckCircle2 };
    if (screen === 'screen-15') return { id: 'screen-15' as ScreenId, label: 'Dashboard', icon: LayoutGrid };
    if (screen === 'screen-18') return { id: 'screen-18' as ScreenId, label: 'Warna AI', icon: ScanLine };
    return { id: 'screen-4' as ScreenId, label: 'Produk', icon: LayoutGrid };
  })();

  const navTabs = [
    { id: 'screen-3' as ScreenId, label: 'Beranda', icon: Home },
    { id: middleTab.id, label: middleTab.label, icon: middleTab.icon },
    { id: 'screen-18' as ScreenId, label: 'Warna AI', icon: ScanLine },
    { id: 'screen-17' as ScreenId, label: 'Notifikasi', icon: Bell, badge: unreadCount },
    { id: 'screen-16' as ScreenId, label: 'Akun', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 z-20 h-15 bg-white border-t border-slate-200 grid grid-cols-5 items-center shrink-0">
      {navTabs.map((tab, idx) => {
        const Icon = tab.icon;
        const active = screen === tab.id && !(idx === 2 && middleTab.id === 'screen-18');
        const isHighlightedMiddle = idx === 1 && screen === middleTab.id;
        return (
          <button
            key={`${tab.id}-${idx}`}
            type="button"
            onClick={() => onNavigate(tab.id)}
            className={`h-full flex flex-col items-center justify-center gap-0.5 relative cursor-pointer ${
              active || isHighlightedMiddle
                ? 'text-[#DC2626]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Icon className="w-4.5 h-4.5" />
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-1 rounded-full bg-[#DC2626] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

interface PhoneFrameShellProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  children: React.ReactNode;
}

export const PhoneFrameShell: React.FC<PhoneFrameShellProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-[460px] min-h-screen bg-slate-50 sm:border-x sm:border-slate-200/80 sm:shadow-sm flex flex-col relative">
        {children}
      </div>
    </div>
  );
};
