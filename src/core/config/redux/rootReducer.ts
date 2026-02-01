import { combineReducers } from '@reduxjs/toolkit';

import { appReducer } from './app/app-slice';
import { offlineQueueSliceReducer } from './app/offlineQueue/offlineQueue.slice';

import axiosInstance from '@/core/config/axios/apiClient';

const epicDependencies: any = {
  api: axiosInstance,
};

const rootReducer = combineReducers({
  app: appReducer,
  offlineQueueSlice: offlineQueueSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
