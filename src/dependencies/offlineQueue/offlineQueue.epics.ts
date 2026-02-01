// src/offlineQueue/offlineQueue.epics.ts
import { filter, withLatestFrom, mergeMap, from } from 'rxjs';
import { socketClient } from '@/socket/SocketClient';
import { queueRemove } from './offlineQueue.slice';

import type { AppEpic } from '@types';

/**
 * 📦 Offline queue flush epic
 *
 * - Sends queued events when socket is connected
 * - Removes event from queue after ACK
 *
 * @example
 * combineEpics(offlineQueueFlushEpic)
 */
export const offlineQueueFlushEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    filter((action) => action.type === 'offlineQueue/flushQueue'),
    withLatestFrom(state$),
    mergeMap(([_, state]) => {
      const actions: any[] = [];
      state.offlineQueueSlice.items.forEach((item: any) => {
        socketClient.emit(item.event, item.payload, () => {
          // ✅ ACK received → remove from queue
          actions.push(queueRemove(item.id));
        });
      });
      return from(actions);
    })
  );
