import type { Action } from '@reduxjs/toolkit';
import type { EpicMiddleware } from 'redux-observable';

import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './rootEpic';
import rootReducer from './rootReducer';

// Create the epic middleware
const epicMiddleware: EpicMiddleware<Action, Action, any, any> = createEpicMiddleware();

/**
 * Configures the Redux store with the root reducer and epic middleware.
 *
 * @returns {Store} The configured Redux store.
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
});

// Run the root epic
epicMiddleware.run(rootEpic);

/**
 * Type for the dispatch function of the store.
 *
 * @typedef {typeof store.dispatch} AppDispatch
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Type for the root state of the store.
 *
 * @typedef {ReturnType<typeof store.getState>} RootState
 */
export type state = ReturnType<typeof store.getState>;

export default store;
