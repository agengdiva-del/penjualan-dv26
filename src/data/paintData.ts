import {
  AppNotification,
  ApprovalRequest,
  ColorFormula,
  FinishedGoodStock,
  OrderRecord,
  PackOption,
  PaintColor,
  PaintProduct,
  ProductCategoryId,
  PromoVoucher,
  QcParameter,
  RawMaterialItem,
  UserProfile,
} from '../types';

export const SCREEN_SEQUENCE: {
  id:
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
    | 'screen-18';
  num: number;
  title: string;
  subtitle: string;
  group: string;
}[] = [
  { id: 'screen-1', num: 1, title: 'Splash Screen', subtitle: 'Tampilan awal aplikasi', group: 'Onboarding' },
  { id: 'screen-2', num: 2, title: 'Login', subtitle: 'Masuk ke aplikasi', group: 'Onboarding' },
  { id: 'screen-3', num: 3, title: 'Dashboard Utama', subtitle: 'Ringkasan informasi penting', group: 'Utama' },
  { id: 'screen-4', num: 4, title: 'Menu Penjualan (Beranda)', subtitle: 'Kategori produk', group: 'Penjualan' },
  { id: 'screen-5', num: 5, title: 'Detail Produk', subtitle: 'Informasi lengkap produk', group: 'Penjualan' },
  { id: 'screen-6', num: 6, title: 'Keranjang Belanja', subtitle: 'Daftar produk yang dipilih', group: 'Penjualan' },
  { id: 'screen-7', num: 7, title: 'Tracking Pengiriman', subtitle: 'Lacak pengiriman real-time', group: 'Logistik' },
  { id: 'screen-8', num: 8, title: 'Dashboard Produksi', subtitle: 'Status mesin & target', group: 'Produksi' },
  { id: 'screen-9', num: 9, title: 'Monitoring Batch Produksi', subtitle: 'Detail batch DVP24001', group: 'Produksi' },
  { id: 'screen-10', num: 10, title: 'Formula Warna', subtitle: 'Daftar & buat formula', group: 'R&D' },
  { id: 'screen-11', num: 11, title: 'Quality Control (QC)', subtitle: 'Pemeriksaan standar batch', group: 'QC' },
  { id: 'screen-12', num: 12, title: 'Gudang Bahan Baku', subtitle: 'Stok resin & pigment', group: 'Gudang' },
  { id: 'screen-13', num: 13, title: 'Gudang Barang Jadi', subtitle: 'Stok produk siap jual', group: 'Gudang' },
  { id: 'screen-14', num: 14, title: 'Approval Manager', subtitle: 'Persetujuan permintaan', group: 'Manajemen' },
  { id: 'screen-15', num: 15, title: 'Dashboard Direksi', subtitle: 'Kinerja nasional & dealer', group: 'Manajemen' },
  { id: 'screen-16', num: 16, title: 'Profil Dealer', subtitle: 'Toko Sinar Bangunan', group: 'Mitra' },
  { id: 'screen-17', num: 17, title: 'Notification Center', subtitle: 'Notifikasi operasional', group: 'Sistem' },
  { id: 'screen-18', num: 18, title: 'AI Color Matching', subtitle: 'Smart color dari foto', group: 'AI Studio' },
];

export const BRANCHES = [
  'Jakarta Pusat (Gudang Utama)',
  'Bandung (Cabang Jawa Barat)',
  'Surabaya (Cabang Jawa Timur)',
  'Medan (Cabang Sumatera)',
];

export const PRODUCT_CATEGORIES: {
  id: ProductCategoryId;
  name: string;
  shortName: string;
  description: string;
  tintBg: string;
  iconColor: string;
}[] = [
  {
    id: 'melamine-nc',
    name: 'Melamine & NC',
    shortName: 'Melamine & NC',
    description: 'MSS, MT, NCSS, NCT, Wood Stain (WS), Wash (WW), dan Glaze.',
    tintBg: 'bg-blue-50 border-blue-100',
    iconColor: 'text-[#153E90]',
  },
  {
    id: 'pu-acrylic',
    name: 'PU & Acrylic',
    shortName: 'PU & Acrylic',
    description: 'Polyurethane (PUTC, PUSS, PUT, Hardener), Acrylic, ACR, dan Novonyl.',
    tintBg: 'bg-red-50 border-red-100',
    iconColor: 'text-[#DC2626]',
  },
  {
    id: 'epoxy-synthetic',
    name: 'Epoxy & Synthetic',
    shortName: 'Epoxy & Synth',
    description: 'Epoxy, Synthetic, Exposure, Gum Sealer, Anti Karat, dan Katalisator.',
    tintBg: 'bg-amber-50 border-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    id: 'waterbased',
    name: 'Waterbased & Wood',
    shortName: 'Waterbased',
    description: 'WB, WBTC, AWB, WBSS, WF, WPWB, dan Teak Oil ramah lingkungan.',
    tintBg: 'bg-sky-50 border-sky-100',
    iconColor: 'text-sky-600',
  },
  {
    id: 'thinner',
    name: 'Thinner & Solvent',
    shortName: 'Thinner',
    description: 'Thinner ND, NC, PU, Epoxy, Synthetic, Wash, Glaze, dan Spirtus.',
    tintBg: 'bg-orange-50 border-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    id: 'tembok-genteng',
    name: 'Tembok & Genteng',
    shortName: 'Cat Tembok',
    description: 'Cat Tembok Indoor/Outdoor, Cat Genteng, Vlamir, dan Anti Fungi.',
    tintBg: 'bg-emerald-50 border-emerald-100',
    iconColor: 'text-emerald-600',
  },
];

