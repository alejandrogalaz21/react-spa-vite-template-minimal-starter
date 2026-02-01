/**
 * Represents the status of an asynchronous operation.
 *
 * @remarks
 * Used to track the current state of async processes such as data fetching or submitting.
 *
 * @enum {string}
 * @property {Idle}    The operation has not started.
 * @property {Loading} The operation is currently in progress.
 * @property {Success} The operation completed successfully.
 * @property {Error}   The operation failed.
 */
export enum ASYNC_STATUS {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
  NotFound = 'not_found',
}
