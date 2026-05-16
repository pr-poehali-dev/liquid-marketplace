import type { JSX } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

type IconProps = LucideProps & {
  name: string;
  fallback?: string;
};

const Icon = ({ name, fallback = 'CircleAlert', ...props }: IconProps): JSX.Element | null => {
  const icons = LucideIcons as Record<string, ((p: LucideProps) => JSX.Element) | undefined>;
  const C = icons[name] ?? icons[fallback];
  if (!C) return null;
  return <C {...props} />;
};

export default Icon;
