import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice, createAction } from '@reduxjs/toolkit';

export enum RequestTypes {
  FETCH = 'fetch',
  CREATE = 'create',
  UPDATE = 'update',
  FETCH_ALL = 'fetch-all',
  DELETE = 'delete',
}

export type QueryParams = {
  id: string;
  [key: string]: any;
};

export type Survey = {
  id: string | number | null;
  siteName: string;
  siteNumber: string;
  bankSiteManagerName: string;
  telephone: string;
  address: string;
};

export type AppState = {
  data: {
    results: Survey[];
    count: number;
    next: string | null;
    previous: string | null;
  };
  item: Survey | null;
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
  name: 'survey',
  initialState,
  reducers: {
    // General loading state
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },

    requestFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },

    // CRUD Operations
    fetchSuccess(state, action: PayloadAction<Survey>) {
      state.loading = false;
      state.item = action.payload;
    },

    fetchAllSuccess(
      state,
      action: PayloadAction<{
        results: Survey[];
        count: number;
        next: string | null;
        previous: string | null;
      }>
    ) {
      state.loading = false;
      state.data = action.payload;
    },

    createSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data.results.push(action.payload);
    },

    updateSuccess(state, action: PayloadAction<{ id: string; updatedData: any }>) {
      state.loading = false;
      const index = state.data.results.findIndex((item: Survey) => item.id === action.payload.id);
      if (index !== -1) {
        state.data.results[index] = { ...state.data.results[index], ...action.payload.updatedData };
      }
    },

    removeSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.data.results = state.data.results.filter((item: Survey) => item.id !== action.payload);
    },
  },
});

export const { requestFailure, fetchSuccess, createSuccess, updateSuccess, removeSuccess } =
  app.actions;

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

export const surveysReducer = app.reducer;
