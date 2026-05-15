import { useState } from 'react';
import Icon from '@/components/ui/icon';
import LotCard from '@/components/lots/LotCard';
import { CATEGORIES } from '@/data/categories';
import { MOCK_LOTS, Lot } from '@/data/mockLots';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenLot: (lot: Lot) => void;
  onToggleFavorite: (id: string) => void;
}

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/50dbf663-5f48-42ee-8380-d0d49005bea8/files/2748104d-bbdd-4fdf-9410-046de739311f.jpg';

export default function HomePage({ onNavigate, onOpenLot, onToggleFavorite }: HomePageProps) {
  const [useGeo, setUseGeo] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoCity, setGeoCity] = useState('');

  const handleGeo = () => {
    if (useGeo) { setUseGeo(false); setGeoCity(''); return; }
    setGeoLoading(true);
    navigator.geolocation?.getCurrentPosition(
      () => { setUseGeo(true); setGeoCity('Рядом со мной'); setGeoLoading(false); },
      () => { setGeoLoading(false); }
    );
  };

  const popular = MOCK_LOTS.slice(0, 4);
  const newest = MOCK_LOTS.slice(2, 6);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={HERO_IMAGE} alt="ЛИКВИД" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
            ЛИКВИД
          </h1>
          <p className="text-white/80 text-sm md:text-base mb-6">Маркетплейс товаров и услуг</p>

          {/* Search hero */}
          <div className="w-full max-w-lg bg-card/90 backdrop-blur-md rounded-2xl p-1 flex gap-2 border border-border/40">
            <button
              onClick={() => onNavigate('search')}
              className="flex-1 flex items-center gap-2 px-4 py-3 text-muted-foreground text-sm text-left"
            >
              <Icon name="Search" size={16} />
              <span>Что ищете?</span>
            </button>
            <button
              onClick={handleGeo}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                useGeo ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {geoLoading ? <Icon name="Loader2" size={14} className="animate-spin" /> : <Icon name="MapPin" size={14} />}
              <span className="hidden sm:block">{useGeo ? geoCity : 'Рядом'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Категории</h2>
            <button onClick={() => onNavigate('categories')} className="text-primary text-sm font-medium hover:underline">
              Все категории
            </button>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('search')}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-secondary transition-colors group"
              >
                <div className="w-10 h-10 bg-secondary group-hover:bg-primary/20 rounded-xl flex items-center justify-center text-xl transition-colors">
                  {cat.icon}
                </div>
                <span className="text-[10px] text-muted-foreground text-center leading-tight line-clamp-2">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Popular */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Популярные</h2>
            <button onClick={() => onNavigate('search')} className="text-primary text-sm font-medium hover:underline">
              Смотреть все
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {popular.map((lot) => (
              <LotCard key={lot.id} lot={lot} onOpen={onOpenLot} onToggleFavorite={onToggleFavorite} />
            ))}
          </div>
        </section>

        {/* Newest */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Новые лоты</h2>
            <button onClick={() => onNavigate('search')} className="text-primary text-sm font-medium hover:underline">
              Смотреть все
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {newest.map((lot) => (
              <LotCard key={lot.id} lot={lot} onOpen={onOpenLot} onToggleFavorite={onToggleFavorite} />
            ))}
          </div>
        </section>

        {/* CTA for sellers */}
        <section className="bg-gradient-to-r from-primary/20 to-orange-600/10 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Начните продавать на ЛИКВИД</h3>
            <p className="text-muted-foreground text-sm">Тысячи покупателей уже ищут ваши товары и услуги</p>
          </div>
          <button
            onClick={() => onNavigate('seller')}
            className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Разместить лот
          </button>
        </section>
      </div>
    </div>
  );
}
