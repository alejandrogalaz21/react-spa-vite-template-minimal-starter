// src/offlineQueue/offlineQueue.actions.ts
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { offlineQueueSlice } from './offlineQueue.slice';

export type OfflineQueueAction =
  | ReturnType<typeof offlineQueueSlice.actions.queueAdd>
  | ReturnType<typeof offlineQueueSlice.actions.queueRemove>
  | ReturnType<typeof offlineQueueSlice.actions.flushQueue>;
