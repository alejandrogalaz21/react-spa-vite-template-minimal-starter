// src/features/shared/alerts/components/AlertRenderer.tsx

import { Alert } from '@/core/types/ui.types';
import * as C from '@/core/constants/ui.constants';
import { Toast } from './Toast';
import { Notification } from './Notification';
import { Banner } from './Banner';

export const AlertRenderer = ({ alert }: { alert: Alert }) => {
  switch (alert.type) {
    case C.ALERT_TYPE.TOAST:
      return <Toast {...alert} />;
    case C.ALERT_TYPE.NOTIFICATION:
      return <Notification {...alert} />;
    case C.ALERT_TYPE.ALERT:
      return <Banner {...alert} />;
  }
};
