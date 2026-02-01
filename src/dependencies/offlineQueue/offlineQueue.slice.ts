// src/offlineQueue/offlineQueue.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QueuedEvent = {
  id: string;
  event: string;
  payload: any;
};

type OfflineQueueState = {
  items: QueuedEvent[];
};

const initialState: OfflineQueueState = {
  items: [],
};

export const offlineQueueSlice = createSlice({
  name: 'offlineQueue',
  initialState,
  reducers: {
    queueAdd(state, action: PayloadAction<QueuedEvent>) {
      state.items.push(action.payload);
    },

    queueRemove(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    flushQueue(state) {
      state.items = [];
    },
  },
});

export const { queueAdd, queueRemove, flushQueue } = offlineQueueSlice.actions;

/**
 * @example
 * dispatch(queueAdd({ id, event, payload }))
 */
export default offlineQueueSlice.reducer;
