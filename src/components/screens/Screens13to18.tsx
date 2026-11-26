import React, { useRef, useState } from 'react';
import {
  ArrowRightLeft,
  Award,
  Camera,
  CheckCircle2,
  ClipboardList,
  Download,
  Factory,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  QrCode,
  Search,
  ShoppingCart,
  Sparkles,
  Tag,
  TrendingUp,
  Truck,
  Upload,
  User,
  Wallet,
} from 'lucide-react';
import { PAINT_COLORS, PAINT_PRODUCTS, formatRupiah } from '../../data/paintData';
import {
  AiColorMatchResult,
  AppNotification,
  ApprovalRequest,
  FinishedGoodStock,
  OrderRecord,
  PaintColor,
  PaintProduct,
} from '../../types';
import { PaintCanVisual, RoomColorVisualizer } from '../DivaArtwork';

/* ============================================================================
   SCREEN 13: GUDANG BARANG JADI
   ============================================================================ */
export const Screen13FinishedGoods: React.FC<{
  stockList: FinishedGoodStock[];
}> = ({ stockList }) => {
  const [search, setSearch] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const totalPails = stockList.reduce((sum, s) => sum + s.pailCount, 6680);
  const filtered = stockList.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(search.toLowerCase())
  );

  const triggerWarehouseAction = (label: string) => {
    setActionNotice(`${label} diproses oleh sistem gudang PT. Global Warna Indonesia.`);
    window.setTimeout(() => setActionNotice(null), 2400);
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      {/* Top Strip: Banner + 2 KPIs + 4 Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-5 relative rounded-xl overflow-hidden bg-slate-900 text-white min-h-[88px] p-3.5 flex flex-col justify-end border border-slate-200">
          <img
            src="/src/assets/images/banner_warehouse_finished_1795599022287.jpg"
            alt="Gudang barang jadi cat DIVA"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-[#153E90]/45" />
          <div className="relative z-10">
            <p className="text-sm font-extrabold">Gudang Barang Jadi</p>
            <p className="text-[11px] text-blue-100">
              Kelola stok produk siap jual di seluruh lini gudang
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-cols-2 gap-2.5">
          <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-center">
            <p className="text-[11px] text-slate-500">Total Stok</p>
            <p className="text-lg font-extrabold font-mono text-slate-900 tabular-nums mt-0.5">
              {totalPails.toLocaleString('id-ID')}{' '}
              <span className="text-xs font-sans font-semibold text-slate-500">Pail</span>
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-center">
            <p className="text-[11px] text-slate-500">Kapasitas Gudang</p>
            <p className="text-lg font-extrabold font-mono text-slate-900 tabular-nums mt-0.5">
              78%
            </p>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-emerald-600 rounded-full w-[78%]" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-2 gap-2">
          {[
            { label: 'Scan Barcode', icon: QrCode },
            { label: 'Transfer Gudang', icon: ArrowRightLeft },
            { label: 'Mutasi Stok', icon: FileText },
            { label: 'Export Data', icon: Download },
          ].map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.label}
                type="button"
                onClick={() => triggerWarehouseAction(act.label)}
                className="p-2 bg-white border border-slate-200 hover:border-[#153E90] rounded-xl flex items-center gap-1.5 text-left cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-[#153E90] shrink-0" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight truncate">
                  {act.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk di gudang barang jadi..."
          className="w-full h-9 pl-9 pr-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#153E90]"
        />
      </div>

      {actionNotice && (
        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-[#153E90]">
          {actionNotice}
        </div>
      )}

      {/* Product Stock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-12 shrink-0">
                <PaintCanVisual
                  accentColor={item.accentColor}
                  secondaryColor={item.secondaryColor}
                  labelTitle={item.labelTitle}
                  labelSubtitle="Cat"
                  className="w-full h-full"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-slate-900 truncate">{item.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{item.categoryLabel}</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-xs font-extrabold font-mono text-slate-900 tabular-nums">
                {item.pailCount.toLocaleString('id-ID')}{' '}
                <span className="font-sans font-semibold text-slate-500">Pail</span>
              </p>
              <span
                className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.status === 'Aman'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 14: APPROVAL MANAGER
   ============================================================================ */
export const Screen14ApprovalManager: React.FC<{
  approvals: ApprovalRequest[];
  onDecision: (id: string, status: 'Disetujui' | 'Ditolak') => void;
}> = ({ approvals, onDecision }) => {
  const [tab, setTab] = useState<'Menunggu' | 'Disetujui' | 'Ditolak'>('Menunggu');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const pendingCount = approvals.filter((a) => a.status === 'Menunggu').length;
  const visible = approvals.filter((a) => a.status === tab);

  const categoryCounts = [
    {
      label: 'Produksi',
      count: approvals.filter((a) => a.category === 'Produksi' && a.status === 'Menunggu').length + 4,
      bg: 'bg-[#DC2626]',
      icon: Factory,
    },
    {
      label: 'Pembelian',
      count: approvals.filter((a) => a.category === 'Pembelian' && a.status === 'Menunggu').length + 2,
      bg: 'bg-[#153E90]',
      icon: ShoppingCart,
    },
    {
      label: 'Promo Dealer',
      count: approvals.filter((a) => a.category === 'Promo Dealer' && a.status === 'Menunggu').length + 1,
      bg: 'bg-amber-500',
      icon: Tag,
    },
    {
      label: 'Lainnya',
      count: approvals.filter((a) => a.category === 'Lainnya' && a.status === 'Menunggu').length,
      bg: 'bg-slate-600',
      icon: ClipboardList,
    },
  ];

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      {/* Header + Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-extrabold text-[#153E90]">Persetujuan Manager</h1>
          <p className="text-[11px] text-slate-500">Kelola dan setujui permintaan lintas divisi</p>
        </div>
        <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
          {(['Menunggu', 'Disetujui', 'Ditolak'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-md cursor-pointer ${
                tab === t ? 'bg-[#153E90] text-white' : 'text-slate-600'
              }`}
            >
              <span>{t}</span>
              {t === 'Menunggu' && pendingCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded bg-[#DC2626] text-white text-[10px] font-mono">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Category Summary Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {categoryCounts.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.label}
              className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3"
            >
              <div
                className={`w-9 h-9 rounded-lg ${cat.bg} text-white flex items-center justify-center shrink-0`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-500">{cat.label}</p>
                <p className="text-base font-extrabold font-mono text-slate-900 tabular-nums">
                  {cat.count}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Request Cards */}
      {visible.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-xs text-slate-500">
          Tidak ada permintaan pada tab {tab}.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {visible.map((req) => (
            <div
              key={req.id}
              className="bg-white border border-slate-200 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#153E90]">Permintaan {req.category}</span>
                <span className="text-slate-500">{req.date}</span>
              </div>

              <h2 className="text-sm font-extrabold text-slate-900">{req.title}</h2>

              <div className="space-y-1 text-xs">
                {req.details.map((d) => (
                  <div key={d.label} className="grid grid-cols-12 gap-2">
                    <span className="col-span-5 text-slate-500">{d.label}</span>
                    <span className="col-span-7 font-bold text-slate-900">: {d.value}</span>
                  </div>
                ))}
              </div>

              {expandedId === req.id && (
                <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-100">
                  Dokumen anggaran dan jadwal produksi telah diverifikasi oleh tim finance PT. Global Warna Indonesia.
                </div>
              )}

              {req.status === 'Menunggu' ? (
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onDecision(req.id, 'Disetujui')}
                    className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => onDecision(req.id, 'Ditolak')}
                    className="py-2 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                    className="py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    Lihat Detail
                  </button>
                </div>
              ) : (
                <p
                  className={`text-xs font-bold ${
                    req.status === 'Disetujui' ? 'text-emerald-700' : 'text-[#DC2626]'
                  }`}
                >
                  Status: {req.status}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   SCREEN 15: DASHBOARD DIREKSI
   ============================================================================ */
export const Screen15DirectorDashboard: React.FC<{
  onOpenDealer: () => void;
}> = ({ onOpenDealer }) => {
  const [metricTab, setMetricTab] = useState<'Penjualan' | 'Produksi' | 'Distribusi' | 'Top Produk'>('Penjualan');

  const bars = [
    { month: 'Jan', val: 14 },
    { month: 'Feb', val: 19 },
    { month: 'Mar', val: 23 },
    { month: 'Apr', val: 26 },
    { month: 'May', val: 31 },
    { month: 'Jun', val: 35 },
  ];

  const topDealers = [
    { name: '1. Sinar Bangunan', sales: 'Rp 1,25 M' },
    { name: '2. Mega Warna', sales: 'Rp 980 Jt' },
    { name: '3. Jaya Abadi', sales: 'Rp 840 Jt' },
    { name: '4. Citra Mandiri', sales: 'Rp 760 Jt' },
    { name: '5. Toko Makmur', sales: 'Rp 690 Jt' },
  ];

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      {/* Header + Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-extrabold text-[#153E90]">Halo Direktur,</h1>
          <p className="text-[11px] text-slate-500">Ringkasan kinerja nasional PT. Global Warna Indonesia · 12 Mar 2025</p>
        </div>
        <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
          {(['Penjualan', 'Produksi', 'Distribusi', 'Top Produk'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setMetricTab(t)}
              className={`px-3 py-1.5 rounded-md cursor-pointer ${
                metricTab === t ? 'bg-[#153E90] text-white' : 'text-slate-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 4 KPI Cards in 1 row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Penjualan</p>
            <p className="text-base font-extrabold font-mono text-slate-900 tabular-nums">Rp 12,8 M</p>
            <p className="text-[10px] font-bold text-emerald-700">+18%</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#153E90] text-white flex items-center justify-center shrink-0">
            <Factory className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Produksi</p>
            <p className="text-base font-extrabold font-mono text-slate-900 tabular-nums">95%</p>
            <p className="text-[10px] font-bold text-emerald-700">+5%</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500">OTIF Delivery</p>
            <p className="text-base font-extrabold font-mono text-slate-900 tabular-nums">98%</p>
            <p className="text-[10px] font-bold text-emerald-700">+2%</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-violet-600 text-white flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Profit Margin</p>
            <p className="text-base font-extrabold font-mono text-slate-900 tabular-nums">22%</p>
            <p className="text-[10px] font-bold text-emerald-700">+3%</p>
          </div>
        </div>
      </div>

      {/* Bottom 12-col Split: Chart + Map + Top 5 Dealer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold text-slate-900">
              {metricTab} Nasional (Rp Miliar)
            </p>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              +18% YoY
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-4 border-b border-slate-100">
            {bars.map((b) => (
              <div key={b.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[10px] font-mono font-bold text-slate-500">{b.val}</span>
                <div
                  className="w-full max-w-[30px] bg-[#153E90] rounded-t"
                  style={{ height: `${Math.round((b.val / 38) * 100)}%` }}
                />
                <span className="text-[11px] text-slate-500">{b.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-2">
          <p className="text-xs font-extrabold text-slate-900">Penjualan per Wilayah</p>
          <svg viewBox="0 0 180 90" className="w-full h-32">
            <path d="M10 35 L38 55 L42 65 L24 58 Z" fill="#153E90" />
            <path d="M46 66 L90 70 L88 78 L46 74 Z" fill="#153E90" />
            <path d="M62 30 L92 26 L94 52 L65 54 Z" fill="#60A5FA" />
            <path d="M104 34 L124 32 L118 58 L104 54 Z" fill="#93C5FD" />
            <path d="M142 42 L172 46 L172 64 L144 58 Z" fill="#CBD5E1" />
          </svg>
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#153E90] inline-block" /> Tinggi
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400 inline-block" /> Sedang
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-slate-300 inline-block" /> Rendah
            </span>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 space-y-2.5">
          <p className="text-xs font-extrabold text-slate-900">Top 5 Dealer</p>
          <div className="space-y-2">
            {topDealers.map((d, i) => (
              <button
                key={d.name}
                type="button"
                onClick={i === 0 ? onOpenDealer : undefined}
                className="w-full flex items-center justify-between text-xs text-left hover:text-[#153E90] cursor-pointer py-1 border-b border-slate-100 last:border-b-0"
              >
                <span className="font-semibold text-slate-700 truncate">{d.name}</span>
                <span className="font-mono font-bold text-slate-900 shrink-0 tabular-nums">
                  {d.sales}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 16: PROFIL DEALER
   ============================================================================ */
export const Screen16DealerProfile: React.FC<{
  orders: OrderRecord[];
  onViewAllOrders: () => void;
}> = ({ orders, onViewAllOrders }) => {
  const [tab, setTab] = useState<'histori' | 'reward' | 'info'>('histori');

  const sampleHistory = [
    { date: '12 Mar 2025', item: 'MSS - 510 LO (20 LT)', total: 4200000, status: 'Selesai' },
    { date: '5 Mar 2025', item: 'MT - 610 CLEAR GLOSS (20 LT)', total: 4950000, status: 'Selesai' },
    { date: '20 Feb 2025', item: 'EPOXY ALL COLOUR standar (1 LT)', total: 1300000, status: 'Selesai' },
  ];

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
      {/* Left: Dealer Info + KPIs */}
      <div className="lg:col-span-5 space-y-3">
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-base font-extrabold text-slate-900">Toko Sinar Bangunan</h1>
              <p className="text-[11px] text-slate-500 flex items-start gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                <span>Jl. Merdeka No. 123, Bandung Jawa Barat</span>
              </p>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-center shrink-0">
              <Award className="w-4 h-4 text-amber-600 mx-auto" />
              <p className="text-[10px] font-extrabold text-amber-800">Gold Dealer</p>
              <p className="text-[9px] text-amber-700">Sejak 2022</p>
            </div>
          </div>

          <div className="space-y-1 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <p className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>PIC : Budi Santoso</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>0812 3456 7890</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>budi@sinarbangunan.co.id</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white border border-slate-200 rounded-xl p-2.5">
            <p className="text-[10px] text-slate-500">Total Pembelian</p>
            <p className="text-[11px] font-extrabold font-mono text-slate-900 mt-0.5 tabular-nums">
              Rp 1.250 Jt
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-2.5">
            <p className="text-[10px] text-slate-500">Order Tahun Ini</p>
            <p className="text-xs font-extrabold font-mono text-[#153E90] mt-0.5 tabular-nums">
              {244 + orders.length} Order
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-2.5">
            <p className="text-[10px] text-slate-500">Outstanding</p>
            <p className="text-[11px] font-extrabold font-mono text-[#DC2626] mt-0.5 tabular-nums">
              Rp 120 Jt
            </p>
          </div>
        </div>
      </div>

      {/* Right: Tabs + Content */}
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-3 border-b border-slate-200 text-xs font-bold">
          {(
            [
              { id: 'histori', label: 'Histori Transaksi' },
              { id: 'reward', label: 'Reward Point' },
              { id: 'info', label: 'Informasi Kredit' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`pb-2 border-b-2 cursor-pointer ${
                tab === t.id
                  ? 'border-[#153E90] text-[#153E90]'
                  : 'border-transparent text-slate-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'histori' && (
          <div className="space-y-2">
            {sampleHistory.map((h) => (
              <div
                key={h.date + h.item}
                className="border border-slate-200 rounded-lg p-3 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="text-[10px] text-slate-500">{h.date}</p>
                  <p className="font-bold text-slate-900">{h.item}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-extrabold text-slate-900 tabular-nums">
                    {formatRupiah(h.total)}
                  </p>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    {h.status}
                  </span>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={onViewAllOrders}
              className="w-full py-2 border border-[#153E90] text-[#153E90] text-xs font-bold rounded-lg hover:bg-blue-50 cursor-pointer"
            >
              Lihat Semua Transaksi
            </button>
          </div>
        )}

        {tab === 'reward' && (
          <div className="space-y-2 text-xs">
            <p className="text-slate-500">Poin Mitra Gold Dealer</p>
            <p className="text-2xl font-extrabold font-mono text-amber-600 tabular-nums">
              24.850 Poin
            </p>
            <p className="text-slate-600">
              Tukarkan poin dengan voucher potongan produk DIVA atau mesin tinting cabang.
            </p>
          </div>
        )}

        {tab === 'info' && (
          <div className="space-y-2 text-xs text-slate-700">
            <p>
              <span className="font-bold">Batas Kredit:</span> Rp 500.000.000 (TOP 30 Hari)
            </p>
            <p>
              <span className="font-bold">Cabang Pembina:</span> Bandung (Cabang Jawa Barat)
            </p>
            <p>
              <span className="font-bold">Sales Eksekutif:</span> Hendra Wijaya
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 17: NOTIFICATION CENTER
   ============================================================================ */
export const Screen17Notifications: React.FC<{
  notifications: AppNotification[];
  onOpenNotification: (notif: AppNotification) => void;
}> = ({ notifications, onOpenNotification }) => {
  const [filter, setFilter] = useState<'Semua' | 'Produksi' | 'Penjualan' | 'Gudang' | 'QC'>('Semua');

  const filtered = notifications.filter((n) =>
    filter === 'Semua' ? true : n.category === filter
  );

  const getBadgeStyle = (cat: AppNotification['category']) => {
    switch (cat) {
      case 'QC':
        return { bg: 'bg-emerald-600', icon: CheckCircle2 };
      case 'Penjualan':
        return { bg: 'bg-[#153E90]', icon: ShoppingCart };
      case 'Gudang':
        return { bg: 'bg-amber-500', icon: Package };
      case 'Produksi':
        return { bg: 'bg-[#DC2626]', icon: Factory };
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-extrabold text-[#153E90]">Pusat Notifikasi</h1>
          <p className="text-[11px] text-slate-500">Pembaruan QC, order dealer, stok &amp; lini produksi</p>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['Semua', 'Produksi', 'Penjualan', 'Gudang', 'QC'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer ${
                filter === cat
                  ? 'bg-[#153E90] text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
        {filtered.map((n) => {
          const style = getBadgeStyle(n.category);
          const Icon = style.icon;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => onOpenNotification(n)}
              className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                n.unread
                  ? 'bg-white border-[#153E90]/35 hover:border-[#153E90]'
                  : 'bg-white border-slate-200 opacity-85 hover:opacity-100'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg ${style.bg} text-white flex items-center justify-center shrink-0 mt-0.5`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-extrabold text-slate-900 leading-snug">{n.title}</p>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">
                    {n.timeAgo}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.message}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 18: AI COLOR MATCHING
   ============================================================================ */
const DEFAULT_SAMPLE_ROOM_PHOTO = '/src/assets/images/photo_room_ivory_1795599022734.jpg';

async function createTintedRoomPhotoDataUrl(tintHex: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 480;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(DEFAULT_SAMPLE_ROOM_PHOTO);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 0.42;
      ctx.fillStyle = tintHex;
      ctx.fillRect(0, 0, canvas.width, Math.round(canvas.height * 0.72));
      ctx.restore();
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.onerror = () => resolve(DEFAULT_SAMPLE_ROOM_PHOTO);
    img.src = DEFAULT_SAMPLE_ROOM_PHOTO;
  });
}

async function imageUrlToBase64(imageUrl: string): Promise<{ base64: string; mimeType: string }> {
  if (imageUrl.startsWith('data:image/') && !imageUrl.startsWith('data:image/svg+xml')) {
    const mime = imageUrl.substring(imageUrl.indexOf(':') + 1, imageUrl.indexOf(';'));
    return { base64: imageUrl, mimeType: mime || 'image/jpeg' };
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 480;
      canvas.height = img.naturalHeight || 360;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context unavailable'));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve({ base64: canvas.toDataURL('image/jpeg', 0.9), mimeType: 'image/jpeg' });
    };
    img.onerror = () => reject(new Error('Gagal memproses foto ruangan.'));
    img.src = imageUrl;
  });
}

export const Screen18AiColorMatching: React.FC<{
  onUseColorInDetail: (product: PaintProduct, color: PaintColor) => void;
  onAddToCart: (product: PaintProduct, packIndex: number, color: PaintColor) => void;
}> = ({ onUseColorInDetail, onAddToCart }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>(DEFAULT_SAMPLE_ROOM_PHOTO);
  const [packIndex, setPackIndex] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<AiColorMatchResult>({
    matchedCode: 'DIV-WH-210',
    matchedName: 'Soft Ivory',
    matchedHex: '#EDE3C8',
    similarityPercent: 98,
    surfaceObservation: 'Dinding interior bernuansa krem gading hangat dengan pencahayaan lembut.',
    recommendedProductId: 'CAT TEMBOK WARNA INDOOR MUDA',
    pairingSuggestion: 'Kuning Mentari (DV-301)',
  });

  const recommendedProduct =
    PAINT_PRODUCTS.find(
      (p) =>
        p.id === matchResult.recommendedProductId ||
        p.name.toLowerCase() === matchResult.recommendedProductId.toLowerCase()
    ) ||
    PAINT_PRODUCTS.find((p) => p.name === 'CAT TEMBOK WARNA INDOOR MUDA') ||
    PAINT_PRODUCTS[0];
  const safePackIndex = Math.min(packIndex, recommendedProduct.packs.length - 1);

  const matchedColorObj: PaintColor =
    PAINT_COLORS.find((c) => c.code === matchResult.matchedCode) || {
      code: matchResult.matchedCode,
      name: matchResult.matchedName,
      hex: matchResult.matchedHex,
      family: 'Putih & Netral',
      recommendedFor: ['Interior'],
      undertone: 'AI Matched',
      lrv: 75,
    };

  const runGeminiAnalysis = async (rawDataUrl: string) => {
    setPreviewUrl(rawDataUrl);
    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const { base64, mimeType } = await imageUrlToBase64(rawDataUrl);
      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const res = await fetch(`${apiBase}/api/color-match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          mimeType,
          palette: PAINT_COLORS.slice(0, 20).map((c) => ({
            code: c.code,
            name: c.name,
            hex: c.hex,
            family: c.family,
          })),
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(
          'Layanan AI Color Matching memerlukan koneksi ke server backend (set VITE_API_BASE_URL saat build APK).'
        );
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menganalisis foto ruangan.');
      }

      setMatchResult(data as AiColorMatchResult);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Terjadi kesalahan saat menganalisis foto.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        runGeminiAnalysis(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      {/* Header + Upload Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-extrabold text-[#153E90]">Smart Color Matching</h1>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[11px] text-slate-500">
            Temukan padanan warna DIVA® secara otomatis dari foto ruangan Anda
          </p>
        </div>

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFilePicked}
          className="hidden"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFilePicked}
          className="hidden"
        />

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-slate-500 font-semibold mr-1">Sampel:</span>
            {[
              { label: 'Ivory', hex: '#EDE3C8' },
              { label: 'Biru Samudra', hex: '#2B6CB0' },
              { label: 'Hijau Sage', hex: '#95B89E' },
            ].map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={async () => {
                  const tintedUrl = await createTintedRoomPhotoDataUrl(sample.hex);
                  runGeminiAnalysis(tintedUrl);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#153E90] font-semibold text-slate-700 cursor-pointer"
              >
                {sample.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="h-9 px-3 bg-[#153E90] hover:bg-blue-900 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Ambil Foto</span>
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-9 px-3 bg-white border border-slate-200 hover:border-[#153E90] text-slate-800 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#153E90]" />
            <span>Upload Gambar</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#DC2626] font-medium">
          {errorMsg}
        </div>
      )}

      {/* Main 12-Col Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* Left: Photo & AI Color Match */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3.5 space-y-3">
          <div className="h-48 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
            <img
              src={previewUrl}
              alt="Foto ruangan yang dianalisis"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-11 h-11 rounded-lg border border-slate-300 shrink-0"
                style={{ backgroundColor: matchResult.matchedHex }}
              />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-500">
                  {isAnalyzing ? 'Menganalisis warna...' : `Kode: ${matchResult.matchedCode}`}
                </p>
                <p className="text-sm font-extrabold text-slate-900 truncate">
                  {matchResult.matchedName}
                </p>
                <p className="text-[11px] font-semibold text-emerald-700 font-mono tabular-nums">
                  Kemiripan {matchResult.similarityPercent}%
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={isAnalyzing}
              onClick={() => onUseColorInDetail(recommendedProduct, matchedColorObj)}
              className="px-3 py-2 bg-[#153E90] hover:bg-blue-900 disabled:bg-slate-400 text-white text-xs font-bold rounded-lg cursor-pointer shrink-0"
            >
              Pilih Warna Ini
            </button>
          </div>

          <p className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <span className="font-bold text-slate-900">Analisa AI:</span> {matchResult.surfaceObservation}{' '}
            Padukan dengan aksen <span className="font-semibold text-[#153E90]">{matchResult.pairingSuggestion}</span>.
          </p>
        </div>

        {/* Right: Product Recommendation + Before/After Simulation */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-18 shrink-0">
                <PaintCanVisual
                  accentColor={recommendedProduct.canAccentColor}
                  secondaryColor={recommendedProduct.canSecondaryColor}
                  labelTitle={recommendedProduct.canLabelTitle}
                  labelSubtitle={recommendedProduct.canLabelSubtitle}
                  selectedSwatchHex={matchResult.matchedHex}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-[10px] font-bold text-[#153E90] uppercase">Rekomendasi Produk</p>
                <p className="text-sm font-extrabold text-slate-900">{recommendedProduct.name}</p>
                <p className="text-[11px] text-slate-500">{recommendedProduct.categoryLabel}</p>
                <div className="grid grid-cols-2 gap-1 pt-1">
                  {recommendedProduct.benefits.slice(0, 4).map((b) => (
                    <span key={b} className="text-[10px] text-slate-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{b}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-1.5">
                {recommendedProduct.packs.map((pack, idx) => (
                  <button
                    key={pack.label}
                    type="button"
                    onClick={() => setPackIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer ${
                      safePackIndex === idx
                        ? 'bg-[#153E90] text-white border-[#153E90]'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {pack.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onAddToCart(recommendedProduct, safePackIndex, matchedColorObj)}
                className="flex-1 min-w-[180px] py-2 px-3 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-extrabold rounded-lg cursor-pointer"
              >
                Tambah ke Keranjang ·{' '}
                {formatRupiah(
                  (recommendedProduct.packs[safePackIndex] || recommendedProduct.packs[0]).price
                )}
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
            <h2 className="text-xs font-extrabold text-slate-900">Simulasi Ruangan (Sebelum / Sesudah)</h2>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-lg overflow-hidden border border-slate-200 relative h-32">
                <RoomColorVisualizer
                  primaryWallHex="#CBD5E1"
                  accentWallHex="#94A3B8"
                  scene="interior"
                />
                <span className="absolute bottom-0 inset-x-0 py-1 bg-gradient-to-t from-slate-950/80 to-transparent text-center text-[10px] font-bold text-white">
                  Sebelum
                </span>
              </div>
              <div className="rounded-lg overflow-hidden border border-[#153E90] relative h-32">
                <RoomColorVisualizer
                  primaryWallHex={matchResult.matchedHex}
                  accentWallHex="#FACC15"
                  scene="interior"
                />
                <span className="absolute bottom-0 inset-x-0 py-1 bg-gradient-to-t from-slate-950/80 to-transparent text-center text-[10px] font-bold text-white">
                  Sesudah ({matchResult.matchedName})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
