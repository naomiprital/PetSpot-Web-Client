import React, { useState, useRef } from 'react';
import { Box, Button, Typography, TextField, styled, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseIcon from '@mui/icons-material/Close';

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

interface SignUpProps {
  onLogin?: () => void;
}

const SignUp = ({ onLogin }: SignUpProps) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    profileImage: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setFormData({ ...formData, profileImage: file });
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData({ ...formData, profileImage: null });
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) { newErrors.firstName = 'First Name is required'; valid = false; }
    if (!formData.lastName.trim()) { newErrors.lastName = 'Last Name is required'; valid = false; }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
      valid = false;
    }

    if (!formData.phone.trim()) { newErrors.phone = 'Phone Number is required'; valid = false; }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && onLogin) {
      onLogin(); // We call onLogin for now to let them enter the app
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ display: 'flex', gap: 2.5 }}>
        <Box sx={{ flex: 1 }}>
          <InputLabel>First Name</InputLabel>
          <StyledInput 
            fullWidth 
            placeholder="John" 
            variant="outlined" 
            value={formData.firstName}
            onChange={handleChange('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <InputLabel>Last Name</InputLabel>
          <StyledInput 
            fullWidth 
            placeholder="Doe" 
            variant="outlined" 
            value={formData.lastName}
            onChange={handleChange('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Box>
      </Box>

      <Box>
        <InputLabel>Email Address</InputLabel>
        <StyledInput 
          fullWidth 
          placeholder="name@example.com" 
          type="email" 
          variant="outlined" 
          value={formData.email}
          onChange={handleChange('email')}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Box>

      <Box>
        <InputLabel>Phone Number</InputLabel>
        <StyledInput 
          fullWidth 
          placeholder="+1 (555) 000-0000" 
          type="tel" 
          variant="outlined" 
          value={formData.phone}
          onChange={handleChange('phone')}
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </Box>

      <Box>
        <InputLabel>Password</InputLabel>
        <StyledInput 
          fullWidth 
          placeholder="••••••••" 
          type="password" 
          variant="outlined" 
          value={formData.password}
          onChange={handleChange('password')}
          error={!!errors.password}
          helperText={errors.password}
        />
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
            backgroundColor: '#F8FAFC',
            border: previewUrl ? `2px solid ${theme.palette.primary.main}40` : '2px dashed #CBD5E1',
            borderRadius: '12px',
            padding: previewUrl ? '8px 12px' : '14px 16px',
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
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
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
                    maxWidth: '200px',
                  }}
                >
                  {formData.profileImage?.name}
                </Typography>
              </Box>
              <IconButton
                onClick={handleRemoveImage}
                size="small"
                sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.error.main } }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
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
        Join the Community
      </Button>
    </Box>
  );
};

export default SignUp;
