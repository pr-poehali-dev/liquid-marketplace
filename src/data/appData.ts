export interface Lot {
  id: string; title: string; price: number; priceLabel?: string;
  category: string; type: 'product' | 'service';
  seller: { id: string; name: string; rating: number; reviewCount: number };
  images: string[]; description: string; location: string;
  createdAt: string; status: string; isFavorite?: boolean; views: number;
}

export interface Category { id: string; name: string; icon: string; children: { id: string; name: string }[] }

export interface AuthUser { user_id: string; name: string; role: string; token: string }

export type Theme = 'night' | 'day' | 'sunset';

export const THEMES: { id: Theme; emoji: string; name: string; hero: string }[] = [
  { id: 'night',  emoji: '🌑', name: 'Ночь',  hero: 'https://cdn.poehali.dev/projects/50dbf663-5f48-42ee-8380-d0d49005bea8/files/2748104d-bbdd-4fdf-9410-046de739311f.jpg' },
  { id: 'day',    emoji: '☀️', name: 'День',  hero: 'https://cdn.poehali.dev/projects/50dbf663-5f48-42ee-8380-d0d49005bea8/files/0fc34ad0-9e2a-40f9-8080-2af42eaccfed.jpg' },
  { id: 'sunset', emoji: '🌅', name: 'Закат', hero: 'https://cdn.poehali.dev/projects/50dbf663-5f48-42ee-8380-d0d49005bea8/files/07d59aca-ed0a-4ed3-86ed-9cf315604f6e.jpg' },
];

export const CATEGORIES: Category[] = [
  { id: 'realty', name: 'Недвижимость', icon: '🏠', children: [{ id: 'apartments', name: 'Квартиры' }, { id: 'rooms', name: 'Комнаты' }, { id: 'houses', name: 'Дома, дачи' }, { id: 'land', name: 'Участки' }, { id: 'garages', name: 'Гаражи' }, { id: 'commercial', name: 'Коммерческая' }] },
  { id: 'transport', name: 'Транспорт', icon: '🚗', children: [{ id: 'cars', name: 'Автомобили' }, { id: 'motos', name: 'Мотоциклы' }, { id: 'trucks', name: 'Грузовики' }, { id: 'parts', name: 'Запчасти' }, { id: 'autoservice', name: 'Автосервисы' }] },
  { id: 'services', name: 'Услуги', icon: '🔧', children: [{ id: 'repair', name: 'Ремонт и стройка' }, { id: 'cleaning', name: 'Клининг' }, { id: 'beauty', name: 'Красота' }, { id: 'education', name: 'Обучение' }, { id: 'it', name: 'IT' }, { id: 'legal', name: 'Юридические' }, { id: 'photo', name: 'Фото и видео' }] },
  { id: 'personal', name: 'Личные вещи', icon: '👗', children: [{ id: 'clothes', name: 'Одежда' }, { id: 'watches', name: 'Часы и украшения' }, { id: 'cosmetics', name: 'Косметика' }, { id: 'sport', name: 'Спорт' }] },
  { id: 'home', name: 'Для дома', icon: '🏡', children: [{ id: 'furniture', name: 'Мебель' }, { id: 'appliances', name: 'Техника' }, { id: 'kitchen', name: 'Кухня' }, { id: 'garden', name: 'Сад' }] },
  { id: 'electronics', name: 'Электроника', icon: '📱', children: [{ id: 'phones', name: 'Смартфоны' }, { id: 'laptops', name: 'Ноутбуки' }, { id: 'tv', name: 'ТВ, аудио' }, { id: 'gaming', name: 'Игры' }] },
  { id: 'hobby', name: 'Хобби', icon: '🎸', children: [{ id: 'books', name: 'Книги' }, { id: 'music', name: 'Инструменты' }, { id: 'hunting', name: 'Охота и рыбалка' }, { id: 'antique', name: 'Антиквариат' }] },
  { id: 'animals', name: 'Животные', icon: '🐾', children: [{ id: 'cats_dogs', name: 'Кошки, собаки' }, { id: 'birds', name: 'Птицы' }, { id: 'pet_food', name: 'Корма' }] },
  { id: 'business', name: 'Для бизнеса', icon: '💼', children: [{ id: 'equipment', name: 'Оборудование' }, { id: 'office', name: 'Офис' }, { id: 'outsource', name: 'Аутсорсинг' }] },
  { id: 'jobs', name: 'Вакансии', icon: '📋', children: [{ id: 'jobs_search', name: 'Поиск работы' }, { id: 'staff_search', name: 'Поиск сотрудников' }] },
];

