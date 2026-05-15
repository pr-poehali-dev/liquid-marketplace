import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { MOCK_LOTS } from '@/data/mockLots';
import { CATEGORIES } from '@/data/categories';

type AdminTab = 'dashboard' | 'users' | 'lots' | 'categories' | 'bookings' | 'reviews' | 'subscriptions' | 'reports';

const MOCK_USERS = [
  { id: 'u1', name: 'Алина Иванова', email: 'alina@example.com', role: 'buyer', status: 'active', joined: '2025-05-10', lots: 0, bookings: 3 },
  { id: 'u2', name: 'СтройМастер', email: 'master@stroy.ru', role: 'seller', status: 'active', joined: '2025-03-15', lots: 12, bookings: 89 },
  { id: 'u3', name: 'Алексей М.', email: 'alex@mail.ru', role: 'seller', status: 'blocked', joined: '2025-01-20', lots: 4, bookings: 17 },
  { id: 'u4', name: 'AutoElite', email: 'auto@elite.ru', role: 'seller', status: 'active', joined: '2025-04-01', lots: 28, bookings: 145 },
];

const STATS = [
  { label: 'Пользователей', value: '1 248', icon: 'Users', color: 'text-blue-400 bg-blue-400/10' },
  { label: 'Активных лотов', value: '4 891', icon: 'Tag', color: 'text-green-400 bg-green-400/10' },
  { label: 'Бронирований', value: '892', icon: 'CalendarCheck', color: 'text-primary bg-primary/10' },
  { label: 'Доход (мес.)', value: '47 500 ₽', icon: 'TrendingUp', color: 'text-yellow-400 bg-yellow-400/10' },
];

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('dashboard');
  const [userFilter, setUserFilter] = useState('all');
  const [subscriptionEnabled, setSubscriptionEnabled] = useState(true);
  const [subPrice, setSubPrice] = useState('500');

  const TABS: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'users', label: 'Пользователи', icon: 'Users' },
    { id: 'lots', label: 'Лоты', icon: 'Tag' },
    { id: 'categories', label: 'Категории', icon: 'Grid3X3' },
    { id: 'bookings', label: 'Бронирования', icon: 'CalendarCheck' },
    { id: 'reviews', label: 'Отзывы', icon: 'Star' },
    { id: 'subscriptions', label: 'Подписки', icon: 'CreditCard' },
    { id: 'reports', label: 'Отчёты', icon: 'FileBarChart' },
  ];

  const filteredUsers = MOCK_USERS.filter((u) => {
    if (userFilter === 'all') return true;
    if (userFilter === 'seller') return u.role === 'seller';
    if (userFilter === 'buyer') return u.role === 'buyer';
    if (userFilter === 'blocked') return u.status === 'blocked';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
          <Icon name="ShieldCheck" size={18} className="text-primary" />
        </div>
        <h1 className="text-2xl font-black text-foreground">Панель администратора</h1>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-52 shrink-0 gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${tab === t.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
            </button>
          ))}
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden -mx-4 px-4 mb-4 w-full overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${tab === t.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Dashboard */}
          {tab === 'dashboard' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                      <Icon name={s.icon} size={20} />
                    </div>
                    <p className="text-2xl font-black text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-4">Активность за неделю</h3>
                <div className="flex items-end gap-2 h-32">
                  {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-primary/30 rounded-t-md relative"
                        style={{ height: `${h}%` }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-md" style={{ height: '30%' }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card border border-border rounded-2xl p-4">
                  <h4 className="text-sm font-bold text-foreground mb-3">Лоты на модерации</h4>
                  <p className="text-3xl font-black text-yellow-400">7</p>
                  <button className="mt-2 text-xs text-primary font-medium hover:underline" onClick={() => setTab('lots')}>
                    Проверить →
                  </button>
                </div>
                <div className="bg-card border border-border rounded-2xl p-4">
                  <h4 className="text-sm font-bold text-foreground mb-3">Жалоб на отзывы</h4>
                  <p className="text-3xl font-black text-red-400">3</p>
                  <button className="mt-2 text-xs text-primary font-medium hover:underline" onClick={() => setTab('reviews')}>
                    Рассмотреть →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Users */}
          {tab === 'users' && (
            <div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {[
                  { val: 'all', label: 'Все' },
                  { val: 'seller', label: 'Продавцы' },
                  { val: 'buyer', label: 'Покупатели' },
                  { val: 'blocked', label: 'Заблокированные' },
                ].map((f) => (
                  <button
                    key={f.val}
                    onClick={() => setUserFilter(f.val)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${userFilter === f.val ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-foreground">{user.name}</p>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${user.status === 'blocked' ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'}`}>
                          {user.status === 'blocked' ? 'Заблокирован' : 'Активен'}
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                          {user.role === 'seller' ? 'Продавец' : 'Покупатель'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">Лоты: {user.lots} · Брони: {user.bookings}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button className="text-xs px-2.5 py-1 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg">
                        {user.status === 'blocked' ? 'Разблок.' : 'Блок.'}
                      </button>
                      <button className="text-xs px-2.5 py-1 bg-secondary hover:bg-secondary/80 text-muted-foreground rounded-lg">Роль</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lots */}
          {tab === 'lots' && (
            <div className="space-y-3">
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-4 flex items-center gap-3">
                <Icon name="Clock" size={18} className="text-yellow-400" />
                <p className="text-sm text-foreground">7 лотов ожидают модерации</p>
              </div>
              {MOCK_LOTS.slice(0, 5).map((lot) => (
                <div key={lot.id} className="bg-card border border-border rounded-2xl p-4 flex gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-secondary shrink-0">
                    {lot.images[0] && <img src={lot.images[0]} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground line-clamp-1">{lot.title}</p>
                    <p className="text-xs text-muted-foreground">{lot.seller.name} · {lot.location}</p>
                    <p className="text-primary font-bold text-sm">{lot.price.toLocaleString('ru')} ₽</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button className="text-xs px-2.5 py-1.5 bg-green-400/10 text-green-400 rounded-lg font-medium hover:bg-green-400/20">✓</button>
                    <button className="text-xs px-2.5 py-1.5 bg-red-400/10 text-red-400 rounded-lg font-medium hover:bg-red-400/20">✕</button>
                    <button className="text-xs px-2.5 py-1.5 bg-secondary text-muted-foreground rounded-lg font-medium">Удалить</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Categories */}
          {tab === 'categories' && (
            <div>
              <div className="flex justify-end mb-3">
                <button className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold hover:bg-primary/90">
                  + Добавить категорию
                </button>
              </div>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{cat.children.length} подкатегорий</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs text-primary font-medium hover:underline">Ред.</button>
                      <button className="text-xs text-destructive font-medium hover:underline">Удалить</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscriptions */}
          {tab === 'subscriptions' && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-4">Настройки подписки</h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Ежемесячная плата</p>
                    <p className="text-xs text-muted-foreground">Включить обязательную оплату для продавцов</p>
                  </div>
                  <button
                    onClick={() => setSubscriptionEnabled(!subscriptionEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${subscriptionEnabled ? 'bg-primary' : 'bg-secondary'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${subscriptionEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Сумма в месяц, ₽</label>
                    <input
                      type="number"
                      value={subPrice}
                      onChange={(e) => setSubPrice(e.target.value)}
                      className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary"
                    />
                  </div>
                  <button className="mt-5 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-xl transition-colors">
                    Сохранить
                  </button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-4">Продавцы</h3>
                <div className="space-y-3">
                  {MOCK_USERS.filter((u) => u.role === 'seller').map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${user.id === 'u3' ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'}`}>
                          {user.id === 'u3' ? 'Просрочена' : 'Активна'}
                        </span>
                        <button className="text-xs text-primary font-medium hover:underline">Продлить</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reports */}
          {tab === 'reports' && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-4">Генерация отчётов</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'По продавцам', desc: 'Топ по бронированиям' },
                    { label: 'По категориям', desc: 'Популярность разделов' },
                    { label: 'По подпискам', desc: 'Доход от платформы' },
                    { label: 'Активность пользователей', desc: 'Вход, действия' },
                  ].map((r) => (
                    <div key={r.label} className="bg-secondary rounded-xl p-3">
                      <p className="text-sm font-semibold text-foreground">{r.label}</p>
                      <p className="text-xs text-muted-foreground mb-3">{r.desc}</p>
                      <div className="flex gap-1.5">
                        {['CSV', 'Excel', 'PDF'].map((fmt) => (
                          <button key={fmt} className="text-[11px] px-2 py-1 bg-card hover:bg-card/80 text-primary font-medium rounded-lg transition-colors">
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Фильтры</p>
                  <div className="grid grid-cols-3 gap-2">
                    <input type="date" className="bg-secondary text-foreground text-xs px-3 py-2 rounded-xl outline-none border border-transparent focus:border-primary" />
                    <input type="date" className="bg-secondary text-foreground text-xs px-3 py-2 rounded-xl outline-none border border-transparent focus:border-primary" />
                    <select className="bg-secondary text-foreground text-xs px-3 py-2 rounded-xl outline-none border border-transparent focus:border-primary">
                      <option>Все регионы</option>
                      <option>Москва</option>
                      <option>СПб</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          {tab === 'reviews' && (
            <div className="space-y-3">
              {[
                { id: 'r1', author: 'Покупатель', lot: 'Ремонт квартир', text: 'Отличная работа! Очень доволен результатом.', rating: 5, flagged: false },
                { id: 'r2', author: 'Аноним', lot: 'iPhone 14 Pro', text: 'Телефон не соответствовал описанию, продавец обманул.', rating: 1, flagged: true },
                { id: 'r3', author: 'Клиент', lot: 'Toyota Camry', text: 'Машина в хорошем состоянии, сделка прошла гладко.', rating: 4, flagged: false },
              ].map((review) => (
                <div key={review.id} className={`bg-card border rounded-2xl p-4 ${review.flagged ? 'border-red-400/30' : 'border-border'}`}>
                  {review.flagged && (
                    <div className="flex items-center gap-1.5 mb-2 text-red-400 text-xs font-semibold">
                      <Icon name="Flag" size={12} />
                      Жалоба
                    </div>
                  )}
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-semibold text-foreground">{review.author}</p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} name="Star" size={12} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Лот: {review.lot}</p>
                  <p className="text-sm text-foreground mb-3">{review.text}</p>
                  <button className="text-xs px-3 py-1.5 bg-red-400/10 text-red-400 rounded-lg font-medium hover:bg-red-400/20 transition-colors">
                    Удалить отзыв
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Bookings admin */}
          {tab === 'bookings' && (
            <div className="space-y-3">
              {[
                { id: 'ab1', buyer: 'Алина Иванова', seller: 'СтройМастер', lot: 'Ремонт квартир', status: 'confirmed', date: '2026-05-15' },
                { id: 'ab2', buyer: 'Клиент 2', seller: 'Алексей М.', lot: 'iPhone 14 Pro', status: 'pending', date: '2026-05-14' },
                { id: 'ab3', buyer: 'Клиент 3', seller: 'AutoElite', lot: 'Toyota Camry', status: 'completed', date: '2026-05-10' },
              ].map((b) => (
                <div key={b.id} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold text-sm text-foreground">{b.lot}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      b.status === 'confirmed' ? 'bg-green-400/10 text-green-400' :
                      b.status === 'pending' ? 'bg-yellow-400/10 text-yellow-400' :
                      'bg-blue-400/10 text-blue-400'
                    }`}>
                      {b.status === 'confirmed' ? 'Подтверждено' : b.status === 'pending' ? 'Ожидает' : 'Завершено'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Покупатель: {b.buyer}</p>
                  <p className="text-xs text-muted-foreground">Продавец: {b.seller}</p>
                  <p className="text-xs text-muted-foreground mb-3">Дата: {b.date}</p>
                  <select className="text-xs bg-secondary text-foreground px-3 py-1.5 rounded-lg outline-none border border-transparent focus:border-primary">
                    <option>Сменить статус...</option>
                    <option>pending</option>
                    <option>confirmed</option>
                    <option>rejected</option>
                    <option>completed</option>
                    <option>cancelled</option>
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
