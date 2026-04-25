import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import moment from 'moment';
import ListingForm, { type FormValues } from './ListingForm';
import { getLocalDateTimeString } from '../../utils/utilsFunctions';
import type { ListingType, Listing } from '../types/Listing';
import { useUpdateListing } from '../hooks/useListings';

interface EditListingDialogProps {
  open: boolean;
  onClose: () => void;
  listing: Listing;
}

const EditListingDialog = ({ open, onClose, listing }: EditListingDialogProps) => {
  const { mutateAsync: updateListing, isPending: isUpdatePending } = useUpdateListing();

  if (!listing) return null;

  const currentValues: FormValues = {
    listingType: listing.listingType as ListingType,
    animalType: listing.animalType,
    contactNumber: listing.author.phoneNumber,
    location: listing.location,
    lastSeen: getLocalDateTimeString(listing.lastSeen),
    image: listing.imageUrl as string | FileList | null,
    description: listing.description,
  };

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
      } else if (typeof data.image === 'string') {
        formData.append('imageUrl', data.image);
      }

      await updateListing({ listingId: listing._id, formData });
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
        isPending={isUpdatePending}
      />
    </Dialog>
  );
};

export default EditListingDialog;
