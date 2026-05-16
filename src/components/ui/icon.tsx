import * as LucideIcons from 'lucide-react';
import type { LucideProps, LucideIcon } from 'lucide-react';

const Icon = ({ name, fallback = 'CircleAlert', ...props }: LucideProps & { name: string; fallback?: string }) => {
  const map = LucideIcons as Record<string, LucideIcon>;
  const C = map[name] ?? map[fallback ?? 'CircleAlert'];
  if (!C) return null;
  return <C {...props} />;
};

export default Icon;