import { useState } from 'react';
import { Box, Typography, Button, Divider, Chip, alpha, Tooltip, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { StatusEnum } from '../../utils/consts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import moment from 'moment';
import AreYouSureDialog from '../components/AreYouSureDialog';
import type { Listing } from '../components/ListingCard';
import ListingDetailsDialog from './ListingDetailsDialog';

interface UserListingProps {
  listing: Listing;
  onBoost: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isUserBoostedListing: (listing: Listing) => boolean;
}

const UserListing = ({ listing, onBoost, isUserBoostedListing }: UserListingProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);
  const [listingDetailsDialogOpen, setListingDetailsDialogOpen] = useState(false);

  const onResolveListing = (listing: Listing) => {
    // TODO: API call
    // make sure a reunion is updated in the top profile section

    setResolveDialogOpen(false);
  };

  return (
    <>
      <Box
        onClick={() => setListingDetailsDialogOpen(true)}
        key={listing.id}
        sx={{
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
          backgroundColor: 'background.paper',
          position: 'relative',
          '&:hover .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          },
          cursor: 'pointer',
        }}
      >
        <Box sx={{ filter: listing.isResolved ? 'grayscale(0.7) opacity(0.8)' : 'none' }}>
          <Box sx={{ position: 'relative', height: '14rem' }}>
            <CardMedia
              component="img"
              image={listing.imageUrl}
              alt="Listing image"
              sx={{
                height: '14rem',
                transition: 'transform 0.3s ease',
              }}
            />
          </Box>
          <Box sx={{ padding: '1rem' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <Chip
                label={listing.status.toUpperCase()}
                sx={{
                  backgroundColor:
                    listing.status === StatusEnum.LOST ? 'error.main' : 'success.main',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                }}
              />
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                {moment(listing.date).format('DD/MM/YYYY')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <LocationOnIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'text.primary',
                }}
              >
                {listing.location}
              </Typography>
            </Box>
          </Box>
          {listing.isResolved ? (
            false
          ) : (
            <>
              <Divider sx={{ borderColor: 'grey.200' }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip arrow title="Edit Listing" placement="top">
                  <Button
                    fullWidth
                    onClick={(event) => {
                      event.stopPropagation();
                      /* TODO: Edit listing */
                    }}
                    sx={(theme) => ({
                      color: 'error.main',
                      padding: '1rem 0',
                      borderRadius: 0,
                      '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.1) },
                    })}
                  >
                    <EditIcon sx={{ fontSize: '1.2rem', color: 'text.secondary' }} />
                  </Button>
                </Tooltip>
                <Divider orientation="vertical" flexItem sx={{ borderColor: 'grey.200' }} />
                <Tooltip arrow title="Resolve Listing" placement="top">
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      setResolveDialogOpen(true);
                    }}
                    fullWidth
                    sx={(theme) => ({
                      color: 'text.secondary',
                      padding: '1rem 0',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                      },
                    })}
                  >
                    <CheckIcon sx={{ fontSize: '1.2rem', color: 'success.main' }} />
                  </Button>
                </Tooltip>
                <Divider orientation="vertical" flexItem sx={{ borderColor: 'grey.200' }} />
                <Tooltip arrow title="Delete Listing" placement="top">
                  <Button
                    fullWidth
                    onClick={(event) => {
                      event.stopPropagation();
                      setDeleteDialogOpen(true);
                    }}
                    sx={(theme) => ({
                      color: 'error.main',
                      padding: '1rem 0',
                      borderRadius: 0,
                      '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.1) },
                    })}
                  >
                    <DeleteIcon sx={{ fontSize: '1.2rem' }} />
                  </Button>
                </Tooltip>
              </Box>
            </>
          )}
        </Box>
        <Box>
          {listing.isResolved ? (
            <Chip
              label={'RESOLVED'}
              sx={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                zIndex: 100,
                backgroundColor: 'success.main',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '1rem',
                filter: 'none',
              }}
            />
          ) : (
            false
          )}
        </Box>
      </Box>
      <AreYouSureDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          // TODO: handle delete listing
          setDeleteDialogOpen(false);
        }}
        action="delete"
      />
      <AreYouSureDialog
        open={resolveDialogOpen}
        onClose={() => setResolveDialogOpen(false)}
        onConfirm={() => {
          // TODO: handle resolve listing
          onResolveListing(listing);
          setResolveDialogOpen(false);
        }}
        action="resolve"
      />
      <ListingDetailsDialog
        open={listingDetailsDialogOpen}
        onClose={() => (setListingDetailsDialogOpen(false), console.log('here'))}
        listing={listing}
        onBoost={onBoost}
        isUserBoostedListing={isUserBoostedListing}
      />
    </>
  );
};

export default UserListing;
