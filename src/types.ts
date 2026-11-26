export type ScreenId =
  | 'screen-1'
  | 'screen-2'
  | 'screen-3'
  | 'screen-4'
  | 'screen-5'
  | 'screen-6'
  | 'screen-7'
  | 'screen-8'
  | 'screen-9'
  | 'screen-10'
  | 'screen-11'
  | 'screen-12'
  | 'screen-13'
  | 'screen-14'
  | 'screen-15'
  | 'screen-16'
  | 'screen-17'
  | 'screen-18'
  | 'katalog-warna'
  | 'kalkulator';

export type UserRole =
  | 'Sales'
  | 'Distributor'
  | 'Produksi'
  | 'Gudang'
  | 'QC'
  | 'Management';

export type ProductCategoryId =
  | 'melamine-nc'
  | 'pu-acrylic'
  | 'epoxy-synthetic'
  | 'waterbased'
  | 'thinner'
  | 'tembok-genteng';

export type ColorFamily =
  | 'Putih & Netral'
  | 'Biru & Samudra'
  | 'Kuning & Hangat'
  | 'Hijau & Alam'
  | 'Merah & Terracotta'
  | 'Pastel & Modern';

export interface PaintColor {
  code: string;
  name: string;
  hex: string;
  family: ColorFamily;
  recommendedFor: string[];
  undertone: string;
  lrv: number;
}

export interface PackOption {
  sizeKg: number;
  label: string;
  pricePerLiter: number;
  price: number;
  stockByBranch: Record<string, number>;
}

export interface PaintProduct {
  id: string;
  name: string;
  shortTagline: string;
  category: ProductCategoryId;
  categoryLabel: string;
  finish: string;
  rating: number;
  reviewCount: number;
  coverageSqmPerKg: number;
  dryTime: string;
  benefits: string[];
  description: string;
  canAccentColor: string;
  canSecondaryColor: string;
  canLabelTitle: string;
  canLabelSubtitle: string;
  packs: PackOption[];
  defaultPackIndex: number;
  featured?: boolean;
  supportsCustomColor: boolean;
  priceNote?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  categoryLabel: string;
  packLabel: string;
  sizeKg: number;
  unitPrice: number;
  quantity: number;
  selected: boolean;
  color: PaintColor;
  canAccentColor: string;
}

export interface PromoVoucher {
  code: string;
  title: string;
  description: string;
  discountType: 'percent' | 'fixed' | 'shipping';
  value: number;
  minSpend: number;
  validUntil: string;
}

export type OrderStage =
  | 'Pesanan Dibuat'
  | 'Diproduksi'
  | 'Dalam Pengiriman'
  | 'Sampai Tujuan';

export interface OrderRecord {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  address: string;
  destinationStore: string;
  courier: string;
  driverName: string;
  vehiclePlate: string;
  branch: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  promoCode?: string;
  stage: OrderStage;
  stageTimestamps: Record<OrderStage, string>;
  estimatedArrival: string;
}

export interface SavedCalculation {
  id: string;
  title: string;
  createdAt: string;
  areaSqm: number;
  coats: number;
  totalKgNeeded: number;
  productId: string;
  productName: string;
  color: PaintColor;
  recommendedPacks: { label: string; sizeKg: number; count: number; price: number }[];
  estimatedCost: number;
}

export interface UserProfile {
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  city: string;
  address: string;
  preferredBranch: string;
}

export interface ColorFormula {
  id: string;
  code: string;
  name: string;
  swatchHex: string;
  status: 'Approved' | 'Trial';
  starred: boolean;
  description: string;
  ingredients: {
    name: string;
    percent: number;
    color: string;
  }[];
}

export interface QcParameter {
  parameter: string;
  standard: string;
  result: string;
  status: 'PASS' | 'RECHECK';
}

export interface RawMaterialItem {
  id: string;
  name: string;
  category: 'Resin' | 'Pigment' | 'Additive' | 'Solvent';
  stockKg: number;
  maxCapacityKg: number;
  status: 'Aman' | 'Stok Rendah';
  colorHex: string;
}

export interface FinishedGoodStock {
  id: string;
  productId: string;
  name: string;
  categoryLabel: string;
  pailCount: number;
  status: 'Aman' | 'Menipis';
  accentColor: string;
  secondaryColor: string;
  labelTitle: string;
}

export interface ApprovalRequest {
  id: string;
  category: 'Produksi' | 'Pembelian' | 'Promo Dealer' | 'Lainnya';
  title: string;
  date: string;
  status: 'Menunggu' | 'Disetujui' | 'Ditolak';
  details: { label: string; value: string }[];
}

export interface AppNotification {
  id: string;
  category: 'Produksi' | 'Penjualan' | 'Gudang' | 'QC';
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
  targetScreen: ScreenId;
}

export interface AiColorMatchResult {
  matchedCode: string;
  matchedName: string;
  matchedHex: string;
  similarityPercent: number;
  surfaceObservation: string;
  recommendedProductId: string;
  pairingSuggestion: string;
}
