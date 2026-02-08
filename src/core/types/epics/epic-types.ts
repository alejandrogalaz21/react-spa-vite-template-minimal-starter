// src/types/epic.types.ts

// library types
import type { AxiosInstance } from 'axios';
import type { Epic } from 'redux-observable';
import type { UnknownAction } from '@reduxjs/toolkit';

// custom types
import type { ReduxState } from '../redux/redux-types';
import type { AppActions } from '../redux/app-actions.types';

/**
 * Single action type used across epics when a concrete action union is needed.
 */
export type AppAction = AppActions | UnknownAction;

/**
 * Type for the dependencies injected into epics.
 *
 * @typedef {Object} EpicDependencies
 * @property {AxiosInstance} api - The Axios instance for making API calls.
 * @property {any} socket - The socket instance for real-time communication.
 */
export type EpicDependencies = {
  api: AxiosInstance;
  socket?: any;
};

/**
 * Type for the application's epics.
 *
 * @typedef {Epic} AppEpic
 * @template InputAction - The type of actions that can be dispatched.
 * @template OutputAction - The type of actions that can be emitted.
 * @template State - The type of the global Redux state.
 * @template Dependencies - The type of dependencies injected into the epic.
 */
export type AppEpic = Epic<
  /* InputAction: stream of actions : all the actions that can be dispatched */
  AppActions | UnknownAction,
  /* OutputAction: all the actions that can be emitted (typed or untyped) */
  AppActions | UnknownAction,
  /* State: global state type */
  ReduxState,
  /* Dependencies: dependencies injected into the epic */
  EpicDependencies
>;
