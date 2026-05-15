export interface Lot {
  id: string;
  title: string;
  price: number;
  priceLabel?: string;
  category: string;
  subcategory: string;
  type: 'product' | 'service';
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
  };
  images: string[];
  description: string;
  location: string;
  createdAt: string;
  status: 'active' | 'moderation' | 'rejected' | 'sold';
  isFavorite?: boolean;
  views: number;
}

export const MOCK_LOTS: Lot[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro 256GB, состояние отличное',
    price: 65000,
    category: 'electronics',
    subcategory: 'phones',
    type: 'product',
    seller: { id: 's1', name: 'Алексей М.', avatar: '', rating: 4.8, reviewCount: 47 },
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
    description: 'Продаю iPhone 14 Pro в отличном состоянии. Без царапин, полный комплект.',
    location: 'Москва',
    createdAt: '2026-05-14',
    status: 'active',
    views: 342,
  },
  {
    id: '2',
    title: 'Ремонт квартир под ключ',
    price: 3500,
    priceLabel: 'от 3 500 ₽/м²',
    category: 'services',
    subcategory: 'repair',
    type: 'service',
    seller: { id: 's2', name: 'СтройМастер', avatar: '', rating: 4.9, reviewCount: 128 },
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    description: 'Профессиональный ремонт квартир. Опыт 12 лет, гарантия на работы.',
    location: 'Москва',
    createdAt: '2026-05-13',
    status: 'active',
    views: 891,
  },
  {
    id: '3',
    title: '2-комнатная квартира, 58 м², Замоскворечье',
    price: 14500000,
    category: 'realty',
    subcategory: 'apartments',
    type: 'product',
    seller: { id: 's3', name: 'Мария К.', avatar: '', rating: 4.7, reviewCount: 23 },
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
    description: 'Светлая квартира с видом на набережную. Евроремонт, встроенная кухня.',
    location: 'Москва, ЦАО',
    createdAt: '2026-05-12',
    status: 'active',
    views: 1240,
  },
  {
    id: '4',
    title: 'MacBook Pro 16" M3 Max, 2024',
    price: 289000,
    category: 'electronics',
    subcategory: 'laptops',
    type: 'product',
    seller: { id: 's4', name: 'TechStore PRO', avatar: '', rating: 4.6, reviewCount: 89 },
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
    description: 'Ноутбук Apple MacBook Pro 16 дюймов, процессор M3 Max, 48 ГБ ОЗУ.',
    location: 'Санкт-Петербург',
    createdAt: '2026-05-11',
    status: 'active',
    views: 567,
  },
  {
    id: '5',
    title: 'Юридические услуги для бизнеса',
    price: 5000,
    priceLabel: 'от 5 000 ₽/час',
    category: 'services',
    subcategory: 'legal',
    type: 'service',
    seller: { id: 's5', name: 'Адвокат Петров', avatar: '', rating: 5.0, reviewCount: 64 },
    images: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400'],
    description: 'Регистрация ООО, договоры, судебное представительство. Стаж 15 лет.',
    location: 'Москва',
    createdAt: '2026-05-10',
    status: 'active',
    views: 423,
  },
  {
    id: '6',
    title: 'Toyota Camry 2022, 2.5 Hybrid',
    price: 3250000,
    category: 'transport',
    subcategory: 'cars',
    type: 'product',
    seller: { id: 's6', name: 'AutoElite', avatar: '', rating: 4.5, reviewCount: 31 },
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400'],
    description: 'Один владелец, сервисная книжка, пробег 38 000 км. Не бита, не крашена.',
    location: 'Казань',
    createdAt: '2026-05-09',
    status: 'active',
    views: 789,
  },
  {
    id: '7',
    title: 'Профессиональная фотосессия',
    price: 8000,
    priceLabel: '8 000 ₽/сессия',
    category: 'services',
    subcategory: 'photo',
    type: 'service',
    seller: { id: 's7', name: 'Фотограф Анна', avatar: '', rating: 4.9, reviewCount: 112 },
    images: ['https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400'],
    description: 'Портретная, деловая, предметная фотосъёмка. Обработка 50+ фото в подарок.',
    location: 'Москва',
    createdAt: '2026-05-08',
    status: 'active',
    views: 345,
  },
  {
    id: '8',
    title: 'Диван угловой, б/у 1 год',
    price: 25000,
    category: 'home',
    subcategory: 'furniture',
    type: 'product',
    seller: { id: 's8', name: 'Игорь Р.', avatar: '', rating: 4.3, reviewCount: 8 },
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'],
    description: 'Угловой диван серого цвета, 280×180 см. Чистый, без дефектов.',
    location: 'Екатеринбург',
    createdAt: '2026-05-07',
    status: 'active',
    views: 198,
  },
];

export const MOCK_BOOKINGS = [
  {
    id: 'b1',
    lot: MOCK_LOTS[0],
    status: 'pending' as const,
    createdAt: '2026-05-15',
    message: 'Хочу забронировать, готов к встрече в любое время.',
  },
  {
    id: 'b2',
    lot: MOCK_LOTS[1],
    status: 'confirmed' as const,
    createdAt: '2026-05-12',
    message: 'Нужен ремонт 65 м², два санузла.',
  },
  {
    id: 'b3',
    lot: MOCK_LOTS[5],
    status: 'completed' as const,
    createdAt: '2026-04-20',
    message: 'Машина понравилась, готов к сделке.',
  },
];

export const BOOKING_STATUS_MAP = {
  pending: { label: 'Ожидает подтверждения', color: 'text-yellow-400 bg-yellow-400/10' },
  confirmed: { label: 'Подтверждено', color: 'text-green-400 bg-green-400/10' },
  rejected: { label: 'Отклонено', color: 'text-red-400 bg-red-400/10' },
  completed: { label: 'Завершено', color: 'text-blue-400 bg-blue-400/10' },
  cancelled: { label: 'Отменено', color: 'text-gray-400 bg-gray-400/10' },
};
