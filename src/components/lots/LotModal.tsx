import Icon from '@/components/ui/icon';
import { Lot } from '@/data/mockLots';

interface LotModalProps {
  lot: Lot | null;
  onClose: () => void;
  onBook: (lot: Lot) => void;
}

export default function LotModal({ lot, onClose, onBook }: LotModalProps) {
  if (!lot) return null;

  const formatPrice = (price: number) => {
    if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(1)} млн ₽`;
    return price.toLocaleString('ru') + ' ₽';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Image */}
        <div className="relative h-56 bg-secondary">
          {lot.images[0] && (
            <img src={lot.images[0]} alt={lot.title} className="w-full h-full object-cover" />
          )}
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 glass rounded-full flex items-center justify-center">
            <Icon name="X" size={18} className="text-white" />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${lot.type === 'service' ? 'bg-blue-500/90 text-white' : 'bg-primary/90 text-primary-foreground'}`}>
              {lot.type === 'service' ? 'Услуга' : 'Товар'}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold text-foreground mb-1">{lot.title}</h2>
          <p className="text-2xl font-black text-primary mb-4">
            {lot.priceLabel || formatPrice(lot.price)}
          </p>

          {/* Seller */}
          <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl mb-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
              {lot.seller.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground">{lot.seller.name}</p>
              <div className="flex items-center gap-1">
                <Icon name="Star" size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-muted-foreground">{lot.seller.rating} · {lot.seller.reviewCount} отзывов</span>
              </div>
            </div>
            <button className="text-xs text-primary font-medium">Профиль</button>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{lot.description}</p>

          {/* Meta */}
          <div className="flex gap-4 text-xs text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={13} />
              <span>{lot.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={13} />
              <span>{lot.views} просмотров</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={13} />
              <span>{lot.createdAt}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => onBook(lot)}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-colors"
            >
              Забронировать
            </button>
            <button className="w-12 h-12 bg-secondary hover:bg-secondary/80 rounded-xl flex items-center justify-center transition-colors">
              <Icon name="Heart" size={20} className="text-foreground" />
            </button>
            <button className="w-12 h-12 bg-secondary hover:bg-secondary/80 rounded-xl flex items-center justify-center transition-colors">
              <Icon name="MessageCircle" size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
