// src/socket/socket.types.ts
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { socketSlice } from './socket.slice';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SocketClient } from './SocketClient';

export type SocketClientType = SocketClient;

/* type definitions for socket actions */
export type SocketActions =
  | ReturnType<typeof socketSlice.actions.socketConnected>
  | ReturnType<typeof socketSlice.actions.socketDisconnected>
  | ReturnType<typeof socketSlice.actions.socketError>
  | ReturnType<typeof socketSlice.actions.socketRetry>;
