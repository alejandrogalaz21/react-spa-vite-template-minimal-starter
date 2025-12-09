import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import type { Alert as AlertType } from '../../types/ui-types';

interface Props {
  type: AlertType['type'];
  fontSize?: 'inherit' | 'small' | 'medium' | 'large';
}

export const AlertIcon: React.FC<Props> = ({ type, fontSize = 'inherit' }) => {
  switch (type) {
    case 'success':
      return <CheckCircleIcon fontSize={fontSize} />;
    case 'error':
      return <ErrorIcon fontSize={fontSize} />;
    case 'info':
      return <InfoIcon fontSize={fontSize} />;
    case 'warning':
      return <WarningIcon fontSize={fontSize} />;
    default:
      return null;
  }
};
