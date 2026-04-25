import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: string;
}

const AreYouSureDialog = ({ open, onClose, onConfirm, action }: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title">
      <DialogTitle
        sx={{ padding: '2rem 0 1rem 2rem', fontSize: '1.4rem', fontWeight: 'bold' }}
      >{`Confirm ${action}`}</DialogTitle>
      <DialogContent sx={{ padding: '2rem' }}>
        <DialogContentText sx={{ fontSize: '1.2rem' }}>
          {`Are you sure you want to ${action} this post? This action cannot be undone.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{ display: 'flex', justifyContent: 'right', gap: '2rem', padding: '0 2rem 1rem 2rem' }}
      >
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          variant="contained"
          autoFocus
        >
          Confirm Action
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AreYouSureDialog;
