import Icon from '@/components/ui/icon';
import { type Lot } from '@/data/appData';

export function fmtPrice(price: number): string {
  if (price >= 1000000) return `${(price / 1000000).toFixed(1)} млн ₽`;
  if (price >= 1000) return `${Math.round(price / 1000)} 000 ₽`;
  return `${price} ₽`;
}

export function LotCard({ lot, onOpen, onToggleFavorite }: { lot: Lot; onOpen: (l: Lot) => void; onToggleFavorite?: (id: string) => void }) {
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

export function LotModal({ lot, onClose, onBook }: { lot: Lot | null; onClose: () => void; onBook: (l: Lot) => void }) {
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
