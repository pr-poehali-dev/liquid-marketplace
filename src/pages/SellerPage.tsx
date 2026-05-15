import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { MOCK_LOTS } from '@/data/mockLots';
import { CATEGORIES } from '@/data/categories';

export default function SellerPage() {
  const [tab, setTab] = useState<'lots' | 'create' | 'stats'>('lots');
  const [form, setForm] = useState({
    title: '', description: '', price: '', category: '', subcategory: '', type: 'product', location: '',
  });

  const myLots = MOCK_LOTS.slice(0, 3);
  const selectedCat = CATEGORIES.find((c) => c.id === form.category);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-2xl font-black text-foreground mb-5">Кабинет продавца</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-secondary p-1 rounded-xl">
        {([
          { id: 'lots', label: 'Мои лоты' },
          { id: 'create', label: '+ Новый лот' },
          { id: 'stats', label: 'Статистика' },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t.id ? 'bg-card text-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Lots */}
      {tab === 'lots' && (
        <div className="space-y-3">
          {myLots.map((lot) => (
            <div key={lot.id} className="bg-card border border-border rounded-2xl p-4 flex gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary shrink-0">
                {lot.images[0] && <img src={lot.images[0]} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground line-clamp-1 mb-1">{lot.title}</p>
                <p className="text-primary font-bold text-sm mb-2">{lot.price.toLocaleString('ru')} ₽</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-green-400/10 text-green-400 px-2 py-0.5 rounded-full font-medium">Активен</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="Eye" size={11} />
                    {lot.views}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <button className="text-xs text-primary font-medium hover:underline">Ред.</button>
                <button className="text-xs text-destructive font-medium hover:underline">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create */}
      {tab === 'create' && (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-foreground">Новый лот</h2>

          {/* Type */}
          <div className="flex gap-2">
            {(['product', 'service'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setForm({ ...form, type: t })}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-colors ${form.type === t ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}
              >
                {t === 'product' ? '📦 Товар' : '🔧 Услуга'}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Название</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Например: iPhone 14 Pro 256GB"
              className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Описание</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Опишите ваш товар или услугу..."
              className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground resize-none h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Цена, ₽</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="50 000"
                className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Город</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Москва"
                className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Категория</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: '' })}
              className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary"
            >
              <option value="">Выберите категорию</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>

          {selectedCat && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Подкатегория</label>
              <select
                value={form.subcategory}
                onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                className="w-full mt-1 bg-secondary text-foreground text-sm px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary"
              >
                <option value="">Выберите подкатегорию</option>
                {selectedCat.children.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          )}

          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
            <Icon name="Upload" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Добавить фотографии</p>
            <p className="text-xs text-muted-foreground/60 mt-1">До 10 фото, JPG/PNG до 5 МБ</p>
          </div>

          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-colors">
            Опубликовать лот
          </button>
        </div>
      )}

      {/* Stats */}
      {tab === 'stats' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Просмотров', value: '2 794', icon: 'Eye' },
              { label: 'Бронирований', value: '14', icon: 'CalendarCheck' },
              { label: 'Отзывов', value: '12', icon: 'Star' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
                <Icon name={stat.icon} size={20} className="mx-auto mb-1 text-primary" />
                <p className="text-xl font-black text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold text-foreground mb-3">Подписка продавца</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Статус: <span className="text-green-400 font-semibold">Активна</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">Действует до 15 июня 2026</p>
              </div>
              <span className="text-primary font-black text-lg">500 ₽/мес</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
