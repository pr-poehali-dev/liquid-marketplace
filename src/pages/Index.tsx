import { useState } from 'react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import CategoriesPage from './CategoriesPage';
import ProfilePage from './ProfilePage';
import BookingsPage from './BookingsPage';
import FavoritesPage from './FavoritesPage';
import ChatPage from './ChatPage';
import NotificationsPage from './NotificationsPage';
import SellerPage from './SellerPage';
import AdminPage from './AdminPage';
import LotModal from '@/components/lots/LotModal';
import { Lot, MOCK_LOTS } from '@/data/mockLots';

type Page = 'home' | 'search' | 'categories' | 'profile' | 'bookings' | 'favorites' | 'chat' | 'notifications' | 'seller' | 'admin' | 'lots';

export default function Index() {
  const [page, setPage] = useState<Page>('home');
  const [openLot, setOpenLot] = useState<Lot | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['2', '4']);

  const navigate = (p: string) => setPage(p as Page);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const handleOpenLot = (lot: Lot) => setOpenLot(lot);

  const handleBook = (_lot: Lot) => {
    setOpenLot(null);
    navigate('bookings');
  };

  const lotsWithFav = MOCK_LOTS.map((l) => ({ ...l, isFavorite: favorites.includes(l.id) }));

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={navigate} onOpenLot={handleOpenLot} onToggleFavorite={handleToggleFavorite} />;
      case 'search':
      case 'lots':
        return <SearchPage onOpenLot={handleOpenLot} onToggleFavorite={handleToggleFavorite} />;
      case 'categories':
        return <CategoriesPage onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      case 'bookings':
        return <BookingsPage onNavigate={navigate} />;
      case 'favorites':
        return <FavoritesPage onOpenLot={handleOpenLot} onToggleFavorite={handleToggleFavorite} favorites={favorites} />;
      case 'chat':
        return <ChatPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'seller':
        return <SellerPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage onNavigate={navigate} onOpenLot={handleOpenLot} onToggleFavorite={handleToggleFavorite} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={page} onNavigate={navigate} notifCount={3} chatCount={2} />

      {/* Desktop subnav */}
      <div className="hidden md:block sticky top-16 z-40 glass border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 py-1.5 overflow-x-auto">
            {[
              { id: 'home', label: 'Главная' },
              { id: 'search', label: 'Поиск' },
              { id: 'categories', label: 'Категории' },
              { id: 'lots', label: 'Все лоты' },
              { id: 'bookings', label: 'Бронирования' },
              { id: 'favorites', label: 'Избранное' },
              { id: 'chat', label: 'Чат' },
              { id: 'notifications', label: 'Уведомления' },
              { id: 'seller', label: '+ Разместить' },
              { id: 'admin', label: '⚙ Админ' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  page === item.id || (page === 'lots' && item.id === 'lots')
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="pb-24 md:pb-8">
        {renderPage()}
      </main>

      <BottomNav currentPage={page} onNavigate={navigate} />

      <LotModal
        lot={openLot ? lotsWithFav.find((l) => l.id === openLot.id) || openLot : null}
        onClose={() => setOpenLot(null)}
        onBook={handleBook}
      />
    </div>
  );
}
