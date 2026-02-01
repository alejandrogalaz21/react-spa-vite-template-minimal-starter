// src/types/redux/redux-types.ts

// Import the configured Redux store instance
import store from '@/core/config/redux/store';

// Import the rootReducer that combines all slices/reducers in the app
import rootReducer from '@/core/config//redux/rootReducer';

/**
 * Type for the Redux state object.
 *
 * @typedef {ReturnType<typeof store.getState>} RootState
 */
export type ReduxState = ReturnType<typeof rootReducer>;

/**
 * Type for the Redux dispatch function.
 *
 * @typedef {typeof store.dispatch} AppDispatch
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Type to extract action creators from a given slice.
 *
 * @template S - The slice object containing action creators.
 */
export type ActionsFromSlice<S extends Record<string, (...args: any) => any>> = ReturnType<
  S[keyof S]
>;
