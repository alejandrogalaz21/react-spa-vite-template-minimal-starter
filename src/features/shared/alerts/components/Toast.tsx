// src/features/shared/alerts/components/Toast.tsx

import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { ToastAlert } from '@/core/types/ui.types';

export const Toast = ({ id, message, severity }: ToastAlert) => {
  return (
    <Snackbar open autoHideDuration={null}>
      <MuiAlert severity={severity} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
