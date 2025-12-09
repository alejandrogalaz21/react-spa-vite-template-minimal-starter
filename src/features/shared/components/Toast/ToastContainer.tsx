import React, { useEffect, useCallback } from 'react';
import { ToastList } from './ToastList';
import { useUiToastAdapter } from '@features/shared/hooks/useUIToastAdapter';
import type { ToastItem } from '@features/shared/types/toast.types';

/**
 * 🧠 ToastContainer (Container)
 *
 * - Connects UI toast components to Redux state.
 * - Handles auto-dismiss timers.
 * - Isolates business logic from presentation.
 *
 * @example
 * // Place it once in your App layout:
 * <ToastContainer />
 */
export const ToastContainer: React.FC = () => {
  const { alerts: toasts, clearToast } = useUiToastAdapter();

  /**
   * 🔥 Removes a toast via Redux.
   */
  const handleClose = useCallback(
    (id: string) => {
      clearToast(id);
    },
    [clearToast]
  );

  /**
   * ⏱ Auto-dismiss after 5 seconds.
   */
  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map((toast: ToastItem) => setTimeout(() => handleClose(toast.id), 5000));

    return () => timers.forEach((t: any) => clearTimeout(t));
  }, [toasts, handleClose]);

  return <ToastList toasts={toasts} onClose={handleClose} />;
};
