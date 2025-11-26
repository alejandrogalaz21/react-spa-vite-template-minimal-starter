// src/features/shared/components/LoadingOverlay/LoadingOverlay.tsx
import React from 'react';
import styles from './LoadingOverlay.module.css';

/**
 * Fullscreen loading overlay used during initial loads.
 *
 * @component
 */
export const LoadingOverlay: React.FC = React.memo(() => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
    </div>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';
