import LotCard from '@/components/lots/LotCard';
import Icon from '@/components/ui/icon';
import { MOCK_LOTS, Lot } from '@/data/mockLots';

interface FavoritesPageProps {
  onOpenLot: (lot: Lot) => void;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

export default function FavoritesPage({ onOpenLot, onToggleFavorite, favorites }: FavoritesPageProps) {
  const favLots = MOCK_LOTS.filter((l) => favorites.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-2xl font-black text-foreground mb-5">Избранное</h1>

      {favLots.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Icon name="HeartOff" size={48} className="mx-auto mb-4 opacity-40" />
          <p className="font-semibold text-lg mb-1">Пока ничего нет</p>
          <p className="text-sm">Добавляйте лоты в избранное, нажав на ❤️</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favLots.map((lot) => (
            <LotCard
              key={lot.id}
              lot={{ ...lot, isFavorite: true }}
              onOpen={onOpenLot}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
