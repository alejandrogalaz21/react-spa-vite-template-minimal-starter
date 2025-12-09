import React from 'react';
import { Stack } from '@mui/material';
import { styled } from '@mui/system';
import { Toast } from './Toast';
import type { ToastItem } from '@features/shared/types/toast.types';

/**
 * 📦 Fixed-position container for toast notifications.
 */
const Container = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 64,
  left: 0,
  right: 0,
  zIndex: ((theme.zIndex as any)?.snackbar ?? 1400) + 10,
  display: 'flex',
  justifyContent: 'center',
  pointerEvents: 'none',
  padding: theme.spacing(0, 2),
}));

/**
 * 🧩 ToastList
 *
 * Purely visual component that renders a stack of toasts.
 *
 * @example
 * <ToastList toasts={items} onClose={handleClose} />
 */
export const ToastList: React.FC<{
  toasts: ToastItem[];
  onClose: (id: string) => void;
}> = ({ toasts, onClose }) => {
  if (!toasts.length) return null;

  return (
    <Container>
      <Stack spacing={1} sx={{ maxWidth: 600, width: '100%' }}>
        {toasts.map((toast, index) => (
          <Toast key={toast.id} toast={toast} index={index} onClose={onClose} />
        ))}
      </Stack>
    </Container>
  );
};
