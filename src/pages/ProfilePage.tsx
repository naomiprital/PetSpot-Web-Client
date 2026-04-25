import { useMemo } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { useUser } from '../hooks/useUsers';
import UserListingCard from '../components/UserListingCard';
import ProfileHeaderCard from '../components/ProfileHeaderCard';
import { useListings } from '../hooks/useListings';
import type { Listing } from '../types/Listing';

const ProfilePage = () => {
  const { data: listings } = useListings();
  const { data: user } = useUser();

  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Please log in to view your profile.</Typography>
      </Box>
    );
  }

  const userListings = useMemo(
    () => listings?.filter((listing: Listing) => listing.author?._id === user._id),
    [listings, user._id]
  );

  const reportsCount = userListings?.length || 0;

  const reunionsCount = useMemo(
    () =>
      userListings?.filter((listing) => listing.listingType === 'found' && listing.isResolved)
        .length || 0,
    [userListings]
  );

  return (
    <Box
      sx={{
        padding: { xs: '1rem', sm: '2rem 0' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ width: { xs: '100%', sm: '90%' } }}>
        <ProfileHeaderCard reportsCount={reportsCount} reunionsCount={reunionsCount} />
      </Box>

      <Box sx={{ width: { xs: '100%', sm: '90%' }, mt: '2rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Your Listings
          </Typography>
          <Chip
            label={userListings?.length}
            size="small"
            sx={(theme) => ({
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              fontWeight: 700,
              fontSize: '0.9rem',
            })}
          />
        </Box>

        {userListings?.length === 0 ? (
          <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
            You haven't posted any listings yet.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: '1.5rem',
            }}
          >
            {userListings?.map((listing) => (
              <UserListingCard key={listing._id} listing={listing} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
