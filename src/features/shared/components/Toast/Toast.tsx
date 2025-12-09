import React from 'react';
import { Alert, Slide, AlertTitle } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { AlertIcon } from '@/features/shared/components/UI';
import type { ToastItem } from '@/features/shared/types/toast.types';

/**
 * ✨ Fade + slide-down animation for each toast.
 */
const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/**
 * 🎨 Styled MUI Alert for toast appearance.
 */
const StyledToast = styled(Alert)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  minWidth: 280,
  maxWidth: 600,
  padding: theme.spacing(1.5, 3),
  fontWeight: 500,
  boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
  animation: `${fadeInDown} .35s ease-out`,
  textAlign: 'center',
  pointerEvents: 'auto',

  // ⭐ Make title and message align with same right padding
  '& .MuiAlertTitle-root': {
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(0.5),
    width: '100%',
    textAlign: 'center',
  },

  '& .MuiAlert-message': {
    paddingRight: theme.spacing(3),
    width: '100%',
    textAlign: 'center',
  },
}));

/**
 * 🧩 Toast Component
 *
 * UI-only toast element.
 * Displays a single toast message with icon, animation, and close support.
 */
export const Toast: React.FC<{
  toast: ToastItem;
  index: number;
  onClose: (id: string) => void;
}> = ({ toast, index, onClose }) => {
  return (
    <Slide
      direction="down"
      in={true}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 300 + index * 100, exit: 200 }}
    >
      <StyledToast
        icon={<AlertIcon type={toast.type} />}
        severity={toast.type}
        variant="filled"
        onClose={() => onClose(toast.id)}
      >
        {/* ⭐ Optional title */}
        {toast.title && <AlertTitle>{toast.title}</AlertTitle>}

        {toast.message}
      </StyledToast>
    </Slide>
  );
};
