// src/socket/socket.types.ts
import { socketSlice } from './socket.slice';
import { SocketClient } from './SocketClient';

export type SocketClientType = SocketClient;

/* type definitions for socket actions */
export type SocketAction =
  | ReturnType<typeof socketSlice.actions.socketConnected>
  | ReturnType<typeof socketSlice.actions.socketDisconnected>
  | ReturnType<typeof socketSlice.actions.socketError>
  | ReturnType<typeof socketSlice.actions.socketRetry>;
