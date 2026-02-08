// src/types/redux/redux-types.ts

// Import types exported from the configured store
import type { RootState, AppDispatch } from '@/core/config/redux/store';

/**
 * Type for the Redux state object.
 */
export type ReduxState = RootState;

/**
 * Type for the Redux dispatch function.
 */
export type AppDispatchType = AppDispatch;

/**
 * Type to extract action creators from a given slice.
 *
 * @template S - The slice object containing action creators.
 */
export type ActionsFromSlice<S extends Record<string, (...args: any) => any>> = ReturnType<
  S[keyof S]
>;