export const PAINT_COLORS: PaintColor[] = [
  { code: 'DV-101', name: 'Putih Salju', hex: '#F8FAFC', family: 'Putih & Netral', recommendedFor: ['Interior', 'Plafon'], undertone: 'Netral Bersih', lrv: 91 },
  { code: 'DIV-WH-210', name: 'Soft Ivory', hex: '#EDE3C8', family: 'Putih & Netral', recommendedFor: ['Interior', 'Ruang Tamu'], undertone: 'Krem Hangat', lrv: 82 },
  { code: 'DV-103', name: 'Abu Minimalis', hex: '#CBD5E1', family: 'Putih & Netral', recommendedFor: ['Interior', 'Fasad'], undertone: 'Dingin Seimbang', lrv: 64 },
  { code: 'DV-104', name: 'Batu Granit', hex: '#64748B', family: 'Putih & Netral', recommendedFor: ['Eksterior', 'Pagar'], undertone: 'Biru Keabuan', lrv: 24 },
  { code: 'DV-105', name: 'Cokelat Linen', hex: '#D6C7B2', family: 'Putih & Netral', recommendedFor: ['Interior', 'Keluarga'], undertone: 'Hangat Alami', lrv: 58 },
  { code: 'DV-106', name: 'Hitam Karbon', hex: '#1E293B', family: 'Putih & Netral', recommendedFor: ['Kayu & Besi'], undertone: 'Gelap Pekat', lrv: 6 },

  { code: 'DV-201', name: 'Biru DIVA Klasik', hex: '#1D4ED8', family: 'Biru & Samudra', recommendedFor: ['Interior', 'Eksterior'], undertone: 'Kobalt Tajam', lrv: 18 },
  { code: 'DV-202', name: 'Biru Samudra', hex: '#2B6CB0', family: 'Biru & Samudra', recommendedFor: ['Interior', 'Ruang Tamu'], undertone: 'Biru Sedang', lrv: 25 },
  { code: 'DV-203', name: 'Langit Pagi', hex: '#93C5FD', family: 'Biru & Samudra', recommendedFor: ['Interior', 'Kamar Anak'], undertone: 'Biru Muda', lrv: 56 },
  { code: 'DV-204', name: 'Telur Asin', hex: '#A7C7CB', family: 'Biru & Samudra', recommendedFor: ['Interior', 'Eksterior'], undertone: 'Biru Kehijauan', lrv: 55 },
  { code: 'DV-205', name: 'Navy Nusantara', hex: '#153E90', family: 'Biru & Samudra', recommendedFor: ['Interior', 'Kayu & Besi'], undertone: 'Biru Tua', lrv: 10 },
  { code: 'DV-206', name: 'Es Kutub', hex: '#DBEAFE', family: 'Biru & Samudra', recommendedFor: ['Interior', 'Plafon'], undertone: 'Putih Kebiruan', lrv: 77 },

  { code: 'DV-301', name: 'Kuning Mentari', hex: '#FACC15', family: 'Kuning & Hangat', recommendedFor: ['Interior', 'Aksen'], undertone: 'Emas Cerah', lrv: 69 },
  { code: 'DV-302', name: 'Kuning Mustard', hex: '#EAB308', family: 'Kuning & Hangat', recommendedFor: ['Interior', 'Eksterior'], undertone: 'Hangat Kaya', lrv: 54 },
  { code: 'DV-303', name: 'Surya Lembut', hex: '#FDE68A', family: 'Kuning & Hangat', recommendedFor: ['Interior', 'Dapur'], undertone: 'Krem Emas', lrv: 79 },
  { code: 'DV-304', name: 'Madu Hutan', hex: '#D97706', family: 'Kuning & Hangat', recommendedFor: ['Kayu & Besi'], undertone: 'Amber Hangat', lrv: 29 },
  { code: 'DV-305', name: 'Pasir Pantai', hex: '#E5D3B3', family: 'Kuning & Hangat', recommendedFor: ['Eksterior', 'Interior'], undertone: 'Beige Hangat', lrv: 65 },
  { code: 'DV-306', name: 'Oranye Senja', hex: '#F97316', family: 'Kuning & Hangat', recommendedFor: ['Eksterior', 'Aksen'], undertone: 'Koral Cerah', lrv: 36 },

  { code: 'DV-401', name: 'Hijau Sage', hex: '#95B89E', family: 'Hijau & Alam', recommendedFor: ['Interior', 'Kamar Tidur'], undertone: 'Abu Kehijauan', lrv: 46 },
  { code: 'DV-402', name: 'Daun Zaitun', hex: '#658354', family: 'Hijau & Alam', recommendedFor: ['Eksterior', 'Ruang Kerja'], undertone: 'Hangat Alami', lrv: 24 },
  { code: 'DV-403', name: 'Mint Segar', hex: '#A7F3D0', family: 'Hijau & Alam', recommendedFor: ['Interior', 'Kamar Mandi'], undertone: 'Sejuk Bersih', lrv: 72 },
  { code: 'DV-404', name: 'Zamrud Tropis', hex: '#15803D', family: 'Hijau & Alam', recommendedFor: ['Kayu & Besi', 'Eksterior'], undertone: 'Hijau Kaya', lrv: 17 },
  { code: 'DV-405', name: 'Lumut Teduh', hex: '#4D7C0F', family: 'Hijau & Alam', recommendedFor: ['Eksterior', 'Taman'], undertone: 'Hijau Daun', lrv: 19 },
  { code: 'DV-406', name: 'Pistachio Muda', hex: '#D9F99D', family: 'Hijau & Alam', recommendedFor: ['Interior', 'Kamar Anak'], undertone: 'Kuning Hijau', lrv: 82 },

  { code: 'DV-501', name: 'Merah Marun', hex: '#991B1B', family: 'Merah & Terracotta', recommendedFor: ['Eksterior', 'Kayu & Besi'], undertone: 'Merah Tua', lrv: 9 },
  { code: 'DV-502', name: 'Merah Bata Tropis', hex: '#C2410C', family: 'Merah & Terracotta', recommendedFor: ['Eksterior', 'Fasad'], undertone: 'Oranye Tanah', lrv: 18 },
  { code: 'DV-503', name: 'Terracotta Hangat', hex: '#E07A5F', family: 'Merah & Terracotta', recommendedFor: ['Interior', 'Ruang Makan'], undertone: 'Koral Hangat', lrv: 31 },
  { code: 'DV-504', name: 'Merah Rubi DIVA', hex: '#DC2626', family: 'Merah & Terracotta', recommendedFor: ['Kayu & Besi', 'Aksen'], undertone: 'Merah Murni', lrv: 17 },
  { code: 'DV-505', name: 'Cokelat Jati', hex: '#78350F', family: 'Merah & Terracotta', recommendedFor: ['Kayu & Besi', 'Kusen'], undertone: 'Kayu Klasik', lrv: 8 },
  { code: 'DV-506', name: 'Kopi Tubruk', hex: '#451A03', family: 'Merah & Terracotta', recommendedFor: ['Kayu & Besi', 'Pagar'], undertone: 'Gelap Hangat', lrv: 4 },

  { code: 'DV-601', name: 'Mawar Pastel', hex: '#F4A6B8', family: 'Pastel & Modern', recommendedFor: ['Interior', 'Kamar Tidur'], undertone: 'Merah Muda', lrv: 53 },
  { code: 'DV-602', name: 'Persik Lembut', hex: '#FED7AA', family: 'Pastel & Modern', recommendedFor: ['Interior', 'Keluarga'], undertone: 'Hangat Manis', lrv: 75 },
  { code: 'DV-603', name: 'Lavender Senja', hex: '#DDD6FE', family: 'Pastel & Modern', recommendedFor: ['Interior', 'Kamar Anak'], undertone: 'Ungu Lembut', lrv: 72 },
  { code: 'DV-604', name: 'Blush Sakura', hex: '#FCE7F3', family: 'Pastel & Modern', recommendedFor: ['Interior', 'Kamar Tidur'], undertone: 'Putih Pink', lrv: 84 },
  { code: 'DV-605', name: 'Mauve Elegan', hex: '#A78BFA', family: 'Pastel & Modern', recommendedFor: ['Interior', 'Aksen'], undertone: 'Violet Modern', lrv: 37 },
  { code: 'DV-606', name: 'Biru Awan', hex: '#BAE6FD', family: 'Pastel & Modern', recommendedFor: ['Interior', 'Plafon'], undertone: 'Biru Pastel', lrv: 74 },
];

