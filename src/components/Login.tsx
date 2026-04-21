import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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

interface LoginProps {
  onLogin?: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && onLogin) {
      onLogin();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Box>

      <Box>
        <InputLabel>Password</InputLabel>
        <StyledInput
          fullWidth
          placeholder="••••••••"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          error={!!errors.password}
          helperText={errors.password}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -1 }}>
        <Link
          href="#"
          underline="none"
          sx={{
            color: theme.palette.primary.main,
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          Forgot Password?
        </Link>
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{
          mt: 1,
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
        Welcome Back!
      </Button>
    </Box>
  );
};

export default Login;
