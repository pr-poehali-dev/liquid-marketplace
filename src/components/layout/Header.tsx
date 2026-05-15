import Icon from '@/components/ui/icon';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  notifCount?: number;
  chatCount?: number;
}

export default function Header({ currentPage, onNavigate, notifCount = 3, chatCount = 2 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-black text-sm">Л</span>
          </div>
          <span className="font-black text-xl tracking-tight text-foreground">ЛИКВИД</span>
        </button>

        {/* Search */}
        <button
          onClick={() => onNavigate('search')}
          className="flex-1 max-w-xl bg-secondary/60 hover:bg-secondary text-muted-foreground rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 transition-colors text-left"
        >
          <Icon name="Search" size={16} />
          <span>Поиск товаров и услуг...</span>
        </button>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <button
            onClick={() => onNavigate('favorites')}
            className={`relative p-2.5 rounded-xl transition-colors ${currentPage === 'favorites' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
          >
            <Icon name="Heart" size={20} />
          </button>
          <button
            onClick={() => onNavigate('chat')}
            className={`relative p-2.5 rounded-xl transition-colors ${currentPage === 'chat' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
          >
            <Icon name="MessageCircle" size={20} />
            {chatCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {chatCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('notifications')}
            className={`relative p-2.5 rounded-xl transition-colors ${currentPage === 'notifications' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
          >
            <Icon name="Bell" size={20} />
            {notifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {notifCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`ml-1 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${currentPage === 'profile' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}
          >
            АИ
          </button>
        </nav>
      </div>
    </header>
  );
}
