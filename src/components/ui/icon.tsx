import * as React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
}

const Icon: React.FC<IconProps> = ({ name, fallback = 'CircleAlert', ...props }) => {
  const IconComponent = (LucideIcons as Record<string, React.FC<LucideProps>>)[name];

  if (!IconComponent) {
    const FallbackIcon = (LucideIcons as Record<string, React.FC<LucideProps>>)[fallback ?? 'CircleAlert'];
    if (!FallbackIcon) return null;
    return <FallbackIcon {...props} />;
  }

  return <IconComponent {...props} />;
};

export default Icon;
