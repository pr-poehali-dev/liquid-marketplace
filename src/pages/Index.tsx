import { useState, type FC } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

// ─── Icon ────────────────────────────────────────────────────────────────────
const Icon: FC<LucideProps & { name: string; fallback?: string }> = ({ name, fallback = 'CircleAlert', ...props }) => {
  const C = (LucideIcons as Record<string, FC<LucideProps>>)[name]
    ?? (LucideIcons as Record<string, FC<LucideProps>>)[fallback];
  if (!C) return null;
  return <C {...props} />;
};

// ─── Data ────────────────────────────────────────────────────────────────────
interface Lot {
  id: string; title: string; price: number; priceLabel?: string;
  category: string; type: 'product' | 'service';
  seller: { id: string; name: string; rating: number; reviewCount: number };
  images: string[]; description: string; location: string;
  createdAt: string; status: string; isFavorite?: boolean; views: number;
}

interface Category { id: string; name: string; icon: string; children: { id: string; name: string }[] }

const CATEGORIES: Category[] = [
  { id: 'realty', name: 'Недвижимость', icon: '🏠', children: [{ id: 'apartments', name: 'Квартиры' }, { id: 'rooms', name: 'Комнаты' }, { id: 'houses', name: 'Дома, дачи' }, { id: 'land', name: 'Участки' }, { id: 'garages', name: 'Гаражи' }, { id: 'commercial', name: 'Коммерческая' }] },
  { id: 'transport', name: 'Транспорт', icon: '🚗', children: [{ id: 'cars', name: 'Автомобили' }, { id: 'motos', name: 'Мотоциклы' }, { id: 'trucks', name: 'Грузовики' }, { id: 'parts', name: 'Запчасти' }, { id: 'autoservice', name: 'Автосервисы' }] },
  { id: 'services', name: 'Услуги', icon: '🔧', children: [{ id: 'repair', name: 'Ремонт и стройка' }, { id: 'cleaning', name: 'Клининг' }, { id: 'beauty', name: 'Красота' }, { id: 'education', name: 'Обучение' }, { id: 'it', name: 'IT' }, { id: 'legal', name: 'Юридические' }, { id: 'photo', name: 'Фото и видео' }] },
  { id: 'personal', name: 'Личные вещи', icon: '👗', children: [{ id: 'clothes', name: 'Одежда' }, { id: 'watches', name: 'Часы и украшения' }, { id: 'cosmetics', name: 'Косметика' }, { id: 'sport', name: 'Спорт' }] },
  { id: 'home', name: 'Для дома', icon: '🏡', children: [{ id: 'furniture', name: 'Мебель' }, { id: 'appliances', name: 'Техника' }, { id: 'kitchen', name: 'Кухня' }, { id: 'garden', name: 'Сад' }] },
  { id: 'electronics', name: 'Электроника', icon: '📱', children: [{ id: 'phones', name: 'Смартфоны' }, { id: 'laptops', name: 'Ноутбуки' }, { id: 'tv', name: 'ТВ, аудио' }, { id: 'gaming', name: 'Игры' }] },
  { id: 'hobby', name: 'Хобби', icon: '🎸', children: [{ id: 'books', name: 'Книги' }, { id: 'music', name: 'Инструменты' }, { id: 'hunting', name: 'Охота и рыбалка' }, { id: 'antique', name: 'Антиквариат' }] },
  { id: 'animals', name: 'Животные', icon: '🐾', children: [{ id: 'cats_dogs', name: 'Кошки, собаки' }, { id: 'birds', name: 'Птицы' }, { id: 'pet_food', name: 'Корма' }] },
  { id: 'business', name: 'Для бизнеса', icon: '💼', children: [{ id: 'equipment', name: 'Оборудование' }, { id: 'office', name: 'Офис' }, { id: 'outsource', name: 'Аутсорсинг' }] },
  { id: 'jobs', name: 'Вакансии', icon: '📋', children: [{ id: 'jobs_search', name: 'Поиск работы' }, { id: 'staff_search', name: 'Поиск сотрудников' }] },
];

