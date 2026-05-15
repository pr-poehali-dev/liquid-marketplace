import { useState } from 'react';
import Icon from '@/components/ui/icon';

const MOCK_NOTIFS = [
  { id: 'n1', type: 'booking', title: 'Бронирование подтверждено', text: 'СтройМастер подтвердил вашу заявку на ремонт квартир.', time: '5 мин назад', read: false },
  { id: 'n2', type: 'message', title: 'Новое сообщение', text: 'Алексей М.: "Телефон в отличном состоянии, приезжайте смотреть"', time: '2 часа назад', read: false },
  { id: 'n3', type: 'review', title: 'Новый отзыв', text: 'Покупатель оставил отзыв на ваш лот', time: 'Вчера, 18:00', read: false },
  { id: 'n4', type: 'booking', title: 'Запрос на бронирование', text: 'Новый запрос на бронирование вашего лота "iPhone 14 Pro"', time: 'Вчера, 14:30', read: true },
  { id: 'n5', type: 'system', title: 'Лот прошёл модерацию', text: 'Ваш лот "Диван угловой" одобрен и теперь виден всем пользователям.', time: '2 дня назад', read: true },
];

const ICON_MAP: Record<string, { icon: string; color: string }> = {
  booking: { icon: 'CalendarCheck', color: 'text-green-400 bg-green-400/10' },
  message: { icon: 'MessageCircle', color: 'text-blue-400 bg-blue-400/10' },
  review: { icon: 'Star', color: 'text-yellow-400 bg-yellow-400/10' },
  system: { icon: 'Bell', color: 'text-primary bg-primary/10' },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);

  const markAllRead = () => setNotifs(notifs.map((n) => ({ ...n, read: true })));

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-black text-foreground">Уведомления</h1>
        <button onClick={markAllRead} className="text-xs text-primary font-medium hover:underline">
          Прочитать все
        </button>
      </div>

      <div className="space-y-2">
        {notifs.map((notif) => {
          const meta = ICON_MAP[notif.type] || ICON_MAP.system;
          return (
            <div
              key={notif.id}
              className={`bg-card border rounded-2xl p-4 flex gap-3 transition-colors ${notif.read ? 'border-border' : 'border-primary/30 bg-primary/5'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.color}`}>
                <Icon name={meta.icon} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-semibold ${notif.read ? 'text-foreground' : 'text-foreground'}`}>{notif.title}</p>
                  {!notif.read && <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.text}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1.5">{notif.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
