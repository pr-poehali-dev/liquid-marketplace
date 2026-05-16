import { createElement } from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  fallback?: string;
  size?: number | string;
  className?: string;
  strokeWidth?: number | string;
  color?: string;
  [key: string]: unknown;
}

const Icon = ({ name, fallback = 'CircleAlert', ...props }: IconProps) => {
  const icons = LucideIcons as Record<string, unknown>;
  const C = (icons[name] ?? icons[fallback]) as ((p: object) => unknown) | undefined;
  if (!C) return null;
  return createElement(C as Parameters<typeof createElement>[0], props);
};

export default Icon;
