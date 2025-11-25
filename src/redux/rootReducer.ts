import { combineReducers } from '@reduxjs/toolkit';

import { appReducer } from './app/app-slice';

const rootReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
