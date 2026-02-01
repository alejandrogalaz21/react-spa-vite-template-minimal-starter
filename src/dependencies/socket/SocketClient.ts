// src/socket/SocketClient.ts
import { io, Socket } from 'socket.io-client';

/**
 * 🔌 Socket.IO client that manages WebSocket connections with the server.
 * Implements the Singleton pattern to maintain a single connection instance.
 *
 * @class SocketClient
 * @example
 * ```ts
 * import { socketClient } from './socket/SocketClient';
 *
 * // 🟢 Connect to server
 * socketClient.connect('my-auth-token');
 *
 * // 👂 Listen to events
 * socketClient.on('message', (data) => console.log(data));
 * ```
 */
export class SocketClient {
  private socket: Socket | null = null;

  /**
   * 🚀 Establishes a WebSocket connection to the server using authentication token.
   * If a connection already exists, it won't create a new one.
   *
   * @param {string} token - JWT authentication token to establish the connection
   * @returns {void}
   * @example
   * ```ts
   * const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * socketClient.connect(token);
   * // 🟢 Socket connected
   * ```
   */
  connect(token: string) {
    if (this.socket) return;

    this.socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
    });

    this.socket.on('connect', () => {
      console.log('🟢 Socket connected');
    });
  }

  /**
   * 🔌 Disconnects the socket from the server and releases the instance.
   * Logs to console when successfully disconnected.
   *
   * @returns {void}
   * @example
   * ```ts
   * // 🔴 Disconnect when user logs out
   * socketClient.disconnect();
   * // 🔴 Socket disconnected
   * ```
   */
  disconnect() {
    console.log('🔴 Socket disconnected');
    this.socket?.disconnect();
    this.socket = null;
  }

  /**
   * 👂 Registers an event listener for a specific socket event.
   *
   * @param {string} event - Name of the event to listen to
   * @param {(...args: any[]) => void} handler - Callback function executed when the event occurs
   * @returns {void}
   * @example
   * ```ts
   * // 💬 Listen to chat messages
   * socketClient.on('chat:message', (message) => {
   *   console.log('📨 New message:', message);
   * });
   * ```
   */
  on(event: string, handler: (...args: any[]) => void) {
    this.socket?.on(event, handler);
  }

  /**
   * 🔇 Removes an event listener for a specific socket event.
   * If no handler is provided, removes all listeners for the event.
   *
   * @param {string} event - Name of the event to remove the listener from
   * @param {((...args: any[]) => void)} [handler] - Specific handler function to remove (optional)
   * @returns {void}
   * @example
   * ```ts
   * const messageHandler = (msg) => console.log(msg);
   * socketClient.on('chat:message', messageHandler);
   *
   * // 🗑️ Remove specific listener
   * socketClient.off('chat:message', messageHandler);
   *
   * // 🗑️ Remove all listeners for the event
   * socketClient.off('chat:message');
   * ```
   */
  off(event: string, handler?: (...args: any[]) => void) {
    this.socket?.off(event, handler);
  }

  /**
   * 📤 Emits an event to the server with an optional payload.
   * Optionally accepts an acknowledgment callback.
   *
   * @param {string} event - Name of the event to emit
   * @param {any} [payload] - Data to send with the event (optional)
   * @param {() => void} [ack] - Acknowledgment callback function (optional)
   * @returns {void}
   * @example
   * ```ts
   * // 📨 Simple event emission
   * socketClient.emit('user:typing', { userId: 123 });
   *
   * // ✅ Emit with acknowledgment
   * socketClient.emit('message:send', { text: 'Hello' }, () => {
   *   console.log('✅ Message sent');
   * });
   * ```
   */
  emit(event: string, payload?: any, ack?: () => void) {
    this.socket?.emit(event, payload, ack);
  }

  /**
   * 🎯 Gets the Socket.IO socket instance.
   * Throws an error if the socket is not connected.
   *
   * @returns {Socket} The Socket.IO socket instance
   * @throws {Error} If the socket is not connected
   * @example
   * ```ts
   * try {
   *   const socket = socketClient.instance;
   *   console.log('🆔 Socket ID:', socket.id);
   * } catch (error) {
   *   console.error('❌ Socket not connected');
   * }
   * ```
   */
  get instance(): Socket {
    if (!this.socket) {
      throw new Error('❌ Socket not connected 💀');
    }
    return this.socket;
  }
}

export const socketClient = new SocketClient();
