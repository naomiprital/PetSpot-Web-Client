import { useState } from 'react';
import { Box, Typography, Button, Divider, alpha, InputBase } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useUser, useUpdateUser } from '../hooks/useUsers';
import { toast } from 'react-toastify';
import { SERVER_BASE_URL } from '../../utils/consts';
import { formatPhoneNumber, cleanPhoneNumber } from '../../utils/utilsFunctions';


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

interface ProfileHeaderCardProps {
  reportsCount: number;
  reunionsCount: number;
}

const ProfileHeaderCard = ({ reportsCount, reunionsCount }: ProfileHeaderCardProps) => {
  const { data: user } = useUser();
  const { mutateAsync: updateUserMutation } = useUpdateUser();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    imageUrl: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const memberSinceYear = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : new Date().getFullYear();

  const handleEditClick = () => {
    if (!user) return;
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      imageUrl: user.imageUrl || '',
    });
    setSelectedFile(null);
    setIsEditingProfile(true);
  };

  const handleCancel = () => {
    setIsEditingProfile(false);
  };

  const handleSave = async () => {
    if (!user) return;
    if (!editForm.firstName.trim() || !editForm.lastName.trim() || !editForm.phoneNumber.trim()) {
      toast.error('All fields are required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('firstName', editForm.firstName);
      formData.append('lastName', editForm.lastName);
      formData.append('phoneNumber', editForm.phoneNumber);

      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      await updateUserMutation({
        userId: user._id,
        formData,
      });

      setIsEditingProfile(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile.';
      toast.error(errorMessage);
    }
  };

  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setEditForm((prev) => ({ ...prev, imageUrl: url }));
  };

  const displayAvatarUrl = isEditingProfile
    ? selectedFile
      ? editForm.imageUrl
      : `${SERVER_BASE_URL}${user?.imageUrl}`
    : `${SERVER_BASE_URL}${user?.imageUrl}`;

  const displayName = user ? `${user.firstName} ${user.lastName}` : '';

  return (
    <Box
      sx={{
        borderRadius: '1rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        backgroundColor: 'background.paper',
        position: 'relative',
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
        component={isEditingProfile ? 'label' : 'div'}
        htmlFor={isEditingProfile ? 'avatar-upload' : undefined}
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
          cursor: isEditingProfile ? 'pointer' : 'default',
        }}
      >
        <img
          src={displayAvatarUrl}
          alt={displayName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {isEditingProfile && (
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
        id="avatar-upload"
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
          {isEditingProfile ? (
            <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Box sx={{ ...inputSx, width: '10rem' }}>
                <InputBase
                  value={editForm.firstName}
                  onChange={(event) => setEditForm({ ...editForm, firstName: event.target.value })}
                  placeholder="First Name"
                  sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'text.primary', width: '100%' }}
                />
              </Box>
              <Box sx={{ ...inputSx, width: '10rem' }}>
                <InputBase
                  value={editForm.lastName}
                  onChange={(event) => setEditForm({ ...editForm, lastName: event.target.value })}
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

        {isEditingProfile ? (
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
            {isEditingProfile ? (
              <Box sx={{ ...inputSx, mt: '0.15rem', width: '11rem' }}>
                <InputBase
                  value={formatPhoneNumber(editForm.phoneNumber)}
                  onChange={(event) =>
                    setEditForm({ ...editForm, phoneNumber: cleanPhoneNumber(event.target.value) })
                  }
                  placeholder="Phone number"
                  sx={{ fontSize: '1rem', color: 'text.primary', width: '100%' }}
                />
              </Box>
            ) : (
              <Typography sx={{ fontSize: '1rem', color: 'text.primary' }}>
                {formatPhoneNumber(user.phoneNumber)}
              </Typography>
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
  );
};

export default ProfileHeaderCard;
