import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import ListingForm, { type FormValues } from './ListingForm';
import type { Listing } from './MainFeedListingCard';
import { getLocalDateTimeString } from '../../utils/utilsFunctions';
import type { ListingType } from '../types/Listing';

interface EditListingDialogProps {
  open: boolean;
  onClose: () => void;
  listing: Listing;
}

const EditListingDialog = ({ open, onClose, listing }: EditListingDialogProps) => {
  if (!listing) return null;

  const currentValues: FormValues = {
    listingType: listing.status as ListingType,
    animalType: listing.animal,
    contactNumber: listing.user.phone,
    location: listing.location,
    lastSeen: getLocalDateTimeString(listing.date),
    image: listing.imageUrl,
    description: listing.description,
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // TODO: replace with API call
      toast.success('Listing updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update listing. Please try again.');
    }
  };

  return (
    <Dialog
      open={open}
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
          Edit Listing
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <ListingForm
        defaultValues={currentValues}
        submitButtonText="Save Changes"
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};

export default EditListingDialog;
