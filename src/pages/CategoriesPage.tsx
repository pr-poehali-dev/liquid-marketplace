import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { CATEGORIES } from '@/data/categories';

interface CategoriesPageProps {
  onNavigate: (page: string) => void;
}

export default function CategoriesPage({ onNavigate }: CategoriesPageProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-2xl font-black text-foreground mb-5">Все категории</h1>

      <div className="space-y-2">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-semibold text-foreground">{cat.name}</span>
                <span className="text-xs text-muted-foreground">({cat.children.length})</span>
              </div>
              <Icon
                name="ChevronDown"
                size={18}
                className={`text-muted-foreground transition-transform ${expanded === cat.id ? 'rotate-180' : ''}`}
              />
            </button>

            {expanded === cat.id && (
              <div className="border-t border-border px-5 py-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                  {cat.children.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => onNavigate('search')}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-secondary transition-colors text-left"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                      <span className="text-sm text-muted-foreground hover:text-foreground">{sub.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