const LOTS: Lot[] = [
  { id: '1', title: 'iPhone 14 Pro 256GB', price: 65000, category: 'electronics', type: 'product', seller: { id: 's1', name: 'Алексей М.', rating: 4.8, reviewCount: 47 }, images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'], description: 'Продаю iPhone 14 Pro. Без царапин, полный комплект.', location: 'Москва', createdAt: '2026-05-14', status: 'active', views: 342 },
  { id: '2', title: 'Ремонт квартир под ключ', price: 3500, priceLabel: 'от 3 500 ₽/м²', category: 'services', type: 'service', seller: { id: 's2', name: 'СтройМастер', rating: 4.9, reviewCount: 128 }, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'], description: 'Профессиональный ремонт квартир. Опыт 12 лет.', location: 'Москва', createdAt: '2026-05-13', status: 'active', views: 891 },
  { id: '3', title: '2-комнатная квартира, 58 м², Замоскворечье', price: 14500000, category: 'realty', type: 'product', seller: { id: 's3', name: 'Мария К.', rating: 4.7, reviewCount: 23 }, images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'], description: 'Светлая квартира с видом на набережную.', location: 'Москва, ЦАО', createdAt: '2026-05-12', status: 'active', views: 1240 },
  { id: '4', title: 'MacBook Pro 16" M3 Max', price: 289000, category: 'electronics', type: 'product', seller: { id: 's4', name: 'TechStore PRO', rating: 4.6, reviewCount: 89 }, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'], description: 'MacBook Pro 16", M3 Max, 48 ГБ ОЗУ.', location: 'Санкт-Петербург', createdAt: '2026-05-11', status: 'active', views: 567 },
  { id: '5', title: 'Юридические услуги для бизнеса', price: 5000, priceLabel: 'от 5 000 ₽/час', category: 'services', type: 'service', seller: { id: 's5', name: 'Адвокат Петров', rating: 5.0, reviewCount: 64 }, images: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400'], description: 'Регистрация ООО, договоры. Стаж 15 лет.', location: 'Москва', createdAt: '2026-05-10', status: 'active', views: 423 },
  { id: '6', title: 'Toyota Camry 2022, 2.5 Hybrid', price: 3250000, category: 'transport', type: 'product', seller: { id: 's6', name: 'AutoElite', rating: 4.5, reviewCount: 31 }, images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400'], description: 'Один владелец, пробег 38 000 км.', location: 'Казань', createdAt: '2026-05-09', status: 'active', views: 789 },
  { id: '7', title: 'Профессиональная фотосессия', price: 8000, priceLabel: '8 000 ₽/сессия', category: 'services', type: 'service', seller: { id: 's7', name: 'Фотограф Анна', rating: 4.9, reviewCount: 112 }, images: ['https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400'], description: 'Портретная, деловая съёмка. Обработка 50+ фото.', location: 'Москва', createdAt: '2026-05-08', status: 'active', views: 345 },
  { id: '8', title: 'Диван угловой, б/у 1 год', price: 25000, category: 'home', type: 'product', seller: { id: 's8', name: 'Игорь Р.', rating: 4.3, reviewCount: 8 }, images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'], description: 'Угловой диван серого цвета, 280×180 см.', location: 'Екатеринбург', createdAt: '2026-05-07', status: 'active', views: 198 },
];

const BOOKINGS = [
  { id: 'b1', lot: LOTS[0], status: 'pending', createdAt: '2026-05-15', message: 'Хочу забронировать.' },
  { id: 'b2', lot: LOTS[1], status: 'confirmed', createdAt: '2026-05-12', message: 'Нужен ремонт 65 м².' },
  { id: 'b3', lot: LOTS[5], status: 'completed', createdAt: '2026-04-20', message: 'Готов к сделке.' },
];

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: 'Ожидает подтверждения', color: 'text-yellow-400 bg-yellow-400/10' },
  confirmed: { label: 'Подтверждено', color: 'text-green-400 bg-green-400/10' },
  rejected: { label: 'Отклонено', color: 'text-red-400 bg-red-400/10' },
  completed: { label: 'Завершено', color: 'text-blue-400 bg-blue-400/10' },
  cancelled: { label: 'Отменено', color: 'text-gray-400 bg-gray-400/10' },
};

const MOCK_USERS = [
  { id: 'u1', name: 'Алина Иванова', email: 'alina@example.com', role: 'buyer', status: 'active', lots: 0, bookings: 3 },
  { id: 'u2', name: 'СтройМастер', email: 'master@stroy.ru', role: 'seller', status: 'active', lots: 12, bookings: 89 },
  { id: 'u3', name: 'Алексей М.', email: 'alex@mail.ru', role: 'seller', status: 'blocked', lots: 4, bookings: 17 },
  { id: 'u4', name: 'AutoElite', email: 'auto@elite.ru', role: 'seller', status: 'active', lots: 28, bookings: 145 },
];

// ─── Auth types ──────────────────────────────────────────────────────────────
interface AuthUser { user_id: string; name: string; role: string; token: string }

// ─── Темы ────────────────────────────────────────────────────────────────────
type Theme = 'night' | 'day' | 'sunset';
const THEMES: { id: Theme; emoji: string; name: string; hero: string }[] = [
  { id: 'night',  emoji: '🌑', name: 'Ночь',  hero: 'https://cdn.poehali.dev/projects/50dbf663-5f48-42ee-8380-d0d49005bea8/files/2748104d-bbdd-4fdf-9410-046de739311f.jpg' },
  { id: 'day',    emoji: '☀️', name: 'День',  hero: 'https://cdn.poehali.dev/projects/50dbf663-5f48-42ee-8380-d0d49005bea8/files/0fc34ad0-9e2a-40f9-8080-2af42eaccfed.jpg' },
  { id: 'sunset', emoji: '🌅', name: 'Закат', hero: 'https://cdn.poehali.dev/projects/50dbf663-5f48-42ee-8380-d0d49005bea8/files/07d59aca-ed0a-4ed3-86ed-9cf315604f6e.jpg' },
];

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
    if (type !== 'all' && l.type !== type) return false;
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
              {[{ v: 'new', l: 'Новые' }, { v: 'price_asc', l: 'Цена ↑' }, { v: 'price_desc', l: 'Цена ↓' }, { v: 'rating', l: 'Рейтинг' }].map((s) => <button key={s.v} onClick={() => setSort(s.v as typeof sort)} className={`block w-full text-xs px-3 py-1.5 rounded-lg font-medium text-left mb-1 ${sort === s.v ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{s.l}</button>)}
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
                <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Напишите сообщение..." className="flex-1 bg-secondary text-foreground text-sm px-4 py-2.5 rounded-xl outline-none placeholder:text-muted-foreground" />
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
        {([{ id: 'lots' as const, label: 'Мои лоты' }, { id: 'create' as const, label: '+ Новый лот' }, { id: 'stats' as const, label: 'Статистика' }]).map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t.id ? 'bg-card text-foreground shadow' : 'text-muted-foreground'}`}>{t.label}</button>
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
            {(['product', 'service'] as const).map((t) => (
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

// ─── AdminPage ────────────────────────────────────────────────────────────────
function AdminPage() {
  const [tab, setTab] = useState('dashboard');
  const [userFilter, setUserFilter] = useState('all');
  const [subEnabled, setSubEnabled] = useState(true);
  const [subPrice, setSubPrice] = useState('500');
  const [catExpanded, setCatExpanded] = useState<string | null>(null);

  const TABS = [{ id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' }, { id: 'users', label: 'Пользователи', icon: 'Users' }, { id: 'lots', label: 'Лоты', icon: 'Tag' }, { id: 'categories', label: 'Категории', icon: 'Grid3X3' }, { id: 'bookings', label: 'Бронирования', icon: 'CalendarCheck' }, { id: 'reviews', label: 'Отзывы', icon: 'Star' }, { id: 'subscriptions', label: 'Подписки', icon: 'CreditCard' }, { id: 'reports', label: 'Отчёты', icon: 'FileBarChart' }];
  const filteredUsers = MOCK_USERS.filter((u) => userFilter === 'all' || (userFilter === 'seller' && u.role === 'seller') || (userFilter === 'buyer' && u.role === 'buyer') || (userFilter === 'blocked' && u.status === 'blocked'));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center"><Icon name="ShieldCheck" size={18} className="text-primary" /></div>
        <h1 className="text-2xl font-black">Панель администратора</h1>
      </div>
      <div className="flex gap-6">
        <aside className="hidden md:flex flex-col w-52 shrink-0 gap-1">
          {TABS.map((t) => <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${tab === t.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}><Icon name={t.icon} size={16} />{t.label}</button>)}
        </aside>
        <div className="md:hidden w-full overflow-x-auto mb-4">
          <div className="flex gap-2 pb-2">{TABS.map((t) => <button key={t.id} onClick={() => setTab(t.id)} className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium ${tab === t.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{t.label}</button>)}</div>
        </div>
        <div className="flex-1 min-w-0">
          {tab === 'dashboard' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[{ label: 'Пользователей', value: '1 248', icon: 'Users', color: 'text-blue-400 bg-blue-400/10' }, { label: 'Лотов', value: '4 891', icon: 'Tag', color: 'text-green-400 bg-green-400/10' }, { label: 'Бронирований', value: '892', icon: 'CalendarCheck', color: 'text-primary bg-primary/10' }, { label: 'Доход/мес', value: '47 500 ₽', icon: 'TrendingUp', color: 'text-yellow-400 bg-yellow-400/10' }].map((s) => (
                  <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><Icon name={s.icon} size={20} /></div>
                    <p className="text-2xl font-black">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Активность за неделю</h3>
                <div className="flex items-end gap-2 h-32">
                  {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-primary/20 rounded-t-md relative" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-md" style={{ height: '40%' }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{['Пн','Вт','Ср','Чт','Пт','Сб','Вс'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab === 'users' && (
            <div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {[{ v: 'all', l: 'Все' }, { v: 'seller', l: 'Продавцы' }, { v: 'buyer', l: 'Покупатели' }, { v: 'blocked', l: 'Заблокированные' }].map((f) => <button key={f.v} onClick={() => setUserFilter(f.v)} className={`text-xs px-3 py-1.5 rounded-lg font-medium ${userFilter === f.v ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{f.l}</button>)}
              </div>
              <div className="space-y-2">{filteredUsers.map((u) => (
                <div key={u.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold shrink-0">{u.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm">{u.name}</p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${u.status === 'blocked' ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'}`}>{u.status === 'blocked' ? 'Заблокирован' : 'Активен'}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{u.role === 'seller' ? 'Продавец' : 'Покупатель'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{u.email} · Лоты: {u.lots} · Брони: {u.bookings}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button className="text-xs px-2.5 py-1 bg-secondary text-foreground rounded-lg">{u.status === 'blocked' ? 'Разблок.' : 'Блок.'}</button>
                    <button className="text-xs px-2.5 py-1 bg-secondary text-muted-foreground rounded-lg">Роль</button>
                  </div>
                </div>
              ))}</div>
            </div>
          )}
          {tab === 'lots' && (
            <div className="space-y-3">
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-4 flex items-center gap-3"><Icon name="Clock" size={18} className="text-yellow-400" /><p className="text-sm">7 лотов ожидают модерации</p></div>
              {LOTS.slice(0, 5).map((lot) => (
                <div key={lot.id} className="bg-card border border-border rounded-2xl p-4 flex gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-secondary shrink-0">{lot.images[0] && <img src={lot.images[0]} alt="" className="w-full h-full object-cover" />}</div>
                  <div className="flex-1 min-w-0"><p className="font-semibold text-sm line-clamp-1">{lot.title}</p><p className="text-xs text-muted-foreground">{lot.seller.name} · {lot.location}</p><p className="text-primary font-bold text-sm">{lot.price.toLocaleString('ru')} ₽</p></div>
                  <div className="flex gap-1.5 shrink-0">
                    <button className="text-xs px-2.5 py-1.5 bg-green-400/10 text-green-400 rounded-lg font-medium">✓</button>
                    <button className="text-xs px-2.5 py-1.5 bg-red-400/10 text-red-400 rounded-lg font-medium">✕</button>
                    <button className="text-xs px-2.5 py-1.5 bg-secondary text-muted-foreground rounded-lg">Удалить</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'categories' && (
            <div>
              <div className="flex justify-end mb-3"><button className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold">+ Добавить</button></div>
              <div className="space-y-2">{CATEGORIES.map((cat) => (
                <div key={cat.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3">
                    <button className="flex items-center gap-3 flex-1" onClick={() => setCatExpanded(catExpanded === cat.id ? null : cat.id)}>
                      <span className="text-xl">{cat.icon}</span>
                      <div className="text-left"><p className="font-semibold text-sm">{cat.name}</p><p className="text-xs text-muted-foreground">{cat.children.length} подкатегорий</p></div>
                    </button>
                    <div className="flex gap-2"><button className="text-xs text-primary font-medium">Ред.</button><button className="text-xs text-destructive font-medium">Удалить</button></div>
                  </div>
                  {catExpanded === cat.id && (
                    <div className="border-t border-border px-4 py-2">
                      {cat.children.map((sub) => <div key={sub.id} className="flex items-center justify-between py-1.5"><span className="text-sm text-muted-foreground">{sub.name}</span><div className="flex gap-2"><button className="text-xs text-primary">Ред.</button><button className="text-xs text-destructive">Удалить</button></div></div>)}
                    </div>
                  )}
                </div>
              ))}</div>
            </div>
          )}
          {tab === 'subscriptions' && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Настройки подписки</h3>
                <div className="flex items-center justify-between mb-4">
                  <div><p className="text-sm font-medium">Ежемесячная плата</p><p className="text-xs text-muted-foreground">Для продавцов</p></div>
                  <button onClick={() => setSubEnabled(!subEnabled)} className={`w-12 h-6 rounded-full transition-colors relative ${subEnabled ? 'bg-primary' : 'bg-secondary'}`}>
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${subEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1"><label className="text-xs text-muted-foreground">Сумма, ₽/мес</label><input type="number" value={subPrice} onChange={(e) => setSubPrice(e.target.value)} className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-2.5 rounded-xl outline-none" /></div>
                  <button className="mt-5 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl">Сохранить</button>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Продавцы</h3>
                {MOCK_USERS.filter((u) => u.role === 'seller').map((u) => (
                  <div key={u.id} className="flex items-center justify-between py-2">
                    <div><p className="text-sm font-medium">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.id === 'u3' ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'}`}>{u.id === 'u3' ? 'Просрочена' : 'Активна'}</span>
                      <button className="text-xs text-primary">Продлить</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'reports' && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold mb-4">Генерация отчётов</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[{ label: 'По продавцам', desc: 'Топ по бронированиям' }, { label: 'По категориям', desc: 'Популярность' }, { label: 'По подпискам', desc: 'Доход платформы' }, { label: 'Активность', desc: 'Действия пользователей' }].map((r) => (
                  <div key={r.label} className="bg-secondary rounded-xl p-3">
                    <p className="text-sm font-semibold">{r.label}</p>
                    <p className="text-xs text-muted-foreground mb-3">{r.desc}</p>
                    <div className="flex gap-1.5">{['CSV', 'Excel', 'PDF'].map((fmt) => <button key={fmt} className="text-[11px] px-2 py-1 bg-card text-primary font-medium rounded-lg">{fmt}</button>)}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Фильтры</p>
                <div className="grid grid-cols-3 gap-2">
                  <input type="date" className="bg-secondary text-foreground text-xs px-3 py-2 rounded-xl outline-none" />
                  <input type="date" className="bg-secondary text-foreground text-xs px-3 py-2 rounded-xl outline-none" />
                  <select className="bg-secondary text-foreground text-xs px-3 py-2 rounded-xl outline-none"><option>Все регионы</option><option>Москва</option><option>СПб</option></select>
                </div>
              </div>
            </div>
          )}
          {tab === 'reviews' && (
            <div className="space-y-3">
              {[{ id: 'r1', author: 'Покупатель', lot: 'Ремонт квартир', text: 'Отличная работа!', rating: 5, flagged: false }, { id: 'r2', author: 'Клиент', lot: 'iPhone 14 Pro', text: 'Телефон не соответствовал описанию.', rating: 1, flagged: true }].map((rev) => (
                <div key={rev.id} className={`bg-card border rounded-2xl p-4 ${rev.flagged ? 'border-red-400/30' : 'border-border'}`}>
                  {rev.flagged && <div className="flex items-center gap-1.5 mb-2 text-red-400 text-xs font-semibold"><Icon name="Flag" size={12} />Жалоба</div>}
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-semibold">{rev.author}</p>
                    <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="Star" size={12} className={i < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'} />)}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Лот: {rev.lot}</p>
                  <p className="text-sm mb-3">{rev.text}</p>
                  <button className="text-xs px-3 py-1.5 bg-red-400/10 text-red-400 rounded-lg font-medium">Удалить</button>
                </div>
              ))}
            </div>
          )}
          {tab === 'bookings' && (
            <div className="space-y-3">
              {[{ id: 'ab1', buyer: 'Алина Иванова', seller: 'СтройМастер', lot: 'Ремонт квартир', status: 'confirmed', date: '2026-05-15' }, { id: 'ab2', buyer: 'Клиент 2', seller: 'Алексей М.', lot: 'iPhone 14 Pro', status: 'pending', date: '2026-05-14' }].map((b) => (
                <div key={b.id} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold text-sm">{b.lot}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.status === 'confirmed' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>{b.status === 'confirmed' ? 'Подтверждено' : 'Ожидает'}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Покупатель: {b.buyer} · Продавец: {b.seller} · {b.date}</p>
                  <select className="mt-3 text-xs bg-secondary text-foreground px-3 py-1.5 rounded-lg outline-none">
                    <option>Сменить статус...</option>
                    {['pending', 'confirmed', 'rejected', 'completed', 'cancelled'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
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

// ─── Auth ─────────────────────────────────────────────────────────────────────
const AUTH_URL = 'https://functions.poehali.dev/46b78309-012f-4fb6-aebc-43255d00f5fc';

function AuthModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (u: AuthUser) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(''); setLoading(true);
    try {
      const path = mode === 'login' ? '/login' : '/register';
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : { email: form.email, password: form.password, name: form.name, role: form.role };
      const res = await fetch(AUTH_URL + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Ошибка'); return; }
      onSuccess(data as AuthUser);
    } catch (_e) {
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
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
              {([{ v: 'buyer', l: '🛍 Покупатель' }, { v: 'seller', l: '🏪 Продавец' }] as const).map((r) => (
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