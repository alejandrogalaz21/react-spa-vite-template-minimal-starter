// src/types/app-action-types.ts
import type { UnknownAction } from '@reduxjs/toolkit';

// helper type to extract actions from slices
import type { ActionsFromSlice } from '@/core/types';
// core actions types
import type { SocketActions } from '@/core/config/socket/socket.types';
import type { OfflineQueueAction } from '@/core/config/redux/app/offlineQueue/offlineQueue.types';
// slice action types

export type AppActions = OfflineQueueAction | SocketActions | UnknownAction;
