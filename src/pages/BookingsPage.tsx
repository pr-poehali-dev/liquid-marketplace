import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { MOCK_BOOKINGS, BOOKING_STATUS_MAP } from '@/data/mockLots';

interface BookingsPageProps {
  onNavigate: (page: string) => void;
}

type Tab = 'active' | 'history';

export default function BookingsPage({ onNavigate }: BookingsPageProps) {
  const [tab, setTab] = useState<Tab>('active');
  const [showReview, setShowReview] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const active = MOCK_BOOKINGS.filter((b) => b.status === 'pending' || b.status === 'confirmed');
  const history = MOCK_BOOKINGS.filter((b) => b.status === 'completed' || b.status === 'cancelled' || b.status === 'rejected');

  const items = tab === 'active' ? active : history;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-2xl font-black text-foreground mb-5">Мои бронирования</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 bg-secondary p-1 rounded-xl">
        {(['active', 'history'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t ? 'bg-card text-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t === 'active' ? 'Активные' : 'История'}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Icon name="CalendarX" size={40} className="mx-auto mb-3 opacity-50" />
          <p className="font-medium">Нет бронирований</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((booking) => {
            const statusInfo = BOOKING_STATUS_MAP[booking.status as keyof typeof BOOKING_STATUS_MAP] || BOOKING_STATUS_MAP.pending;
            return (
              <div key={booking.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="flex gap-3 p-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary shrink-0">
                    {booking.lot.images[0] ? (
                      <img src={booking.lot.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="Image" size={20} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground line-clamp-2 mb-1">{booking.lot.title}</p>
                    <p className="text-primary text-sm font-bold mb-2">
                      {booking.lot.price.toLocaleString('ru')} ₽
                    </p>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>

                <div className="px-4 pb-3 border-t border-border pt-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => onNavigate('chat')}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors"
                  >
                    <Icon name="MessageCircle" size={14} />
                    Чат с продавцом
                  </button>
                  {booking.status === 'pending' && (
                    <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors">
                      <Icon name="X" size={14} />
                      Отменить
                    </button>
                  )}
                  {booking.status === 'completed' && !showReview && (
                    <button
                      onClick={() => setShowReview(booking.id)}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                    >
                      <Icon name="Star" size={14} />
                      Оставить отзыв
                    </button>
                  )}
                </div>

                {/* Review form */}
                {showReview === booking.id && (
                  <div className="px-4 pb-4 border-t border-border pt-3 animate-slide-up">
                    <p className="text-sm font-semibold text-foreground mb-2">Ваш отзыв</p>
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map((s) => (
                        <button key={s} onClick={() => setReviewRating(s)}>
                          <Icon name="Star" size={22} className={s <= reviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'} />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Расскажите о вашем опыте..."
                      className="w-full bg-secondary text-foreground text-sm px-3 py-2 rounded-xl outline-none border border-transparent focus:border-primary resize-none h-20 mb-2"
                    />
                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold py-2 rounded-xl transition-colors">
                        Отправить
                      </button>
                      <button
                        onClick={() => setShowReview(null)}
                        className="px-4 bg-secondary hover:bg-secondary/80 text-foreground text-sm rounded-xl transition-colors"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
