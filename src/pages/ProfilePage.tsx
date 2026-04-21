import { useMemo } from 'react';
import { Box, Typography, Button, Divider, Chip, alpha } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useUser } from '../context/UserContext';
import { useListings } from '../context/ListingsContext';
import { StatusEnum } from '../../utils/consts';
import UserListing from '../components/UserListing';
import type { Listing } from '../components/ListingCard';

interface ProfilePageProps {
  onBoost: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isUserBoostedListing: (listing: Listing) => boolean;
}

const ProfilePage = ({ onBoost, isUserBoostedListing }: ProfilePageProps) => {
  const user = useUser();
  const listings = useListings();

  const memberSinceYear = new Date(user.createdAt).getFullYear();

  const userListings = useMemo(
    () => listings.filter((listing) => listing.userId === user.id),
    [listings, user.id]
  );

  const reportsCount = userListings.length;

  const reunionsCount = useMemo(
    () => userListings.filter((listing) => listing.status === StatusEnum.FOUND).length,
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
      <Box
        sx={{
          borderRadius: '1rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          backgroundColor: 'background.paper',
          position: 'relative',
          width: { xs: '100%', sm: '90%' },
        }}
      >
        <Box
          sx={(theme) => ({
            height: '9rem',
            borderRadius: '1rem 1rem 0 0',
            background: theme.palette.primary.main,
          })}
        />
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '6rem', sm: '6rem' },
            left: '2rem',
            width: { xs: '5rem', sm: '7rem' },
            height: { xs: '5rem', sm: '7rem' },
            borderRadius: '1rem',
            border: '3px solid white',
            boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
            overflow: 'hidden',
          }}
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'flex-end' },
            paddingTop: { xs: 'calc(2.5rem + 0.75rem)', sm: '2rem' },
            paddingBottom: '1.5rem',
            paddingLeft: {
              xs: '2rem',
              sm: '10rem',
            },
            paddingRight: '2rem',
            gap: { xs: '1rem', sm: 0 },
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {user.name}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: 'text.secondary', marginTop: '0.2rem' }}>
              Community Member Since {memberSinceYear}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => {
              /* TODO: open edit dialog */
            }}
            sx={(theme) => ({
              borderColor: 'grey.400',
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: '0.6rem',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: alpha(theme.palette.text.secondary, 0.1),
              },
            })}
          >
            Edit Profile
          </Button>
        </Box>
        <Divider sx={{ borderColor: 'grey.200' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            padding: { xs: '1.5rem 2rem', sm: '1.5rem 3rem' },
            gap: { xs: '1.5rem', sm: 0 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: '1rem', sm: '5rem' },
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <EmailIcon sx={{ fontSize: '0.85rem', color: 'text.secondary' }} />
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'text.secondary' }}>
                  EMAIL ADDRESS
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '1rem', color: 'text.primary' }}>{user.email}</Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <PhoneIcon sx={{ fontSize: '0.85rem', color: 'text.secondary' }} />
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'text.secondary' }}>
                  PHONE NUMBER
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '1rem', color: 'text.primary' }}>{user.phone}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: { xs: '2.5rem', sm: '5rem' }, alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: 'primary.main' }}>
                {reportsCount}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'text.secondary' }}>
                REPORTS
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: 'success.main' }}>
                {reunionsCount}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'text.secondary' }}>
                REUNIONS
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: { xs: '100%', sm: '90%' }, mt: '2rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Your Listings
          </Typography>
          <Chip
            label={userListings.length}
            size="small"
            sx={(theme) => ({
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              fontWeight: 700,
              fontSize: '0.9rem',
            })}
          />
        </Box>

        {userListings.length === 0 ? (
          <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
            You haven't posted any listings yet.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: '1.5rem',
            }}
          >
            {userListings.map((listing) => (
              <UserListing
                listing={listing}
                onBoost={onBoost}
                isUserBoostedListing={isUserBoostedListing}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
