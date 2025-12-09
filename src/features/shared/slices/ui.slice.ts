// src/features/shared/slices/ui.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Alert } from '@features/shared/types';

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
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * 🟢 Generic alert
     */
    showAlert: (state, action: PayloadAction<Omit<Alert, 'id'> | Alert>) => {
      const alert: Alert =
        'id' in action.payload ? action.payload : { ...action.payload, id: generateAlertId() };
      state.alerts.push(alert);
    },

    /**
     * ❌ Clear alert by ID
     */
    clearAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
    },

    /**
     * 🧹 Clear all alerts
     */
    clearAllAlerts: (state) => {
      state.alerts = [];
    },

    /**
     * 🟢 SUCCESS alert
     * Usage:
     * dispatch(showSuccessAlert("Saved!", "Operation completed"));
     */
    showSuccessAlert: {
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
     * dispatch(showErrorAlert("Request failed", "Server error"));
     */
    showErrorAlert: {
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
     * dispatch(showInfoAlert("Heads up!", "Note"));
     */
    showInfoAlert: {
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
     * dispatch(showWarningAlert("Be careful", "Potential issue"));
     */
    showWarningAlert: {
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
  showAlert,
  clearAlert,
  clearAllAlerts,
  showSuccessAlert,
  showErrorAlert,
  showInfoAlert,
  showWarningAlert,
} = uiSlice.actions;

// Selectors
export const selectUiAlerts = (state: any) => state.ui.alerts;
export const selectUiAlert = (state: any) => state.ui.alerts[0];

export default uiSlice.reducer;
