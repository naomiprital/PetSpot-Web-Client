import { Box, Button, Link, InputBase, Typography, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import GoogleLoginButton from './GoogleLoginButton';

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

interface LoginProps {
  onForgotPassword?: (email: string) => void;
}

const Login = ({ onForgotPassword }: LoginProps) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: loginMutation, isPending: isPendingLogin } = useLogin();
  const onSubmit = async (data: any) => {
    try {
      await loginMutation(data);
      toast.success('Welcome back!');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
    >
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
          <Typography
            sx={{
              color: 'error.main',
              fontSize: '0.7rem',
              position: 'absolute',
              bottom: '-1.125rem',
              marginLeft: '0.25rem',
              whiteSpace: 'nowrap',
            }}
          >
            {errors.email.message as string}
          </Typography>
        )}
      </Box>

      <Box sx={{ position: 'relative' }}>
        <InputLabel>Password</InputLabel>
        <Box sx={errors.password ? errorInputSx : inputSx}>
          <InputBase
            fullWidth
            placeholder="••••••••"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 5, message: 'Password must be at least 5 characters' },
            })}
            sx={{ fontSize: '0.95rem', color: 'text.primary' }}
          />
        </Box>
        {errors.password && (
          <Typography
            sx={{
              color: 'error.main',
              fontSize: '0.7rem',
              position: 'absolute',
              bottom: '-1.125rem',
              marginLeft: '0.25rem',
              whiteSpace: 'nowrap',
            }}
          >
            {errors.password.message as string}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -1 }}>
        <Link
          component="button"
          onClick={(event) => {
            event.preventDefault();
            if (onForgotPassword) onForgotPassword(getValues('email'));
          }}
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
        type="submit"
        variant="contained"
        disabled={isPendingLogin}
        sx={{
          mt: 0.5,
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
        {isPendingLogin ? 'Logging in...' : 'Welcome Back!'}
      </Button>
      <GoogleLoginButton />
    </Box>
  );
};

export default Login;
