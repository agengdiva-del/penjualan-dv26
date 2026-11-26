import React, { useMemo, useState } from 'react';
import {
  Calculator,
  Check,
  Copy,
  Heart,
  Search,
  ShoppingCart,
} from 'lucide-react';
import { PAINT_COLORS, PAINT_PRODUCTS, formatRupiah } from '../data/paintData';
import { ColorFamily, PaintColor, PaintProduct } from '../types';
import { RoomColorVisualizer } from './DivaArtwork';

interface ColorCatalogViewProps {
  initialSearch?: string;
  favoriteColors: string[];
  onToggleFavoriteColor: (code: string) => void;
  onUseColorInCalculator: (color: PaintColor, suggestedProduct: PaintProduct) => void;
  onOrderWithColor: (product: PaintProduct, color: PaintColor) => void;
}

const COLOR_FAMILIES: ('Semua' | ColorFamily | 'Favorit')[] = [
  'Semua',
  'Putih & Netral',
  'Biru & Samudra',
  'Kuning & Hangat',
  'Hijau & Alam',
  'Merah & Terracotta',
  'Pastel & Modern',
  'Favorit',
];

export const ColorCatalogView: React.FC<ColorCatalogViewProps> = ({
  initialSearch = '',
  favoriteColors,
  onToggleFavoriteColor,
  onUseColorInCalculator,
  onOrderWithColor,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [familyFilter, setFamilyFilter] = useState<'Semua' | ColorFamily | 'Favorit'>('Semua');
  const [primaryColor, setPrimaryColor] = useState<PaintColor>(
    PAINT_COLORS.find((c) => c.code === 'DV-202') || PAINT_COLORS[0]
  );
  const [accentColor, setAccentColor] = useState<PaintColor>(
    PAINT_COLORS.find((c) => c.code === 'DV-301') || PAINT_COLORS[12]
  );
  const [pickingSlot, setPickingSlot] = useState<'primary' | 'accent'>('primary');
  const [scene, setScene] = useState<'interior' | 'eksterior' | 'kayu-besi'>('interior');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredColors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PAINT_COLORS.filter((color) => {
      if (familyFilter === 'Favorit' && !favoriteColors.includes(color.code)) {
        return false;
      }
      if (familyFilter !== 'Semua' && familyFilter !== 'Favorit' && color.family !== familyFilter) {
        return false;
      }
      if (!q) return true;
      return (
        color.name.toLowerCase().includes(q) ||
        color.code.toLowerCase().includes(q) ||
        color.family.toLowerCase().includes(q) ||
        color.undertone.toLowerCase().includes(q)
      );
    });
  }, [familyFilter, favoriteColors, searchQuery]);

  const suggestedProduct = useMemo(() => {
    if (scene === 'eksterior') {
      return (
        PAINT_PRODUCTS.find((p) => p.name === 'CAT TEMBOK OUTDOOR WHITE HIGH') ||
        PAINT_PRODUCTS[0]
      );
    }
    if (scene === 'kayu-besi') {
      return (
        PAINT_PRODUCTS.find((p) => p.name === 'SYNTETIC ALL COLOUR') ||
        PAINT_PRODUCTS[0]
      );
    }
    return (
      PAINT_PRODUCTS.find((p) => p.name === 'CAT TEMBOK WARNA INDOOR MUDA') ||
      PAINT_PRODUCTS[0]
    );
  }, [scene]);

  const suggestedPack =
    suggestedProduct.packs[suggestedProduct.defaultPackIndex] || suggestedProduct.packs[0];

  const handleSelectSwatch = (color: PaintColor) => {
    if (pickingSlot === 'primary') {
      setPrimaryColor(color);
    } else {
      setAccentColor(color);
    }
  };

  const handleCopyCode = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      {/* Compact Header & Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-extrabold text-[#153E90]">
            Katalog &amp; Simulasi Warna DIVA
          </h1>
          <p className="text-[11px] text-slate-500">
            Pilih warna untuk pratinjau langsung pada ruangan &amp; lanjut hitung kebutuhan cat.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau kode warna (DV-202)..."
            className="w-full h-9 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#153E90]"
          />
        </div>
      </div>

      {/* 12-Col Split: Left Visualizer / Right Swatch Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-2.5 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto">
            {(
              [
                { id: 'interior', label: 'Ruang Tamu' },
                { id: 'eksterior', label: 'Fasad Luar' },
                { id: 'kayu-besi', label: 'Kayu & Besi' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScene(item.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap cursor-pointer ${
                  scene === item.id ? 'bg-[#153E90] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="h-56 bg-slate-100">
            <RoomColorVisualizer
              primaryWallHex={primaryColor.hex}
              accentWallHex={accentColor.hex}
              scene={scene}
            />
          </div>

          <div className="p-3.5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-10 h-10 rounded-lg border border-slate-300 shrink-0"
                  style={{ backgroundColor: primaryColor.hex }}
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-mono text-slate-500">
                    {primaryColor.code} · LRV {primaryColor.lrv}%
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 truncate">
                    {primaryColor.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyCode(primaryColor.code)}
                  className="px-2 py-1.5 rounded-lg border border-slate-200 text-[10px] font-mono font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode === primaryColor.code ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400" />
                  )}
                  <span>{primaryColor.hex}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleFavoriteColor(primaryColor.code)}
                  aria-label="Favoritkan"
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center cursor-pointer"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      favoriteColors.includes(primaryColor.code)
                        ? 'fill-[#DC2626] text-[#DC2626]'
                        : 'text-slate-400'
                    }`}
                  />
                </button>
              </div>
            </div>

            {scene !== 'kayu-besi' && (
              <div className="flex items-center justify-between bg-slate-50 rounded-lg p-2 text-[11px]">
                <span className="text-slate-600">
                  Aksen: <strong className="text-slate-900">{accentColor.name}</strong>
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setPickingSlot('primary')}
                    className={`px-2 py-0.5 rounded font-bold cursor-pointer ${
                      pickingSlot === 'primary'
                        ? 'bg-[#153E90] text-white'
                        : 'bg-white text-slate-600'
                    }`}
                  >
                    Utama
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickingSlot('accent')}
                    className={`px-2 py-0.5 rounded font-bold cursor-pointer ${
                      pickingSlot === 'accent'
                        ? 'bg-[#153E90] text-white'
                        : 'bg-white text-slate-600'
                    }`}
                  >
                    Aksen
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUseColorInCalculator(primaryColor, suggestedProduct)}
                className="py-2 bg-[#153E90] hover:bg-blue-900 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Hitung Cat</span>
              </button>
              <button
                type="button"
                onClick={() => onOrderWithColor(suggestedProduct, primaryColor)}
                className="py-2 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{formatRupiah(suggestedPack.price)}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right: Family Tabs + Swatch Grid */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {COLOR_FAMILIES.map((family) => (
              <button
                key={family}
                type="button"
                onClick={() => setFamilyFilter(family)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap cursor-pointer ${
                  familyFilter === family
                    ? 'bg-[#153E90] text-white'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {family}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {filteredColors.map((color) => {
              const isPrimary = primaryColor.code === color.code;
              const isAccent = accentColor.code === color.code;
              return (
                <div
                  key={color.code}
                  className={`bg-white rounded-lg overflow-hidden border flex flex-col ${
                    isPrimary
                      ? 'border-[#153E90] ring-2 ring-[#153E90]/20'
                      : isAccent
                        ? 'border-amber-500 ring-2 ring-amber-500/20'
                        : 'border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectSwatch(color)}
                    className="h-14 w-full relative cursor-pointer"
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Pilih warna ${color.name}`}
                  >
                    {(isPrimary || isAccent) && (
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-slate-900/80 text-white text-[9px] font-bold rounded">
                        {isPrimary ? 'Utama' : 'Aksen'}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectSwatch(color)}
                    className="p-1.5 text-left cursor-pointer"
                  >
                    <p className="text-[9px] font-mono text-slate-500">{color.code}</p>
                    <p className="text-[11px] font-bold text-slate-900 truncate">{color.name}</p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
