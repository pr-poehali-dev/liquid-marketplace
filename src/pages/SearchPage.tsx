import { useState } from 'react';
import Icon from '@/components/ui/icon';
import LotCard from '@/components/lots/LotCard';
import { CATEGORIES } from '@/data/categories';
import { MOCK_LOTS, Lot } from '@/data/mockLots';

interface SearchPageProps {
  onOpenLot: (lot: Lot) => void;
  onToggleFavorite: (id: string) => void;
}

export default function SearchPage({ onOpenLot, onToggleFavorite }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'product' | 'service'>('all');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [useGeo, setUseGeo] = useState(false);
  const [sortBy, setSortBy] = useState<'new' | 'price_asc' | 'price_desc' | 'rating'>('new');

  const filtered = MOCK_LOTS.filter((lot) => {
    if (query && !lot.title.toLowerCase().includes(query.toLowerCase())) return false;
    if (selectedCat && lot.category !== selectedCat) return false;
    if (selectedType !== 'all' && lot.type !== selectedType) return false;
    if (priceFrom && lot.price < Number(priceFrom)) return false;
    if (priceTo && lot.price > Number(priceTo)) return false;
    if (minRating && lot.seller.rating < minRating) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.seller.rating - a.seller.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
      {/* Search bar */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3">
          <Icon name="Search" size={18} className="text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск товаров и услуг..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')}>
              <Icon name="X" size={16} className="text-muted-foreground" />
            </button>
          )}
        </div>
        <button
          onClick={() => setUseGeo(!useGeo)}
          className={`px-3 rounded-xl border transition-colors ${useGeo ? 'bg-primary/20 border-primary text-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground'}`}
        >
          <Icon name="MapPin" size={18} />
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-3 rounded-xl border transition-colors ${showFilters ? 'bg-primary/20 border-primary text-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground'}`}
        >
          <Icon name="SlidersHorizontal" size={18} />
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-card border border-border rounded-2xl p-4 mb-4 animate-slide-up space-y-4">
          {/* Category */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Категория</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCat('')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${!selectedCat ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
              >
                Все
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(selectedCat === cat.id ? '' : cat.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${selectedCat === cat.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Type */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Тип</p>
              <div className="flex flex-col gap-1">
                {(['all', 'product', 'service'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors text-left ${selectedType === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                  >
                    {t === 'all' ? 'Всё' : t === 'product' ? 'Товар' : 'Услуга'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Цена, ₽</p>
              <input
                type="number"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                placeholder="От"
                className="w-full bg-secondary text-foreground text-xs px-3 py-2 rounded-lg outline-none border border-transparent focus:border-primary mb-1"
              />
              <input
                type="number"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                placeholder="До"
                className="w-full bg-secondary text-foreground text-xs px-3 py-2 rounded-lg outline-none border border-transparent focus:border-primary"
              />
            </div>

            {/* Rating */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Рейтинг</p>
              {[0, 4, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`block w-full text-xs px-3 py-1.5 rounded-lg font-medium transition-colors text-left mb-1 ${minRating === r ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                >
                  {r === 0 ? 'Любой' : `от ${r} ★`}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Сортировка</p>
              {[
                { val: 'new', label: 'Новые' },
                { val: 'price_asc', label: 'Цена ↑' },
                { val: 'price_desc', label: 'Цена ↓' },
                { val: 'rating', label: 'По рейтингу' },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => setSortBy(s.val as typeof sortBy)}
                  className={`block w-full text-xs px-3 py-1.5 rounded-lg font-medium transition-colors text-left mb-1 ${sortBy === s.val ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Найдено: <span className="text-foreground font-semibold">{filtered.length}</span> лотов
          {useGeo && <span className="text-primary ml-2">📍 Рядом со мной</span>}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-50" />
          <p className="font-medium">Ничего не найдено</p>
          <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((lot) => (
            <LotCard key={lot.id} lot={lot} onOpen={onOpenLot} onToggleFavorite={onToggleFavorite} />
          ))}
        </div>
      )}
    </div>
  );
}
