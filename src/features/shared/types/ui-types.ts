/**
 * The set of allowed alert/notification types used throughout the UI.
 *
 * Possible values:
 * - "success" — indicates a successful operation.
 * - "error" — indicates a failure or error condition.
 * - "info" — conveys general information to the user.
 * - "warning" — signals a potential issue that may require attention.
 *
 * Use this type to constrain alert components and APIs to these specific semantic values.
 */
export type AlertType = 'success' | 'error' | 'info' | 'warning';

/**
 * Represents a UI alert containing a human-readable message and its category/severity.
 *
 * @remarks
 * This type is intended for transient notifications shown to the user (for example:
 * errors, warnings, informational hints, or success confirmations). The `type`
 * property references {@link AlertType}, which defines the allowed alert categories.
 *
 * @example
 * const alert: Alert = {
 *   id: "alert-123",
 *   message: "Upload completed successfully.",
 *   type: "success"
 * };
 *
 * Properties:
 * - id: Unique identifier for the alert (auto-generated if not provided).
 * - message: The text to display to the user.
 * - type: The alert category or severity (see {@link AlertType}).
 */
export type Alert = {
  id: string;
  message: string;
  type: AlertType;
};
