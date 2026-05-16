import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps, LucideIcon } from 'lucide-react';
import AdminPage from './AdminPage';
import { type Lot, type AuthUser, type Theme, THEMES, CATEGORIES, LOTS, BOOKINGS, STATUS_MAP, AUTH_URL } from '@/data/appData';

// ─── Icon ────────────────────────────────────────────────────────────────────
function Icon({ name, fallback = 'CircleAlert', ...props }: { name: string; fallback?: string } & Omit<LucideProps, 'name'>) {
  const C = (LucideIcons as Record<string, LucideIcon>)[name]
    ?? (LucideIcons as Record<string, LucideIcon>)[fallback];
  if (!C) return null;
  return <C {...props} />;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtPrice(price: number): string {
  if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(1)} млн ₽`;
  if (price >= 1000) return `${Math.round(price / 1000)} 000 ₽`;
  return `${price} ₽`;
}

// ─── LotCard ─────────────────────────────────────────────────────────────────
function LotCard({ lot, onOpen, onToggleFavorite }: { lot: Lot; onOpen: (l: Lot) => void; onToggleFavorite?: (id: string) => void }) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-2xl" onClick={() => onOpen(lot)}>
      <div className="relative h-44 bg-secondary overflow-hidden">
        {lot.images[0]
          ? <img src={lot.images[0]} alt={lot.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          : <div className="w-full h-full flex items-center justify-center"><Icon name="Image" size={32} className="text-muted-foreground" /></div>
        }
        <button className="absolute top-2 right-2 w-8 h-8 backdrop-blur bg-black/30 rounded-full flex items-center justify-center"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(lot.id); }}>
          <Icon name="Heart" size={15} className={lot.isFavorite ? 'text-red-400 fill-red-400' : 'text-white'} />
        </button>
        <div className="absolute bottom-2 left-2">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${lot.type === 'service' ? 'bg-blue-500/90 text-white' : 'bg-orange-500/90 text-white'}`}>
            {lot.type === 'service' ? 'Услуга' : 'Товар'}
          </span>
        </div>
      </div>
      <div className="p-3">
        <p className="font-semibold text-sm text-foreground line-clamp-2 leading-snug mb-2">{lot.title}</p>
        <p className="text-primary font-bold text-base mb-2">{lot.priceLabel || fmtPrice(lot.price)}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-muted-foreground text-xs"><Icon name="MapPin" size={11} /><span>{lot.location}</span></div>
          <div className="flex items-center gap-1 text-muted-foreground text-xs"><Icon name="Star" size={11} className="text-yellow-400 fill-yellow-400" /><span>{lot.seller.rating}</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── LotModal ────────────────────────────────────────────────────────────────
