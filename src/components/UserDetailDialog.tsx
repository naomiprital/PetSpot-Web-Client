import { useMemo } from 'react';
import { Avatar, Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import type { User } from '../types/User';
import { SERVER_BASE_URL } from '../../utils/consts';
import { useListings } from '../hooks/useListings';
import { formatPhoneNumber } from '../../utils/utilsFunctions';


interface UserDetailDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const UserDetailDialog = ({ open, onClose, user }: UserDetailDialogProps) => {
  const { data: listings } = useListings();

  const { reportsCount, reunionsCount } = useMemo(() => {
    const userListings = listings.filter((listing) => listing.author.email === user?.email);
    return {
      reportsCount: userListings.length,
      reunionsCount: userListings.filter((listing) => listing.isResolved).length,
    };
  }, [listings, user?.email]);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth={false}
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          maxWidth: '28rem',
          borderRadius: '1.2rem',
          overflow: 'hidden',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box sx={{ position: 'relative', padding: '2rem 1.5rem' }}>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: 'text.secondary',
            backgroundColor: 'grey.100',
            '&:hover': {
              backgroundColor: 'grey.200',
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
        >
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={`${SERVER_BASE_URL}${user?.imageUrl}`}
              sx={{
                width: '6rem',
                height: '6rem',
                border: '4px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: 'text.primary' }}>
              {user?.firstName + ' ' + user?.lastName}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
              {user?.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <Box
            sx={{
              flex: 1,
              backgroundColor: 'grey.50',
              borderRadius: '0.8rem',
              padding: '1rem',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'text.primary' }}>
              {reportsCount}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'text.secondary',
                letterSpacing: '0.05em',
              }}
            >
              REPORTS
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundColor: 'grey.50',
              borderRadius: '0.8rem',
              padding: '1rem',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'success.main' }}>
              {reunionsCount}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'text.secondary',
                letterSpacing: '0.05em',
              }}
            >
              REUNIONS
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: '2rem' }}>
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'text.secondary',
              letterSpacing: '0.05em',
              marginBottom: '1rem',
            }}
          >
            CONTACT INFO
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <EmailIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
              <Typography sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
                {user?.email}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <PhoneIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
              <Typography sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
                {formatPhoneNumber(user?.phoneNumber)}
              </Typography>

            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default UserDetailDialog;
