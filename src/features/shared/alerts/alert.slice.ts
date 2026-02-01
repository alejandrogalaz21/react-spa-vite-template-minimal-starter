// src/features/shared/alerts/alert.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from '@/core/types/ui.types';

type AlertsState = {
  items: Alert[];
};

const initialState: AlertsState = {
  items: [],
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Alert>) => {
      state.items.push(action.payload);
    },
    dismissAlert: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((a) => a.id !== action.payload);
    },
  },
});

export const { showAlert, dismissAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
