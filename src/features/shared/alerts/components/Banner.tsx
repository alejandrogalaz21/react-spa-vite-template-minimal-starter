// src/features/shared/alerts/components/Banner.tsx

import { Alert as MuiAlert } from '@mui/material';
import { AlertDefault } from '@/core/types/ui.types';

export const Banner = ({ message, severity }: AlertDefault) => {
  return (
    <MuiAlert severity={severity} variant="outlined">
      {message}
    </MuiAlert>
  );
};
