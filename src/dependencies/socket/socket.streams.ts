// src/socket/socket.streams.ts

/**
 * 🌊 Socket event streams using RxJS Observables.
 * Provides reactive streams for socket connection lifecycle events.
 * @module socket.streams
 */

import { Observable } from 'rxjs';
import { socketClient } from './SocketClient';

/**
 * 🟢 Creates an Observable stream that emits when the socket connects to the server.
 * Automatically cleans up the event listener when unsubscribed.
 *
 * @returns {Observable<void>} Observable that emits on successful connection
 * @example
 * ```ts
 * import { connected$ } from './socket/socket.streams';
 *
 * // 🎧 Subscribe to connection events
 * const subscription = connected$().subscribe(() => {
 *   console.log('✅ Socket connected!');
 * });
 *
 * // 🧹 Cleanup when done
 * subscription.unsubscribe();
 * ```
 */
export const connected$ = () =>
  new Observable<void>((subscriber) => {
    const handler = () => subscriber.next();
    socketClient.instance.on('connect', handler);

    return () => socketClient.instance.off('connect', handler);
  });

/**
 * 🔴 Creates an Observable stream that emits when the socket disconnects from the server.
 * Automatically cleans up the event listener when unsubscribed.
 *
 * @returns {Observable<void>} Observable that emits on disconnection
 * @example
 * ```ts
 * import { disconnected$ } from './socket/socket.streams';
 *
 * // 🎧 Subscribe to disconnection events
 * disconnected$().subscribe(() => {
 *   console.log('❌ Socket disconnected!');
 *   // 🔄 Attempt reconnection or show offline UI
 * });
 * ```
 */
export const disconnected$ = () =>
  new Observable<void>((subscriber) => {
    const handler = () => subscriber.next();
    socketClient.instance.on('disconnect', handler);

    return () => socketClient.instance.off('disconnect', handler);
  });

/**
 * ⚠️ Creates an Observable stream that emits when a connection error occurs.
 * Automatically cleans up the event listener when unsubscribed.
 *
 * @returns {Observable<Error>} Observable that emits connection errors
 * @example
 * ```ts
 * import { connectError$ } from './socket/socket.streams';
 *
 * // 🎧 Subscribe to connection errors
 * connectError$().subscribe((error) => {
 *   console.error('🚨 Connection error:', error.message);
 *   // 📊 Send to error tracking service
 *   // 🔔 Show error notification to user
 * });
 * ```
 */
export const connectError$ = () =>
  new Observable<Error>((subscriber) => {
    const handler = (err: Error) => subscriber.next(err);
    socketClient.instance.on('connect_error', handler);

    return () => socketClient.instance.off('connect_error', handler);
  });
