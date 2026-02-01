// src/features/shared/alerts/alert.epics.ts

import { ofType } from 'redux-observable';
import { filter, map, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';
import { showAlert, dismissAlert } from './alert.slice';
import * as C from '@/core/constants/ui.constants';
import { Alert } from '@/core/types/ui.types';

export const toastAutoDismissEpic = (action$) =>
  action$.pipe(
    ofType(showAlert.type),
    map((a) => a.payload as Alert),
    filter((alert) => alert.type === C.ALERT_TYPE.TOAST),
    switchMap((alert) => timer(alert.durationMs ?? 3000).pipe(map(() => dismissAlert(alert.id))))
  );
