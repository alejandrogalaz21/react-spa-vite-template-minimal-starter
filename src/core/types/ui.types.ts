import * as C from './../constants';

/**
 * Type representing different alert types.
 */
export type Alert = (typeof C.ALERT_TYPES)[keyof typeof C.ALERT_TYPES];

/**
 * Type representing different button variants.
 */
export type ButtonVariant = (typeof C.UI_VARIANT_OPTIONS)[keyof typeof C.UI_VARIANT_OPTIONS];

/**
 * Type representing different button colors.
 */
export type ButtonColor = (typeof C.UI_COLORS_OPTIONS)[keyof typeof C.UI_COLORS_OPTIONS];
