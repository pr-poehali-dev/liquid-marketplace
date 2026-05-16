import type { JSX } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
}

const Icon = ({ name, fallback = 'CircleAlert', ...props }: IconProps): JSX.Element | null => {
  const IconComponent = (LucideIcons as Record<string, (p: LucideProps) => JSX.Element>)[name];

  if (!IconComponent) {
    const FallbackIcon = (LucideIcons as Record<string, (p: LucideProps) => JSX.Element>)[fallback];
    if (!FallbackIcon) {
      return <span className="text-xs text-gray-400">[icon]</span>;
    }
    return <FallbackIcon {...props} />;
  }

  return <IconComponent {...props} />;
};

export default Icon;