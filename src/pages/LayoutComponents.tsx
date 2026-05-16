import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { type AuthUser, type Theme, THEMES, AUTH_URL } from '@/data/appData';

export function Header({ page, nav, user, onAuthClick }: { page: string; nav: (p: string) => void; user: AuthUser | null; onAuthClick: () => void }) {
  const initials = user ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : null;
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-background/80 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <button onClick={() => nav('home')} className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"><span className="text-primary-foreground font-black text-sm">Л</span></div>
          <span className="font-black text-xl tracking-tight text-foreground">ЛИКВИД</span>
        </button>
        <button onClick={() => nav('search')} className="flex-1 max-w-xl bg-secondary/60 hover:bg-secondary text-muted-foreground rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 transition-colors text-left">
          <Icon name="Search" size={16} /><span>Поиск товаров и услуг...</span>
        </button>
        <nav className="flex items-center gap-1">
          {[{ id: 'favorites', icon: 'Heart' }, { id: 'chat', icon: 'MessageCircle', badge: 2 }, { id: 'notifications', icon: 'Bell', badge: 3 }].map((item) => (
            <button key={item.id} onClick={() => nav(item.id)} className={`relative p-2.5 rounded-xl transition-colors ${page === item.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
              <Icon name={item.icon} size={20} />
              {item.badge && <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{item.badge}</span>}
            </button>
          ))}
          {user ? (
            <button onClick={() => nav('profile')} className={`ml-1 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${page === 'profile' ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary hover:bg-primary/30'}`} title={user.name}>
              {initials}
            </button>
          ) : (
            <button onClick={onAuthClick} className="ml-1 flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold rounded-xl transition-colors">
              <Icon name="LogIn" size={15} /><span className="hidden sm:block">Войти</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export function SubNav({ page, nav }: { page: string; nav: (p: string) => void }) {
  const items = [
    { id: 'home', label: 'Главная' }, { id: 'search', label: 'Поиск' }, { id: 'categories', label: 'Категории' },
    { id: 'lots', label: 'Все лоты' }, { id: 'bookings', label: 'Бронирования' }, { id: 'favorites', label: 'Избранное' },
    { id: 'chat', label: 'Чат' }, { id: 'notifications', label: 'Уведомления' }, { id: 'seller', label: '+ Разместить' }, { id: 'admin', label: '⚙ Админ' },
  ];
  return (
    <div className="hidden md:block sticky top-16 z-40 backdrop-blur bg-background/80 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 py-1.5 overflow-x-auto">
          {items.map((item) => (
            <button key={item.id} onClick={() => nav(item.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${page === item.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BottomNav({ page, nav }: { page: string; nav: (p: string) => void }) {
  const items = [{ id: 'home', icon: 'Home', label: 'Главная' }, { id: 'search', icon: 'Search', label: 'Поиск' }, { id: 'lots', icon: 'Tag', label: 'Лоты' }, { id: 'bookings', icon: 'CalendarCheck', label: 'Брони' }, { id: 'profile', icon: 'User', label: 'Профиль' }];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur bg-background/90 border-t border-border/60 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => nav(item.id)} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${active ? 'text-primary' : 'text-muted-foreground'}`}>
              <Icon name={item.icon} size={22} />
              <span className={`text-[10px] font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function ThemeSwitcher({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm p-1 rounded-xl border border-white/10">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.name}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            theme === t.id
              ? 'bg-white/20 text-white shadow-sm scale-105'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <span>{t.emoji}</span>
          <span className="hidden sm:block">{t.name}</span>
        </button>
      ))}
    </div>
  );
}

export function AuthModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (u: AuthUser) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setError(''); setLoading(true);
    const path = mode === 'login' ? '/login' : '/register';
    const body = mode === 'login'
      ? { email: form.email, password: form.password }
      : { email: form.email, password: form.password, name: form.name, role: form.role };
    let statusOk = false;
    fetch(AUTH_URL + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then((res) => { statusOk = res.ok; return res.json(); })
      .then((data: Record<string, string>) => {
        if (!statusOk) { setError(data['error'] || 'Ошибка'); }
        else { onSuccess({ user_id: data['user_id'] || '', name: data['name'] || '', role: data['role'] || 'buyer', token: data['token'] || '' }); }
      })
      .catch(() => setError('Ошибка соединения'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
          <Icon name="X" size={18} />
        </button>
        <h2 className="text-xl font-black text-foreground mb-1">{mode === 'login' ? 'Войти в ЛИКВИД' : 'Регистрация'}</h2>
        <p className="text-sm text-muted-foreground mb-6">{mode === 'login' ? 'Добро пожаловать назад!' : 'Создайте аккаунт бесплатно'}</p>
        <div className="flex gap-2 mb-5 bg-secondary p-1 rounded-xl">
          {(['login', 'register'] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setError(''); }} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === m ? 'bg-card text-foreground shadow' : 'text-muted-foreground'}`}>
              {m === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ваше имя</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Алина Иванова" className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground" />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Пароль</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground" />
          </div>
          {mode === 'register' && (
            <div className="flex gap-2">
              {[{ v: 'buyer', l: '🛍 Покупатель' }, { v: 'seller', l: '🏪 Продавец' }].map((r) => (
                <button key={r.v} onClick={() => setForm({ ...form, role: r.v })} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-colors ${form.role === r.v ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>{r.l}</button>
              ))}
            </div>
          )}
        </div>
        {error && <p className="mt-3 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-xl">{error}</p>}
        <button onClick={submit} disabled={loading} className="w-full mt-5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
          {loading && <Icon name="Loader2" size={16} className="animate-spin" />}
          {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
        </button>
      </div>
    </div>
  );
}
