import React, { useMemo, useState } from 'react';
import {
  BookmarkCheck,
  Check,
  Info,
  RotateCcw,
  ShoppingCart,
} from 'lucide-react';
import { PAINT_COLORS, PAINT_PRODUCTS, formatRupiah } from '../data/paintData';
import { PaintColor, PaintProduct, SavedCalculation } from '../types';
import { PaintCanVisual } from './DivaArtwork';

interface PaintCalculatorViewProps {
  initialProduct?: PaintProduct;
  initialColor?: PaintColor;
  savedCalculations: SavedCalculation[];
  onAddCalculatedToCart: (
    items: { product: PaintProduct; packIndex: number; color: PaintColor; quantity: number }[]
  ) => void;
  onSaveCalculation: (calc: SavedCalculation) => void;
}

type InputMode = 'dimensions' | 'area';
type SurfaceCondition = 'new-wall' | 'repaint-similar' | 'dark-to-light';

const DOOR_AREA_SQM = 1.89;
const WINDOW_AREA_SQM = 1.44;

function computeOptimalPacks(
  requiredLiters: number,
  product: PaintProduct
): { packIndex: number; label: string; sizeKg: number; count: number; price: number }[] {
  const pricedPacks = product.packs
    .map((pack, idx) => ({ ...pack, idx }))
    .filter((p) => p.price > 0)
    .sort((a, b) => b.sizeKg - a.sizeKg);

  if (pricedPacks.length === 0) {
    const first = product.packs[0];
    return [{ packIndex: 0, label: first.label, sizeKg: first.sizeKg, count: 1, price: first.price }];
  }

  if (pricedPacks.length === 1) {
    const only = pricedPacks[0];
    const count = Math.max(1, Math.ceil(requiredLiters / only.sizeKg));
    return [{ packIndex: only.idx, label: only.label, sizeKg: only.sizeKg, count, price: only.price }];
  }

  let bestCost = Infinity;
  let bestCounts: number[] = [];

  const search = (idx: number, remaining: number, currentCost: number, counts: number[]) => {
    if (currentCost >= bestCost) return;
    if (idx === pricedPacks.length - 1) {
      const last = pricedPacks[idx];
      const count = remaining > 0 ? Math.ceil(remaining / last.sizeKg) : 0;
      const totalCost = currentCost + count * last.price;
      if ((totalCost < bestCost && counts.some((c) => c > 0)) || count > 0) {
        if (totalCost < bestCost) {
          bestCost = totalCost;
          bestCounts = [...counts, count];
        }
      }
      return;
    }

    const pack = pricedPacks[idx];
    const maxCount = Math.ceil(Math.max(0, remaining) / pack.sizeKg) + 1;
    for (let c = 0; c <= maxCount; c++) {
      search(idx + 1, remaining - c * pack.sizeKg, currentCost + c * pack.price, [...counts, c]);
    }
  };

  search(0, requiredLiters, 0, []);

  const result: { packIndex: number; label: string; sizeKg: number; count: number; price: number }[] = [];
  pricedPacks.forEach((pack, i) => {
    const count = bestCounts[i] || 0;
    if (count > 0) {
      result.push({
        packIndex: pack.idx,
        label: pack.label,
        sizeKg: pack.sizeKg,
        count,
        price: pack.price,
      });
    }
  });

  if (result.length === 0) {
    const smallest = pricedPacks[pricedPacks.length - 1];
    result.push({
      packIndex: smallest.idx,
      label: smallest.label,
      sizeKg: smallest.sizeKg,
      count: 1,
      price: smallest.price,
    });
  }
  return result;
}

