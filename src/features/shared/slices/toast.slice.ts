// src/features/shared/slices/ui.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Alert } from '@/features/shared/types/ui-types';

interface UiState {
  alerts: Alert[];
}

const initialState: UiState = {
  alerts: [],
};

/**
 * Generate a unique ID for alerts
 */
const generateAlertId = (): string => {
  return `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 🎨 UI Slice
 * Handles global UI states such as alerts.
 */
export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    /**
     * 🟢 Generic toast
     */
    showToast: (state, action: PayloadAction<Omit<Alert, 'id'> | Alert>) => {
      const alert: Alert =
        'id' in action.payload ? action.payload : { ...action.payload, id: generateAlertId() };
      state.alerts.push(alert);
    },

    /**
     * ❌ Clear toast by ID
     */
    clearToast: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
    },

    /**
     * 🧹 Clear all toasts
     */
    clearAllToasts: (state) => {
      state.alerts = [];
    },

    /**
     * 🟢 SUCCESS toast
     * Usage:
     * dispatch(showSuccessToast("Saved!", "Operation completed"));
     */
    showSuccessToast: {
      reducer(state, action: PayloadAction<Alert>) {
        state.alerts.push(action.payload);
      },
      prepare(message: string, title?: string) {
        return {
          payload: {
            id: generateAlertId(),
            type: 'success' as const,
            message,
            title,
          },
        };
      },
    },

    /**
     * 🔴 ERROR alert
     * Usage:
     * dispatch(showErrorToast("Request failed", "Server error"));
     */
    showErrorToast: {
      reducer(state, action: PayloadAction<Alert>) {
        state.alerts.push(action.payload);
      },
      prepare(message: string, title?: string) {
        return {
          payload: {
            id: generateAlertId(),
            type: 'error' as const,
            message,
            title,
          },
        };
      },
    },

    /**
     * 🔵 INFO alert
     * Usage:
     * dispatch(showInfoToast("Heads up!", "Note"));
     */
    showInfoToast: {
      reducer(state, action: PayloadAction<Alert>) {
        state.alerts.push(action.payload);
      },
      prepare(message: string, title?: string) {
        return {
          payload: {
            id: generateAlertId(),
            type: 'info' as const,
            message,
            title,
          },
        };
      },
    },

    /**
     * 🟡 WARNING alert
     * Usage:
     * dispatch(showWarningToast("Be careful", "Potential issue"));
     */
    showWarningToast: {
      reducer(state, action: PayloadAction<Alert>) {
        state.alerts.push(action.payload);
      },
      prepare(message: string, title?: string) {
        return {
          payload: {
            id: generateAlertId(),
            type: 'warning' as const,
            message,
            title,
          },
        };
      },
    },
  },
});

// Export actions
export const {
  showToast,
  clearToast,
  clearAllToasts,
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast,
} = toastSlice.actions;

// Selectors
export const selectAllToasts = (state: any) => state.toast.alerts;
export const selectToast = (state: any) => state.toast.alerts[0];

export const toastReducer = toastSlice.reducer;
