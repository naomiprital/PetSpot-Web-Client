import {
  alpha,
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AnimalTypeEnum, LISTING_TYPES, ListingTypeEnum, type ListingType } from '../types/Listing';
import { useSuggestDescription } from '../hooks/useAi';

export interface FormValues {
  listingType: ListingType;
  animalType: string;
  contactNumber: string;
  location: string;
  lastSeen: string;
  image: string | FileList | null;
  description: string;
}

interface ListingFormProps {
  defaultValues: FormValues;
  submitButtonText: string;
  onSubmit: (data: FormValues) => void;
  isPending?: boolean;
}

const inputSx = {
  backgroundColor: 'background.default',
  borderRadius: '0.6rem',
  padding: '0.6rem 0.9rem',
  fontSize: '0.95rem',
  color: 'text.primary',
  border: '1.5px solid transparent',
  '&:focus-within': { borderColor: 'primary.main' },
};

const errorInputSx = { ...inputSx, borderColor: 'error.main' };

export const FormFieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', marginBottom: '0.4rem' }}
  >
    {children}
  </Typography>
);

export const FormFieldBox = ({
  children,
  fullWidth,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', flex: fullWidth ? '1 1 100%' : '1 1 0' }}>
    {children}
  </Box>
);

const ListingForm = ({
  defaultValues,
  submitButtonText,
  onSubmit,
  isPending,
}: ListingFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { mutateAsync: suggestDescription, isPending: isAiAnalyzing } = useSuggestDescription();

  const getPreviewAndName = (image: string | FileList | null) => {
    if (typeof image === 'string') {
      return { url: image, name: 'Current Image' };
    }
    if (image instanceof FileList && image.length > 0) {
      return { url: URL.createObjectURL(image[0]), name: image[0].name };
    }
    return { url: null, name: null };
  };
  const initialPreview = getPreviewAndName(defaultValues.image);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreview.url);
  const [fileName, setFileName] = useState<string | null>(initialPreview.name);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
    const { url, name } = getPreviewAndName(defaultValues.image);
    setPreviewUrl(url);
    setFileName(name);

    if (defaultValues.image instanceof FileList && defaultValues.image.length > 0) {
      setUploadedFile(defaultValues.image[0]);
    } else {
      setUploadedFile(null);
    }
  }, [defaultValues, reset]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      setValue('image', event.target.files);
      setUploadedFile(file);
    }
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPreviewUrl(null);
    setFileName(null);
    setValue('image', null);
    setUploadedFile(null);

    setValue('description', '');
    setValue('animalType', '');

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerateAiSuggestion = async () => {
    if (!uploadedFile) return;

    try {
      const suggestion = await suggestDescription(uploadedFile);

      if (suggestion) {
        setValue('description', suggestion.description, { shouldValidate: true });
        if (suggestion.animalType) {
          setValue('animalType', suggestion.animalType.toLowerCase(), { shouldValidate: true });
        }
        toast.success('AI suggestion applied!');
      }
    } catch (error) {
      toast.error('Failed to generate suggestion.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        padding: '1.4rem 1.6rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        overflowY: 'auto',
        maxHeight: { xs: '62rem', sm: '50rem' },
      }}
    >
      <Box sx={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <FormFieldBox>
          <FormFieldLabel>LISTING TYPE</FormFieldLabel>
          <Controller
            name="listingType"
            control={control}
            render={({ field }) => (
              <Box
                sx={{ display: 'flex', borderRadius: '0.6rem', padding: '0.2rem', gap: '0.2rem' }}
              >
                {Object.values(LISTING_TYPES).map((listingType) => (
                  <Box
                    key={listingType}
                    onClick={() => field.onChange(listingType)}
                    sx={(theme) => ({
                      flex: 1,
                      textAlign: 'center',
                      padding: '0.5rem 0.9rem',
                      borderRadius: '0.5rem',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      height: '3rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border:
                        field.value === listingType
                          ? `1.5px solid ${listingType === ListingTypeEnum.LOST ? theme.palette.error.main : theme.palette.success.main}`
                          : `1.5px solid ${theme.palette.grey[400]}`,
                      color:
                        field.value === listingType
                          ? listingType === ListingTypeEnum.LOST
                            ? 'error.main'
                            : 'success.main'
                          : 'text.secondary',
                      backgroundColor:
                        field.value === listingType
                          ? listingType === ListingTypeEnum.LOST
                            ? alpha(theme.palette.error.main, 0.06)
                            : alpha(theme.palette.success.main, 0.06)
                          : 'background.default',
                    })}
                  >
                    {listingType.toUpperCase()}
                  </Box>
                ))}
              </Box>
            )}
          />
        </FormFieldBox>

        <FormFieldBox>
          <FormFieldLabel>ANIMAL TYPE</FormFieldLabel>
          <Controller
            name="animalType"
            control={control}
            rules={{ required: 'Animal type is required' }}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={{
                  backgroundColor: 'background.default',
                  borderRadius: '0.6rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: errors.animalType ? '1.5px solid' : 'none',
                    borderColor: errors.animalType ? 'error.main' : 'transparent',
                  },
                  fontSize: '0.95rem',
                }}
              >
                <MenuItem value="" disabled>
                  <Typography sx={{ color: 'text.secondary' }}>Select animal...</Typography>
                </MenuItem>
                {Object.values(AnimalTypeEnum).map((animalType) => (
                  <MenuItem key={animalType} value={animalType}>
                    {animalType}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.animalType && (
            <Typography sx={{ color: 'error.main', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {errors.animalType.message}
            </Typography>
          )}
        </FormFieldBox>
      </Box>

      <Box sx={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <FormFieldBox>
          <FormFieldLabel>CONTACT NUMBER</FormFieldLabel>
          <Box
            sx={{
              ...inputSx,
            }}
          >
            <Tooltip title={'To change contact number, please update your profile settings'} arrow>
              <InputBase
                disabled
                placeholder={defaultValues.contactNumber}
                fullWidth
                sx={{
                  fontSize: '0.95rem',
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: (theme) => theme.palette.text.primary,
                  },
                }}
              />
            </Tooltip>
          </Box>
        </FormFieldBox>

        <FormFieldBox>
          <FormFieldLabel>LAST SEEN LOCATION</FormFieldLabel>
          <Box sx={errors.location ? errorInputSx : inputSx}>
            <InputBase
              placeholder="Central Park West..."
              fullWidth
              {...register('location', { required: 'Location is required' })}
              sx={{ fontSize: '0.95rem', color: 'text.primary' }}
            />
          </Box>
          {errors.location && (
            <Typography sx={{ color: 'error.main', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {errors.location.message}
            </Typography>
          )}
        </FormFieldBox>
      </Box>

      <Box sx={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <FormFieldBox>
          <FormFieldLabel>DATE & TIME</FormFieldLabel>
          <Box
            sx={{
              ...(errors.lastSeen ? errorInputSx : inputSx),
              '& input': {
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.95rem',
                color: 'text.primary',
                fontFamily: 'inherit',
                cursor: 'pointer',
              },
            }}
          >
            <input
              type="datetime-local"
              {...register('lastSeen', { required: 'Date and time is required' })}
            />
          </Box>
          {errors.lastSeen && (
            <Typography sx={{ color: 'error.main', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {errors.lastSeen.message}
            </Typography>
          )}
        </FormFieldBox>

        <FormFieldBox>
          <FormFieldLabel>IMAGE UPLOAD</FormFieldLabel>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: previewUrl ? 'space-between' : 'center',
              gap: '0.5rem',
              backgroundColor: 'background.default',
              borderRadius: '0.6rem',
              padding: '0.6rem 0.9rem',
              border: '1.5px dashed',
              borderColor: 'grey.300',
              cursor: 'pointer',
              '&:hover': { borderColor: 'primary.main' },
              overflow: 'hidden',
            }}
          >
            {previewUrl ? (
              <>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}
                >
                  <Avatar
                    src={previewUrl}
                    variant="rounded"
                    sx={{ width: '2rem', height: '2rem', flexShrink: 0 }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: 'text.secondary',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {fileName}
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
            ) : (
              <>
                <CameraAltIcon sx={{ color: 'text.secondary', fontSize: '1.1rem' }} />
                <Typography sx={{ fontSize: '0.95rem', color: 'text.secondary' }}>
                  Upload Photo
                </Typography>
              </>
            )}
          </Box>
        </FormFieldBox>
      </Box>

      <FormFieldBox fullWidth>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.4rem',
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary' }}>
            DETAILED DESCRIPTION
          </Typography>
          {isAiAnalyzing ? (
            <Typography
              sx={{
                fontSize: '0.72rem',
                color: 'primary.main',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              ✨ AI is analyzing image...
            </Typography>
          ) : uploadedFile ? (
            <Box
              onClick={handleGenerateAiSuggestion}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                cursor: 'pointer',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.4rem',
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                color: 'primary.main',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15),
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 700 }}>
                ✨ Generate with AI
              </Typography>
            </Box>
          ) : null}
        </Box>

        <Box sx={errors.description ? errorInputSx : inputSx}>
          <InputBase
            placeholder="Include details like breed, collar color, behavior, etc."
            fullWidth
            multiline
            rows={3}
            {...register('description', { required: 'Description is required' })}
            sx={{ fontSize: '0.95rem', color: 'text.primary' }}
          />
        </Box>
        {errors.description && (
          <Typography sx={{ color: 'error.main', fontSize: '0.75rem', marginTop: '0.25rem' }}>
            {errors.description.message}
          </Typography>
        )}
      </FormFieldBox>

      <Button
        disabled={isPending}
        type="submit"
        sx={(theme) => ({
          padding: '1rem',
          margin: '0 1rem 1rem 1rem',
          borderRadius: '0.6rem',
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          fontWeight: 700,
          fontSize: '1rem',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.85) },
          textTransform: 'none',
        })}
      >
        {submitButtonText}
      </Button>
    </Box>
  );
};

export default ListingForm;
