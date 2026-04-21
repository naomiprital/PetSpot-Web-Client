import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const StyledInput = styled(TextField)(({ theme }) => ({
  position: 'relative',
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: '-18px',
    marginLeft: '4px',
    fontSize: '0.7rem',
    whiteSpace: 'nowrap',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F8FAFC',
    borderRadius: '12px',
    '& fieldset': {
      border: '1px solid transparent',
    },
    '&:hover fieldset': {
      border: '1px solid transparent',
    },
    '&.Mui-focused fieldset': {
      border: `2px solid ${theme.palette.primary.main}20`,
    },
    '&.Mui-error fieldset': {
      border: `1px solid ${theme.palette.error.main}`,
    },
  },
  '& .MuiInputBase-input': {
    padding: '14px 16px',
    fontSize: '0.95rem',
  },
}));

const InputLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 700,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  marginBottom: '8px',
  letterSpacing: '0.5px',
}));

interface ForgotPasswordProps {
  initialEmail?: string;
  onBackToLogin: () => void;
  onSubmit?: (email: string) => void;
}

const ForgotPassword = ({ initialEmail = '', onBackToLogin, onSubmit }: ForgotPasswordProps) => {
  const theme = useTheme();
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (onSubmit) onSubmit(email);
      setIsSubmitted(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.secondary.main, mb: 0.5, fontSize: '1.25rem' }}>
          Reset Password
        </Typography>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.85rem' }}>
          Enter your email to receive a reset link.
        </Typography>
      </Box>

      {!isSubmitted ? (
        <>
          <Box>
            <InputLabel>Email Address</InputLabel>
            <StyledInput
              fullWidth
              placeholder="name@example.com"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              error={!!error}
              helperText={error}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                py: 1.6,
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: `0 8px 16px ${theme.palette.primary.main}30`,
                '&:hover': {
                  boxShadow: `0 12px 20px ${theme.palette.primary.main}40`,
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Send Reset Link
            </Button>

            <Link
              component="button"
              onClick={(e) => {
                e.preventDefault();
                onBackToLogin();
              }}
              underline="none"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: '0.85rem',
                fontWeight: 700,
                textAlign: 'center',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              Back to Login
            </Link>
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 1, pb: 2, gap: 1.5 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1
            }}
          >
            <CheckOutlinedIcon sx={{ color: '#22c55e', fontSize: 32 }} />
          </Box>
          <Typography sx={{ fontWeight: 800, color: theme.palette.secondary.main, fontSize: '1.05rem' }}>
            Check your email
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem', textAlign: 'center', mb: 1 }}>
            We've sent a password reset link to <strong>{email}</strong>
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={onBackToLogin}
            disableElevation
            sx={{
              py: 1.2,
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 700,
              backgroundColor: '#F1F5F9',
              color: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: '#e2e8f0',
              },
            }}
          >
            Back to Login
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ForgotPassword;
