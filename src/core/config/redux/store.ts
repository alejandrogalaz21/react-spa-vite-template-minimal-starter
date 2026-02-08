import type { Action } from '@reduxjs/toolkit';
import type { EpicMiddleware } from 'redux-observable';

import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import { setStore } from './storeAccessor';

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

setStore(store);

export default store;

// Export commonly used types so other modules can import them as types-only
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
