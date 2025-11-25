import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice, createAction } from '@reduxjs/toolkit';

export enum RequestTypes {
  FETCH = 'fetch',
  CREATE = 'create',
  UPDATE = 'update',
  FETCH_ALL = 'fetch-all',
  DELETE = 'delete',
}
export type AppState = {
  data: {
    results: any[];
    count: number;
    next: string | null;
    previous: string | null;
  };
  item: any | null;
  loading: boolean;
  error: any | null;
};
const initialState: AppState = {
  loading: false,
  error: null,
  item: null,
  data: {
    results: [],
    count: 0,
    next: null,
    previous: null,
  },
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },

    requestFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },

    fetchItemSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.item = action.payload;
    },

    createSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data.results.push(action.payload);
    },

    updateSuccess(state, action: PayloadAction<{ id: string; updatedData: any }>) {
      state.loading = false;
      const index = state.data.results.findIndex((item: any) => item.id === action.payload.id);
      if (index !== -1) {
        state.data.results[index] = { ...state.data.results[index], ...action.payload.updatedData };
      }
    },

    removeSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.data.results = state.data.results.filter((item: any) => item.id !== action.payload);
    },
  },
});

/* custom action creator */
export type QueryPayload = {
  type?: RequestTypes;
  id?: string | number;
  [key: string]: any;
};

export const requestStart = createAction(
  app.actions.requestStart.type,
  (payload?: QueryPayload) => ({
    payload: {
      ...payload,
      type: payload?.type || RequestTypes.FETCH_ALL,
    },
  })
);
export const appReducer = app.reducer;
export const {
  requestFailure,
  fetchSuccess,
  fetchItemSuccess,
  createSuccess,
  updateSuccess,
  removeSuccess,
} = app.actions;
