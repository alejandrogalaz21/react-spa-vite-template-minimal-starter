import React, { useCallback, useState, useEffect } from 'react';
import { Alert, Stack, AlertTitle } from '@mui/material';
import { AlertIcon } from '@features/shared/components/UI';

import type { Alert as AlertType } from '@features/shared/types/ui-types';

/**
 * Represents a single alert to be rendered by the MultiAlert component.
 */
export type AlertItem = Omit<AlertType, 'id'> & {
  id?: string;
};

interface MultiAlertProps {
  /**
   * Array of alerts to be rendered.
   */
  alerts: AlertItem[];

  /**
   * Optional callback that fires when an alert is closed.
   * If not provided, the alert will only be removed from the UI (internal state).
   */
  onClose?: (id: string) => void;
}

/**
 * 📢 MultiAlert Component
 *
 * Renders a stack of multiple MUI alerts.
 * If a parent `onClose` function is provided, each alert will call it when closing.
 * If no `onClose` is provided, the component falls back to an internal state
 * to remove alerts from the UI.
 *
 * This makes the component flexible for both controlled and uncontrolled use cases.
 *
 * ---
 *
 * @example
 * // Controlled (e.g., Redux or Parent State)
 * <MultiAlert
 *   alerts={alerts}
 *   onClose={(id) => dispatch(removeAlert(id))}
 * />
 *
 * @example
 * // Uncontrolled (UI-only dismiss)
 * <MultiAlert
 *   alerts={[
 *     { id: "1", type: "success", title: "Saved", message: "Data stored!" }
 *   ]}
 * />
 */
export const MultiAlert: React.FC<MultiAlertProps> = React.memo(({ alerts, onClose }) => {
  /**
   * Local internal state for alerts.
   * This is used only if the parent does not provide an onClose handler.
   */
  const [localAlerts, setLocalAlerts] = useState<AlertItem[]>(alerts);

  /**
   * Syncs internal state when the parent alerts array changes.
   */
  useEffect(() => {
    setLocalAlerts(alerts);
  }, [alerts]);

  /**
   * Handles closing an alert.
   * - If the parent provided an onClose callback → delegate to parent.
   * - Otherwise → remove the alert locally from the UI.
   */
  const handleClose = useCallback(
    (id: string) => {
      if (onClose) {
        onClose(id);
        return;
      }

      // UI-only removal fallback
      setLocalAlerts((prev) => prev.filter((alert) => (alert.id ?? '') !== id));
    },
    [onClose]
  );

  if (!localAlerts || localAlerts.length === 0) return null;

  return (
    <Stack sx={{ width: '100%' }} spacing={2} mt={10} mb={10}>
      {localAlerts.map((alert, index) => {
        const alertId = alert.id || String(index);

        return (
          <Alert
            key={alertId}
            severity={alert.type}
            icon={<AlertIcon type={alert.type} />}
            onClose={() => handleClose(alertId)}
          >
            {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
            {alert.message}
          </Alert>
        );
      })}
    </Stack>
  );
});

MultiAlert.displayName = 'MultiAlert';