type PriceRowTuple = [
  name: string,
  category: ProductCategoryId,
  p1: number | null,
  p2: number | null,
  p5: number | null,
  p20: number | null,
  priceNote?: string,
  featured?: boolean,
];

const RAW_PRICE_ROWS: PriceRowTuple[] = [
  ['MSS - 510 LO', 'melamine-nc', 46000, 44500, 42500, 42000, undefined, true],
  ['MSS - 510', 'melamine-nc', 48000, 47000, 46000, 45000, undefined, true],
  ['MT - 610 CLEAR GLOSS LO', 'melamine-nc', 51000, 50000, 45000, 44500, undefined, true],
  ['MT - 610 CLEAR GLOSS', 'melamine-nc', 52000, 51000, 50000, 49500, undefined, true],
  ['MT - 610 SEMI GLOSS LO', 'melamine-nc', 49500, 48000, 46500, 45000],
  ['MT - 610 SEMI GLOSS', 'melamine-nc', 50000, 49000, 48000, 47500],
  ['MT - 610 CLEAR GLOSS HV', 'melamine-nc', 53500, 52000, 51000, 50500],
  ['MT - 610 CLEAR DOFF LO', 'melamine-nc', 50000, 48000, 45500, 45000],
  ['MT - 610 CLEAR DOFF', 'melamine-nc', 51000, 50000, 49000, 48500],
  ['MT - 610 CLEAR DOFF 10% (DEAD MATT)', 'melamine-nc', 51000, 50000, 49000, 48500],
  ['MSS - WHITE (min 5 ltr)', 'melamine-nc', 61000, 60000, 59000, 58500],
  ['MT- WHITE/BLACK GLOSS (min 5 ltr)', 'melamine-nc', 65500, 64000, 63000, 62500],
  ['MT- WHITE SEMI GLOSS (min 5 ltr)', 'melamine-nc', 66000, 65000, 64500, 64000],
  ['MT- WHITE/BLACK DOFF(min 5 ltr)', 'melamine-nc', 66000, 65000, 64500, 64000],
  ['NCSS', 'melamine-nc', 53000, 52000, 51500, 51000, undefined, true],
  ['NCSS - LO', 'melamine-nc', 51500, 50000, 49500, 49000],
  ['NCT - CLEAR GLOSS', 'melamine-nc', 60500, 59000, 58500, 58000],
  ['NCT - CLEAR GLOSS LO', 'melamine-nc', 58000, 57500, 56000, 55500],
  ['NCT - SEMI GLOSS LO', 'melamine-nc', 54000, 53000, 52000, 51500],
  ['NCT - SEMI GLOSS', 'melamine-nc', 55000, 54500, 54000, 53500],
  ['NCT - CLEAR DOFF LO', 'melamine-nc', 54000, 53000, 52000, 51500],
  ['NCT - CLEAR DOFF', 'melamine-nc', 55000, 54500, 54000, 53500],
  ['NCT - 6500 DEAD MATT', 'melamine-nc', 55000, 54500, 54000, 53500],
  ['NCSS - WHITE / BLACK', 'melamine-nc', 67000, 66000, 65000, 64000],
  ['NCT - GLOSS WHITE', 'melamine-nc', 73000, 72000, 71000, 70000],
  ['NCT - GLOSS BLACK', 'melamine-nc', 73000, 72000, 71000, 70000],
  ['NCT - SEMI GLOSS WHITE / BLACK', 'melamine-nc', 73000, 72000, 71000, 70000],
  ['NCT - DOFF WHITE', 'melamine-nc', 73000, 72000, 71000, 70000],
  ['NCT - WHITE MATT / BLACK MATT', 'melamine-nc', 73000, 72000, 71000, 70000],
  ['NCT - SOLID SUSUKA BLACK', 'melamine-nc', 77000, 76000, 75500, 75000],
  ['NCT - SOLID PUTIH TULANG', 'melamine-nc', 77000, 76000, 75500, 75000],
  ['NCT - SOLID CUSTOM', 'melamine-nc', null, null, null, null, 'DI HITUNG DULU'],
  ['NCT - SOLID WHITE DEAD MATT', 'melamine-nc', 77000, null, null, null],
  ['NCT - SOLID white susuka/super white', 'melamine-nc', 77000, 76000, 75500, 75000],
  ['WW - 322 WASH ALL COLOUR', 'melamine-nc', 67000, 65000, 63500, 63000],
  ['WS - 221 B YELLOW,RED,BLACK,JATI,CA', 'melamine-nc', 63000, 62000, 61500, 61000],
  ['WS - 221 B RATTAN BROWN/candy brown', 'melamine-nc', 72000, 71000, 70000, 69500],
  ['WS - COCOA BROWN', 'melamine-nc', 63000, 62000, 61500, 61000],
  ['WS - 221 B BROWN', 'melamine-nc', 72000, 71000, 70000, 69500],
  ['WS - 221 B DARK MAHONY', 'melamine-nc', 72000, 71000, 70000, 69500],
  ['WS - 221 B RED MAHONY', 'melamine-nc', 72000, 71000, 70000, 69500],
  ['WS - 221 B SALAK BROWN', 'melamine-nc', 72000, 71000, 70000, 69500],
  ['WS - 221 B walnut', 'melamine-nc', 72000, 71000, 70000, 69500],
  ["GLAZE ALL COLOUR'S", 'melamine-nc', 160000, null, null, null],

  ['THINNER ND MELAMINE', 'thinner', 18000, null, null, 17500],
  ['THINNER ND HG', 'thinner', 27000, null, null, 26500],
  ['THINNER ND DC (UNTUK DUCO NC)', 'thinner', 19000, null, null, 18500],
  ['THINNER NC', 'thinner', 28000, null, null, 27500],
  ['THINNER NC LO', 'thinner', 25000, null, null, 24500],
  ['THINNER NC LOC', 'thinner', 22500, null, null, 22000],
  ['THINNER HI GLOSS (HG)', 'thinner', 27000, null, null, 26500],
  ['THINNER WARNA / ACR', 'thinner', 32000, null, null, 31500],
  ['THINNER WASH', 'thinner', 38000, null, null, 37500],
  ['THINNER EPOXY', 'thinner', 26500, null, null, 26000],
  ['THINNER GLAZE', 'thinner', 43000, null, null, 42500],
  ['THINNER SBG', 'thinner', 26000, null, null, 25500],
  ['SPIRTUS', 'thinner', 19000, null, null, 18500],
  ['THINNER EXPOSURE', 'thinner', 18000, null, null, 17500],
  ['THINNER EXPOSURE KAROSERI', 'thinner', 17500, null, null, 17000],
  ['THINNER PU', 'thinner', 32000, null, null, 31500],
  ['THINNER PU KAROSERI', 'thinner', 25000, null, null, 24500],
  ['THINNER PU HI GLOSS', 'thinner', 39000, null, null, 38500],
  ['THINNER NC HG', 'thinner', 29000, null, null, 28500],
  ['THINNER NC H / AF', 'thinner', 31000, null, null, 30500],
  ['THINNER GUM SEALER', 'thinner', 31000, null, null, 30500],
  ['THINNER CUCI', 'thinner', 23000, null, null, 22500],
  ['THINNER SYNTETIC', 'thinner', 27000, null, null, 27000],

  ['RETARDER', 'epoxy-synthetic', 53000, null, null, null],
  ['WHITENING / BC WHITE', 'epoxy-synthetic', 95000, null, null, 95000],
  ['ANTI KARAT / RUST BLOK', 'epoxy-synthetic', 90000, null, null, 90000],
  ['KATALISATOR', 'epoxy-synthetic', 76000, null, null, 76000],

  ['WB - RSDL', 'waterbased', 70000, null, null, 70000],
  ['WB - SS 2063 LO CG', 'waterbased', 26000, null, null, 26000],
  ['WB - SS 170 LO', 'waterbased', 25000, null, null, 25000],
  ['WB - SS PRO', 'waterbased', 45000, null, null, 45000],
  ['WB - N70 (wb - semi gloss)', 'waterbased', 55000, null, null, 55000],
  ['WBTC - N90', 'waterbased', 45000, null, null, null],
  ['WB - NATURAL HONEY (ready)', 'waterbased', 15000, null, null, 15000],
  ['WB - PRO 01 S70', 'waterbased', 45000, null, null, 45000],
  ['WB - PRO 01 N70', 'waterbased', 58000, null, null, 58000],
  ['WBTC - 1049', 'waterbased', 40000, null, null, null],
  ['WBTC - N20 (doff)', 'waterbased', 50000, null, null, null],
  ['WBTC - CLEAR GLOSS (2069)', 'waterbased', 45000, null, null, 45000],
  ['WBTC - 70', 'waterbased', 45000, null, null, 45000],

  ['EPOXY HARDENER CLEAR (KAROSERI)', 'epoxy-synthetic', 85000, null, null, null],
  ['EPOXY ALL COLOUR standar', 'epoxy-synthetic', 65000, null, null, null, undefined, true],
  ['EPOXY BLACK', 'epoxy-synthetic', 65000, null, null, null],
  ['EPOXY SEMI BLACK GLOSS', 'epoxy-synthetic', 80000, null, null, null],
  ['EPOXY WHITE', 'epoxy-synthetic', 65000, null, null, null],
  ['EPOXY BLACK GALFANIS', 'epoxy-synthetic', 95000, null, null, null],
  ['EPOXY GALFANIS WHITE', 'epoxy-synthetic', null, null, null, null, 'DIHITUNG KETIKA ORDER'],
  ['EPOXY GREY', 'epoxy-synthetic', 62000, null, null, null],
  ['EPOXY GREY KAROSERI', 'epoxy-synthetic', null, null, null, null, 'DIHITUNG KETIKA ORDER'],
  ['EPOXY NAVY BLUE', 'epoxy-synthetic', null, null, null, null, 'DIHITUNG KETIKA ORDER'],
  ['EPOXY PINK', 'epoxy-synthetic', null, null, null, null, 'DIHITUNG KETIKA ORDER'],
  ['EPOXY RED FERARI', 'epoxy-synthetic', null, null, null, null, 'DIHITUNG KETIKA ORDER'],
  ['GUM SEALER (ANTI GETAH)', 'epoxy-synthetic', 93000, 92500, 92000, 91500],
  ['GUM SEALER DRX', 'epoxy-synthetic', 105000, null, null, null],
  ["EXPOSURE ALL COLOUR'S", 'epoxy-synthetic', 40000, null, null, null],
  ['SYNTHETIC WHITE', 'epoxy-synthetic', 68000, null, null, null],
  ['SYNTHETIC SEMI BLACK', 'epoxy-synthetic', 60000, null, null, null],

  ['PU - HARDENER 001A', 'pu-acrylic', 110000, null, null, null],
  ['PU - HARDENER 003B', 'pu-acrylic', 140000, null, null, null],
  ['PUTC 8620-21-008PC CLEAR GLOSS 6300', 'pu-acrylic', 135000, null, null, null, undefined, true],
  ['PUSS 720LF - 41 - 003 C NATURAL', 'pu-acrylic', 95000, null, null, null],
  ['PUSS 750-41-001A NATURAL', 'pu-acrylic', 90000, null, null, null],
  ['PUTC 890-41-002PC CLEAR GLOSS', 'pu-acrylic', 77000, null, null, null],
  ['PUTC 880-41-002C CLEAR SATIN', 'pu-acrylic', 66000, null, null, null],
  ['PUSS 750-41-001A BLACK', 'pu-acrylic', 95000, null, null, null],
  ['PUTC 890-41-002PC BLACK GLOSS', 'pu-acrylic', 110000, null, null, null],
  ['PUT - 820 CLEAR GLOSS ACR', 'pu-acrylic', 115000, null, null, null],
  ['PUT - 810 CLEAR GLOSS ACR', 'pu-acrylic', 103000, null, null, null],
  ['PUTC 810 CELAR DOFF ACR', 'pu-acrylic', 98000, null, null, null],
  ['PUTC 810 CLEAR MATT', 'pu-acrylic', 98000, null, null, null],
  ['PUTC 820-41-003B SEMI GLOSS', 'pu-acrylic', 110000, null, null, null],
  ['PUTC 820-41-DEAD MATT', 'pu-acrylic', 107000, null, null, null],
  ['PUTC 820-003A CLEAR DOFF (ISI DEAD MATT)', 'pu-acrylic', 110000, null, null, null],
  ['PUTC 820-41-003A CLEAR MATT/doff', 'pu-acrylic', 98000, null, null, null],
  ['PUTC 820-41-003A CLEAR DOFF WHITE', 'pu-acrylic', 129762, null, null, null],
  ["NOVONYL ALL COLOUR'S", 'pu-acrylic', 285000, null, null, null],

  ['WB - PST BROWN', 'waterbased', 250800, null, null, null],
  ['WB - PST BLUE S', 'waterbased', 235000, null, null, null],
  ['WB - PST RED S', 'waterbased', 335000, null, null, null],
  ['WB - PST YELLOW S', 'waterbased', 308000, null, null, null],
  ['WB - PST BLACK S', 'waterbased', 100000, null, null, null],
  ['WB - PST WHITE', 'waterbased', 110000, null, null, null],
  ['WBTC - N20 DOFF WHITE', 'waterbased', 45000, null, null, null],

  ['ACRYLIC SS', 'pu-acrylic', 71500, null, null, null],
  ['ACR GLOSS', 'pu-acrylic', 73000, null, null, null],
  ['ACR DOFF', 'pu-acrylic', 75000, null, null, null],
  ['ACR - SS WHITE', 'pu-acrylic', 80000, 79000, 78500, 78000],
  ['ACR - SEMI WHITE', 'pu-acrylic', 83000, 81000, 80000, 79500],
  ['ACR GLOSS WHITE', 'pu-acrylic', 82000, 80000, 79000, 78500],
  ['ACRYLIC DOFF WHITE', 'pu-acrylic', 83000, 81000, 80000, 79500],

  ['WF - 124 JATI', 'waterbased', 30000, null, null, null],
  ['WB - DEMPUL JATI', 'waterbased', 30000, null, null, null],
  ['WF - 124 WHITE', 'waterbased', 31000, null, null, null],
  ['WF - KAMPER', 'waterbased', 35000, null, null, null],
  ['AWB - CLEAR GLOSS', 'waterbased', 52500, null, null, null],
  ['AWB - DOFF BTK', 'waterbased', 52500, null, null, null],
  ['AWB - SUPER GLOSS', 'waterbased', 55500, null, null, null],
  ['WB - SS', 'waterbased', 45000, null, null, null],
  ['AWB - BLACK', 'waterbased', 47000, null, null, null],
  ['WB - SEALER RDL', 'waterbased', 43000, null, null, null],
  ['AWB - SEALER SHINIL', 'waterbased', 62000, null, null, null],
  ['AWB - DEAD MATT / CLEAR DOFF', 'waterbased', 66500, null, null, null],
  ['WPWB - ROTTAN', 'waterbased', 24500, null, null, null],

  ['CAT TEMBOK WHITE', 'tembok-genteng', 24000, null, null, null, undefined, true],
  ['WB - WHITE C', 'waterbased', 23000, null, null, null],
  ['WB - WHITE A', 'waterbased', 28000, null, null, null],
  ['CAT TEMBOK WARNA INDOOR TUA', 'tembok-genteng', 30000, null, null, null, undefined, true],
  ['CAT TEMBOK WARNA INDOOR MUDA', 'tembok-genteng', 30000, null, null, null, undefined, true],
  ['CAT TEMBOK OUTDOOR WHITE HIGH', 'tembok-genteng', 100000, null, null, null, undefined, true],
  ['CAT TEMBOK OUTDOOR WHITE MIDLE', 'tembok-genteng', 50000, null, null, null],
  ['CAT TEMBOK OUTDOOR WHITE LOW', 'tembok-genteng', 35500, null, null, null],
  ['CAT GENTENG WHITE', 'tembok-genteng', 53000, null, null, null],
  ['TEAK OIL', 'waterbased', 57000, null, null, null],
  ['ANTI FUNGI CR', 'tembok-genteng', 330000, null, null, null],
  ['SYNTETIC ALL COLOUR', 'epoxy-synthetic', 65000, null, null, null],
  ['VLAMIR', 'tembok-genteng', 13000, null, null, null],
  ['WBTC 1440 CLEAR MATT 5%', 'waterbased', 160000, null, null, null],
  ['WBSS 1320 AM NATURAL', 'waterbased', 98500, null, null, null],
  ['WBTC SEMI GLOSS', 'waterbased', 60000, null, null, null],
  ['WBSS NATURAL', 'waterbased', 110000, null, null, null],
];

