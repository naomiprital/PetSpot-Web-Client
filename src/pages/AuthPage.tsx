import { useEffect, useState } from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import PetSpotIcon from '../components/PetSpotIcon';
import { useTheme } from '@mui/material/styles';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';
import { useUser } from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const theme = useTheme();
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgotPassword'>('login');
  const [resetEmail, setResetEmail] = useState('');

  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/', { replace: true });
    }
  }, [user, isLoading, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        padding: '1rem',
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ position: 'relative', mb: 1.5 }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '4.5rem',
              height: '4.5rem',
              backgroundColor: `${theme.palette.primary.main}20`,
              borderRadius: '50%',
              filter: 'blur(0.9375rem)',
              zIndex: 0,
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <PetSpotIcon size="3.5rem" iconSize="xl" />
          </Box>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: theme.palette.secondary.main,
            letterSpacing: '-0.03125rem',
            mb: 0.5,
          }}
        >
          PetSpot
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            fontSize: '0.95rem',
          }}
        >
          Reuniting best friends with their families.
        </Typography>
      </Box>

      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          p: { xs: 3, sm: 4 },
          borderRadius: '1.5rem',
          boxShadow: '0 1.25rem 2.5rem rgba(0, 0, 0, 0.04)',
          border: '0.0625rem solid rgba(0,0,0,0.02)',
        }}
      >
        {authMode !== 'forgotPassword' && (
          <Box
            sx={{
              display: 'flex',
              backgroundColor: theme.palette.grey[200],
              borderRadius: '0.75rem',
              p: 0.5,
              mb: 3,
            }}
          >
            <Button
              fullWidth
              onClick={() => setAuthMode('login')}
              disableElevation
              variant={authMode === 'login' ? 'contained' : 'text'}
              sx={{
                borderRadius: '0.625rem',
                py: 1.2,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                color:
                  authMode === 'login' ? theme.palette.primary.main : theme.palette.text.secondary,
                backgroundColor:
                  authMode === 'login' ? theme.palette.background.paper : 'transparent',
                boxShadow: authMode === 'login' ? '0 0.125rem 0.5rem rgba(0,0,0,0.05)' : 'none',
                '&:hover': {
                  backgroundColor:
                    authMode === 'login' ? theme.palette.background.paper : 'transparent',
                },
              }}
            >
              Login
            </Button>
            <Button
              fullWidth
              onClick={() => setAuthMode('signup')}
              disableElevation
              variant={authMode === 'signup' ? 'contained' : 'text'}
              sx={{
                borderRadius: '0.625rem',
                py: 1.2,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                color:
                  authMode === 'signup' ? theme.palette.primary.main : theme.palette.text.secondary,
                backgroundColor:
                  authMode === 'signup' ? theme.palette.background.paper : 'transparent',
                boxShadow: authMode === 'signup' ? '0 0.125rem 0.5rem rgba(0,0,0,0.05)' : 'none',
                '&:hover': {
                  backgroundColor:
                    authMode === 'signup' ? theme.palette.background.paper : 'transparent',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
        {authMode === 'login' && (
          <Login
            onForgotPassword={(email) => {
              setResetEmail(email);
              setAuthMode('forgotPassword');
            }}
          />
        )}
        {authMode === 'signup' && <SignUp />}
        {authMode === 'forgotPassword' && (
          <ForgotPassword initialEmail={resetEmail} onBackToLogin={() => setAuthMode('login')} />
        )}
      </Card>
    </Box>
  );
};

export default AuthPage;
