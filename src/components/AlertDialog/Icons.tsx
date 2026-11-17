import type { LucideIcon } from 'lucide-react';
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  Trash2Icon,
  TriangleAlertIcon,
} from 'lucide-react';

export type AlertVariantKey = 'destructive' | 'success' | 'warning' | 'error' | 'info';

export const AlertVariantIcons: Record<AlertVariantKey, LucideIcon> = {
  destructive: Trash2Icon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
  error: CircleAlertIcon,
  info: InfoIcon,
};