const CATEGORY_META: Record<
  ProductCategoryId,
  {
    label: string;
    accent: string;
    secondary: string;
    subtitle: string;
    coverage: number;
    dryTime: string;
    benefits: string[];
  }
> = {
  'melamine-nc': {
    label: 'Melamine & Nitrocellulose',
    accent: '#153E90',
    secondary: '#3B82F6',
    subtitle: 'Melamine / NC',
    coverage: 10,
    dryTime: '30–60 Menit Kering Sentuh',
    benefits: [
      'Daya Tutup & Kehalusan Tinggi',
      'Cepat Kering & Mudah Diamplas',
      'Tahan Gores untuk Furnitur & Kayu',
      'Pilihan Gloss, Semi Gloss, Doff & Dead Matt',
      'Standar Industri PT. Global Warna Indonesia',
    ],
  },
  'pu-acrylic': {
    label: 'Polyurethane & Acrylic',
    accent: '#DC2626',
    secondary: '#EF4444',
    subtitle: 'PU / Acrylic',
    coverage: 11,
    dryTime: '1–2 Jam Kering Sentuh',
    benefits: [
      'Ketahanan Kimia & Cuaca Ekstrem',
      'Kilap Tajam Tidak Mudah Menguning',
      'Daya Rekat Kuat di Kayu, Besi & Otomotif',
      'Formulasi High-Solid Profesional',
      'Hasil Akhir Halus & Rata Sempurna',
    ],
  },
  'epoxy-synthetic': {
    label: 'Epoxy, Synthetic & Sealer',
    accent: '#D97706',
    secondary: '#FACC15',
    subtitle: 'Epoxy / Synth',
    coverage: 9,
    dryTime: '2–3 Jam Kering Sentuh',
    benefits: [
      'Perlindungan Anti Karat & Anti Getah',
      'Daya Rekat Kuat di Besi, Galfanis & Karoseri',
      'Tahan Gesekan & Bahan Kimia Ringan',
      'Cocok untuk Industri, Besi & Furnitur',
      'Kualitas Teruji Laboratorium DIVA',
    ],
  },
  waterbased: {
    label: 'Waterbased Wood Coating',
    accent: '#0284C7',
    secondary: '#38BDF8',
    subtitle: 'Waterbased',
    coverage: 10,
    dryTime: '45–90 Menit Kering Sentuh',
    benefits: [
      'Berbasis Air, Rendah Bau & Ramah Lingkungan',
      'Tampilan Serat Kayu Natural & Jernih',
      'Cepat Kering & Mudah Diaplikasikan',
      'Tahan Jamur dan Kelembapan Tropis',
      'Aman untuk Interior & Eksterior Kayu',
    ],
  },
  thinner: {
    label: 'Thinner & Pelarut Industri',
    accent: '#EA580C',
    secondary: '#FB923C',
    subtitle: 'Thinner',
    coverage: 12,
    dryTime: 'Pengencer Cepat Menguap',
    benefits: [
      'Pengenceran Merata Tanpa Bintik',
      'Menjaga Daya Kilap Cat Utama Tetap Optimal',
      'Formulasi Khusus sesuai Jenis Cat (ND/NC/PU/Epoxy)',
      'Bebas Air & Pengotor (High Purity)',
      'Tersedia Kemasan 1 LT & 20 LT',
    ],
  },
  'tembok-genteng': {
    label: 'Cat Tembok & Genteng',
    accent: '#059669',
    secondary: '#34D399',
    subtitle: 'Tembok / Genteng',
    coverage: 10,
    dryTime: '1–2 Jam Kering Sentuh',
    benefits: [
      'Daya Tutup Baik untuk Dinding & Genteng',
      'Warna Cerah & Tidak Mudah Pudar',
      'Anti Jamur & Tahan Cuaca Tropis',
      'Mudah Diaplikasikan Kuas & Roller',
      'Harga Ekonomis Langsung Pabrik',
    ],
  },
};

