// src/core/types/ui.types.ts
// `C` is used with `typeof C.SOMETHING` in type positions and requires a value import.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import * as C from './../constants';

/**
 * Type representing different alert types.
 */
export type AlertSeverity = (typeof C.ALERT_SEVERITY)[keyof typeof C.ALERT_SEVERITY];

/**
 * Type representing different alert types.
 */
export type AlertType = (typeof C.ALERT_TYPE)[keyof typeof C.ALERT_TYPE];

/**
 * Type representing an alert object.
 */
export type AlertBase = {
  id: string;
  title?: string;
  message: string;
  severity: AlertSeverity;
  dismissible?: boolean;
};

export type AlertDefault = AlertBase & {
  type: typeof C.ALERT_TYPE.ALERT;
};

export type ToastAlert = AlertBase & {
  type: typeof C.ALERT_TYPE.TOAST;
  durationMs?: number;
};

export type NotificationAlert = AlertBase & {
  type: typeof C.ALERT_TYPE.NOTIFICATION;
  read?: boolean;
  actionLabel?: string;
};

export type Alert = AlertDefault | ToastAlert | NotificationAlert;

/**
 * Type representing different button variants.
 */
export type ButtonVariant = (typeof C.UI_VARIANT_OPTIONS)[keyof typeof C.UI_VARIANT_OPTIONS];

/**
 * Type representing different button colors.
 */
export type ButtonColor = (typeof C.UI_COLOR_OPTIONS)[keyof typeof C.UI_COLOR_OPTIONS];
