import { useState } from 'react';
import { Box, Typography, Button, Divider, Chip, alpha, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { StatusEnum } from '../../utils/consts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import moment from 'moment';
import AreYouSureDialog from '../components/AreYouSureDialog';
import type { Listing } from '../components/ListingCard';

interface UserListingProps {
  listing: Listing;
}

const UserListing = ({ listing }: UserListingProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);

  const onResolveListing = (listing: Listing) => {
    // TODO: API call
    // make sure a reunion is updated in the top profile section

    setResolveDialogOpen(false);
  };

  return (
    <Box
      key={listing.id}
      sx={{
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
        backgroundColor: 'background.paper',
        position: 'relative',
      }}
      onClick={() => {
        // TODO: Open listing details dialog
      }}
    >
      <Box sx={{ filter: listing.isResolved ? 'grayscale(0.7) opacity(0.8)' : 'none' }}>
        <Box sx={{ position: 'relative', height: '14rem' }}>
          <img
            src={listing.imageUrl}
            alt="Pet image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              overflow: 'hidden',
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
                backgroundColor: listing.status === StatusEnum.LOST ? 'error.main' : 'success.main',
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
                  onClick={() => {
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
                  onClick={() => {
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
                  onClick={() => {
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
              <AreYouSureDialog
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={() => {
                  // TODO: handle delete listing
                  setDeleteDialogOpen(false);
                }}
                action="delete"
              />
              <AreYouSureDialog
                isOpen={resolveDialogOpen}
                onClose={() => setResolveDialogOpen(false)}
                onConfirm={() => {
                  // TODO: handle resolve listing
                  onResolveListing(listing);
                  setResolveDialogOpen(false);
                }}
                action="resolve"
              />
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
  );
};

export default UserListing;
