import Icon from '@/components/ui/icon';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const MOCK_USER = {
  name: 'Алина Иванова',
  email: 'alina@example.com',
  phone: '+7 (912) 345-67-89',
  avatar: '',
  city: 'Москва',
  joinedAt: 'Май 2025',
  rating: 4.7,
  reviewCount: 12,
};

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      {/* Avatar & name */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4 text-center">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-primary/30">
          <span className="text-3xl font-black text-primary">{MOCK_USER.name.charAt(0)}</span>
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">{MOCK_USER.name}</h2>
        <p className="text-muted-foreground text-sm mb-1">{MOCK_USER.city}</p>
        <p className="text-muted-foreground text-xs">На ЛИКВИД с {MOCK_USER.joinedAt}</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          <Icon name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-foreground">{MOCK_USER.rating}</span>
          <span className="text-muted-foreground text-xs">({MOCK_USER.reviewCount} отзывов)</span>
        </div>
        <button className="mt-4 text-sm text-primary font-medium hover:underline flex items-center gap-1 mx-auto">
          <Icon name="Camera" size={14} />
          Изменить фото
        </button>
      </div>

      {/* Contact info */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-4">
        <h3 className="font-bold text-foreground mb-3">Контакты</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Icon name="Mail" size={16} />
              <span>{MOCK_USER.email}</span>
            </div>
            <button className="text-xs text-primary">Изменить</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Icon name="Phone" size={16} />
              <span>{MOCK_USER.phone}</span>
            </div>
            <button className="text-xs text-primary">Изменить</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Icon name="MapPin" size={16} />
              <span>{MOCK_USER.city}</span>
            </div>
            <button className="text-xs text-primary">Изменить</button>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
        {[
          { icon: 'CalendarCheck', label: 'Мои бронирования', page: 'bookings', count: 3 },
          { icon: 'Heart', label: 'Избранное', page: 'favorites', count: 5 },
          { icon: 'Tag', label: 'Мои лоты', page: 'seller', count: 2 },
          { icon: 'MessageCircle', label: 'Сообщения', page: 'chat', count: 2 },
          { icon: 'Bell', label: 'Уведомления', page: 'notifications', count: 3 },
        ].map((item, i, arr) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`w-full flex items-center justify-between px-5 py-4 hover:bg-secondary transition-colors ${i < arr.length - 1 ? 'border-b border-border' : ''}`}
          >
            <div className="flex items-center gap-3">
              <Icon name={item.icon} size={18} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.count > 0 && (
                <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {[
          { icon: 'Settings', label: 'Настройки', action: () => {} },
          { icon: 'HelpCircle', label: 'Поддержка', action: () => {} },
          { icon: 'LogOut', label: 'Выйти', action: () => {} },
        ].map((item, i, arr) => (
          <button
            key={item.label}
            onClick={item.action}
            className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-secondary transition-colors ${i < arr.length - 1 ? 'border-b border-border' : ''} ${item.label === 'Выйти' ? 'text-destructive' : 'text-foreground'}`}
          >
            <Icon name={item.icon} size={18} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
