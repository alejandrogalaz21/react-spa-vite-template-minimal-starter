// src/offlineQueue/offlineQueue.actions.ts
import { offlineQueueSlice } from './offlineQueue.slice';

export type OfflineQueueAction =
  | ReturnType<typeof offlineQueueSlice.actions.queueAdd>
  | ReturnType<typeof offlineQueueSlice.actions.queueRemove>
  | ReturnType<typeof offlineQueueSlice.actions.flushQueue>;
