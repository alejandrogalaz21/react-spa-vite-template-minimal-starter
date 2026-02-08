import { combineReducers } from '@reduxjs/toolkit';

import { appReducer } from './app/app-slice';
import { offlineQueueSliceReducer } from './app/offlineQueue/offlineQueue.slice';

import axiosInstance from '@/core/config/axios/apiClient';

// Not currently used directly here but kept for potential injection/configuration.
// Prefix with underscore to avoid unused-var lint warning.
const _epicDependencies: any = {
  api: axiosInstance,
};

const rootReducer = combineReducers({
  app: appReducer,
  offlineQueueSlice: offlineQueueSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