export const PaintCalculatorView: React.FC<PaintCalculatorViewProps> = ({
  initialProduct,
  initialColor,
  savedCalculations,
  onAddCalculatedToCart,
  onSaveCalculation,
}) => {
  const [inputMode, setInputMode] = useState<InputMode>('dimensions');
  const [roomName, setRoomName] = useState('Ruang Tamu Utama');
  const [lengthM, setLengthM] = useState(4);
  const [widthM, setWidthM] = useState(3.5);
  const [heightM, setHeightM] = useState(3);
  const [includeCeiling, setIncludeCeiling] = useState(false);
  const [doorCount, setDoorCount] = useState(1);
  const [windowCount, setWindowCount] = useState(2);
  const [directAreaSqm, setDirectAreaSqm] = useState(45);

  const [selectedProductId, setSelectedProductId] = useState(
    initialProduct?.id ||
      PAINT_PRODUCTS.find((p) => p.name === 'CAT TEMBOK WARNA INDOOR MUDA')?.id ||
      PAINT_PRODUCTS[0].id
  );
  const [selectedColor, setSelectedColor] = useState<PaintColor>(
    initialColor || PAINT_COLORS.find((c) => c.code === 'DV-202') || PAINT_COLORS[0]
  );
  const [coats, setCoats] = useState(2);
  const [surfaceCondition, setSurfaceCondition] = useState<SurfaceCondition>('repaint-similar');
  const [includeSafetyMargin, setIncludeSafetyMargin] = useState(true);
  const [includePrimerInCart, setIncludePrimerInCart] = useState(true);
  const [addedBanner, setAddedBanner] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const selectedProduct = useMemo(
    () => PAINT_PRODUCTS.find((p) => p.id === selectedProductId) || PAINT_PRODUCTS[0],
    [selectedProductId]
  );

  const primerProduct = useMemo(
    () =>
      PAINT_PRODUCTS.find((p) => p.name.includes('WB - SEALER RDL')) ||
      PAINT_PRODUCTS.find((p) => p.name.includes('GUM SEALER')) ||
      PAINT_PRODUCTS[0],
    []
  );

  const calculation = useMemo(() => {
    const grossWallArea =
      inputMode === 'dimensions'
        ? 2 * (Math.max(0, lengthM) + Math.max(0, widthM)) * Math.max(0, heightM) +
          (includeCeiling ? Math.max(0, lengthM) * Math.max(0, widthM) : 0)
        : Math.max(0, directAreaSqm);

    const deductions =
      inputMode === 'dimensions'
        ? doorCount * DOOR_AREA_SQM + windowCount * WINDOW_AREA_SQM
        : 0;

    const netArea = Math.max(1, grossWallArea - deductions);
    const conditionFactor =
      surfaceCondition === 'new-wall'
        ? 1.15
        : surfaceCondition === 'dark-to-light'
          ? 1.25
          : 1.0;

    const marginMultiplier = includeSafetyMargin ? 1.1 : 1.0;
    const rawKg =
      ((netArea * coats) / selectedProduct.coverageSqmPerKg) *
      conditionFactor *
      marginMultiplier;

    const totalKgNeeded = Math.max(0.5, Math.ceil(rawKg * 10) / 10);
    const recommendedPacks = computeOptimalPacks(Math.ceil(totalKgNeeded), selectedProduct);
    const paintCost = recommendedPacks.reduce((sum, item) => sum + item.count * item.price, 0);
    const totalPurchasedKg = recommendedPacks.reduce(
      (sum, item) => sum + item.count * item.sizeKg,
      0
    );

    const primerKgNeeded =
      surfaceCondition === 'new-wall'
        ? Math.ceil((netArea / primerProduct.coverageSqmPerKg) * 1.05)
        : 0;
    const primerPacks =
      surfaceCondition === 'new-wall'
        ? computeOptimalPacks(primerKgNeeded, primerProduct)
        : [];
    const primerCost = primerPacks.reduce((sum, item) => sum + item.count * item.price, 0);

    return {
      grossArea: Math.round(grossWallArea * 10) / 10,
      deductions: Math.round(deductions * 10) / 10,
      netArea: Math.round(netArea * 10) / 10,
      totalKgNeeded,
      totalPurchasedKg,
      recommendedPacks,
      paintCost,
      primerKgNeeded,
      primerPacks,
      primerCost,
    };
  }, [
    coats,
    directAreaSqm,
    doorCount,
    heightM,
    includeCeiling,
    includeSafetyMargin,
    inputMode,
    lengthM,
    primerProduct,
    selectedProduct,
    surfaceCondition,
    widthM,
    windowCount,
  ]);

  const handleReset = () => {
    setRoomName('Ruang Tamu Utama');
    setLengthM(4);
    setWidthM(3.5);
    setHeightM(3);
    setIncludeCeiling(false);
    setDoorCount(1);
    setWindowCount(2);
    setDirectAreaSqm(45);
    setCoats(2);
    setSurfaceCondition('repaint-similar');
    setIncludeSafetyMargin(true);
  };

  const handleAddToCart = () => {
    const itemsToAdd = calculation.recommendedPacks.map((pack) => ({
      product: selectedProduct,
      packIndex: pack.packIndex,
      color: selectedColor,
      quantity: pack.count,
    }));

    if (surfaceCondition === 'new-wall' && includePrimerInCart) {
      const neutralWhite = PAINT_COLORS[0];
      calculation.primerPacks.forEach((pack) => {
        itemsToAdd.push({
          product: primerProduct,
          packIndex: pack.packIndex,
          color: neutralWhite,
          quantity: pack.count,
        });
      });
    }

    onAddCalculatedToCart(itemsToAdd);
    setAddedBanner(true);
    setTimeout(() => setAddedBanner(false), 1800);
  };

  const handleSave = () => {
    const newCalc: SavedCalculation = {
      id: `CALC-${Date.now()}`,
      title: roomName.trim() || 'Ruangan Tanpa Nama',
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      areaSqm: calculation.netArea,
      coats,
      totalKgNeeded: calculation.totalKgNeeded,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      color: selectedColor,
      recommendedPacks: calculation.recommendedPacks.map((p) => ({
        label: p.label,
        sizeKg: p.sizeKg,
        count: p.count,
        price: p.price,
      })),
      estimatedCost:
        calculation.paintCost +
        (surfaceCondition === 'new-wall' && includePrimerInCart ? calculation.primerCost : 0),
    };
    onSaveCalculation(newCalc);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 1800);
  };

  const grandTotalCost =
    calculation.paintCost +
    (surfaceCondition === 'new-wall' && includePrimerInCart ? calculation.primerCost : 0);

  return (
    <div className="max-w-[1360px] mx-auto w-full p-3 lg:p-4 space-y-3">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-extrabold text-[#153E90]">
            Kalkulator Kebutuhan Cat Otomatis
          </h1>
          <p className="text-[11px] text-slate-500">
            Hitung luas dinding &amp; kombinasi kemasan 1/2/5/20 LT paling hemat secara otomatis.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 12-Col Split: Left Parameters / Right Output & Cart CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* Left: Input Controls */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="grid grid-cols-2 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setInputMode('dimensions')}
              className={`py-1.5 rounded-md cursor-pointer ${
                inputMode === 'dimensions' ? 'bg-[#153E90] text-white' : 'text-slate-600'
              }`}
            >
              Dimensi (P×L×T)
            </button>
            <button
              type="button"
              onClick={() => setInputMode('area')}
              className={`py-1.5 rounded-md cursor-pointer ${
                inputMode === 'area' ? 'bg-[#153E90] text-white' : 'text-slate-600'
              }`}
            >
              Luas Langsung (m²)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="calc-room" className="block text-[11px] font-semibold text-slate-600 mb-1">
                Nama Ruangan
              </label>
              <input
                id="calc-room"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label htmlFor="m-prod" className="block text-[11px] font-semibold text-slate-600 mb-1">
                Produk Cat DIVA
              </label>
              <select
                id="m-prod"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full h-9 px-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
              >
                {PAINT_PRODUCTS.filter((p) => p.packs[0]?.price > 0 && p.category !== 'thinner').map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.coverageSqmPerKg} m²/LT)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {inputMode === 'dimensions' ? (
            <div className="space-y-2.5">
              <div className="grid grid-cols-5 gap-2">
                <div>
                  <label htmlFor="m-len" className="block text-[10px] font-semibold text-slate-600 mb-1">
                    Panjang (m)
                  </label>
                  <input
                    id="m-len"
                    type="number"
                    min={0.5}
                    step={0.5}
                    value={lengthM}
                    onChange={(e) => setLengthM(Number(e.target.value) || 0)}
                    className="w-full h-9 px-2 border border-slate-200 rounded-lg text-xs font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label htmlFor="m-wid" className="block text-[10px] font-semibold text-slate-600 mb-1">
                    Lebar (m)
                  </label>
                  <input
                    id="m-wid"
                    type="number"
                    min={0.5}
                    step={0.5}
                    value={widthM}
                    onChange={(e) => setWidthM(Number(e.target.value) || 0)}
                    className="w-full h-9 px-2 border border-slate-200 rounded-lg text-xs font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label htmlFor="m-hei" className="block text-[10px] font-semibold text-slate-600 mb-1">
                    Tinggi (m)
                  </label>
                  <input
                    id="m-hei"
                    type="number"
                    min={1}
                    step={0.1}
                    value={heightM}
                    onChange={(e) => setHeightM(Number(e.target.value) || 0)}
                    className="w-full h-9 px-2 border border-slate-200 rounded-lg text-xs font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label htmlFor="m-door" className="block text-[10px] font-semibold text-slate-600 mb-1">
                    Pintu
                  </label>
                  <input
                    id="m-door"
                    type="number"
                    min={0}
                    value={doorCount}
                    onChange={(e) => setDoorCount(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full h-9 px-2 border border-slate-200 rounded-lg text-xs font-mono font-bold text-center"
                  />
                </div>
                <div>
                  <label htmlFor="m-win" className="block text-[10px] font-semibold text-slate-600 mb-1">
                    Jendela
                  </label>
                  <input
                    id="m-win"
                    type="number"
                    min={0}
                    value={windowCount}
                    onChange={(e) => setWindowCount(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full h-9 px-2 border border-slate-200 rounded-lg text-xs font-mono font-bold text-center"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCeiling}
                  onChange={(e) => setIncludeCeiling(e.target.checked)}
                  className="accent-[#153E90]"
                />
                <span>Sertakan Luas Plafon</span>
              </label>
            </div>
          ) : (
            <div>
              <label htmlFor="m-area" className="block text-xs font-semibold text-slate-700 mb-1">
                Luas Bidang Pengecatan (m²)
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="m-area"
                  type="range"
                  min={5}
                  max={400}
                  value={directAreaSqm}
                  onChange={(e) => setDirectAreaSqm(Number(e.target.value))}
                  className="flex-1 accent-[#153E90]"
                />
                <span className="font-mono font-bold text-sm text-[#153E90] tabular-nums">
                  {directAreaSqm} m²
                </span>
              </div>
            </div>
          )}

          {/* Coats & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
            <div>
              <p className="text-[11px] font-semibold text-slate-600 mb-1">Jumlah Lapisan</p>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCoats(num)}
                    className={`py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                      coats === num
                        ? 'bg-[#153E90] text-white border-[#153E90]'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {num}×
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-600 mb-1">Kondisi Bidang</p>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { id: 'repaint-similar', title: 'Ulang' },
                    { id: 'new-wall', title: 'Baru' },
                    { id: 'dark-to-light', title: 'Kontras' },
                  ] as const
                ).map((cond) => (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => setSurfaceCondition(cond.id)}
                    className={`py-1.5 px-1 rounded-lg border text-[11px] font-bold cursor-pointer ${
                      surfaceCondition === cond.id
                        ? 'border-[#153E90] bg-blue-50 text-[#153E90]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {cond.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedProduct.supportsCustomColor && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-600 mr-1">Warna:</span>
              {PAINT_COLORS.slice(0, 10).map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  aria-label={`Pilih ${c.name}`}
                  className={`w-6 h-6 rounded-full border cursor-pointer ${
                    selectedColor.code === c.code
                      ? 'ring-2 ring-[#153E90] ring-offset-1 border-slate-400'
                      : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}

          <label className="flex items-center gap-2 text-[11px] text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSafetyMargin}
              onChange={(e) => setIncludeSafetyMargin(e.target.checked)}
              className="accent-[#153E90]"
            />
            <span>Cadangan 10% sudut &amp; sentuhan ulang</span>
          </label>
        </div>

        {/* Right: Results & Action */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <p className="text-[10px] font-semibold text-slate-500">Hasil Estimasi</p>
                <p className="text-sm font-extrabold text-slate-900">{roomName}</p>
              </div>
              <div className="w-10 h-11 shrink-0">
                <PaintCanVisual
                  accentColor={selectedProduct.canAccentColor}
                  secondaryColor={selectedProduct.canSecondaryColor}
                  labelTitle={selectedProduct.canLabelTitle}
                  labelSubtitle="Cat"
                  selectedSwatchHex={selectedProduct.supportsCustomColor ? selectedColor.hex : undefined}
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-[10px] text-slate-500">Luas Bersih</p>
                <p className="text-sm font-extrabold font-mono text-slate-900 tabular-nums">
                  {calculation.netArea} m²
                </p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-[10px] text-slate-500">Kebutuhan</p>
                <p className="text-sm font-extrabold font-mono text-[#153E90] tabular-nums">
                  {calculation.totalKgNeeded} LT
                </p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-[10px] text-slate-500">Lapisan</p>
                <p className="text-sm font-extrabold font-mono text-slate-900 tabular-nums">
                  {coats}×
                </p>
              </div>
            </div>

            {inputMode === 'dimensions' && (
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Luas kotor {calculation.grossArea} m² − bukaan pintu/jendela {calculation.deductions} m²
                </span>
              </p>
            )}

            <div className="space-y-1.5">
              <p className="text-xs font-extrabold text-slate-900">
                Kemasan Paling Hemat ({calculation.totalPurchasedKg} LT)
              </p>
              {calculation.recommendedPacks.map((pack) => (
                <div
                  key={pack.label}
                  className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#153E90] text-white font-mono font-bold text-[11px] flex items-center justify-center">
                      {pack.count}×
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">
                        {selectedProduct.name} ({pack.label})
                      </p>
                      <p className="text-[10px] text-slate-500">{selectedColor.name}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {formatRupiah(pack.count * pack.price)}
                  </span>
                </div>
              ))}
            </div>

            {surfaceCondition === 'new-wall' && (
              <label className="flex items-center justify-between p-2.5 rounded-lg bg-violet-50 border border-violet-200 text-xs cursor-pointer">
                <span className="flex items-center gap-2 font-bold text-violet-950">
                  <input
                    type="checkbox"
                    checked={includePrimerInCart}
                    onChange={(e) => setIncludePrimerInCart(e.target.checked)}
                    className="accent-violet-700"
                  />
                  <span>+ Sealer ({calculation.primerKgNeeded} LT)</span>
                </span>
                <span className="font-mono font-bold text-violet-900">
                  {formatRupiah(calculation.primerCost)}
                </span>
              </label>
            )}

            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-600">Estimasi Biaya Total</span>
                <span className="text-xl font-extrabold font-mono text-[#DC2626] tabular-nums">
                  {formatRupiah(grandTotalCost)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[200px] h-10 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-extrabold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {addedBanner ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Masuk Keranjang!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Masukkan Semua ke Keranjang</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="h-10 px-3.5 border border-slate-200 hover:border-[#153E90] text-slate-700 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookmarkCheck className="w-3.5 h-3.5 text-[#153E90]" />
                  <span>{savedFeedback ? 'Tersimpan!' : 'Simpan'}</span>
                </button>
              </div>
            </div>
          </div>

          {savedCalculations.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1.5">
              <p className="text-xs font-extrabold text-slate-900">
                Riwayat Estimasi Tersimpan ({savedCalculations.length})
              </p>
              {savedCalculations.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100"
                >
                  <span className="font-semibold text-slate-800 truncate">
                    {item.title} · {item.areaSqm} m²
                  </span>
                  <span className="font-mono font-bold text-[#153E90] tabular-nums">
                    {formatRupiah(item.estimatedCost)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
