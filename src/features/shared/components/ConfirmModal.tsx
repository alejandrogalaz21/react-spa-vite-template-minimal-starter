// src/features/shared/components/ConfirmModal.tsx
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({ open, title, content, onConfirm, onCancel }: ConfirmModalProps) => (
  <Dialog
    fullWidth
    maxWidth="xs"
    open={open}
    onClose={onCancel}
    PaperProps={{ sx: { borderRadius: 0 } }}
  >
    <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

    {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

    <DialogActions>
      <Button variant="outlined" color="inherit" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onConfirm} variant="contained" color="primary">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);
