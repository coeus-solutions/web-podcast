import { LucideIcon } from 'lucide-react';

export interface Feature {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface FeatureCardProps extends Feature {}