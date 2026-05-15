export interface Category {
  id: string;
  name: string;
  icon: string;
  children: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'realty',
    name: 'Недвижимость',
    icon: '🏠',
    children: [
      { id: 'apartments', name: 'Квартиры' },
      { id: 'rooms', name: 'Комнаты' },
      { id: 'houses', name: 'Дома, дачи, коттеджи' },
      { id: 'land', name: 'Земельные участки' },
      { id: 'garages', name: 'Гаражи и машиноместа' },
      { id: 'commercial', name: 'Коммерческая недвижимость' },
      { id: 'abroad', name: 'Недвижимость за рубежом' },
    ]
  },
  {
    id: 'transport',
    name: 'Транспорт',
    icon: '🚗',
    children: [
      { id: 'cars', name: 'Автомобили' },
      { id: 'motos', name: 'Мотоциклы и мототехника' },
      { id: 'trucks', name: 'Грузовики и спецтехника' },
      { id: 'water', name: 'Водный транспорт' },
      { id: 'parts', name: 'Запчасти и аксессуары' },
      { id: 'tires', name: 'Шины, диски' },
      { id: 'autoservice', name: 'Автосервисы и СТО' },
    ]
  },
  {
    id: 'services',
    name: 'Услуги',
    icon: '🔧',
    children: [
      { id: 'repair', name: 'Ремонт и строительство' },
      { id: 'cleaning', name: 'Клининг и уборка' },
      { id: 'beauty', name: 'Красота и здоровье' },
      { id: 'education', name: 'Обучение и курсы' },
      { id: 'it', name: 'IT и программирование' },
      { id: 'legal', name: 'Юридические услуги' },
      { id: 'accounting', name: 'Бухгалтерские услуги' },
      { id: 'photo', name: 'Фото и видео' },
      { id: 'design', name: 'Дизайн и творчество' },
      { id: 'moving', name: 'Перевозки и грузчики' },
      { id: 'tech_repair', name: 'Ремонт техники' },
      { id: 'events', name: 'Свадебные и event-услуги' },
      { id: 'pets_service', name: 'Услуги для животных' },
    ]
  },
  {
    id: 'personal',
    name: 'Личные вещи',
    icon: '👗',
    children: [
      { id: 'clothes', name: 'Одежда, обувь, аксессуары' },
      { id: 'kids_clothes', name: 'Детская одежда' },
      { id: 'watches', name: 'Часы и украшения' },
      { id: 'cosmetics', name: 'Косметика и парфюмерия' },
      { id: 'sport', name: 'Спорт и отдых' },
    ]
  },
  {
    id: 'home',
    name: 'Для дома и дачи',
    icon: '🏡',
    children: [
      { id: 'furniture', name: 'Мебель' },
      { id: 'appliances', name: 'Бытовая техника' },
      { id: 'kitchen', name: 'Посуда и товары для кухни' },
      { id: 'textile', name: 'Текстиль' },
      { id: 'tools', name: 'Инструменты и материалы' },
      { id: 'garden', name: 'Растения и сад' },
    ]
  },
  {
    id: 'electronics',
    name: 'Электроника',
    icon: '📱',
    children: [
      { id: 'phones', name: 'Смартфоны и гаджеты' },
      { id: 'laptops', name: 'Ноутбуки и компьютеры' },
      { id: 'tv', name: 'Телевизоры, аудио' },
      { id: 'gaming', name: 'Игровые приставки и игры' },
      { id: 'cameras', name: 'Фото и видеокамеры' },
    ]
  },
  {
    id: 'hobby',
    name: 'Хобби и отдых',
    icon: '🎸',
    children: [
      { id: 'books', name: 'Книги, журналы' },
      { id: 'music', name: 'Музыкальные инструменты' },
      { id: 'hunting', name: 'Охота и рыбалка' },
      { id: 'antique', name: 'Антиквариат, коллекционирование' },
      { id: 'tickets', name: 'Билеты и путешествия' },
    ]
  },
  {
    id: 'animals',
    name: 'Животные',
    icon: '🐾',
    children: [
      { id: 'cats_dogs', name: 'Кошки, собаки' },
      { id: 'birds', name: 'Птицы, грызуны' },
      { id: 'aqua', name: 'Аквариумистика' },
      { id: 'pet_food', name: 'Корма и аксессуары' },
      { id: 'grooming', name: 'Груминг и передержка' },
    ]
  },
  {
    id: 'business',
    name: 'Для бизнеса',
    icon: '💼',
    children: [
      { id: 'equipment', name: 'Оборудование' },
      { id: 'office', name: 'Офисная мебель и техника' },
      { id: 'advertising', name: 'Реклама и полиграфия' },
      { id: 'outsource', name: 'Аутсорсинг' },
      { id: 'rent_biz', name: 'Аренда помещений под бизнес' },
    ]
  },
  {
    id: 'jobs',
    name: 'Вакансии и резюме',
    icon: '💼',
    children: [
      { id: 'jobs_search', name: 'Поиск работы' },
      { id: 'staff_search', name: 'Поиск сотрудников' },
    ]
  },
];
