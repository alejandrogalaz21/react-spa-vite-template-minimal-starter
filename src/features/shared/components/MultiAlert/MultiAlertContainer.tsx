import _React, { useEffect } from 'react';
import { MultiAlert } from './MultiAlert';
import { useUiAlertsAdapter } from '@features/shared/hooks/useUiAlertsAdapter';

/**
 * Container that bridges the UI Alerts system to the UI component.
 */
export const MultiAlertContainer = () => {
  const { alerts, clearAlert, clearAllAlerts } = useUiAlertsAdapter();

  /**
   * ⏱ Auto-dismiss after 5 seconds.
   */
  useEffect(() => {
    if (alerts.length > 0) {
      const timers: NodeJS.Timeout[] = alerts.map((alert: any) => {
        return setTimeout(() => {
          clearAlert(alert.id!);
        }, 5000);
      });

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [alerts, clearAlert]);

  // Clear all alerts on unmount to prevent stale alerts
  useEffect(() => {
    return () => {
      clearAllAlerts();
    };
  }, [clearAllAlerts]);

  return <MultiAlert alerts={alerts} onClose={clearAlert} />;
};
