import type { Observable } from 'rxjs';
import type { Action } from '@reduxjs/toolkit';

import axios from 'axios';
import { of, from } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, catchError } from 'rxjs/operators';

import {
  requestStart,
  fetchSuccess,
  createSuccess,
  updateSuccess,
  removeSuccess,
  requestFailure,
} from './survey-redux';

const API_BASE_URL = '/api/surveys';

/**
 * Epic to fetch all surveys
 */
export const fetchSurveysEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(requestStart.type),
    mergeMap((action: any) => {
      if (action.payload?.type !== 'fetch') return of();

      return from(axios.get(API_BASE_URL)).pipe(
        mergeMap((response) => of(fetchSuccess(response.data))),
        catchError((error) => of(requestFailure(error.message)))
      );
    })
  );

/**
 * Epic to create a new survey
 */
export const createSurveyEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(requestStart.type),
    mergeMap((action: any) => {
      if (action.payload?.actionType !== 'create') return of();

      return from(axios.post(API_BASE_URL, action.payload.survey)).pipe(
        mergeMap((response) => of(createSuccess(response.data))),
        catchError((error) => of(requestFailure(error.message)))
      );
    })
  );

/**
 * Epic to update a survey
 */
export const updateSurveyEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(requestStart.type),
    mergeMap((action: any) => {
      if (action.payload?.actionType !== 'update') return of();

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

/**
 * Epic to delete a survey
 */
export const removeSurveyEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(requestStart.type),
    mergeMap((action: any) => {
      if (action.payload?.actionType !== 'delete') return of();

      return from(axios.delete(`${API_BASE_URL}/${action.payload.id}`)).pipe(
        mergeMap(() => of(removeSuccess(action.payload.id))),
        catchError((error) => of(requestFailure(error.message)))
      );
    })
  );

/**
 * Combine all epics
 */
export const surveyEpics = [fetchSurveysEpic, createSurveyEpic, updateSurveyEpic, removeSurveyEpic];
