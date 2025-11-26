// src/features/shared/components/MultiAlert.tsx
import React from 'react';

/**
 * Alert item structure.
 */
export interface AlertItem {
  id?: string | number;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

/**
 * Renders a list of alerts stacked vertically.
 *
 * @param alerts - Array of alert items to display.
 */
export const MultiAlert: React.FC<{ alerts: AlertItem[] }> = React.memo(({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div style={{ marginBottom: 16 }}>
      {alerts.map((alert, idx) => (
        <div
          key={alert.id || idx}
          style={{
            padding: '12px 16px',
            borderRadius: 6,
            marginBottom: 8,
            color: '#fff',
            backgroundColor:
              alert.type === 'error'
                ? '#d32f2f'
                : alert.type === 'warning'
                  ? '#ffa000'
                  : alert.type === 'success'
                    ? '#388e3c'
                    : '#0288d1',
          }}
        >
          {alert.message}
        </div>
      ))}
    </div>
  );
});

MultiAlert.displayName = 'MultiAlert';
