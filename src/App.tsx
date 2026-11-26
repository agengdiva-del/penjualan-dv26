import React, { useEffect, useState } from 'react';
import {
  Calculator,
  Palette,
  X,
} from 'lucide-react';
import { ColorCatalogView } from './components/ColorCatalogView';
import { DivaLogo } from './components/DivaArtwork';
import {
  MobileBottomNav,
  MobileTopHeader,
  PhoneFrameShell,
} from './components/MobileShell';
import { PaintCalculatorView } from './components/PaintCalculatorView';
import {
  Screen1Splash,
  Screen2Login,
  Screen3Dashboard,
  Screen4SalesMenu,
  Screen5ProductDetail,
  Screen6Cart,
} from './components/screens/Screens1to6';
import {
  Screen7Tracking,
  Screen8ProductionDashboard,
  Screen9BatchMonitor,
  Screen10ColorFormula,
  Screen11QualityControl,
  Screen12RawMaterials,
} from './components/screens/Screens7to12';
import {
  Screen13FinishedGoods,
  Screen14ApprovalManager,
  Screen15DirectorDashboard,
  Screen16DealerProfile,
  Screen17Notifications,
  Screen18AiColorMatching,
} from './components/screens/Screens13to18';
import {
  BRANCHES,
  DEFAULT_PROFILE,
  INITIAL_APPROVALS,
  INITIAL_FINISHED_GOODS,
  INITIAL_FORMULAS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ORDERS,
  INITIAL_QC_PARAMS,
  INITIAL_RAW_MATERIALS,
  PAINT_COLORS,
  PAINT_PRODUCTS,
  SCREEN_SEQUENCE,
} from './data/paintData';
import {
  AppNotification,
  ApprovalRequest,
  CartItem,
  ColorFormula,
  FinishedGoodStock,
  OrderRecord,
  OrderStage,
  PaintColor,
  PaintProduct,
  QcParameter,
  RawMaterialItem,
  SavedCalculation,
  ScreenId,
  UserProfile,
  UserRole,
} from './types';

const TRACKING_STAGES: OrderStage[] = [
  'Pesanan Dibuat',
  'Diproduksi',
  'Dalam Pengiriman',
  'Sampai Tujuan',
];