function LotModal({ lot, onClose, onBook }: { lot: Lot | null; onClose: () => void; onBook: (l: Lot) => void }) {
  if (!lot) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="relative h-56 bg-secondary">
          {lot.images[0] && <img src={lot.images[0]} alt={lot.title} className="w-full h-full object-cover" />}
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 backdrop-blur bg-black/40 rounded-full flex items-center justify-center">
            <Icon name="X" size={18} className="text-white" />
          </button>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold text-foreground mb-1">{lot.title}</h2>
          <p className="text-2xl font-black text-primary mb-4">{lot.priceLabel || fmtPrice(lot.price)}</p>
          <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl mb-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">{lot.seller.name.charAt(0)}</div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground">{lot.seller.name}</p>
              <div className="flex items-center gap-1">
                <Icon name="Star" size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-muted-foreground">{lot.seller.rating} · {lot.seller.reviewCount} отзывов</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{lot.description}</p>
          <div className="flex gap-4 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><Icon name="MapPin" size={13} />{lot.location}</span>
            <span className="flex items-center gap-1"><Icon name="Eye" size={13} />{lot.views}</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => onBook(lot)} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-colors">Забронировать</button>
            <button className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center"><Icon name="Heart" size={20} className="text-foreground" /></button>
            <button className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center"><Icon name="MessageCircle" size={20} className="text-foreground" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header({ page, nav, user, onAuthClick }: { page: string; nav: (p: string) => void; user: AuthUser | null; onAuthClick: () => void }) {
  const initials = user ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : null;
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-background/80 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <button onClick={() => nav('home')} className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"><span className="text-primary-foreground font-black text-sm">Л</span></div>
          <span className="font-black text-xl tracking-tight text-foreground">ЛИКВИД</span>
        </button>
        <button onClick={() => nav('search')} className="flex-1 max-w-xl bg-secondary/60 hover:bg-secondary text-muted-foreground rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 transition-colors text-left">
          <Icon name="Search" size={16} /><span>Поиск товаров и услуг...</span>
        </button>
        <nav className="flex items-center gap-1">
          {[{ id: 'favorites', icon: 'Heart' }, { id: 'chat', icon: 'MessageCircle', badge: 2 }, { id: 'notifications', icon: 'Bell', badge: 3 }].map((item) => (
            <button key={item.id} onClick={() => nav(item.id)} className={`relative p-2.5 rounded-xl transition-colors ${page === item.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
              <Icon name={item.icon} size={20} />
              {item.badge && <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{item.badge}</span>}
            </button>
          ))}
          {user ? (
            <button onClick={() => nav('profile')} className={`ml-1 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${page === 'profile' ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary hover:bg-primary/30'}`} title={user.name}>
              {initials}
            </button>
          ) : (
            <button onClick={onAuthClick} className="ml-1 flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold rounded-xl transition-colors">
              <Icon name="LogIn" size={15} /><span className="hidden sm:block">Войти</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

// ─── SubNav ───────────────────────────────────────────────────────────────────
function SubNav({ page, nav }: { page: string; nav: (p: string) => void }) {
  const items = [
    { id: 'home', label: 'Главная' }, { id: 'search', label: 'Поиск' }, { id: 'categories', label: 'Категории' },
    { id: 'lots', label: 'Все лоты' }, { id: 'bookings', label: 'Бронирования' }, { id: 'favorites', label: 'Избранное' },
    { id: 'chat', label: 'Чат' }, { id: 'notifications', label: 'Уведомления' }, { id: 'seller', label: '+ Разместить' }, { id: 'admin', label: '⚙ Админ' },
  ];
  return (
    <div className="hidden md:block sticky top-16 z-40 backdrop-blur bg-background/80 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 py-1.5 overflow-x-auto">
          {items.map((item) => (
            <button key={item.id} onClick={() => nav(item.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${page === item.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────
function BottomNav({ page, nav }: { page: string; nav: (p: string) => void }) {
  const items = [{ id: 'home', icon: 'Home', label: 'Главная' }, { id: 'search', icon: 'Search', label: 'Поиск' }, { id: 'lots', icon: 'Tag', label: 'Лоты' }, { id: 'bookings', icon: 'CalendarCheck', label: 'Брони' }, { id: 'profile', icon: 'User', label: 'Профиль' }];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur bg-background/90 border-t border-border/60 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => nav(item.id)} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${active ? 'text-primary' : 'text-muted-foreground'}`}>
              <Icon name={item.icon} size={22} />
              <span className={`text-[10px] font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── ThemeSwitcher ────────────────────────────────────────────────────────────
function ThemeSwitcher({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm p-1 rounded-xl border border-white/10">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.name}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            theme === t.id
              ? 'bg-white/20 text-white shadow-sm scale-105'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <span>{t.emoji}</span>
          <span className="hidden sm:block">{t.name}</span>
        </button>
      ))}
    </div>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
function HomePage({ nav, onOpen, onFav, theme, setTheme }: { nav: (p: string) => void; onOpen: (l: Lot) => void; onFav: (id: string) => void; theme: Theme; setTheme: (t: Theme) => void }) {
  const [geoActive, setGeoActive] = useState(false);
  const [geoLabel, setGeoLabel] = useState('Рядом');

  const requestGeo = () => {
    if (geoActive) { setGeoActive(false); setGeoLabel('Рядом'); return; }
    navigator.geolocation?.getCurrentPosition(
      () => { setGeoActive(true); setGeoLabel('Рядом со мной'); },
      () => {}
    );
  };

  const currentTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div>
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={currentTheme.hero} alt="ЛИКВИД" className="w-full h-full object-cover transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">ЛИКВИД</h1>
          <p className="text-white/80 text-sm md:text-base mb-6">Маркетплейс, где ничто не простаивает</p>
          <div className="w-full max-w-lg bg-card/90 backdrop-blur-md rounded-2xl p-1 flex gap-2 border border-border/40">
            <button onClick={() => nav('search')} className="flex-1 flex items-center gap-2 px-4 py-3 text-muted-foreground text-sm">
              <Icon name="Search" size={16} /><span>Что ищете?</span>
            </button>
            <button onClick={requestGeo} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${geoActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
              <Icon name="MapPin" size={14} /><span className="hidden sm:block">{geoLabel}</span>
            </button>
          </div>
          <div className="mt-4">
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Категории</h2>
            <button onClick={() => nav('categories')} className="text-primary text-sm font-medium">Все категории</button>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => nav('search')} className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-secondary transition-colors group">
                <div className="w-10 h-10 bg-secondary group-hover:bg-primary/20 rounded-xl flex items-center justify-center text-xl transition-colors">{cat.icon}</div>
                <span className="text-[10px] text-muted-foreground text-center leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Популярные</h2>
            <button onClick={() => nav('search')} className="text-primary text-sm font-medium">Смотреть все</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {LOTS.slice(0, 4).map((lot) => <LotCard key={lot.id} lot={lot} onOpen={onOpen} onToggleFavorite={onFav} />)}
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Новые лоты</h2>
            <button onClick={() => nav('search')} className="text-primary text-sm font-medium">Смотреть все</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {LOTS.slice(2, 6).map((lot) => <LotCard key={lot.id} lot={lot} onOpen={onOpen} onToggleFavorite={onFav} />)}
          </div>
        </section>
        <section className="bg-gradient-to-r from-primary/20 to-orange-600/10 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Начните продавать на ЛИКВИД</h3>
            <p className="text-muted-foreground text-sm">Тысячи покупателей уже ищут ваши товары и услуги</p>
          </div>
          <button onClick={() => nav('seller')} className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3 rounded-xl transition-colors">Разместить лот</button>
        </section>
      </div>
    </div>
  );
}

// ─── SearchPage ───────────────────────────────────────────────────────────────
function SearchPage({ onOpen, onFav }: { onOpen: (l: Lot) => void; onFav: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('');
  const [type, setType] = useState<'all' | 'product' | 'service'>('all');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [rating, setRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<'new' | 'price_asc' | 'price_desc' | 'rating'>('new');
  const [geo, setGeo] = useState(false);

  const filtered = LOTS.filter((l) => {
    if (query && !l.title.toLowerCase().includes(query.toLowerCase())) return false;
    if (cat && l.category !== cat) return false;
    if (type !== 'all' && l.type !== (type as 'product' | 'service')) return false;
    if (priceFrom && l.price < Number(priceFrom)) return false;
    if (priceTo && l.price > Number(priceTo)) return false;
    if (rating && l.seller.rating < rating) return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'rating') return b.seller.rating - a.seller.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3">
          <Icon name="Search" size={18} className="text-muted-foreground" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none" />
          {query && <button onClick={() => setQuery('')}><Icon name="X" size={16} className="text-muted-foreground" /></button>}
        </div>
        <button onClick={() => setGeo(!geo)} className={`px-3 rounded-xl border transition-colors ${geo ? 'bg-primary/20 border-primary text-primary' : 'bg-card border-border text-muted-foreground'}`}><Icon name="MapPin" size={18} /></button>
        <button onClick={() => setShowFilters(!showFilters)} className={`px-3 rounded-xl border transition-colors ${showFilters ? 'bg-primary/20 border-primary text-primary' : 'bg-card border-border text-muted-foreground'}`}><Icon name="SlidersHorizontal" size={18} /></button>
      </div>
      {showFilters && (
        <div className="bg-card border border-border rounded-2xl p-4 mb-4 space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Категория</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setCat('')} className={`text-xs px-3 py-1.5 rounded-lg font-medium ${!cat ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>Все</button>
              {CATEGORIES.map((c) => <button key={c.id} onClick={() => setCat(cat === c.id ? '' : c.id)} className={`text-xs px-3 py-1.5 rounded-lg font-medium ${cat === c.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{c.icon} {c.name}</button>)}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Тип</p>
              {(['all', 'product', 'service'] as const).map((t) => <button key={t} onClick={() => setType(t)} className={`block w-full text-xs px-3 py-1.5 rounded-lg font-medium text-left mb-1 ${type === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{t === 'all' ? 'Всё' : t === 'product' ? 'Товар' : 'Услуга'}</button>)}
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Цена, ₽</p>
              <input type="number" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} placeholder="От" className="w-full bg-secondary text-foreground text-xs px-3 py-2 rounded-lg outline-none mb-1" />
              <input type="number" value={priceTo} onChange={(e) => setPriceTo(e.target.value)} placeholder="До" className="w-full bg-secondary text-foreground text-xs px-3 py-2 rounded-lg outline-none" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Рейтинг</p>
              {[0, 4, 4.5, 4.8].map((r) => <button key={r} onClick={() => setRating(r)} className={`block w-full text-xs px-3 py-1.5 rounded-lg font-medium text-left mb-1 ${rating === r ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{r === 0 ? 'Любой' : `от ${r} ★`}</button>)}
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Сортировка</p>
              {(['new', 'price_asc', 'price_desc', 'rating'] as const).map((v) => (
                <button key={v} onClick={() => setSort(v)} className={`block w-full text-xs px-3 py-1.5 rounded-lg font-medium text-left mb-1 ${sort === v ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                  {v === 'new' ? 'Новые' : v === 'price_asc' ? 'Цена ↑' : v === 'price_desc' ? 'Цена ↓' : 'Рейтинг'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <p className="text-sm text-muted-foreground mb-4">Найдено: <span className="text-foreground font-semibold">{filtered.length}</span>{geo && <span className="text-primary ml-2">📍 Рядом</span>}</p>
      {filtered.length === 0
        ? <div className="text-center py-16 text-muted-foreground"><Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-50" /><p>Ничего не найдено</p></div>
        : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{filtered.map((l) => <LotCard key={l.id} lot={l} onOpen={onOpen} onToggleFavorite={onFav} />)}</div>
      }
    </div>
  );
}

// ─── CategoriesPage ───────────────────────────────────────────────────────────
function CategoriesPage({ nav }: { nav: (p: string) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-black mb-5">Все категории</h1>
      <div className="space-y-2">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <button onClick={() => setExpanded(expanded === cat.id ? null : cat.id)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3"><span className="text-2xl">{cat.icon}</span><span className="font-semibold">{cat.name}</span><span className="text-xs text-muted-foreground">({cat.children.length})</span></div>
              <Icon name="ChevronDown" size={18} className={`text-muted-foreground transition-transform ${expanded === cat.id ? 'rotate-180' : ''}`} />
            </button>
            {expanded === cat.id && (
              <div className="border-t border-border px-5 py-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                  {cat.children.map((sub) => (
                    <button key={sub.id} onClick={() => nav('search')} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-secondary transition-colors text-left">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" /><span className="text-sm text-muted-foreground">{sub.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ProfilePage ──────────────────────────────────────────────────────────────
function ProfilePage({ nav, user, onLogout }: { nav: (p: string) => void; user: AuthUser | null; onLogout: () => void }) {
  const displayName = user?.name || 'Гость';
  const initials = displayName.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2);
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="bg-card border border-border rounded-2xl p-6 mb-4 text-center">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-primary/30">
          <span className="text-3xl font-black text-primary">{initials}</span>
        </div>
        <h2 className="text-xl font-bold mb-1">{displayName}</h2>
        {user && (
          <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1 ${user.role === 'seller' ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
            {user.role === 'seller' ? 'Продавец' : user.role === 'admin' ? 'Администратор' : 'Покупатель'}
          </span>
        )}
        <div className="flex items-center justify-center gap-1 mt-3">
          <Icon name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold">4.7</span>
          <span className="text-muted-foreground text-xs">(12 отзывов)</span>
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
        {[{ icon: 'CalendarCheck', label: 'Мои бронирования', p: 'bookings', count: 3 }, { icon: 'Heart', label: 'Избранное', p: 'favorites', count: 5 }, { icon: 'Tag', label: 'Мои лоты', p: 'seller', count: 2 }, { icon: 'MessageCircle', label: 'Сообщения', p: 'chat', count: 2 }, { icon: 'Bell', label: 'Уведомления', p: 'notifications', count: 3 }].map((item, i, arr) => (
          <button key={item.p} onClick={() => nav(item.p)} className={`w-full flex items-center justify-between px-5 py-4 hover:bg-secondary transition-colors ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
            <div className="flex items-center gap-3"><Icon name={item.icon} size={18} className="text-muted-foreground" /><span className="text-sm font-medium">{item.label}</span></div>
            <div className="flex items-center gap-2">
              {item.count > 0 && <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{item.count}</span>}
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-secondary transition-colors text-destructive">
          <Icon name="LogOut" size={18} />
          <span className="text-sm font-medium">Выйти</span>
        </button>
      </div>
    </div>
  );
}

// ─── BookingsPage ─────────────────────────────────────────────────────────────
function BookingsPage({ nav }: { nav: (p: string) => void }) {
  const [tab, setTab] = useState<'active' | 'history'>('active');
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [stars, setStars] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const items = tab === 'active'
    ? BOOKINGS.filter((b) => b.status === 'pending' || b.status === 'confirmed')
    : BOOKINGS.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-black mb-5">Мои бронирования</h1>
      <div className="flex gap-2 mb-5 bg-secondary p-1 rounded-xl">
        {(['active', 'history'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t ? 'bg-card text-foreground shadow' : 'text-muted-foreground'}`}>{t === 'active' ? 'Активные' : 'История'}</button>
        ))}
      </div>
      {items.length === 0
        ? <div className="text-center py-16 text-muted-foreground"><Icon name="CalendarX" size={40} className="mx-auto mb-3 opacity-50" /><p>Нет бронирований</p></div>
        : <div className="space-y-3">{items.map((b) => {
          const si = STATUS_MAP[b.status] || STATUS_MAP['pending'];
          return (
            <div key={b.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex gap-3 p-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary shrink-0">
                  {b.lot.images[0] ? <img src={b.lot.images[0]} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Icon name="Image" size={20} className="text-muted-foreground" /></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm line-clamp-2 mb-1">{b.lot.title}</p>
                  <p className="text-primary font-bold text-sm mb-2">{b.lot.price.toLocaleString('ru')} ₽</p>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${si.color}`}>{si.label}</span>
                </div>
              </div>
              <div className="px-4 pb-3 border-t border-border pt-3 flex gap-2 flex-wrap">
                <button onClick={() => nav('chat')} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-secondary text-foreground rounded-lg"><Icon name="MessageCircle" size={14} />Чат</button>
                {b.status === 'pending' && <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-destructive/10 text-destructive rounded-lg"><Icon name="X" size={14} />Отменить</button>}
                {b.status === 'completed' && !reviewId && <button onClick={() => setReviewId(b.id)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-lg"><Icon name="Star" size={14} />Отзыв</button>}
              </div>
              {reviewId === b.id && (
                <div className="px-4 pb-4 border-t border-border pt-3">
                  <div className="flex gap-1 mb-3">{[1,2,3,4,5].map((s) => <button key={s} onClick={() => setStars(s)}><Icon name="Star" size={22} className={s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'} /></button>)}</div>
                  <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Расскажите о вашем опыте..." className="w-full bg-secondary text-foreground text-sm px-3 py-2 rounded-xl outline-none resize-none h-20 mb-2" />
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-primary-foreground text-sm font-semibold py-2 rounded-xl">Отправить</button>
                    <button onClick={() => setReviewId(null)} className="px-4 bg-secondary text-foreground text-sm rounded-xl">Отмена</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}</div>
      }
    </div>
  );
}

// ─── FavoritesPage ────────────────────────────────────────────────────────────
function FavoritesPage({ favIds, onOpen, onFav }: { favIds: string[]; onOpen: (l: Lot) => void; onFav: (id: string) => void }) {
  const favLots = LOTS.filter((l) => favIds.includes(l.id));
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-black mb-5">Избранное</h1>
      {favLots.length === 0
        ? <div className="text-center py-20 text-muted-foreground"><Icon name="HeartOff" size={48} className="mx-auto mb-4 opacity-40" /><p className="font-semibold text-lg mb-1">Пока ничего нет</p><p className="text-sm">Добавляйте лоты в избранное ❤️</p></div>
        : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{favLots.map((l) => <LotCard key={l.id} lot={{ ...l, isFavorite: true }} onOpen={onOpen} onToggleFavorite={onFav} />)}</div>
      }
    </div>
  );
}

// ─── ChatPage ─────────────────────────────────────────────────────────────────
const CHATS = [
  { id: 'c1', seller: 'СтройМастер', lot: 'Ремонт квартир', lastMsg: 'Да, завтра в 14:00 подойдёт.', time: '14:32', unread: 1, messages: [{ id: 'm1', from: 'me', text: 'Интересует ремонт 65 м²', time: '14:20' }, { id: 'm2', from: 'them', text: 'Конечно, можем встретиться.', time: '14:25' }, { id: 'm3', from: 'me', text: 'Когда удобно?', time: '14:30' }, { id: 'm4', from: 'them', text: 'Да, завтра в 14:00 подойдёт.', time: '14:32' }] },
  { id: 'c2', seller: 'Алексей М.', lot: 'iPhone 14 Pro', lastMsg: 'Телефон ещё актуален?', time: 'Вчера', unread: 0, messages: [{ id: 'm1', from: 'me', text: 'Телефон ещё актуален?', time: 'Вчера 18:00' }] },
];

function ChatPage() {
  const [selected, setSelected] = useState<typeof CHATS[0] | null>(null);
  const [msgs, setMsgs] = useState(CHATS[0].messages);
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    setMsgs((p) => [...p, { id: `m${Date.now()}`, from: 'me', text: text.trim(), time: 'Сейчас' }]);
    setText('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-black mb-5">Сообщения</h1>
      <div className="bg-card border border-border rounded-2xl overflow-hidden" style={{ height: '65vh' }}>
        <div className="flex h-full">
          <div className={`${selected ? 'hidden sm:flex' : 'flex'} w-full sm:w-72 flex-col border-r border-border shrink-0`}>
            <div className="p-3 border-b border-border">
              <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2"><Icon name="Search" size={14} className="text-muted-foreground" /><input placeholder="Поиск..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground text-foreground" /></div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {CHATS.map((c) => (
                <button key={c.id} onClick={() => { setSelected(c); setMsgs(c.messages); }} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors border-b border-border/50 text-left ${selected?.id === c.id ? 'bg-secondary' : ''}`}>
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm shrink-0">{c.seller.charAt(0)}</div>
                    {c.unread > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">{c.unread}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-0.5"><p className="text-sm font-semibold">{c.seller}</p><span className="text-xs text-muted-foreground">{c.time}</span></div>
                    <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {selected ? (
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <button onClick={() => setSelected(null)} className="sm:hidden text-muted-foreground"><Icon name="ArrowLeft" size={20} /></button>
                <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">{selected.seller.charAt(0)}</div>
                <div><p className="font-semibold text-sm">{selected.seller}</p><p className="text-xs text-muted-foreground">{selected.lot}</p></div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {msgs.map((m) => (
                  <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${m.from === 'me' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-secondary text-foreground rounded-bl-sm'}`}>
                      <p className="text-sm">{m.text}</p>
                      <p className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground'}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border flex gap-2">
                <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} placeholder="Напишите сообщение..." className="flex-1 bg-secondary text-foreground text-sm px-4 py-2.5 rounded-xl outline-none placeholder:text-muted-foreground" />
                <button onClick={send} className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center"><Icon name="Send" size={16} /></button>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex flex-1 items-center justify-center text-muted-foreground">
              <div className="text-center"><Icon name="MessageCircle" size={40} className="mx-auto mb-3 opacity-30" /><p className="text-sm">Выберите чат</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── NotificationsPage ────────────────────────────────────────────────────────
const NOTIFS_DATA = [
  { id: 'n1', type: 'booking', title: 'Бронирование подтверждено', text: 'СтройМастер подтвердил вашу заявку.', time: '5 мин назад', read: false },
  { id: 'n2', type: 'message', title: 'Новое сообщение', text: 'Алексей М.: "Приезжайте смотреть"', time: '2 часа назад', read: false },
  { id: 'n3', type: 'review', title: 'Новый отзыв', text: 'Покупатель оставил отзыв на ваш лот', time: 'Вчера, 18:00', read: false },
  { id: 'n4', type: 'system', title: 'Лот прошёл модерацию', text: 'Ваш лот одобрен и виден пользователям.', time: '2 дня назад', read: true },
];
const NOTIF_ICONS: Record<string, { icon: string; color: string }> = {
  booking: { icon: 'CalendarCheck', color: 'text-green-400 bg-green-400/10' },
  message: { icon: 'MessageCircle', color: 'text-blue-400 bg-blue-400/10' },
  review: { icon: 'Star', color: 'text-yellow-400 bg-yellow-400/10' },
  system: { icon: 'Bell', color: 'text-primary bg-primary/10' },
};

function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFS_DATA);
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-black">Уведомления</h1>
        <button onClick={() => setNotifs(notifs.map((n) => ({ ...n, read: true })))} className="text-xs text-primary font-medium">Прочитать все</button>
      </div>
      <div className="space-y-2">
        {notifs.map((n) => {
          const meta = NOTIF_ICONS[n.type] || NOTIF_ICONS['system'];
          return (
            <div key={n.id} className={`bg-card border rounded-2xl p-4 flex gap-3 ${n.read ? 'border-border' : 'border-primary/30 bg-primary/5'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.color}`}><Icon name={meta.icon} size={18} /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{n.text}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1.5">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SellerPage ───────────────────────────────────────────────────────────────
function SellerPage() {
  const [tab, setTab] = useState<'lots' | 'create' | 'stats'>('lots');
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', subcategory: '', type: 'product', location: '', days: '7' });
  const selCat = CATEGORIES.find((c) => c.id === form.category);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-black mb-5">Кабинет продавца</h1>
      <div className="flex gap-2 mb-6 bg-secondary p-1 rounded-xl">
        {[{ id: 'lots', label: 'Мои лоты' }, { id: 'create', label: '+ Новый лот' }, { id: 'stats', label: 'Статистика' }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as 'lots' | 'create' | 'stats')} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t.id ? 'bg-card text-foreground shadow' : 'text-muted-foreground'}`}>{t.label}</button>
        ))}
      </div>
      {tab === 'lots' && (
        <div className="space-y-3">{LOTS.slice(0, 3).map((lot) => (
          <div key={lot.id} className="bg-card border border-border rounded-2xl p-4 flex gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary shrink-0">{lot.images[0] && <img src={lot.images[0]} alt="" className="w-full h-full object-cover" />}</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm line-clamp-1 mb-1">{lot.title}</p>
              <p className="text-primary font-bold text-sm mb-2">{lot.price.toLocaleString('ru')} ₽</p>
              <span className="text-xs bg-green-400/10 text-green-400 px-2 py-0.5 rounded-full font-medium">Активен</span>
            </div>
            <div className="flex flex-col gap-1.5"><button className="text-xs text-primary font-medium">Ред.</button><button className="text-xs text-destructive font-medium">Удалить</button></div>
          </div>
        ))}</div>
      )}
      {tab === 'create' && (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="flex gap-2">
            {['product', 'service'].map((t) => (
              <button key={t} onClick={() => setForm({ ...form, type: t })} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-colors ${form.type === t ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}>{t === 'product' ? '📦 Товар' : '🔧 Услуга'}</button>
            ))}
          </div>
          {[{ key: 'title', label: 'Название', ph: 'iPhone 14 Pro 256GB' }, { key: 'price', label: 'Цена, ₽', ph: '50 000' }, { key: 'location', label: 'Город', ph: 'Москва' }].map((f) => (
            <div key={f.key}>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{f.label}</label>
              <input value={form[f.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.ph} className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground" />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Описание</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите товар или услугу..." className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground resize-none h-24" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Категория</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: '' })} className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none">
              <option value="">Выберите категорию</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          {selCat && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Подкатегория</label>
              <select value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none">
                <option value="">Выберите подкатегорию</option>
                {selCat.children.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Срок размещения</label>
            <select value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={String(d)}>{d} {d === 1 ? 'день' : d < 5 ? 'дня' : 'дней'}</option>
              ))}
            </select>
          </div>
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
            <Icon name="Upload" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Добавить фотографии</p>
          </div>
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-colors">Опубликовать лот</button>
        </div>
      )}
      {tab === 'stats' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {[{ label: 'Просмотров', value: '2 794', icon: 'Eye' }, { label: 'Бронирований', value: '14', icon: 'CalendarCheck' }, { label: 'Отзывов', value: '12', icon: 'Star' }].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
                <Icon name={s.icon} size={20} className="mx-auto mb-1 text-primary" />
                <p className="text-xl font-black">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold mb-3">Подписка продавца</h3>
            <div className="flex items-center justify-between">
              <div><p className="text-sm">Статус: <span className="text-green-400 font-semibold">Активна</span></p><p className="text-xs text-muted-foreground mt-0.5">До 15 июня 2026</p></div>
              <span className="text-primary font-black text-lg">500 ₽/мес</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AuthModal ────────────────────────────────────────────────────────────────
function AuthModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (u: AuthUser) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setError(''); setLoading(true);
    const path = mode === 'login' ? '/login' : '/register';
    const body = mode === 'login'
      ? { email: form.email, password: form.password }
      : { email: form.email, password: form.password, name: form.name, role: form.role };
    let statusOk = false;
    fetch(AUTH_URL + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then((res) => { statusOk = res.ok; return res.json(); })
      .then((data: Record<string, string>) => {
        if (!statusOk) { setError(data['error'] || 'Ошибка'); }
        else { onSuccess({ user_id: data['user_id'] || '', name: data['name'] || '', role: data['role'] || 'buyer', token: data['token'] || '' }); }
      })
      .catch(() => setError('Ошибка соединения'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
          <Icon name="X" size={18} />
        </button>
        <h2 className="text-xl font-black text-foreground mb-1">{mode === 'login' ? 'Войти в ЛИКВИД' : 'Регистрация'}</h2>
        <p className="text-sm text-muted-foreground mb-6">{mode === 'login' ? 'Добро пожаловать назад!' : 'Создайте аккаунт бесплатно'}</p>
        <div className="flex gap-2 mb-5 bg-secondary p-1 rounded-xl">
          {(['login', 'register'] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setError(''); }} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === m ? 'bg-card text-foreground shadow' : 'text-muted-foreground'}`}>
              {m === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ваше имя</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Алина Иванова" className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground" />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Пароль</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground" />
          </div>
          {mode === 'register' && (
            <div className="flex gap-2">
              {[{ v: 'buyer', l: '🛍 Покупатель' }, { v: 'seller', l: '🏪 Продавец' }].map((r) => (
                <button key={r.v} onClick={() => setForm({ ...form, role: r.v })} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-colors ${form.role === r.v ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>{r.l}</button>
              ))}
            </div>
          )}
        </div>
        {error && <p className="mt-3 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-xl">{error}</p>}
        <button onClick={submit} disabled={loading} className="w-full mt-5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
          {loading && <Icon name="Loader2" size={16} className="animate-spin" />}
          {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
        </button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
type Page = 'home' | 'search' | 'categories' | 'profile' | 'bookings' | 'favorites' | 'chat' | 'notifications' | 'seller' | 'admin' | 'lots';

export default function Index() {
  const [page, setPage] = useState<Page>('home');
  const [openLot, setOpenLot] = useState<Lot | null>(null);
  const [favs, setFavs] = useState<string[]>(['2', '4']);
  const [theme, setTheme] = useState<Theme>('night');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const applyTheme = (t: Theme) => {
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
  };

  const nav = (p: string) => {
    if ((p === 'profile' || p === 'seller' || p === 'bookings') && !user) {
      setShowAuth(true); return;
    }
    setPage(p as Page);
  };
  const toggleFav = (id: string) => setFavs((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  const openModal = (lot: Lot) => setOpenLot(lot);
  const closeModal = () => setOpenLot(null);
  const bookLot = (_lot: Lot) => { closeModal(); nav('bookings'); };
  const handleLogin = (u: AuthUser) => { setUser(u); setShowAuth(false); };
  const handleLogout = () => { setUser(null); setPage('home'); };

  const lotsWithFav = LOTS.map((l) => ({ ...l, isFavorite: favs.includes(l.id) }));
  const activeLot = openLot ? (lotsWithFav.find((l) => l.id === openLot.id) ?? openLot) : null;

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage nav={nav} onOpen={openModal} onFav={toggleFav} theme={theme} setTheme={applyTheme} />;
      case 'search': case 'lots': return <SearchPage onOpen={openModal} onFav={toggleFav} />;
      case 'categories': return <CategoriesPage nav={nav} />;
      case 'profile': return <ProfilePage nav={nav} user={user} onLogout={handleLogout} />;
      case 'bookings': return <BookingsPage nav={nav} />;
      case 'favorites': return <FavoritesPage favIds={favs} onOpen={openModal} onFav={toggleFav} />;
      case 'chat': return <ChatPage />;
      case 'notifications': return <NotificationsPage />;
      case 'seller': return <SellerPage />;
      case 'admin': return <AdminPage />;
      default: return <HomePage nav={nav} onOpen={openModal} onFav={toggleFav} theme={theme} setTheme={applyTheme} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header page={page} nav={nav} user={user} onAuthClick={() => setShowAuth(true)} />
      <SubNav page={page} nav={nav} />
      <main className="pb-24 md:pb-8">{renderPage()}</main>
      <BottomNav page={page} nav={nav} />
      <LotModal lot={activeLot} onClose={closeModal} onBook={bookLot} />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onSuccess={handleLogin} />}
    </div>
  );
}