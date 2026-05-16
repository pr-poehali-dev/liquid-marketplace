import { useState } from 'react';
import { MOCK_USERS, CATEGORIES, LOTS } from '@/data/appData';
import * as LucideIcons from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Icon(props: Record<string, any>) {
  const { name, ...rest } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const C = (LucideIcons as Record<string, any>)[name];
  if (!C) return null;
  return <C {...rest} />;
}

export default function AdminPage() {
  const [tab, setTab] = useState('dashboard');
  const [userFilter, setUserFilter] = useState('all');
  const [subEnabled, setSubEnabled] = useState(true);
  const [subPrice, setSubPrice] = useState('500');
  const [catExpanded, setCatExpanded] = useState<string | null>(null);

  const TABS = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'users', label: 'Пользователи', icon: 'Users' },
    { id: 'lots', label: 'Лоты', icon: 'Tag' },
    { id: 'categories', label: 'Категории', icon: 'Grid3X3' },
    { id: 'bookings', label: 'Бронирования', icon: 'CalendarCheck' },
    { id: 'reviews', label: 'Отзывы', icon: 'Star' },
    { id: 'subscriptions', label: 'Подписки', icon: 'CreditCard' },
    { id: 'reports', label: 'Отчёты', icon: 'FileBarChart' },
  ];

  const filteredUsers = MOCK_USERS.filter((u) =>
    userFilter === 'all' ||
    (userFilter === 'seller' && u.role === 'seller') ||
    (userFilter === 'buyer' && u.role === 'buyer') ||
    (userFilter === 'blocked' && u.status === 'blocked')
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
          <Icon name="ShieldCheck" size={18} className="text-primary" />
        </div>
        <h1 className="text-2xl font-black">Панель администратора</h1>
      </div>

      <div className="flex gap-6">
        {/* Sidebar desktop */}
        <aside className="hidden md:flex flex-col w-52 shrink-0 gap-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${tab === t.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
              <Icon name={t.icon} size={16} />{t.label}
            </button>
          ))}
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden w-full overflow-x-auto mb-4">
          <div className="flex gap-2 pb-2">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium ${tab === t.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Dashboard */}
          {tab === 'dashboard' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Пользователей', value: '1 248', icon: 'Users', color: 'text-blue-400 bg-blue-400/10' },
                  { label: 'Лотов', value: '4 891', icon: 'Tag', color: 'text-green-400 bg-green-400/10' },
                  { label: 'Бронирований', value: '892', icon: 'CalendarCheck', color: 'text-primary bg-primary/10' },
                  { label: 'Доход/мес', value: '47 500 ₽', icon: 'TrendingUp', color: 'text-yellow-400 bg-yellow-400/10' },
                ].map((s) => (
                  <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                      <Icon name={s.icon} size={20} />
                    </div>
                    <p className="text-2xl font-black">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Активность за неделю</h3>
                <div className="flex items-end gap-2 h-32">
                  {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-primary/20 rounded-t-md relative" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-md" style={{ height: '40%' }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{['Пн','Вт','Ср','Чт','Пт','Сб','Вс'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Users */}
          {tab === 'users' && (
            <div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {[{ v: 'all', l: 'Все' }, { v: 'seller', l: 'Продавцы' }, { v: 'buyer', l: 'Покупатели' }, { v: 'blocked', l: 'Заблокированные' }].map((f) => (
                  <button key={f.v} onClick={() => setUserFilter(f.v)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium ${userFilter === f.v ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    {f.l}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold shrink-0">{u.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm">{u.name}</p>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${u.status === 'blocked' ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'}`}>
                          {u.status === 'blocked' ? 'Заблокирован' : 'Активен'}
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                          {u.role === 'seller' ? 'Продавец' : 'Покупатель'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{u.email} · Лоты: {u.lots} · Брони: {u.bookings}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button className="text-xs px-2.5 py-1 bg-secondary text-foreground rounded-lg">{u.status === 'blocked' ? 'Разблок.' : 'Блок.'}</button>
                      <button className="text-xs px-2.5 py-1 bg-secondary text-muted-foreground rounded-lg">Роль</button>
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
                <p className="text-sm">7 лотов ожидают модерации</p>
              </div>
              {LOTS.slice(0, 5).map((lot) => (
                <div key={lot.id} className="bg-card border border-border rounded-2xl p-4 flex gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-secondary shrink-0">
                    {lot.images[0] && <img src={lot.images[0]} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm line-clamp-1">{lot.title}</p>
                    <p className="text-xs text-muted-foreground">{lot.seller.name} · {lot.location}</p>
                    <p className="text-primary font-bold text-sm">{lot.price.toLocaleString('ru')} ₽</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button className="text-xs px-2.5 py-1.5 bg-green-400/10 text-green-400 rounded-lg font-medium">✓</button>
                    <button className="text-xs px-2.5 py-1.5 bg-red-400/10 text-red-400 rounded-lg font-medium">✕</button>
                    <button className="text-xs px-2.5 py-1.5 bg-secondary text-muted-foreground rounded-lg">Удалить</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Categories */}
          {tab === 'categories' && (
            <div>
              <div className="flex justify-end mb-3">
                <button className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold">+ Добавить</button>
              </div>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3">
                      <button className="flex items-center gap-3 flex-1" onClick={() => setCatExpanded(catExpanded === cat.id ? null : cat.id)}>
                        <span className="text-xl">{cat.icon}</span>
                        <div className="text-left">
                          <p className="font-semibold text-sm">{cat.name}</p>
                          <p className="text-xs text-muted-foreground">{cat.children.length} подкатегорий</p>
                        </div>
                      </button>
                      <div className="flex gap-2">
                        <button className="text-xs text-primary font-medium">Ред.</button>
                        <button className="text-xs text-destructive font-medium">Удалить</button>
                      </div>
                    </div>
                    {catExpanded === cat.id && (
                      <div className="border-t border-border px-4 py-2">
                        {cat.children.map((sub) => (
                          <div key={sub.id} className="flex items-center justify-between py-1.5">
                            <span className="text-sm text-muted-foreground">{sub.name}</span>
                            <div className="flex gap-2">
                              <button className="text-xs text-primary">Ред.</button>
                              <button className="text-xs text-destructive">Удалить</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscriptions */}
          {tab === 'subscriptions' && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Настройки подписки</h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium">Ежемесячная плата</p>
                    <p className="text-xs text-muted-foreground">Для продавцов</p>
                  </div>
                  <button onClick={() => setSubEnabled(!subEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${subEnabled ? 'bg-primary' : 'bg-secondary'}`}>
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${subEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Сумма, ₽/мес</label>
                    <input type="number" value={subPrice} onChange={(e) => setSubPrice(e.target.value)}
                      className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-2.5 rounded-xl outline-none" />
                  </div>
                  <button className="mt-5 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl">Сохранить</button>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">Продавцы</h3>
                {MOCK_USERS.filter((u) => u.role === 'seller').map((u) => (
                  <div key={u.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.id === 'u3' ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'}`}>
                        {u.id === 'u3' ? 'Просрочена' : 'Активна'}
                      </span>
                      <button className="text-xs text-primary">Продлить</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports */}
          {tab === 'reports' && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold mb-4">Генерация отчётов</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'По продавцам', desc: 'Топ по бронированиям' },
                  { label: 'По категориям', desc: 'Популярность' },
                  { label: 'По подпискам', desc: 'Доход платформы' },
                  { label: 'Активность', desc: 'Действия пользователей' },
                ].map((r) => (
                  <div key={r.label} className="bg-secondary rounded-xl p-3">
                    <p className="text-sm font-semibold">{r.label}</p>
                    <p className="text-xs text-muted-foreground mb-3">{r.desc}</p>
                    <div className="flex gap-1.5">
                      {['CSV', 'Excel', 'PDF'].map((fmt) => (
                        <button key={fmt} className="text-[11px] px-2 py-1 bg-card text-primary font-medium rounded-lg">{fmt}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Фильтры</p>
                <div className="grid grid-cols-3 gap-2">
                  <input type="date" className="bg-secondary text-foreground text-xs px-3 py-2 rounded-xl outline-none" />
                  <input type="date" className="bg-secondary text-foreground text-xs px-3 py-2 rounded-xl outline-none" />
                  <select className="bg-secondary text-foreground text-xs px-3 py-2 rounded-xl outline-none">
                    <option>Все регионы</option><option>Москва</option><option>СПб</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          {tab === 'reviews' && (
            <div className="space-y-3">
              {[
                { id: 'r1', author: 'Покупатель', lot: 'Ремонт квартир', text: 'Отличная работа!', rating: 5, flagged: false },
                { id: 'r2', author: 'Клиент', lot: 'iPhone 14 Pro', text: 'Телефон не соответствовал описанию.', rating: 1, flagged: true },
              ].map((rev) => (
                <div key={rev.id} className={`bg-card border rounded-2xl p-4 ${rev.flagged ? 'border-red-400/30' : 'border-border'}`}>
                  {rev.flagged && (
                    <div className="flex items-center gap-1.5 mb-2 text-red-400 text-xs font-semibold">
                      <Icon name="Flag" size={12} />Жалоба
                    </div>
                  )}
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-semibold">{rev.author}</p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} name="Star" size={12} className={i < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Лот: {rev.lot}</p>
                  <p className="text-sm mb-3">{rev.text}</p>
                  <button className="text-xs px-3 py-1.5 bg-red-400/10 text-red-400 rounded-lg font-medium">Удалить</button>
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
              ].map((b) => (
                <div key={b.id} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold text-sm">{b.lot}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.status === 'confirmed' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                      {b.status === 'confirmed' ? 'Подтверждено' : 'Ожидает'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Покупатель: {b.buyer} · Продавец: {b.seller} · {b.date}</p>
                  <select className="mt-3 text-xs bg-secondary text-foreground px-3 py-1.5 rounded-lg outline-none">
                    <option>Сменить статус...</option>
                    {['pending', 'confirmed', 'rejected', 'completed', 'cancelled'].map((s) => <option key={s}>{s}</option>)}
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