function slugifyId(name: string, index: number): string {
  const clean = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${clean}-${index + 1}`;
}

function makeStock(base: number): Record<string, number> {
  return {
    'Jakarta Pusat (Gudang Utama)': base,
    'Bandung (Cabang Jawa Barat)': Math.max(12, Math.round(base * 0.65)),
    'Surabaya (Cabang Jawa Timur)': Math.max(14, Math.round(base * 0.72)),
    'Medan (Cabang Sumatera)': Math.max(8, Math.round(base * 0.45)),
  };
}

function detectFinish(name: string): string {
  const upper = name.toUpperCase();
  if (upper.includes('DEAD MATT')) return 'Dead Matt';
  if (upper.includes('SEMI GLOSS') || upper.includes('S70')) return 'Semi Gloss';
  if (upper.includes('HI GLOSS') || upper.includes('CLEAR GLOSS') || upper.includes('GLOSS')) return 'High Gloss';
  if (upper.includes('DOFF') || upper.includes('MATT')) return 'Doff / Matte';
  if (upper.includes('SATIN')) return 'Satin';
  if (upper.includes('THINNER') || upper.includes('SPIRTUS')) return 'Pelarut Cair';
  return 'Standar Industri DIVA';
}

function detectCustomColorSupport(name: string, category: ProductCategoryId): boolean {
  const upper = name.toUpperCase();
  if (category === 'thinner') return false;
  if (upper.includes('ALL COLOUR') || upper.includes('WARNA') || upper.includes('CUSTOM')) return true;
  if (category === 'tembok-genteng') return true;
  return !upper.includes('CLEAR') && !upper.includes('HARDENER') && !upper.includes('SEALER') && !upper.includes('KATALISATOR') && !upper.includes('RETARDER');
}

function shortCanTitle(name: string): string {
  const cleaned = name.replace(/\(.*?\)/g, '').trim();
  if (cleaned.length <= 14) return cleaned;
  return cleaned.slice(0, 14);
}

export const PAINT_PRODUCTS: PaintProduct[] = RAW_PRICE_ROWS.map(
  ([name, category, p1, p2, p5, p20, priceNote, featured], idx) => {
    const meta = CATEGORY_META[category];
    const packs: PackOption[] = [];

    if (p1 !== null) {
      packs.push({
        sizeKg: 1,
        label: '1 LT',
        pricePerLiter: p1,
        price: p1,
        stockByBranch: makeStock(120),
      });
    }
    if (p2 !== null) {
      packs.push({
        sizeKg: 2,
        label: '2 LT',
        pricePerLiter: p2,
        price: p2 * 2,
        stockByBranch: makeStock(80),
      });
    }
    if (p5 !== null) {
      packs.push({
        sizeKg: 5,
        label: '5 LT',
        pricePerLiter: p5,
        price: p5 * 5,
        stockByBranch: makeStock(55),
      });
    }
    if (p20 !== null) {
      packs.push({
        sizeKg: 20,
        label: '20 LT',
        pricePerLiter: p20,
        price: p20 * 20,
        stockByBranch: makeStock(28),
      });
    }

    if (packs.length === 0) {
      packs.push({
        sizeKg: 1,
        label: '1 LT',
        pricePerLiter: 0,
        price: 0,
        stockByBranch: makeStock(15),
      });
    }

    const supportsCustomColor = detectCustomColorSupport(name, category);
    const finish = detectFinish(name);

    return {
      id: slugifyId(name, idx),
      name,
      shortTagline: priceNote
        ? `${meta.label} · ${priceNote}`
        : `${meta.label} · ${finish}`,
      category,
      categoryLabel: meta.label,
      finish,
      rating: 4.8 + ((idx % 3) * 0.1 > 0.1 ? 0.1 : 0),
      reviewCount: 140 + ((idx * 37) % 620),
      coverageSqmPerKg: meta.coverage,
      dryTime: meta.dryTime,
      benefits: meta.benefits,
      description: `${name} merupakan produk resmi ${meta.label} dari PT. Global Warna Indonesia dengan standar kualitas tinggi untuk hasil aplikasi maksimal.`,
      canAccentColor: meta.accent,
      canSecondaryColor: meta.secondary,
      canLabelTitle: shortCanTitle(name),
      canLabelSubtitle: meta.subtitle,
      packs,
      defaultPackIndex: 0,
      featured: Boolean(featured),
      supportsCustomColor,
      priceNote,
    };
  }
);

export const PROMO_VOUCHERS: PromoVoucher[] = [
  {
    code: 'DIVAHEMAT15',
    title: 'Diskon Industri 15%',
    description: 'Potongan 15% untuk seluruh produk Melamine, PU, & Waterbased min. belanja Rp 300.000.',
    discountType: 'percent',
    value: 15,
    minSpend: 300000,
    validUntil: '31 Desember 2026',
  },
  {
    code: 'WARNA50RB',
    title: 'Potongan Langsung Rp 50.000',
    description: 'Berlaku untuk total belanja minimal Rp 500.000.',
    discountType: 'fixed',
    value: 50000,
    minSpend: 500000,
    validUntil: '30 November 2026',
  },
  {
    code: 'GRATISONGKIR',
    title: 'Bebas Ongkos Kirim Armada DIVA',
    description: 'Gratis pengiriman armada toko hingga Rp 45.000 untuk area Jawa & Sumatera.',
    discountType: 'shipping',
    value: 45000,
    minSpend: 185000,
    validUntil: '31 Desember 2026',
  },
];

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Budi Santoso',
  role: 'Distributor',
  phone: '0812-3456-7890',
  email: 'budi@sinarbangunan.co.id',
  city: 'Bandung, Jawa Barat',
  address: 'Jl. Merdeka No. 123, Bandung, Jawa Barat',
  preferredBranch: 'Jakarta Pusat (Gudang Utama)',
};

const defaultOrderProduct = PAINT_PRODUCTS[0];
const defaultOrderPack20 =
  defaultOrderProduct.packs.find((p) => p.label === '20 LT') || defaultOrderProduct.packs[0];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'DIVA240312003',
    createdAt: '12 Mar 2024 · 09:15',
    customerName: 'Toko Maju Jaya',
    customerPhone: '0812-3456-7890',
    address: 'Jl. Raya Darmo No. 88, Surabaya',
    destinationStore: 'Toko Maju Jaya - Surabaya',
    courier: 'Global Logistik',
    driverName: 'Budi Santoso',
    vehiclePlate: 'B 9123 GWI',
    branch: 'Jakarta Pusat (Gudang Utama)',
    paymentMethod: 'Transfer Virtual Account BCA',
    items: [
      {
        id: `${defaultOrderProduct.id}-${defaultOrderPack20.label}-DV-101`,
        productId: defaultOrderProduct.id,
        productName: defaultOrderProduct.name,
        categoryLabel: defaultOrderProduct.categoryLabel,
        packLabel: defaultOrderPack20.label,
        sizeKg: defaultOrderPack20.sizeKg,
        unitPrice: defaultOrderPack20.price,
        quantity: 5,
        selected: true,
        color: PAINT_COLORS[0],
        canAccentColor: defaultOrderProduct.canAccentColor,
      },
    ],
    subtotal: defaultOrderPack20.price * 5,
    discount: 0,
    shippingFee: 0,
    total: defaultOrderPack20.price * 5,
    stage: 'Dalam Pengiriman',
    stageTimestamps: {
      'Pesanan Dibuat': '12 Mar 2024, 09:15',
      Diproduksi: '12 Mar 2024, 14:30',
      'Dalam Pengiriman': '13 Mar 2024, 08:20',
      'Sampai Tujuan': 'Estimasi 14 Mar 2024',
    },
    estimatedArrival: '14 Mar 2024',
  },
];

export const INITIAL_FORMULAS: ColorFormula[] = [
  {
    id: 'f-dw001',
    code: 'DW-001',
    name: 'NCT - SOLID PUTIH TULANG',
    swatchHex: '#EDE3C8',
    status: 'Approved',
    starred: true,
    description: 'Warna putih gading NC solid dengan daya tutup tinggi, cocok untuk furnitur.',
    ingredients: [
      { name: 'Titanium Dioxide', percent: 25, color: '#3B82F6' },
      { name: 'Resin NC', percent: 45, color: '#8B5CF6' },
      { name: 'Additive', percent: 10, color: '#F59E0B' },
      { name: 'Solvent', percent: 20, color: '#06B6D4' },
    ],
  },
  {
    id: 'f-dw002',
    code: 'DW-002',
    name: 'EPOXY GREY',
    swatchHex: '#CBD5E1',
    status: 'Approved',
    starred: true,
    description: 'Nuansa abu industrial seimbang untuk besi, karoseri, dan lantai epoxy.',
    ingredients: [
      { name: 'Titanium Dioxide', percent: 22, color: '#3B82F6' },
      { name: 'Resin Epoxy', percent: 46, color: '#8B5CF6' },
      { name: 'Additive', percent: 12, color: '#F59E0B' },
      { name: 'Solvent', percent: 20, color: '#06B6D4' },
    ],
  },
];

export const INITIAL_QC_PARAMS: QcParameter[] = [
  { parameter: 'Warna', standard: 'Sesuai standar', result: 'Sesuai', status: 'PASS' },
  { parameter: 'Viskositas', standard: '90 - 110 KU', result: '102 KU', status: 'PASS' },
  { parameter: 'Density', standard: '1,30 - 1,45', result: '1,37', status: 'PASS' },
  { parameter: 'Daya Sebar', standard: '≥ 10 m²/L', result: '11,2 m²/L', status: 'PASS' },
  { parameter: 'Gloss Level', standard: 'Matt (≤5)', result: '4,8', status: 'PASS' },
  { parameter: 'pH', standard: '8 - 9', result: '8,5', status: 'PASS' },
];

export const INITIAL_RAW_MATERIALS: RawMaterialItem[] = [
  { id: 'rm-1', name: 'Resin Acrylic', category: 'Resin', stockKg: 1500, maxCapacityKg: 2000, status: 'Aman', colorHex: '#CBD5E1' },
  { id: 'rm-2', name: 'Titanium Dioxide', category: 'Pigment', stockKg: 820, maxCapacityKg: 1200, status: 'Aman', colorHex: '#F8FAFC' },
  { id: 'rm-3', name: 'Pigment Merah', category: 'Pigment', stockKg: 50, maxCapacityKg: 500, status: 'Stok Rendah', colorHex: '#DC2626' },
  { id: 'rm-4', name: 'Pigment Biru', category: 'Pigment', stockKg: 240, maxCapacityKg: 500, status: 'Aman', colorHex: '#1D4ED8' },
  { id: 'rm-5', name: 'Additive', category: 'Additive', stockKg: 250, maxCapacityKg: 400, status: 'Aman', colorHex: '#E2E8F0' },
  { id: 'rm-6', name: 'Solvent', category: 'Solvent', stockKg: 1200, maxCapacityKg: 1600, status: 'Aman', colorHex: '#DBEAFE' },
];

export const INITIAL_FINISHED_GOODS: FinishedGoodStock[] = [
  { id: 'fg-1', productId: PAINT_PRODUCTS[0].id, name: 'MSS - 510 LO', categoryLabel: 'Melamine & Nitrocellulose', pailCount: 2500, status: 'Aman', accentColor: '#153E90', secondaryColor: '#3B82F6', labelTitle: 'MSS - 510 LO' },
  { id: 'fg-2', productId: PAINT_PRODUCTS[3].id, name: 'MT - 610 CLEAR GLOSS', categoryLabel: 'Melamine & Nitrocellulose', pailCount: 1850, status: 'Aman', accentColor: '#DC2626', secondaryColor: '#EF4444', labelTitle: 'MT - 610' },
  { id: 'fg-3', productId: 'epoxy-all-colour-standar-86', name: 'EPOXY ALL COLOUR standar', categoryLabel: 'Epoxy, Synthetic & Sealer', pailCount: 350, status: 'Menipis', accentColor: '#D97706', secondaryColor: '#FACC15', labelTitle: 'EPOXY' },
  { id: 'fg-4', productId: 'cat-tembok-outdoor-white-high-153', name: 'CAT TEMBOK OUTDOOR WHITE HIGH', categoryLabel: 'Cat Tembok & Genteng', pailCount: 1200, status: 'Aman', accentColor: '#059669', secondaryColor: '#34D399', labelTitle: 'CAT TEMBOK' },
];

export const INITIAL_APPROVALS: ApprovalRequest[] = [
  {
    id: 'apr-1',
    category: 'Produksi',
    title: 'Batch MSS - 510 LO',
    date: '12 Mar 2025',
    status: 'Menunggu',
    details: [
      { label: 'Target Produksi', value: '15.000 LT' },
      { label: 'Nilai Estimasi', value: 'Rp 630.000.000' },
      { label: 'Jenis', value: 'Reguler' },
      { label: 'Diajukan oleh', value: 'Production Team' },
    ],
  },
  {
    id: 'apr-2',
    category: 'Pembelian',
    title: 'Bahan Baku - Resin',
    date: '11 Mar 2025',
    status: 'Menunggu',
    details: [
      { label: 'Jumlah', value: '10.000 Kg' },
      { label: 'Nilai', value: 'Rp 120.000.000' },
      { label: 'Supplier', value: 'PT. Kimia Nusantara' },
      { label: 'Diajukan oleh', value: 'Purchasing Team' },
    ],
  },
  {
    id: 'apr-3',
    category: 'Promo Dealer',
    title: 'Program Diskon Kemasan 20 LT',
    date: '10 Mar 2025',
    status: 'Menunggu',
    details: [
      { label: 'Target Mitra', value: 'Gold Dealer Nasional' },
      { label: 'Potongan', value: '15% Paket 20 LT' },
      { label: 'Periode', value: 'Mar – Apr 2025' },
      { label: 'Diajukan oleh', value: 'Sales Management' },
    ],
  },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  { id: 'n-1', category: 'QC', title: 'QC Batch DVP24021 PASS', message: 'Batch DVP24021 (MSS - 510 LO) telah lulus semua parameter QC.', timeAgo: '15 menit lalu', unread: true, targetScreen: 'screen-11' },
  { id: 'n-2', category: 'Penjualan', title: 'Order Baru Distributor Bandung', message: 'Pesanan #DVA250312 dari CV. Maju Jaya.', timeAgo: '25 menit lalu', unread: true, targetScreen: 'screen-7' },
  { id: 'n-3', category: 'Gudang', title: 'Stok Pigment Merah Menipis', message: 'Stok tinggal 50 Kg. Segera lakukan pemesanan.', timeAgo: '1 jam lalu', unread: true, targetScreen: 'screen-12' },
  { id: 'n-4', category: 'Produksi', title: 'Mesin Filling Line 02 Maintenance', message: 'Mesin sedang dalam perbaikan terjadwal.', timeAgo: '2 jam lalu', unread: false, targetScreen: 'screen-8' },
  { id: 'n-5', category: 'Penjualan', title: 'Pengiriman Dalam Perjalanan', message: 'Order #DVA250310 sedang dikirim ke Surabaya.', timeAgo: '3 jam lalu', unread: false, targetScreen: 'screen-7' },
  { id: 'n-6', category: 'Produksi', title: 'Permintaan Persetujuan Produksi', message: 'Menunggu persetujuan Batch MT - 610 CLEAR GLOSS.', timeAgo: '5 jam lalu', unread: false, targetScreen: 'screen-14' },
  { id: 'n-7', category: 'Penjualan', title: 'Promo Dealer Baru Tersedia', message: 'Program diskon kemasan 20 LT sudah aktif.', timeAgo: '1 hari lalu', unread: false, targetScreen: 'screen-16' },
  { id: 'n-8', category: 'Produksi', title: 'Laporan Produksi Harian', message: 'Laporan produksi tanggal 11 Mar 2025 siap dilihat.', timeAgo: '1 hari lalu', unread: false, targetScreen: 'screen-8' },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
