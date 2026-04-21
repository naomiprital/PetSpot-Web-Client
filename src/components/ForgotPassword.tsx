import { useState } from 'react';
import { Box, Button, Link, InputBase, Typography, styled, alpha } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const inputSx = {
  backgroundColor: 'background.default',
  borderRadius: '0.6rem',
  padding: '0.6rem 0.9rem',
  fontSize: '0.95rem',
  color: 'text.primary',
  border: '0.09375rem solid transparent',
  '&:focus-within': {
    borderColor: 'primary.main',
  },
};

const errorInputSx = {
  ...inputSx,
  borderColor: 'error.main',
};

const InputLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 700,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  marginBottom: '0.25rem',
  letterSpacing: '0.03125rem',
}));

interface ForgotPasswordProps {
  initialEmail?: string;
  onBackToLogin: () => void;
  onSubmit?: (email: string) => void;
}

const ForgotPassword = ({ initialEmail = '', onBackToLogin, onSubmit }: ForgotPasswordProps) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: initialEmail },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onFormSubmit = () => {
    if (onSubmit) onSubmit(getValues('email'));
    setIsSubmitted(true);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
          <Box sx={{ position: 'relative' }}>
            <InputLabel>Email Address</InputLabel>
            <Box sx={errors.email ? errorInputSx : inputSx}>
              <InputBase
                fullWidth
                placeholder="name@example.com"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' },
                })}
                sx={{ fontSize: '0.95rem', color: 'text.primary' }}
              />
            </Box>
            {errors.email && (
              <Typography sx={{ color: 'error.main', fontSize: '0.7rem', position: 'absolute', bottom: '-1.125rem', marginLeft: '0.25rem', whiteSpace: 'nowrap' }}>
                {errors.email.message as string}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                py: 1.2,
                borderRadius: '0.75rem',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: `0 0.5rem 1rem ${theme.palette.primary.main}30`,
                '&:hover': {
                  boxShadow: `0 0.75rem 1.25rem ${theme.palette.primary.main}40`,
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Send Reset Link
            </Button>

            <Link
              component="button"
              onClick={(event) => {
                event.preventDefault();
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
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%',
              backgroundColor: alpha(theme.palette.success.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1
            }}
          >
            <CheckOutlinedIcon sx={{ color: theme.palette.success.main, fontSize: '2rem' }} />
          </Box>
          <Typography sx={{ fontWeight: 800, color: theme.palette.secondary.main, fontSize: '1.05rem' }}>
            Check your email
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem', textAlign: 'center', mb: 1 }}>
            We've sent a password reset link to <strong>{getValues('email')}</strong>
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={onBackToLogin}
            disableElevation
            sx={{
              py: 1.2,
              borderRadius: '0.75rem',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 700,
              backgroundColor: theme.palette.grey[200],
              color: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: theme.palette.grey[300],
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
