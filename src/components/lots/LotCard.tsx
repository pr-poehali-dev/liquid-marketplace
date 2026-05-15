import Icon from '@/components/ui/icon';
import { Lot } from '@/data/mockLots';

interface LotCardProps {
  lot: Lot;
  onOpen: (lot: Lot) => void;
  onToggleFavorite?: (id: string) => void;
}

export default function LotCard({ lot, onOpen, onToggleFavorite }: LotCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(1)} млн ₽`;
    if (price >= 1000) return `${(price / 1000).toFixed(0)} 000 ₽`;
    return `${price} ₽`;
  };

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden card-hover cursor-pointer group"
      onClick={() => onOpen(lot)}
    >
      {/* Image */}
      <div className="relative h-44 bg-secondary overflow-hidden">
        {lot.images[0] ? (
          <img src={lot.images[0]} alt={lot.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Icon name="Image" size={32} />
          </div>
        )}
        <button
          className="absolute top-2 right-2 w-8 h-8 glass rounded-full flex items-center justify-center"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(lot.id); }}
        >
          <Icon name="Heart" size={15} className={lot.isFavorite ? 'text-red-400 fill-red-400' : 'text-white'} />
        </button>
        <div className="absolute bottom-2 left-2">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${lot.type === 'service' ? 'bg-blue-500/90 text-white' : 'bg-primary/90 text-primary-foreground'}`}>
            {lot.type === 'service' ? 'Услуга' : 'Товар'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="font-semibold text-sm text-foreground line-clamp-2 leading-snug mb-2">{lot.title}</p>
        <p className="text-primary font-bold text-base mb-2">
          {lot.priceLabel || formatPrice(lot.price)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Icon name="MapPin" size={11} />
            <span>{lot.location}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Icon name="Star" size={11} className="text-yellow-400 fill-yellow-400" />
            <span>{lot.seller.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
