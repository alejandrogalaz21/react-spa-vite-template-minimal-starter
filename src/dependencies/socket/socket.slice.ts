// src/socket/socket.reducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Socket connection state
 */
export type SocketState = {
  /** Current connection status */
  status: 'idle' | 'connected' | 'disconnected' | 'error';

  /** Last connection error message */
  error?: string;

  /** Retry attempt counter */
  retryCount: number;
};

const initialState: SocketState = {
  status: 'idle',
  retryCount: 0,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    socketConnected(state) {
      state.status = 'connected';
      state.retryCount = 0;
      state.error = undefined;
    },

    socketDisconnected(state) {
      state.status = 'disconnected';
    },

    socketError(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },

    socketRetry(state) {
      state.retryCount += 1;
    },
  },
});

export const { socketConnected, socketDisconnected, socketError, socketRetry } =
  socketSlice.actions;

/**
 * @example
 * dispatch(socketConnected())
 */
export default socketSlice.reducer;
