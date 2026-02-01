import { createSelector } from '@reduxjs/toolkit';
import type { ReduxState } from '@/core/types/redux/redux-types';

export const selectAlerts = (state: ReduxState) => state.alerts.items;

export const selectToasts = createSelector(selectAlerts, (alerts) =>
  alerts.filter((a) => a.type === 'toast')
);

export const selectNotifications = createSelector(selectAlerts, (alerts) =>
  alerts.filter((a) => a.type === 'notification')
);
