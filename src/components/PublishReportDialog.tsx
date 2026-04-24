import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { ListingTypeEnum } from '../../utils/consts';
import ListingForm, { type FormValues } from './ListingForm';
import { getLocalDateTimeString } from '../../utils/utilsFunctions';

interface PublishReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PublishReportDialog = ({ isOpen, onClose }: PublishReportDialogProps) => {
  const emptyValues: FormValues = {
    status: ListingTypeEnum.LOST,
    animalType: '',
    contactNumber: '',
    lastSeenLocation: '',
    dateTime: getLocalDateTimeString(),
    image: null,
    description: '',
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // TODO: replace with API call
      toast.success('Report published successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to publish report. Please try again.');
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}
      sx={{
        '& .MuiDialog-paper': {
          width: { xs: '100%', sm: '42rem' },
          maxWidth: '42rem',
          borderRadius: '1.2rem',
          margin: { xs: '1rem', sm: '2rem' },
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.4rem 1.6rem 1rem',
          borderBottom: 1,
          borderColor: 'grey.200',
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: 'text.primary' }}>
          Publish New Report
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <ListingForm
        defaultValues={emptyValues}
        submitButtonText="Publish Report"
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};

export default PublishReportDialog;
