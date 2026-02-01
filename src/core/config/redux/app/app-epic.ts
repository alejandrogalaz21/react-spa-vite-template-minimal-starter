import type { Observable } from 'rxjs';
import type { Action } from '@reduxjs/toolkit';

import axios from 'axios';
import { of, from } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { getStarShips } from 'src/services';

import {
  requestStart,
  fetchSuccess,
  createSuccess,
  updateSuccess,
  removeSuccess,
  requestFailure,
  fetchItemSuccess,
} from './app-slice';

import type { QueryPayload } from './app-slice';

const API_BASE_URL = 'https://swapi.dev/api/starships';

export const fetchEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(requestStart.type),
    mergeMap((action: QueryPayload) => {
      if (action.payload?.type !== 'fetch-all') return of();
      return from(getStarShips()).pipe(
        map((response: any) => fetchSuccess(response)),
        catchError((error) => of(requestFailure(error.message)))
      );
    })
  );

export const fetchItemEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(requestStart.type),
    mergeMap((action: QueryPayload) => {
      if (action.payload?.type !== 'fetch') return of();

      return from(axios.get(`${API_BASE_URL}/${action.payload.id}`)).pipe(
        map((response: any) => fetchItemSuccess(response)),
        catchError((error) => of(requestFailure(error.message)))
      );
    })
  );

export const createSurveyEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(requestStart.type),
    mergeMap((action: QueryPayload) => {
      if (action.payload?.type !== 'create') return of();

      return from(axios.post(API_BASE_URL, action.payload.survey)).pipe(
        mergeMap((response) => of(createSuccess(response.data))),
        catchError((error) => of(requestFailure(error.message)))
      );
    })
  );

export const updateSurveyEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(requestStart.type),
    mergeMap((action: QueryPayload) => {
      if (action.payload?.type !== 'update') return of();

      return from(
        axios.patch(`${API_BASE_URL}/${action.payload.id}`, action.payload.updatedData)
      ).pipe(
        mergeMap(() =>
          of(updateSuccess({ id: action.payload.id, updatedData: action.payload.updatedData }))
        ),
        catchError((error) => of(requestFailure(error.message)))
      );
    })
  );

export const removeSurveyEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(requestStart.type),
    mergeMap((action: QueryPayload) => {
      if (action.payload?.type !== 'delete') return of();

      return from(axios.delete(`${API_BASE_URL}/${action.payload.id}`)).pipe(
        mergeMap(() => of(removeSuccess(action.payload.id))),
        catchError((error) => of(requestFailure(error.message)))
      );
    })
  );

export const appEpics = [
  fetchEpic,
  fetchItemEpic,
  createSurveyEpic,
  updateSurveyEpic,
  removeSurveyEpic,
];