function loadState<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const INITIAL_CART: CartItem[] = [
  {
    id: `${PAINT_PRODUCTS[0].id}-${PAINT_PRODUCTS[0].packs[2].label}-DV-101`,
    productId: PAINT_PRODUCTS[0].id,
    productName: PAINT_PRODUCTS[0].name,
    categoryLabel: PAINT_PRODUCTS[0].categoryLabel,
    packLabel: PAINT_PRODUCTS[0].packs[2].label,
    sizeKg: PAINT_PRODUCTS[0].packs[2].sizeKg,
    unitPrice: PAINT_PRODUCTS[0].packs[2].price,
    quantity: 2,
    selected: true,
    color: PAINT_COLORS[0],
    canAccentColor: PAINT_PRODUCTS[0].canAccentColor,
  },
  {
    id: `${PAINT_PRODUCTS[3].id}-${PAINT_PRODUCTS[3].packs[0].label}-DV-103`,
    productId: PAINT_PRODUCTS[3].id,
    productName: PAINT_PRODUCTS[3].name,
    categoryLabel: PAINT_PRODUCTS[3].categoryLabel,
    packLabel: PAINT_PRODUCTS[3].packs[0].label,
    sizeKg: PAINT_PRODUCTS[3].packs[0].sizeKg,
    unitPrice: PAINT_PRODUCTS[3].packs[0].price,
    quantity: 1,
    selected: true,
    color: PAINT_COLORS[2],
    canAccentColor: PAINT_PRODUCTS[3].canAccentColor,
  },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('screen-1');
  const [previousScreen, setPreviousScreen] = useState<ScreenId>('screen-3');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<PaintProduct>(PAINT_PRODUCTS[0]);
  const [selectedProductColor, setSelectedProductColor] = useState<PaintColor | undefined>(undefined);
  const [calcSeedProduct, setCalcSeedProduct] = useState<PaintProduct | undefined>(undefined);
  const [calcSeedColor, setCalcSeedColor] = useState<PaintColor | undefined>(undefined);
  const [selectedBranch] = useState<string>(BRANCHES[0]);
  const [activePromoCode, setActivePromoCode] = useState('');

  const [profile, setProfile] = useState<UserProfile>(() =>
    loadState('diva_m_profile_v3', DEFAULT_PROFILE)
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadState('diva_m_cart_v3', INITIAL_CART)
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    loadState('diva_m_orders_v3', INITIAL_ORDERS)
  );
  const [favoriteColors, setFavoriteColors] = useState<string[]>(() =>
    loadState('diva_m_favs_v3', ['DV-202', 'DV-301', 'DIV-WH-210'])
  );
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>(() =>
    loadState('diva_m_calcs_v3', [])
  );
  const [formulas, setFormulas] = useState<ColorFormula[]>(() =>
    loadState('diva_m_formulas_v3', INITIAL_FORMULAS)
  );
  const [qcParams, setQcParams] = useState<QcParameter[]>(INITIAL_QC_PARAMS);
  const [rawMaterials, setRawMaterials] = useState<RawMaterialItem[]>(INITIAL_RAW_MATERIALS);
  const [finishedGoods] = useState<FinishedGoodStock[]>(INITIAL_FINISHED_GOODS);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(INITIAL_APPROVALS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('diva_m_profile_v3', JSON.stringify(profile));
      localStorage.setItem('diva_m_cart_v3', JSON.stringify(cart));
      localStorage.setItem('diva_m_orders_v3', JSON.stringify(orders));
      localStorage.setItem('diva_m_favs_v3', JSON.stringify(favoriteColors));
      localStorage.setItem('diva_m_calcs_v3', JSON.stringify(savedCalculations));
      localStorage.setItem('diva_m_formulas_v3', JSON.stringify(formulas));
    } catch {
      // Ignore quota errors
    }
  }, [cart, favoriteColors, formulas, orders, profile, savedCalculations]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 2200);
  };

  const navigateTo = (target: ScreenId) => {
    if (target !== activeScreen) {
      setPreviousScreen(activeScreen);
      setActiveScreen(target);
    }
    setDrawerOpen(false);
  };

  const handleBack = () => {
    if (activeScreen === 'screen-5') return navigateTo('screen-4');
    if (activeScreen === 'screen-6') return navigateTo('screen-4');
    if (activeScreen === 'screen-9') return navigateTo('screen-8');
    if (activeScreen === 'katalog-warna' || activeScreen === 'kalkulator') {
      return navigateTo('screen-4');
    }
    if (previousScreen && previousScreen !== activeScreen && previousScreen !== 'screen-1') {
      return navigateTo(previousScreen);
    }
    return navigateTo('screen-3');
  };

  const handleLogin = (username: string, role: UserRole) => {
    setProfile((prev) => ({
      ...prev,
      name: username === 'budi.santoso' ? 'Budi Santoso' : username,
      role,
    }));

    // Route directly to role-relevant screen matching the 6 Login Role Buttons
    const roleHomeMap: Record<UserRole, ScreenId> = {
      Sales: 'screen-4',
      Distributor: 'screen-3',
      Produksi: 'screen-8',
      Gudang: 'screen-13',
      QC: 'screen-11',
      Management: 'screen-15',
    };
    navigateTo(roleHomeMap[role]);
    showToast(`Masuk sebagai ${role}`);
  };

  const addItemsToCart = (
    entries: { product: PaintProduct; packIndex: number; color: PaintColor; quantity: number }[]
  ) => {
    setCart((prev) => {
      const next = [...prev];
      entries.forEach(({ product, packIndex, color, quantity }) => {
        const pack = product.packs[packIndex] || product.packs[0];
        const effectiveColor = product.supportsCustomColor ? color : PAINT_COLORS[0];
        const id = `${product.id}-${pack.label}-${effectiveColor.code}`;
        const existingIdx = next.findIndex((c) => c.id === id);
        if (existingIdx >= 0) {
          next[existingIdx] = {
            ...next[existingIdx],
            quantity: next[existingIdx].quantity + quantity,
            selected: true,
          };
        } else {
          next.push({
            id,
            productId: product.id,
            productName: product.name,
            categoryLabel: product.categoryLabel,
            packLabel: pack.label,
            sizeKg: pack.sizeKg,
            unitPrice: pack.price,
            quantity,
            selected: true,
            color: effectiveColor,
            canAccentColor: product.canAccentColor,
          });
        }
      });
      return next;
    });
  };

  const handleToggleCartItem = (id: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckoutSuccess = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setCart((prev) => prev.filter((item) => !item.selected));
    setActivePromoCode('');
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        category: 'Penjualan',
        title: `Pesanan Baru ${order.id}`,
        message: `${order.items.length} item cat sedang diproses di ${order.branch}.`,
        timeAgo: 'Baru saja',
        unread: true,
        targetScreen: 'screen-7',
      },
      ...prev,
    ]);
    navigateTo('screen-7');
    showToast(`Pesanan ${order.id} berhasil dibuat`);
  };

  const handleAdvanceTracking = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const idx = TRACKING_STAGES.indexOf(order.stage);
        if (idx < 0 || idx >= TRACKING_STAGES.length - 1) return order;
        const nextStage = TRACKING_STAGES[idx + 1];
        return {
          ...order,
          stage: nextStage,
          stageTimestamps: {
            ...order.stageTimestamps,
            [nextStage]: 'Baru diperbarui',
          },
        };
      })
    );
  };

  const handleApprovalDecision = (id: string, status: 'Disetujui' | 'Ditolak') => {
    const target = approvals.find((a) => a.id === id);
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    if (target) {
      setNotifications((prev) => [
        {
          id: `n-${Date.now()}`,
          category: target.category === 'Pembelian' ? 'Gudang' : 'Produksi',
          title: `${target.title} ${status}`,
          message: `Permintaan ${target.category} telah ${status.toLowerCase()} oleh Manager.`,
          timeAgo: 'Baru saja',
          unread: true,
          targetScreen: 'screen-14',
        },
        ...prev,
      ]);
      showToast(`${target.title} ${status}`);
    }
  };

  const handleRestockMaterial = (id: string) => {
    setRawMaterials((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, stockKg: m.stockKg + 200, status: 'Aman' }
          : m
      )
    );
    showToast('Order pengisian stok bahan baku +200 Kg diproses');
  };

  const handleToggleQcStatus = (paramName: string) => {
    setQcParams((prev) =>
      prev.map((p) =>
        p.parameter === paramName
          ? { ...p, status: p.status === 'PASS' ? 'RECHECK' : 'PASS' }
          : p
      )
    );
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const headerTitles: Partial<Record<ScreenId, string>> = {
    'screen-9': 'Detail Batch Produksi',
    'screen-16': 'Profil Dealer',
    'screen-17': 'Notifikasi',
    'screen-18': 'Smart Color Matching',
    'katalog-warna': 'Katalog Warna DIVA',
    'kalkulator': 'Kalkulator Cat Otomatis',
  };

  return (
    <PhoneFrameShell activeScreen={activeScreen} onSelectScreen={navigateTo}>
      <MobileTopHeader
        screen={activeScreen}
        title={headerTitles[activeScreen]}
        unreadCount={unreadCount}
        cartCount={cartCount}
        onNavigate={navigateTo}
        onBack={handleBack}
        onOpenMenu={() => setDrawerOpen(true)}
        onClearCart={() => {
          setCart([]);
          showToast('Keranjang dikosongkan');
        }}
      />

      {/* Screen Content Switcher (#1 to #18 + Katalog Warna + Kalkulator Cat) */}
      <div className="flex-1 flex flex-col">
        {activeScreen === 'screen-1' && (
          <Screen1Splash onContinue={() => navigateTo('screen-2')} />
        )}

        {activeScreen === 'screen-2' && <Screen2Login onLogin={handleLogin} />}

        {activeScreen === 'screen-3' && (
          <Screen3Dashboard profile={profile} onNavigate={navigateTo} />
        )}

        {activeScreen === 'screen-4' && (
          <Screen4SalesMenu
            onSelectCategory={() => {}}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              setSelectedProductColor(undefined);
              navigateTo('screen-5');
            }}
            onQuickAdd={(product, color) => {
              addItemsToCart([
                {
                  product,
                  packIndex: product.defaultPackIndex,
                  color,
                  quantity: 1,
                },
              ]);
              showToast(`${product.name} masuk keranjang`);
            }}
            onNavigate={navigateTo}
          />
        )}

        {activeScreen === 'screen-5' && (
          <Screen5ProductDetail
            product={selectedProduct}
            initialColor={selectedProductColor}
            onAddToCart={(product, packIndex, color) => {
              addItemsToCart([{ product, packIndex, color, quantity: 1 }]);
              showToast(`${product.name} masuk keranjang`);
            }}
            onOpenCart={() => navigateTo('screen-6')}
            onOpenColorCatalog={() => navigateTo('katalog-warna')}
            onOpenCalculator={(product, color) => {
              setCalcSeedProduct(product);
              setCalcSeedColor(color);
              navigateTo('kalkulator');
            }}
          />
        )}

        {activeScreen === 'screen-6' && (
          <Screen6Cart
            items={cart}
            profile={profile}
            selectedBranch={selectedBranch}
            activePromoCode={activePromoCode}
            onApplyPromo={setActivePromoCode}
            onToggleItem={handleToggleCartItem}
            onUpdateQty={handleUpdateCartQty}
            onCheckoutSuccess={handleCheckoutSuccess}
            onExploreProducts={() => navigateTo('screen-4')}
          />
        )}

        {activeScreen === 'screen-7' && (
          <Screen7Tracking orders={orders} onAdvanceStage={handleAdvanceTracking} />
        )}

        {activeScreen === 'screen-8' && (
          <Screen8ProductionDashboard onNavigate={navigateTo} />
        )}

        {activeScreen === 'screen-9' && (
          <Screen9BatchMonitor onOpenFormula={() => navigateTo('screen-10')} />
        )}

        {activeScreen === 'screen-10' && (
          <Screen10ColorFormula
            formulas={formulas}
            onToggleStatus={(id, status) => {
              setFormulas((prev) =>
                prev.map((f) => (f.id === id ? { ...f, status } : f))
              );
              showToast(`Status formula diubah ke ${status}`);
            }}
            onCreateFormula={(f) => {
              setFormulas((prev) => [f, ...prev]);
              showToast(`Formula ${f.code} disimpan`);
            }}
          />
        )}

        {activeScreen === 'screen-11' && (
          <Screen11QualityControl
            params={qcParams}
            onToggleParamStatus={handleToggleQcStatus}
          />
        )}

        {activeScreen === 'screen-12' && (
          <Screen12RawMaterials
            materials={rawMaterials}
            onRestockMaterial={handleRestockMaterial}
          />
        )}

        {activeScreen === 'screen-13' && (
          <Screen13FinishedGoods stockList={finishedGoods} />
        )}

        {activeScreen === 'screen-14' && (
          <Screen14ApprovalManager
            approvals={approvals}
            onDecision={handleApprovalDecision}
          />
        )}

        {activeScreen === 'screen-15' && (
          <Screen15DirectorDashboard onOpenDealer={() => navigateTo('screen-16')} />
        )}

        {activeScreen === 'screen-16' && (
          <Screen16DealerProfile
            orders={orders}
            onViewAllOrders={() => navigateTo('screen-7')}
          />
        )}

        {activeScreen === 'screen-17' && (
          <Screen17Notifications
            notifications={notifications}
            onOpenNotification={(notif) => {
              setNotifications((prev) =>
                prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
              );
              navigateTo(notif.targetScreen);
            }}
          />
        )}

        {activeScreen === 'screen-18' && (
          <Screen18AiColorMatching
            onUseColorInDetail={(product, color) => {
              setSelectedProduct(product);
              setSelectedProductColor(color);
              navigateTo('screen-5');
            }}
            onAddToCart={(product, packIndex, color) => {
              addItemsToCart([{ product, packIndex, color, quantity: 1 }]);
              showToast(`${product.name} (${color.name}) masuk keranjang`);
            }}
          />
        )}

        {activeScreen === 'katalog-warna' && (
          <ColorCatalogView
            favoriteColors={favoriteColors}
            onToggleFavoriteColor={(code) =>
              setFavoriteColors((prev) =>
                prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
              )
            }
            onUseColorInCalculator={(color, product) => {
              setCalcSeedColor(color);
              setCalcSeedProduct(product);
              navigateTo('kalkulator');
            }}
            onOrderWithColor={(product, color) => {
              addItemsToCart([
                { product, packIndex: product.defaultPackIndex, color, quantity: 1 },
              ]);
              navigateTo('screen-6');
            }}
          />
        )}

        {activeScreen === 'kalkulator' && (
          <PaintCalculatorView
            key={`${calcSeedProduct?.id || 'default'}-${calcSeedColor?.code || 'default'}`}
            initialProduct={calcSeedProduct}
            initialColor={calcSeedColor}
            savedCalculations={savedCalculations}
            onAddCalculatedToCart={(entries) => {
              addItemsToCart(entries);
              navigateTo('screen-6');
              showToast('Kebutuhan cat masuk keranjang');
            }}
            onSaveCalculation={(calc) => {
              setSavedCalculations((prev) => [calc, ...prev]);
              showToast('Hasil estimasi disimpan');
            }}
          />
        )}
      </div>

      <MobileBottomNav
        screen={activeScreen}
        cartCount={cartCount}
        unreadCount={unreadCount}
        onNavigate={navigateTo}
      />

      {/* In-App Navigation Drawer (Hamburger Menu) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex justify-center bg-slate-950/50">
          <div className="w-full max-w-[460px] h-full flex">
            <div className="w-72 bg-white h-full flex flex-col shadow-2xl">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <DivaLogo size="sm" />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Tutup menu"
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                <div className="grid grid-cols-2 gap-1.5 pb-3 mb-2 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => navigateTo('katalog-warna')}
                    className="p-2 rounded-xl bg-blue-50 text-[#153E90] text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>Katalog Warna</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('kalkulator')}
                    className="p-2 rounded-xl bg-red-50 text-[#DC2626] text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Kalkulator</span>
                  </button>
                </div>

                {SCREEN_SEQUENCE.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateTo(item.id)}
                    className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer ${
                      activeScreen === item.id
                        ? 'bg-[#153E90] text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-mono text-[10px] w-5 opacity-75">#{item.num}</span>
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              aria-label="Tutup latar menu"
              className="flex-1 cursor-pointer"
              onClick={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-3.5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg whitespace-nowrap"
        >
          {toast}
        </div>
      )}
    </PhoneFrameShell>
  );
}
