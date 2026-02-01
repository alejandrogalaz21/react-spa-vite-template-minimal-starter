// src/core/config/socket/socket.epics.ts

/**
 * 📡 Socket Epics using RxJS and Redux-Observable.
 * Handles side effects related to socket connection events.
 * @module socket.epics
 */
import { merge, map, materialize, scan, delayWhen, timer, tap, filter, retryWhen } from 'rxjs';
import { connected$, disconnected$, connectError$ } from './socket.streams';
import { socketConnected, socketDisconnected, socketError, socketRetry } from './socket.slice';
import { flushQueue } from '@/core/config/redux/app/offlineQueue/offlineQueue.slice';

import type { Observable } from 'rxjs';

import type { AppEpic, AppActions } from '@/core/types';

/**
 * 🧠 Socket lifecycle epic
 *
 * - Tracks socket connection state
 * - Applies retry with exponential backoff
 * - Triggers offline queue flush on reconnect
 *
 * @example
 * combineEpics(socketStatusEpic)
 */
/**
 * 🛰️ Epic that listens for socket connection events and dispatches corresponding actions.
 * Merges multiple socket event streams into a single observable stream of actions.
 *	connected$   ──●──────────────●──────
 *	disconnected$──────●─────────────────
 *	connectError$────────────●───────────
 *
 *	merge()      ──●──●──●──●──●────────
 */

export const socketStatusEpic: AppEpic = (action$, _state$): Observable<AppActions> =>
  merge(
    /**
     * 🟢 SOCKET CONNECTED
     */
    connected$().pipe(
      materialize(),
      map((notification) => {
        if (notification.kind === 'E') {
          return socketError(notification.error.message);
        }
        return socketConnected();
      })
    ),

    /**
     * 🔴 SOCKET DISCONNECTED
     */
    disconnected$().pipe(map(() => socketDisconnected())),

    /**
     * ❌ SOCKET CONNECTION ERROR
     * Retry with exponential backoff (max 5)
     */
    connectError$().pipe(
      retryWhen((errors: Observable<Error>) =>
        errors.pipe(
          scan((retryCount: number, error: Error): number => {
            if (retryCount >= 5) {
              throw error;
            }
            return retryCount + 1;
          }, 0),

          delayWhen((retryCount: number) => timer(2 ** retryCount * 1000)),

          tap(() => socketRetry())
        )
      ),
      map((err: Error) => socketError(err.message))
    ),

    /**
     * 📦 FLUSH OFFLINE QUEUE WHEN SOCKET CONNECTS
     */
    action$.pipe(
      filter((action): action is AppActions => action.type === socketConnected.type),
      map(() => flushQueue())
    )
  );
