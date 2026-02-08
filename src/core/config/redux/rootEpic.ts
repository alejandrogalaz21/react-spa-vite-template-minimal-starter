import type { Action } from 'redux';
import type { Epic } from 'redux-observable';

import { combineEpics } from 'redux-observable';

import { appEpics } from './app/app-epic';

import type { RootState } from './store';

const app: Epic<Action, Action, RootState, any>[] = appEpics as unknown as Epic<
  Action,
  Action,
  RootState,
  any
>[];

const rootEpic = combineEpics(...app);

export default rootEpic;
