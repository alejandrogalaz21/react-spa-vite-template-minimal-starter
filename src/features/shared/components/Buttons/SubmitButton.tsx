import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';

interface SubmitButtonProps extends ButtonProps {
  isSubmitting: boolean;
  loadingText?: string;
  idleText: string;
  updateText?: string;
  isUpdate?: boolean;
}

/**
 * 🧩 Reusable Submit Button for Forms
 *
 * - Muestra spinner mientras envía
 * - Soporta modo update/create
 * - Compatible con todos los props de MUI Button
 * - Evita dobles envíos
 */
export const SubmitButton = React.memo(
  ({
    isSubmitting,
    loadingText = 'Saving...',
    idleText,
    updateText,
    isUpdate = false,
    disabled,
    ...buttonProps
  }: SubmitButtonProps) => {
    return (
      <Button type="submit" disabled={isSubmitting || disabled} {...buttonProps}>
        {isSubmitting ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            {loadingText}
          </>
        ) : isUpdate && updateText ? (
          updateText
        ) : (
          idleText
        )}
      </Button>
    );
  }
);
