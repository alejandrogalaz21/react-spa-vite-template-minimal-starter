// src/features/shared/alerts/components/AlertFactory.tsx

import { Toast } from './Toast';
import { Notification } from './Notification';
import { Banner } from './Banner';
// types
import { Alert } from '@/core/types/ui.types';

const registry = {
  toast: Toast,
  notification: Notification,
  alert: Banner,
} as const;

export const AlertFactory = ({ alert }: { alert: Alert }) => {
  const Component = registry[alert.type];
  return <Component {...(alert as any)} />;
};
