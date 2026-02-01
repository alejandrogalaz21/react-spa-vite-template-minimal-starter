// src/features/shared/alerts/components/Notification.tsx

import { Card, CardContent, Button, Typography } from '@mui/material';
import { NotificationAlert } from '@/core/types/ui.types';

export const Notification = ({ message, actionLabel }: NotificationAlert) => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography>{message}</Typography>
        {actionLabel && <Button sx={{ mt: 1 }}>{actionLabel}</Button>}
      </CardContent>
    </Card>
  );
};
