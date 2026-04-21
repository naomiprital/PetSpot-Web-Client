import { useMemo, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  alpha,
  InputBase,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useUser } from '../context/UserContext';
import { useListings } from '../context/ListingsContext';
import { StatusEnum } from '../../utils/consts';
import UserListing from '../components/UserListing';
import { toast } from 'react-toastify';

const inputSx = {
  backgroundColor: 'background.default',
  borderRadius: '0.6rem',
  padding: '0.45rem 0.75rem',
  fontSize: '0.95rem',
  color: 'text.primary',
  border: '0.09375rem solid transparent',
  '&:focus-within': {
    borderColor: 'primary.main',
  },
} as const;

const ProfilePage = () => {
  const { user, updateUser } = useUser();
  const listings = useListings();

  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAvatarUrl, setEditAvatarUrl] = useState('');
  const avatarInputRef = useRef<HTMLInputElement>(null);

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

  const handleEditClick = () => {
    setEditFirstName(user.firstName);
    setEditLastName(user.lastName);
    setEditPhone(user.phone);
    setEditAvatarUrl(user.avatarUrl);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!editFirstName.trim()) {
      toast.error('First name cannot be empty.');
      return;
    }

    if (!editLastName.trim()) {
      toast.error('Last name cannot be empty.');
      return;
    }

    if (!editPhone.trim()) {
      toast.error('Phone number cannot be empty.');
      return;
    }

    updateUser({
      firstName: editFirstName.trim(),
      lastName: editLastName.trim(),
      phone: editPhone.trim(),
      avatarUrl: editAvatarUrl,
    });
    setIsEditing(false);
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setEditAvatarUrl(url);
  };

  const displayAvatarUrl = isEditing ? editAvatarUrl : user.avatarUrl;
  const displayName = `${user.firstName} ${user.lastName}`;

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
            cursor: isEditing ? 'pointer' : 'default',
          }}
          onClick={isEditing ? () => avatarInputRef.current?.click() : undefined}
        >
          <img
            src={displayAvatarUrl}
            alt={displayName}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {isEditing && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.6rem',
              }}
            >
              <CameraAltIcon sx={{ color: 'white', fontSize: '1.8rem' }} />
            </Box>
          )}
        </Box>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleAvatarFileChange}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'flex-end' },
            paddingTop: { xs: 'calc(2.5rem + 0.75rem)', sm: '2rem' },
            paddingBottom: '1.5rem',
            paddingLeft: { xs: '2rem', sm: '10rem' },
            paddingRight: '2rem',
            gap: { xs: '1rem', sm: 0 },
          }}
        >
          <Box>
            {isEditing ? (
              <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Box sx={{ ...inputSx, width: '10rem' }}>
                  <InputBase
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    placeholder="First Name"
                    sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'text.primary', width: '100%' }}
                  />
                </Box>
                <Box sx={{ ...inputSx, width: '10rem' }}>
                  <InputBase
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    placeholder="Last Name"
                    sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'text.primary', width: '100%' }}
                  />
                </Box>
              </Box>
            ) : (
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {displayName}
              </Typography>
            )}
            <Typography sx={{ fontSize: '1rem', color: 'text.secondary', marginTop: '0.2rem' }}>
              Community Member Since {memberSinceYear}
            </Typography>
          </Box>

          {isEditing ? (
            <Box sx={{ display: 'flex', gap: '0.75rem' }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  borderColor: 'grey.400',
                  color: 'text.secondary',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  borderRadius: '0.6rem',
                  fontSize: '1rem',
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  textTransform: 'none',
                  fontWeight: 'bold',
                  borderRadius: '0.6rem',
                  fontSize: '1rem',
                }}
              >
                Save Changes
              </Button>
            </Box>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditClick}
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
          )}
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
              {isEditing ? (
                <Box sx={{ ...inputSx, mt: '0.15rem', width: '11rem' }}>
                  <InputBase
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="Phone number"
                    sx={{ fontSize: '1rem', color: 'text.primary', width: '100%' }}
                  />
                </Box>
              ) : (
                <Typography sx={{ fontSize: '1rem', color: 'text.primary' }}>{user.phone}</Typography>
              )}
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
              <UserListing listing={listing} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
