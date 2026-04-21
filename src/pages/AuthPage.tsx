import { useState } from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import PetSpotIcon from '../components/PetSpotIcon';
import { useTheme } from '@mui/material/styles';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

interface AuthPageProps {
  onLogin?: () => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);

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
            onClick={() => setIsLogin(true)}
            disableElevation
            variant={isLogin ? 'contained' : 'text'}
            sx={{
              borderRadius: '10px',
              py: 1.2,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: isLogin ? theme.palette.primary.main : theme.palette.text.secondary,
              backgroundColor: isLogin ? '#FFFFFF' : 'transparent',
              boxShadow: isLogin ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
              '&:hover': {
                backgroundColor: isLogin ? '#FFFFFF' : 'transparent',
              },
            }}
          >
            Login
          </Button>
          <Button
            fullWidth
            onClick={() => setIsLogin(false)}
            disableElevation
            variant={!isLogin ? 'contained' : 'text'}
            sx={{
              borderRadius: '10px',
              py: 1.2,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: !isLogin ? theme.palette.primary.main : theme.palette.text.secondary,
              backgroundColor: !isLogin ? '#FFFFFF' : 'transparent',
              boxShadow: !isLogin ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
              '&:hover': {
                backgroundColor: !isLogin ? '#FFFFFF' : 'transparent',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Dynamic Form Component */}
        {isLogin ? <Login onLogin={onLogin} /> : <SignUp onLogin={onLogin} />}
      </Card>
    </Box>
  );
};

export default AuthPage;
