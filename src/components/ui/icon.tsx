import * as React from 'react';
import type { LucideProps } from 'lucide-react';
import {
  Image, Heart, MapPin, Star, X, Eye, MessageCircle, Search, Bell, LogIn, LogOut,
  Home, Tag, CalendarCheck, User, ChevronDown, ChevronRight, SearchX,
  SlidersHorizontal, CalendarX, HeartOff, ArrowLeft, Send, Loader2, Upload,
  LayoutDashboard, Users, Grid3x3, CreditCard, BarChart2, ShieldCheck,
  Clock, Flag, TrendingUp, CircleAlert,
} from 'lucide-react';

const ICONS: Record<string, React.FC<LucideProps>> = {
  Image, Heart, MapPin, Star, X, Eye, MessageCircle, Search, Bell, LogIn, LogOut,
  Home, Tag, CalendarCheck, User, ChevronDown, ChevronRight, SearchX,
  SlidersHorizontal, CalendarX, HeartOff, ArrowLeft, Send, Loader2, Upload,
  LayoutDashboard, Users, Grid3x3, CreditCard, FileBarChart: BarChart2, ShieldCheck,
  Clock, Flag, TrendingUp, CircleAlert,
};

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
}

const Icon: React.FC<IconProps> = ({ name, fallback = 'CircleAlert', ...props }) => {
  const C = ICONS[name] ?? ICONS[fallback ?? 'CircleAlert'] ?? ICONS['CircleAlert'];
  if (!C) return null;
  return <C {...props} />;
};

export default Icon;