import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import ListingForm, { type FormValues } from './ListingForm';
import { getLocalDateTimeString } from '../../utils/utilsFunctions';
import { ListingTypeEnum } from '../types/Listing';
import { useCreateListing } from '../hooks/useListings';
import moment from 'moment';
import { useMemo } from 'react';
import { useUser } from '../hooks/useUsers';

interface PublishReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PublishReportDialog = ({ isOpen, onClose }: PublishReportDialogProps) => {
  const { mutateAsync: createListing, isPending: isCreateListingPending } = useCreateListing();
  const { data: user } = useUser();

  const emptyValues = useMemo(() => {
    return {
      listingType: ListingTypeEnum.LOST,
      animalType: '',
      contactNumber: user?.phoneNumber,
      location: '',
      lastSeen: getLocalDateTimeString(),
      image: null,
      description: '',
    } as unknown as FormValues;
  }, [isOpen, user?.phoneNumber]);

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();

      formData.append('listingType', data.listingType);
      formData.append('animalType', data.animalType);
      formData.append('location', data.location);
      formData.append('description', data.description);
      formData.append('lastSeen', moment(data.lastSeen).valueOf().toString());

      if (data.image instanceof FileList && data.image.length > 0) {
        formData.append('image', data.image[0]);
      }

      await createListing(formData);

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
        isPending={isCreateListingPending}
      />
    </Dialog>
  );
};

export default PublishReportDialog;
