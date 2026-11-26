import React, { useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  Check,
  CheckCircle2,
  Factory,
  FlaskConical,
  Package,
  RefreshCw,
  Search,
  Settings,
  Star,
  Target,
} from 'lucide-react';
import {
  ColorFormula,
  OrderRecord,
  OrderStage,
  QcParameter,
  RawMaterialItem,
  ScreenId,
} from '../../types';
import { PaintCanVisual } from '../DivaArtwork';

const ORDER_STAGES: OrderStage[] = [
  'Pesanan Dibuat',
  'Diproduksi',
  'Dalam Pengiriman',
  'Sampai Tujuan',
];

/* ============================================================================
   SCREEN 7: TRACKING PENGIRIMAN
   ============================================================================ */
export const Screen7Tracking: React.FC<{
  orders: OrderRecord[];
  onAdvanceStage: (orderId: string) => void;
}> = ({ orders, onAdvanceStage }) => {
  const [query, setQuery] = useState('');
  const matchedOrder =
    orders.find((o) => o.id.toLowerCase().includes(query.trim().toLowerCase())) ||
    orders[0];

  const currentIdx = matchedOrder ? ORDER_STAGES.indexOf(matchedOrder.stage) : 0;

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      {/* Compact Header + Search */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl p-3">
        <div>
          <h1 className="text-base font-extrabold text-[#153E90]">Tracking Pengiriman</h1>
          <p className="text-[11px] text-slate-500">Pantau status pesanan &amp; armada pengiriman real-time</p>
        </div>
        <div className="flex gap-1.5 w-full sm:w-80">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari no. resi / pesanan..."
            className="flex-1 h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#153E90]"
          />
          <button
            type="button"
            aria-label="Cari resi"
            className="w-9 h-9 bg-[#153E90] text-white rounded-lg flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {matchedOrder && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
          {/* Left: Timeline & Metadata */}
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5">
              <p className="text-xs font-extrabold text-slate-900">Tahapan Pengiriman</p>
              {ORDER_STAGES.map((stage, idx) => {
                const done = idx <= currentIdx;
                return (
                  <div key={stage} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                      </div>
                      {idx < ORDER_STAGES.length - 1 && (
                        <div
                          className={`w-0.5 h-4 mt-1 ${
                            idx < currentIdx ? 'bg-emerald-600' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="-mt-0.5">
                      <p className={`text-xs font-bold ${done ? 'text-slate-900' : 'text-slate-400'}`}>
                        {stage}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {matchedOrder.stageTimestamps[stage]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1.5 text-xs">
              {[
                { label: 'No. Pesanan', value: matchedOrder.id },
                {
                  label: 'Produk',
                  value: matchedOrder.items
                    .map((i) => `${i.productName} ${i.packLabel} (${i.quantity} pcs)`)
                    .join(', '),
                },
                { label: 'Tujuan', value: matchedOrder.destinationStore },
                { label: 'Kurir', value: matchedOrder.courier },
                { label: 'Driver', value: matchedOrder.driverName },
                { label: 'No. Kendaraan', value: matchedOrder.vehiclePlate },
              ].map((row) => (
                <div key={row.label} className="flex justify-between gap-3 py-1 border-b border-slate-100 last:border-b-0">
                  <span className="text-slate-500 shrink-0">{row.label}</span>
                  <span className="font-bold text-slate-900 text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Route Map & Update Control */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
            <div className="relative h-64 lg:h-80">
              <svg viewBox="0 0 360 180" className="w-full h-full object-cover">
                <rect width="360" height="180" fill="#E2E8F0" />
                <path d="M0 45 L360 22 M0 130 L360 110 M90 0 L110 180 M240 0 L225 180" stroke="#FFFFFF" strokeWidth="5" />
                <path d="M40 115 Q140 140 200 90 T320 75" fill="none" stroke="#153E90" strokeWidth="4" strokeLinecap="round" />
                <circle cx="40" cy="115" r="7" fill="#153E90" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="320" cy="75" r="7" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
                <g transform={`translate(${currentIdx >= 3 ? 306 : currentIdx === 2 ? 190 : 50}, 78)`}>
                  <circle cx="10" cy="10" r="11" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                  <rect x="4" y="6" width="12" height="8" rx="1.5" fill="#1E293B" />
                </g>
              </svg>
              <div className="absolute top-3 left-3 bg-[#153E90] text-white px-3 py-1.5 rounded-lg shadow">
                <p className="text-[11px] font-bold">{matchedOrder.stage}</p>
                <p className="text-[10px] text-blue-100">Estimasi tiba {matchedOrder.estimatedArrival}</p>
              </div>
            </div>

            {matchedOrder.stage !== 'Sampai Tujuan' && (
              <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-600">
                  Perbarui tahapan pengiriman untuk simulasi resi ini:
                </span>
                <button
                  type="button"
                  onClick={() => onAdvanceStage(matchedOrder.id)}
                  className="px-3.5 py-2 rounded-lg bg-[#153E90] hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Simulasi Update Pengiriman</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   SCREEN 8: DASHBOARD PRODUKSI
   ============================================================================ */
export const Screen8ProductionDashboard: React.FC<{
  onNavigate: (screen: ScreenId) => void;
}> = ({ onNavigate }) => {
  const [selectedShift, setSelectedShift] = useState('Selasa, 12 Maret 2024');
  const [machines, setMachines] = useState([
    { name: 'Mixing Tank', status: 'Aktif', ok: true },
    { name: 'Filling Machine', status: 'Aktif', ok: true },
    { name: 'Packaging Line', status: 'Aktif', ok: true },
    { name: 'Utility System', status: 'Normal', ok: true },
  ]);

  const hourlyBars = [
    { time: '08:00', target: 11, actual: 5 },
    { time: '10:00', target: 12, actual: 7 },
    { time: '12:00', target: 13, actual: 8.5 },
    { time: '14:00', target: 13.5, actual: 9.5 },
    { time: '16:00', target: 14, actual: 11.2 },
    { time: '18:00', target: 14.5, actual: 10.2 },
  ];

  const toggleMachine = (index: number) => {
    setMachines((prev) =>
      prev.map((m, idx) =>
        idx === index
          ? {
              ...m,
              ok: !m.ok,
              status: m.ok ? 'Maintenance' : idx === 3 ? 'Normal' : 'Aktif',
            }
          : m
      )
    );
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      {/* Header + Date Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5">
        <div>
          <h1 className="text-base font-extrabold text-[#153E90]">Dashboard Produksi</h1>
          <p className="text-[11px] text-slate-500">Pantau aktivitas &amp; mesin produksi secara real-time</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
          <Calendar className="w-4 h-4 text-[#153E90]" />
          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            aria-label="Pilih tanggal produksi"
            className="text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
          >
            <option>Selasa, 12 Maret 2024</option>
            <option>Rabu, 13 Maret 2024</option>
            <option>Kamis, 14 Maret 2024</option>
          </select>
        </div>
      </div>

      {/* 4 KPI Cards in 1 row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#153E90] flex items-center justify-center shrink-0">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Target Produksi</p>
            <p className="text-base font-extrabold font-mono text-slate-900 tabular-nums">
              12.000 Kg
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Factory className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Realisasi Produksi</p>
            <p className="text-base font-extrabold font-mono text-emerald-700 tabular-nums">
              9.800 Kg
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="w-9 h-9 shrink-0">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#E2E8F0" strokeWidth="4" />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="#16A34A"
              strokeWidth="4"
              strokeDasharray="100.5"
              strokeDashoffset="19"
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
            <text x="20" y="23" textAnchor="middle" fontSize="10" fontWeight="800" fill="#15803D">
              81%
            </text>
          </svg>
          <div>
            <p className="text-[10px] text-slate-500">Progress</p>
            <p className="text-base font-extrabold font-mono text-emerald-700 tabular-nums">
              81%
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-red-100 text-[#DC2626] flex items-center justify-center shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Sisa Target</p>
            <p className="text-base font-extrabold font-mono text-[#DC2626] tabular-nums">
              2.200 Kg
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Split: Machine Status + Daily Production Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-900">
              Status Mesin Produksi (Klik untuk ubah status)
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('screen-9')}
              className="text-xs font-bold text-[#153E90] cursor-pointer"
            >
              Lihat Batch &gt;
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {machines.map((m, idx) => {
              const cropPositions = [
                'object-left-top',
                'object-center',
                'object-right-top',
                'object-bottom',
              ];
              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => toggleMachine(idx)}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-left hover:border-[#153E90] cursor-pointer"
                >
                  <div className="h-20 rounded-md bg-slate-200 overflow-hidden mb-2 relative">
                    <img
                      src="/src/assets/images/factory_paint_machines_1795599023100.jpg"
                      alt={m.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${cropPositions[idx % cropPositions.length]}`}
                    />
                    {!m.ok && <div className="absolute inset-0 bg-amber-500/25" />}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-4 h-4 rounded-full text-white flex items-center justify-center shrink-0 ${
                        m.ok ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}
                    >
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{m.name}</p>
                      <p
                        className={`text-[10px] font-semibold ${
                          m.ok ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {m.status}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-900">Grafik Produksi Harian</span>
            <span className="text-[11px] text-slate-500">Target (abu) vs Realisasi (biru)</span>
          </div>
          <div className="h-52 flex items-end justify-between gap-3 pt-4 border-b border-slate-100">
            {hourlyBars.map((bar) => (
              <div
                key={bar.time}
                className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
              >
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div
                    className="w-3.5 bg-slate-200 rounded-t"
                    style={{ height: `${Math.round((bar.target / 15) * 100)}%` }}
                  />
                  <div
                    className="w-3.5 bg-[#153E90] rounded-t"
                    style={{ height: `${Math.round((bar.actual / 15) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-500">{bar.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 9: MONITORING BATCH PRODUKSI
   ============================================================================ */
export const Screen9BatchMonitor: React.FC<{
  onOpenFormula: () => void;
}> = ({ onOpenFormula }) => {
  const [producedKg, setProducedKg] = useState(3250);
  const targetKg = 5000;
  const pct = Math.min(100, Math.round((producedKg / targetKg) * 100));

  const formulaMix = [
    { name: 'Resin', pct: 45, color: 'bg-[#153E90]' },
    { name: 'Titanium Dioxide', pct: 25, color: 'bg-violet-500' },
    { name: 'Additive', pct: 10, color: 'bg-amber-500' },
    { name: 'Water', pct: 20, color: 'bg-cyan-500' },
  ];

  const logs = [
    { time: '08:00', text: 'Batch dimulai', done: true },
    { time: '08:15', text: 'Proses mixing', done: true },
    { time: '09:30', text: 'QC sampel awal', done: true },
    {
      time: '',
      text: producedKg >= 5000 ? 'Batch selesai' : 'Sedang berjalan',
      done: producedKg >= 5000,
    },
  ];

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
      {/* Left: Blue Header + Progress */}
      <div className="lg:col-span-5 space-y-3">
        <div className="rounded-xl bg-[#153E90] text-white p-4 flex items-center justify-between gap-3">
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-[10px] text-blue-200">Batch No.</p>
                <p className="text-base font-extrabold font-mono">DVP24001</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-bold">
                {pct >= 100 ? 'Completed' : 'Running'}
              </span>
            </div>
            <div>
              <p className="text-[10px] text-blue-200">Produk</p>
              <p className="font-bold">MSS - 510 LO (Melamine)</p>
            </div>
            <div>
              <p className="text-[10px] text-blue-200">Tanggal Produksi</p>
              <p className="font-semibold">12 Mar 2024, 08:00</p>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-[10px] text-blue-200">Target Output</p>
                <p className="font-bold font-mono">5.000 LT</p>
              </div>
              <div>
                <p className="text-[10px] text-blue-200">Operator</p>
                <p className="font-bold">Andi Pratama</p>
              </div>
            </div>
          </div>

          <div className="w-24 shrink-0">
            <PaintCanVisual
              accentColor="#153E90"
              secondaryColor="#60A5FA"
              labelTitle="MSS - 510 LO"
              labelSubtitle="Melamine"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold">
            <span>Progress Produksi</span>
            <span className="text-[#153E90] font-mono tabular-nums">{pct}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-mono tabular-nums">
              {producedKg.toLocaleString('id-ID')} Kg / 5.000 Kg
            </span>
            {pct < 100 && (
              <button
                type="button"
                onClick={() => setProducedKg((v) => Math.min(targetKg, v + 500))}
                className="text-[#153E90] font-bold hover:underline cursor-pointer"
              >
                +500 Kg Progres
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right: Komposisi Formula + Log Aktivitas */}
      <div className="lg:col-span-7 space-y-3">
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-900">Komposisi Formula</h2>
            <button
              type="button"
              onClick={onOpenFormula}
              className="text-xs font-bold text-[#153E90] cursor-pointer"
            >
              Lihat Detail &gt;
            </button>
          </div>

          <div className="space-y-2.5">
            {formulaMix.map((item) => (
              <div key={item.name} className="grid grid-cols-12 items-center gap-2 text-xs">
                <span className="col-span-5 text-slate-700 font-medium truncate">{item.name}</span>
                <div className="col-span-5 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.pct * 1.8}%` }}
                  />
                </div>
                <span className="col-span-2 text-right font-mono font-bold text-slate-800 tabular-nums">
                  {item.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5">
          <h2 className="text-xs font-extrabold text-slate-900">Log Aktivitas Batch</h2>
          <div className="space-y-2">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    log.done ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                />
                <span className="w-12 font-mono text-slate-500">{log.time || '--:--'}</span>
                <span className={log.done ? 'font-semibold text-slate-900' : 'text-slate-500'}>
                  {log.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 10: FORMULA WARNA
   ============================================================================ */
export const Screen10ColorFormula: React.FC<{
  formulas: ColorFormula[];
  onToggleStatus: (id: string, status: 'Approved' | 'Trial') => void;
  onCreateFormula: (formula: ColorFormula) => void;
}> = ({ formulas, onToggleStatus, onCreateFormula }) => {
  const [tab, setTab] = useState<'list' | 'create'>('list');
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('DIVA Biru Langit Baru');
  const [newCode, setNewCode] = useState('DW-003');
  const [newHex, setNewHex] = useState('#93C5FD');
  const [newDesc, setNewDesc] = useState('Formula interior warna biru sejuk rendah bau.');

  const filtered = formulas.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveNew = (status: 'Approved' | 'Trial') => {
    onCreateFormula({
      id: `f-${Date.now()}`,
      code: newCode.trim() || 'DW-NEW',
      name: newName.trim() || 'Formula Baru',
      swatchHex: newHex,
      status,
      starred: status === 'Approved',
      description: newDesc.trim() || 'Formula warna kustom DIVA.',
      ingredients: [
        { name: 'Titanium Dioxide', percent: 24, color: '#3B82F6' },
        { name: 'Resin', percent: 46, color: '#8B5CF6' },
        { name: 'Additive', percent: 10, color: '#F59E0B' },
        { name: 'Water', percent: 20, color: '#06B6D4' },
      ],
    });
    setTab('list');
  };

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      {/* Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-extrabold text-[#153E90]">Formula Warna R&amp;D</h1>
          <p className="text-[11px] text-slate-500">Kelola dan kembangkan komposisi formula warna DIVA</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {tab === 'list' && (
            <div className="relative w-56">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama / kode..."
                className="w-full h-9 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#153E90]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          )}
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setTab('list')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md cursor-pointer ${
                tab === 'list' ? 'bg-[#153E90] text-white' : 'text-slate-700'
              }`}
            >
              Daftar Formula
            </button>
            <button
              type="button"
              onClick={() => setTab('create')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md cursor-pointer ${
                tab === 'create' ? 'bg-[#153E90] text-white' : 'text-slate-700'
              }`}
            >
              Buat Formula
            </button>
          </div>
        </div>
      </div>

      {tab === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filtered.map((formula) => (
            <div
              key={formula.id}
              className="bg-white border border-slate-200 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-full border border-slate-200 shrink-0"
                    style={{ backgroundColor: formula.swatchHex }}
                  />
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">{formula.name}</p>
                    <p className="text-xs font-mono text-slate-500">Kode: {formula.code}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      formula.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {formula.status}
                  </span>
                  {formula.starred && <Star className="w-4 h-4 fill-amber-400 text-amber-400" />}
                </div>
              </div>

              <div className="space-y-1.5">
                {formula.ingredients.map((ing) => (
                  <div key={ing.name} className="grid grid-cols-12 items-center gap-2 text-[11px]">
                    <span className="col-span-5 text-slate-600 truncate">{ing.name}</span>
                    <div className="col-span-5 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${ing.percent * 1.8}%`, backgroundColor: ing.color }}
                      />
                    </div>
                    <span className="col-span-2 text-right font-mono font-bold text-slate-800 tabular-nums">
                      {ing.percent}%
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-600">{formula.description}</p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onToggleStatus(formula.id, 'Approved')}
                  className={`py-2 rounded-lg text-xs font-bold cursor-pointer ${
                    formula.status === 'Approved'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  Approved Formula
                </button>
                <button
                  type="button"
                  onClick={() => onToggleStatus(formula.id, 'Trial')}
                  className={`py-2 rounded-lg text-xs font-bold cursor-pointer ${
                    formula.status === 'Trial'
                      ? 'bg-[#153E90] text-white'
                      : 'bg-blue-50 text-[#153E90] border border-blue-200'
                  }`}
                >
                  Trial Formula
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-4 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#153E90]">
            <FlaskConical className="w-4 h-4" />
            <span>Buat Formula Warna Baru</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Nama Warna
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Kode Formula
              </label>
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Target Swatch
              </label>
              <input
                type="color"
                value={newHex}
                onChange={(e) => setNewHex(e.target.value)}
                className="w-full h-9 p-1 border border-slate-200 rounded-lg cursor-pointer"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Keterangan Teknis
              </label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleSaveNew('Approved')}
              className="py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Simpan Approved
            </button>
            <button
              type="button"
              onClick={() => handleSaveNew('Trial')}
              className="py-2 bg-[#153E90] text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Simpan Trial
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   SCREEN 11: QUALITY CONTROL (QC)
   ============================================================================ */
export const Screen11QualityControl: React.FC<{
  params: QcParameter[];
  onToggleParamStatus: (paramName: string) => void;
}> = ({ params, onToggleParamStatus }) => {
  const [subTab, setSubTab] = useState<'pemeriksaan' | 'hasil' | 'standar'>('pemeriksaan');
  const [notes, setNotes] = useState('Hasil pengujian sesuai standar. Warna dan viskositas stabil.');

  const allPass = params.every((p) => p.status === 'PASS');

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      {/* Header + Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-extrabold text-[#153E90]">Quality Control (QC)</h1>
          <p className="text-[11px] text-slate-500">Pastikan kualitas terbaik di setiap batch produksi</p>
        </div>
        <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
          {(
            [
              { id: 'pemeriksaan', label: 'Pemeriksaan' },
              { id: 'hasil', label: 'Hasil QC' },
              { id: 'standar', label: 'Standar' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSubTab(t.id)}
              className={`px-3 py-1.5 rounded-md cursor-pointer ${
                subTab === t.id ? 'bg-[#153E90] text-white' : 'text-slate-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* Left: Batch Info, Status Banner & Notes */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-2">
            <div className="space-y-1 text-xs">
              <p>
                <span className="text-slate-500">Batch No.</span>{' '}
                <span className="font-extrabold font-mono text-slate-900">DVP24001</span>
              </p>
              <p>
                <span className="text-slate-500">Produk</span>{' '}
                <span className="font-bold text-slate-900">MSS - 510 LO</span>
              </p>
              <p>
                <span className="text-slate-500">Tanggal</span>{' '}
                <span className="font-semibold text-slate-700">12 Mar 2024</span>
              </p>
              <p>
                <span className="text-slate-500">Operator</span>{' '}
                <span className="font-semibold text-slate-700">Andi Pratama</span>
              </p>
            </div>
            <div className="w-16 shrink-0">
              <PaintCanVisual
                accentColor="#153E90"
                labelTitle="MSS - 510 LO"
                labelSubtitle="Melamine"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div
            className={`rounded-xl border p-3.5 flex items-center gap-3 ${
              allPass ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full text-white flex items-center justify-center shrink-0 ${
                allPass ? 'bg-emerald-600' : 'bg-amber-500'
              }`}
            >
              {allPass ? <Check className="w-5 h-5 stroke-[3]" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-600">Status QC</p>
              <p className={`text-sm font-extrabold ${allPass ? 'text-emerald-800' : 'text-amber-800'}`}>
                {allPass ? 'LULUS (PASS)' : 'PERLU PENGECEKAN ULANG'}
              </p>
              <p className="text-[10px] text-slate-600">
                {allPass
                  ? 'Produk dapat dilanjutkan ke proses pengemasan'
                  : 'Klik status parameter di tabel untuk memverifikasi ulang.'}
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
            <label htmlFor="qc-notes" className="text-xs font-extrabold text-slate-900 block">
              Catatan Analis Lab
            </label>
            <textarea
              id="qc-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#153E90]"
            />
          </div>
        </div>

        {/* Right: Parameter Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-4 space-y-2.5">
          <h2 className="text-xs font-extrabold text-slate-900">
            {subTab === 'standar' ? 'Standar Mutu Laboratorium DIVA' : 'Hasil Pemeriksaan Parameter'}
          </h2>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="py-2 px-2 font-bold">Parameter</th>
                <th className="py-2 px-2 font-bold">Standar</th>
                <th className="py-2 px-2 font-bold">Hasil</th>
                <th className="py-2 px-2 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {params.map((row) => (
                <tr key={row.parameter}>
                  <td className="py-2.5 px-2 font-bold text-slate-800">{row.parameter}</td>
                  <td className="py-2.5 px-2 text-slate-500">{row.standard}</td>
                  <td className="py-2.5 px-2 font-mono font-bold text-slate-900">{row.result}</td>
                  <td className="py-2.5 px-2 text-right">
                    <button
                      type="button"
                      onClick={() => onToggleParamStatus(row.parameter)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded font-bold cursor-pointer ${
                        row.status === 'PASS'
                          ? 'text-emerald-700 bg-emerald-50'
                          : 'text-amber-700 bg-amber-50'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{row.status}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   SCREEN 12: GUDANG BAHAN BAKU
   ============================================================================ */
export const Screen12RawMaterials: React.FC<{
  materials: RawMaterialItem[];
  onRestockMaterial: (id: string) => void;
}> = ({ materials, onRestockMaterial }) => {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<'Semua' | 'Resin' | 'Pigment' | 'Additive' | 'Solvent'>('Semua');

  const filtered = materials.filter((m) => {
    if (catFilter !== 'Semua' && m.category !== catFilter) return false;
    if (!search.trim()) return true;
    return m.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      {/* Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-extrabold text-[#153E90]">Stok Bahan Baku</h1>
          <p className="text-[11px] text-slate-500">Pantau ketersediaan resin, pigment, additive &amp; solvent</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1.5">
            {(['Semua', 'Resin', 'Pigment', 'Additive', 'Solvent'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCatFilter(cat)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer ${
                  catFilter === cat
                    ? 'bg-[#153E90] text-white'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-52">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari bahan baku..."
              className="w-full h-9 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#153E90]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {filtered.map((item) => {
          const pct = Math.min(100, Math.round((item.stockKg / item.maxCapacityKg) * 100));
          const isLow = item.status === 'Stok Rendah';
          return (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3"
            >
              <div
                className="w-11 h-11 rounded-lg border border-slate-200 flex items-center justify-center shrink-0"
                style={{ backgroundColor: item.colorHex }}
              >
                <Package className="w-5 h-5 text-slate-800/70" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-extrabold text-slate-900 truncate">{item.name}</p>
                  {isLow ? (
                    <button
                      type="button"
                      onClick={() => onRestockMaterial(item.id)}
                      className="text-[10px] font-bold text-[#DC2626] bg-red-50 px-2 py-0.5 rounded border border-red-200 cursor-pointer shrink-0"
                    >
                      + Restock
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-700 shrink-0">Aman</span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 mt-1.5">
                  <span
                    className={`text-[11px] font-mono font-bold tabular-nums ${
                      isLow ? 'text-[#DC2626]' : 'text-slate-600'
                    }`}
                  >
                    Stok: {item.stockKg.toLocaleString('id-ID')} Kg
                  </span>
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isLow ? 'bg-[#DC2626]' : 'bg-emerald-600'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {isLow && (
                  <p className="text-[10px] font-bold text-[#DC2626] flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Stok Rendah · Segera lakukan pemesanan</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