export const LOTS: Lot[] = [
  { id: '1', title: 'iPhone 14 Pro 256GB', price: 65000, category: 'electronics', type: 'product', seller: { id: 's1', name: 'Алексей М.', rating: 4.8, reviewCount: 47 }, images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'], description: 'Продаю iPhone 14 Pro. Без царапин, полный комплект.', location: 'Москва', createdAt: '2026-05-14', status: 'active', views: 342 },
  { id: '2', title: 'Ремонт квартир под ключ', price: 3500, priceLabel: 'от 3 500 ₽/м²', category: 'services', type: 'service', seller: { id: 's2', name: 'СтройМастер', rating: 4.9, reviewCount: 128 }, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'], description: 'Профессиональный ремонт квартир. Опыт 12 лет.', location: 'Москва', createdAt: '2026-05-13', status: 'active', views: 891 },
  { id: '3', title: '2-комнатная квартира, 58 м², Замоскворечье', price: 14500000, category: 'realty', type: 'product', seller: { id: 's3', name: 'Мария К.', rating: 4.7, reviewCount: 23 }, images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'], description: 'Светлая квартира с видом на набережную.', location: 'Москва, ЦАО', createdAt: '2026-05-12', status: 'active', views: 1240 },
  { id: '4', title: 'MacBook Pro 16" M3 Max', price: 289000, category: 'electronics', type: 'product', seller: { id: 's4', name: 'TechStore PRO', rating: 4.6, reviewCount: 89 }, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'], description: 'MacBook Pro 16", M3 Max, 48 ГБ ОЗУ.', location: 'Санкт-Петербург', createdAt: '2026-05-11', status: 'active', views: 567 },
  { id: '5', title: 'Юридические услуги для бизнеса', price: 5000, priceLabel: 'от 5 000 ₽/час', category: 'services', type: 'service', seller: { id: 's5', name: 'Адвокат Петров', rating: 5.0, reviewCount: 64 }, images: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400'], description: 'Регистрация ООО, договоры. Стаж 15 лет.', location: 'Москва', createdAt: '2026-05-10', status: 'active', views: 423 },
  { id: '6', title: 'Toyota Camry 2022, 2.5 Hybrid', price: 3250000, category: 'transport', type: 'product', seller: { id: 's6', name: 'AutoElite', rating: 4.5, reviewCount: 31 }, images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400'], description: 'Один владелец, пробег 38 000 км.', location: 'Казань', createdAt: '2026-05-09', status: 'active', views: 789 },
  { id: '7', title: 'Профессиональная фотосессия', price: 8000, priceLabel: '8 000 ₽/сессия', category: 'services', type: 'service', seller: { id: 's7', name: 'Фотограф Анна', rating: 4.9, reviewCount: 112 }, images: ['https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400'], description: 'Портретная, деловая съёмка. Обработка 50+ фото.', location: 'Москва', createdAt: '2026-05-08', status: 'active', views: 345 },
  { id: '8', title: 'Диван угловой, б/у 1 год', price: 25000, category: 'home', type: 'product', seller: { id: 's8', name: 'Игорь Р.', rating: 4.3, reviewCount: 8 }, images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'], description: 'Угловой диван серого цвета, 280×180 см.', location: 'Екатеринбург', createdAt: '2026-05-07', status: 'active', views: 198 },
];

export const BOOKINGS = [
  { id: 'b1', lot: LOTS[0], status: 'pending', createdAt: '2026-05-15', message: 'Хочу забронировать.' },
  { id: 'b2', lot: LOTS[1], status: 'confirmed', createdAt: '2026-05-12', message: 'Нужен ремонт 65 м².' },
  { id: 'b3', lot: LOTS[5], status: 'completed', createdAt: '2026-04-20', message: 'Готов к сделке.' },
];

export const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: 'Ожидает подтверждения', color: 'text-yellow-400 bg-yellow-400/10' },
  confirmed: { label: 'Подтверждено', color: 'text-green-400 bg-green-400/10' },
  rejected: { label: 'Отклонено', color: 'text-red-400 bg-red-400/10' },
  completed: { label: 'Завершено', color: 'text-blue-400 bg-blue-400/10' },
  cancelled: { label: 'Отменено', color: 'text-gray-400 bg-gray-400/10' },
};

export const MOCK_USERS = [
  { id: 'u1', name: 'Алина Иванова', email: 'alina@example.com', role: 'buyer', status: 'active', lots: 0, bookings: 3 },
  { id: 'u2', name: 'СтройМастер', email: 'master@stroy.ru', role: 'seller', status: 'active', lots: 12, bookings: 89 },
  { id: 'u3', name: 'Алексей М.', email: 'alex@mail.ru', role: 'seller', status: 'blocked', lots: 4, bookings: 17 },
  { id: 'u4', name: 'AutoElite', email: 'auto@elite.ru', role: 'seller', status: 'active', lots: 28, bookings: 145 },
];

export const AUTH_URL = 'https://functions.poehali.dev/46b78309-012f-4fb6-aebc-43255d00f5fc';
