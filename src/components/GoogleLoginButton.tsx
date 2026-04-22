import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { GOOGLE_COLORS } from '../theme/theme';
import { Box, Button, Divider, Typography } from '@mui/material';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);

        // 1. Fetch the user's profile info directly from Google using the token
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const googleUser = await userInfoResponse.json();

        // 2. Package the data EXACTLY how your backend controller expects it
        const backendPayload = {
          email: googleUser.email,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name || '', // Some users don't have last names on Google
          imageUrl: googleUser.picture,
        };

        // 3. Mock the backend call (Ready for when your backend is live!)
        console.log('Ready to send to backend:', backendPayload);

        /* // LATER: Replace the console.log with your actual API call:
        const response = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(backendPayload)
        });
        const data = await response.json();
        // Save data.accessToken to localStorage and redirect!
        */
      } catch (error) {
        console.error('Failed to fetch Google user info', error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google Login Failed:', error);
    },
  });

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', whiteSpace: 'nowrap' }}>
            or
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        <Button
          disabled={isLoading}
          onClick={() => handleGoogleLogin()}
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
            '&:hover': {
              borderColor: 'grey.400',
              backgroundColor: 'grey.50',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            },
          }}
        >
          {isLoading ? 'Connecting...' : 'Continue with Google'}
        </Button>
      </Box>
    </>
  );
};

export default GoogleLoginButton;
