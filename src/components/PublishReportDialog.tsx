import {
  alpha,
  Avatar,
  Box,
  Dialog,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Controller, useForm } from 'react-hook-form';
import { AnimalsEnum, StatusEnum } from '../../utils/consts';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const getLocalDateTimeString = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 16);
};

interface FormValues {
  listingType: (typeof StatusEnum)[keyof typeof StatusEnum];
  animalType: string;
  contactNumber: string;
  lastSeenLocation: string;
  dateTime: string;
  image: FileList | null;
  description: string;
}

interface PublishReportDialogProps {
  open: boolean;
  onClose: () => void;
}

const inputSx = {
  backgroundColor: 'background.default',
  borderRadius: '0.6rem',
  padding: '0.6rem 0.9rem',
  fontSize: '0.95rem',
  color: 'text.primary',
  border: '1.5px solid transparent',
  '&:focus-within': {
    borderColor: 'primary.main',
  },
};

const errorInputSx = {
  ...inputSx,
  borderColor: 'error.main',
};

const FormFieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontSize: '0.75rem',
      fontWeight: 700,
      color: 'text.secondary',
      marginBottom: '0.4rem',
    }}
  >
    {children}
  </Typography>
);

const FormFieldBox = ({
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

const PublishReportDialog = ({ open, onClose }: PublishReportDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      listingType: StatusEnum.LOST,
      animalType: '',
      contactNumber: '',
      lastSeenLocation: '',
      dateTime: getLocalDateTimeString(),
      image: null,
      description: '',
    },
  });

  const handleClose = () => {
    reset({
      ...{
        listingType: StatusEnum.LOST,
        animalType: '',
        contactNumber: '',
        lastSeenLocation: '',
        dateTime: getLocalDateTimeString(),
        image: null,
        description: '',
      },
    });
    setPreviewUrl(null);
    setFileName(null);
    onClose();
  };

  const onSubmit = async () => {
    try {
      // TODO: replace with API call
      toast.success('Report published successfully!');
      handleClose();
    } catch (error) {
      toast.error('Failed to publish report. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      setValue('image', e.target.files);
    }
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPreviewUrl(null);
    setFileName(null);
    setValue('image', null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      sx={{
        '& .MuiDialog-paper': {
          width: { xs: '100%', sm: '42rem' },
          maxWidth: '42rem',
          borderRadius: '1.2rem',
          margin: { xs: '1rem', sm: '2rem' },
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.4rem 1.6rem 1rem',
          borderBottom: 1,
          borderColor: 'grey.200',
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: 'text.primary' }}>
          Publish New Report
        </Typography>
        <IconButton onClick={handleClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
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
                  sx={{
                    display: 'flex',
                    borderRadius: '0.6rem',
                    padding: '0.2rem',
                    gap: '0.2rem',
                  }}
                >
                  {Object.values(StatusEnum).map((status) => (
                    <Box
                      key={status}
                      onClick={() => field.onChange(status)}
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
                          field.value === status
                            ? `1.5px solid ${status === StatusEnum.LOST ? theme.palette.error.main : theme.palette.success.main}`
                            : `1.5px solid ${theme.palette.grey[400]}`,
                        color:
                          field.value === status
                            ? status === StatusEnum.LOST
                              ? 'error.main'
                              : 'success.main'
                            : 'text.secondary',
                        backgroundColor:
                          field.value === status
                            ? status === StatusEnum.LOST
                              ? alpha(theme.palette.error.main, 0.06)
                              : alpha(theme.palette.success.main, 0.06)
                            : 'background.default',
                      })}
                    >
                      {status.toUpperCase()}
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
                  {Object.values(AnimalsEnum).map((animalType) => (
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
            <Box sx={errors.contactNumber ? errorInputSx : inputSx}>
              <InputBase
                placeholder="+972 50-123-4567"
                fullWidth
                {...register('contactNumber', {
                  required: 'Contact number is required',
                  pattern: { value: /^[+\d\s\-().]{7,20}$/, message: 'Enter a valid phone number' },
                })}
                sx={{ fontSize: '0.95rem', color: 'text.primary' }}
              />
            </Box>
            {errors.contactNumber && (
              <Typography sx={{ color: 'error.main', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {errors.contactNumber.message}
              </Typography>
            )}
          </FormFieldBox>

          <FormFieldBox>
            <FormFieldLabel>LAST SEEN LOCATION</FormFieldLabel>
            <Box sx={errors.lastSeenLocation ? errorInputSx : inputSx}>
              <InputBase
                placeholder="Central Park West..."
                fullWidth
                {...register('lastSeenLocation', { required: 'Location is required' })}
                sx={{ fontSize: '0.95rem', color: 'text.primary' }}
              />
            </Box>
            {errors.lastSeenLocation && (
              <Typography sx={{ color: 'error.main', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {errors.lastSeenLocation.message}
              </Typography>
            )}
          </FormFieldBox>
        </Box>

        <Box sx={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <FormFieldBox>
            <FormFieldLabel>DATE & TIME</FormFieldLabel>
            <Box
              sx={{
                ...(errors.dateTime ? errorInputSx : inputSx),
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
                {...register('dateTime', { required: 'Date and time is required' })}
              />
            </Box>
            {errors.dateTime && (
              <Typography sx={{ color: 'error.main', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {errors.dateTime.message}
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
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      overflow: 'hidden',
                    }}
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
          <FormFieldLabel>DETAILED DESCRIPTION</FormFieldLabel>
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
      </Box>
      <Box
        component="button"
        type="submit"
        onClick={handleSubmit(onSubmit)}
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
        })}
      >
        Publish Report
      </Box>
    </Dialog>
  );
};

export default PublishReportDialog;
