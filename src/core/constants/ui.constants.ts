//	src/core/constants/ui.constants.ts
/**
 * UI-related constant definitions.
 */
export const ALERT_SEVERITY = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
} as const;

export const ALERT_TYPE = {
  TOAST: 'toast',
  ALERT: 'alert',
  NOTIFICATION: 'notification',
  PUSH: 'push',
} as const;

/**
 * Button size options.
 */
export const UI_COLOR_OPTIONS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

/**
 * Button variant options.
 */
export const UI_VARIANT_OPTIONS = {
  CONTAINED: 'contained',
  FILLED: 'filled',
  OUTLINED: 'outlined',
  TEXT: 'text',
} as const;
