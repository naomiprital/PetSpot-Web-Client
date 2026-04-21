import { useState } from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import PetSpotIcon from '../components/PetSpotIcon';
import { useTheme } from '@mui/material/styles';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';

interface AuthPageProps {
  onLogin?: () => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const theme = useTheme();
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgotPassword'>('login');
  const [resetEmail, setResetEmail] = useState('');

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
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
              filter: 'blur(15px)',
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
            letterSpacing: '-0.5px',
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
          maxWidth: 480,
          p: 5,
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0,0,0,0.02)',
        }}
      >
        {/* Toggle Container */}
        {authMode !== 'forgotPassword' && (
          <Box
            sx={{
              display: 'flex',
              backgroundColor: '#F1F5F9',
              borderRadius: '12px',
              p: 0.5,
              mb: 4,
            }}
          >
            <Button
              fullWidth
              onClick={() => setAuthMode('login')}
              disableElevation
              variant={authMode === 'login' ? 'contained' : 'text'}
              sx={{
                borderRadius: '10px',
                py: 1.2,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: authMode === 'login' ? theme.palette.primary.main : theme.palette.text.secondary,
                backgroundColor: authMode === 'login' ? '#FFFFFF' : 'transparent',
                boxShadow: authMode === 'login' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                '&:hover': {
                  backgroundColor: authMode === 'login' ? '#FFFFFF' : 'transparent',
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
                borderRadius: '10px',
                py: 1.2,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: authMode === 'signup' ? theme.palette.primary.main : theme.palette.text.secondary,
                backgroundColor: authMode === 'signup' ? '#FFFFFF' : 'transparent',
                boxShadow: authMode === 'signup' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                '&:hover': {
                  backgroundColor: authMode === 'signup' ? '#FFFFFF' : 'transparent',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}

        {/* Dynamic Form Component */}
        {authMode === 'login' && <Login onLogin={onLogin} onForgotPassword={(email) => { setResetEmail(email); setAuthMode('forgotPassword'); }} />}
        {authMode === 'signup' && <SignUp onLogin={onLogin} />}
        {authMode === 'forgotPassword' && <ForgotPassword initialEmail={resetEmail} onBackToLogin={() => setAuthMode('login')} />}
      </Card>
    </Box>
  );
};

export default AuthPage;
