import type { Action } from 'redux';
import type { Epic } from 'redux-observable';

import { combineEpics } from 'redux-observable';

import { appEpics } from './app/app-epic';

import type { state } from './store';

const app: Epic<Action, Action, state, any>[] = appEpics as unknown as Epic<
  Action,
  Action,
  state,
  any
>[];

const rootEpic = combineEpics(...app);

export default rootEpic;
