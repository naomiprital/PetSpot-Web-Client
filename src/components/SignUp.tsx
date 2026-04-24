import React, { useState, useRef } from 'react';
import { Box, Button, Typography, InputBase, styled, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useForm } from 'react-hook-form';
import { useRegister, useLogin } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext';

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

const SignUp = () => {
  const theme = useTheme();
  const { setUser } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      profileImage: null as FileList | null,
    },
  });

  const registerMutation = useRegister();
  const loginMutation = useLogin();
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const profileImageFiles = watch('profileImage');

  const handleFile = (file: File, fileList?: FileList) => {
    if (!file.type.startsWith('image/')) return;

    if (fileList) {
      setValue('profileImage', fileList);
    } else {
      const dt = new DataTransfer();
      dt.items.add(file);
      setValue('profileImage', dt.files);
    }
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFile(event.target.files[0], event.target.files);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFile(event.dataTransfer.files[0], event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setValue('profileImage', null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onInvalid = () => {
    toast.error('Please check the form for errors.');
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phoneNumber', data.phone);
      formData.append('password', data.password);
      
      if (data.profileImage && data.profileImage.length > 0) {
        formData.append('image', data.profileImage[0]);
      }

      const response: any = await registerMutation.mutateAsync(formData);

      let loggedInUser = response.user || response;
      let token = response.token || response.accessToken;
      let refreshToken = response.refreshToken;
      if (!token) {
        try {
          const loginResponse: any = await loginMutation.mutateAsync({
            email: data.email,
            password: data.password,
          });
          loggedInUser = loginResponse.user || loginResponse;
          token = loginResponse.token || loginResponse.accessToken;
          refreshToken = loginResponse.refreshToken;
        } catch (loginError) {
          toast.info('Registration successful! Please log in.');
          return;
        }
      }

      if (token) {
        localStorage.setItem('token', token);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      const userId = loggedInUser._id || loggedInUser.id;

      setUser(loggedInUser);
      toast.success('Registration successful!');

      if (userId) {
        localStorage.setItem('userId', userId);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <InputLabel>First Name</InputLabel>
          <Box sx={errors.firstName ? errorInputSx : inputSx}>
            <InputBase
              fullWidth
              placeholder="John"
              {...register('firstName', { required: 'First Name is required' })}
              sx={{ fontSize: '0.95rem', color: 'text.primary' }}
            />
          </Box>
          {errors.firstName && (
            <Typography sx={{ color: 'error.main', fontSize: '0.7rem', position: 'absolute', bottom: '-1.125rem', marginLeft: '0.25rem', whiteSpace: 'nowrap' }}>
              {errors.firstName.message as string}
            </Typography>
          )}
        </Box>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <InputLabel>Last Name</InputLabel>
          <Box sx={errors.lastName ? errorInputSx : inputSx}>
            <InputBase
              fullWidth
              placeholder="Doe"
              {...register('lastName', { required: 'Last Name is required' })}
              sx={{ fontSize: '0.95rem', color: 'text.primary' }}
            />
          </Box>
          {errors.lastName && (
            <Typography sx={{ color: 'error.main', fontSize: '0.7rem', position: 'absolute', bottom: '-1.125rem', marginLeft: '0.25rem', whiteSpace: 'nowrap' }}>
              {errors.lastName.message as string}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <InputLabel>Email Address</InputLabel>
        <Box sx={errors.email ? errorInputSx : inputSx}>
          <InputBase
            fullWidth
            placeholder="name@example.com"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
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

      <Box sx={{ position: 'relative' }}>
        <InputLabel>Phone Number</InputLabel>
        <Box sx={errors.phone ? errorInputSx : inputSx}>
          <InputBase
            fullWidth
            placeholder="+1 (555) 000-0000"
            type="tel"
            {...register('phone', { required: 'Phone Number is required' })}
            sx={{ fontSize: '0.95rem', color: 'text.primary' }}
          />
        </Box>
        {errors.phone && (
          <Typography sx={{ color: 'error.main', fontSize: '0.7rem', position: 'absolute', bottom: '-1.125rem', marginLeft: '0.25rem', whiteSpace: 'nowrap' }}>
            {errors.phone.message as string}
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
              minLength: { value: 5, message: 'Password must be at least 5 characters' }
            })}
            sx={{ fontSize: '0.95rem', color: 'text.primary' }}
          />
        </Box>
        {errors.password && (
          <Typography sx={{ color: 'error.main', fontSize: '0.7rem', position: 'absolute', bottom: '-1.125rem', marginLeft: '0.25rem', whiteSpace: 'nowrap' }}>
            {errors.password.message as string}
          </Typography>
        )}
      </Box>

      <Box>
        <InputLabel>Profile Image</InputLabel>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <Box
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: previewUrl ? 'space-between' : 'center',
            gap: 1,
            backgroundColor: theme.palette.background.default,
            border: previewUrl ? `0.125rem solid ${theme.palette.primary.main}40` : `0.125rem dashed ${theme.palette.grey[400]}`,
            borderRadius: '0.75rem',
            padding: previewUrl ? '0.375rem 0.625rem' : '0.625rem 0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: `${theme.palette.primary.main}05`,
            },
          }}
        >
          {!previewUrl ? (
            <>
              <CloudUploadOutlinedIcon sx={{ color: theme.palette.text.secondary, fontSize: '1.2rem' }} />
              <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem', fontWeight: 500 }}>
                Tap to upload your photo
              </Typography>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '0.5rem',
                    objectFit: 'cover',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '12.5rem',
                  }}
                >
                  {profileImageFiles?.[0]?.name}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={handleRemoveImage}
                sx={{ color: 'error.main', flexShrink: 0, padding: '0.1rem' }}
              >
                <RemoveCircleIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={registerMutation.isPending}
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
        {registerMutation.isPending ? 'Joining...' : 'Join the Community'}
      </Button>
    </Box>
  );
};

export default SignUp;
