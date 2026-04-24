import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useState } from 'react';
import { GOOGLE_COLORS, GOOGLE_PHONE_DIALOG_COLORS } from '../theme/theme';
import { Box, Button, Divider, Typography, Dialog, InputBase } from '@mui/material';
import { useGoogleAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill={GOOGLE_COLORS.blue}
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill={GOOGLE_COLORS.green}
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill={GOOGLE_COLORS.yellow}
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill={GOOGLE_COLORS.red}
      />
    </g>
  </svg>
);

const GoogleLoginButton = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [tempGoogleResponse, setTempGoogleResponse] = useState<CredentialResponse | null>(null);

  const { mutateAsync: googleLoginMutation } = useGoogleAuth();

  const handleGoogleSuccess = (response: CredentialResponse) => {
    setTempGoogleResponse(response);
    setIsPhoneDialogOpen(true);
  };

  const handleCompleteLogin = async () => {
    if (!phoneNumber || phoneNumber.length < 9) {
      toast.error('Please enter a valid phone number');
      return;
    }

    try {
      setIsGoogleLoading(true);
      setIsPhoneDialogOpen(false);

      if (tempGoogleResponse) {
        await googleLoginMutation({
          credentials: tempGoogleResponse,
          phoneNumber
        });
        toast.success('Login successful!');
      }
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error('Google authentication failed.');
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', whiteSpace: 'nowrap' }}>
            or
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            '&:hover .visual-button': {
              borderColor: 'grey.400',
              backgroundColor: 'grey.50',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            },
          }}
        >
          <Button
            className="visual-button"
            disabled={isGoogleLoading}
            fullWidth
            variant="outlined"
            startIcon={<GoogleLogo />}
            sx={{
              py: 1.1,
              borderRadius: '0.75rem',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              borderColor: 'grey.300',
              color: 'text.primary',
              backgroundColor: 'background.paper',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              transition: 'all 0.2s ease',
              pointerEvents: 'none',
            }}
          >
            {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
          </Button>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.01,
              zIndex: 10,
              cursor: 'pointer',
              overflow: 'hidden',
              '& .S67S5ce-oZ7hBy': {
                width: '100% !important',
                height: '100% !important',
              },
            }}
          >
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              width="400"
              theme="outline"
              size="large"
              shape="rectangular"
            />
          </Box>
        </Box>
      </Box>

      <Dialog
        open={isPhoneDialogOpen}
        onClose={() => !isGoogleLoading && setIsPhoneDialogOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '2rem',
            padding: '2.5rem 2rem',
            width: '100%',
            maxWidth: 'min(90vw, 24rem)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{
            width: 56,
            height: 56,
            borderRadius: '1.125rem',
            backgroundColor: GOOGLE_PHONE_DIALOG_COLORS.lightOrange,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2.5
          }}>
            <GoogleLogo />
          </Box>

          <Typography sx={{
            fontSize: '1.35rem',
            fontWeight: 700,
            color: GOOGLE_PHONE_DIALOG_COLORS.darkText,
            mb: 0.75,
            textAlign: 'center'
          }}>
            Verify your phone
          </Typography>

          <Typography sx={{
            fontSize: '0.85rem',
            color: GOOGLE_PHONE_DIALOG_COLORS.grayText,
            textAlign: 'center',
            mb: 3.5,
            fontWeight: 500
          }}>
            To continue, we need your phone number.
          </Typography>

          <Box sx={{ width: '100%', mb: 4 }}>
            <Typography sx={{
              fontSize: '0.7rem',
              fontWeight: 800,
              color: GOOGLE_PHONE_DIALOG_COLORS.lightGrayText,
              mb: 1,
              letterSpacing: '0.05em'
            }}>
              PHONE NUMBER
            </Typography>
            <Box sx={{
              backgroundColor: 'background.default',
              borderRadius: '1rem',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <InputBase
                fullWidth
                placeholder="+1 (555) 000-0000"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'text.secondary',
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
            <Button
              onClick={() => setIsPhoneDialogOpen(false)}
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: '1rem',
                backgroundColor: GOOGLE_PHONE_DIALOG_COLORS.cancelBg,
                color: GOOGLE_PHONE_DIALOG_COLORS.cancelText,
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: GOOGLE_PHONE_DIALOG_COLORS.cancelHover,
                }
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCompleteLogin}
              variant="contained"
              disabled={isGoogleLoading}
              sx={{
                flex: 1.8,
                py: 1.5,
                borderRadius: '1rem',
                backgroundColor: GOOGLE_PHONE_DIALOG_COLORS.orange,
                color: 'white',
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: GOOGLE_PHONE_DIALOG_COLORS.orangeHover,
                  boxShadow: 'none',
                },
                '&.Mui-disabled': {
                  backgroundColor: GOOGLE_PHONE_DIALOG_COLORS.orangeDisabled,
                  color: 'white'
                }
              }}
            >
              {isGoogleLoading ? 'Connecting...' : 'Complete Setup'}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default GoogleLoginButton;
