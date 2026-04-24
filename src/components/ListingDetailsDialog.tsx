import {
  alpha,
  Avatar,
  Box,
  CardMedia,
  Chip,
  Dialog,
  Divider,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
} from '@mui/material';
import moment from 'moment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import UserDetailDialog from './UserDetailDialog';
import { ListingTypeEnum, type NewListing } from '../types/Listing';
import { SERVER_BASE_URL } from '../../utils/consts';
import useCreateComment from '../hooks/useComments';
import type { NewComment } from '../types/Comment';

interface DetailRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const DetailRow = ({ icon, title, value }: DetailRowProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Box
        sx={(theme) => ({
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.4rem',
        })}
      >
        {icon}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography>{value}</Typography>
      </Box>
    </Box>
  );
};

interface ListingDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  listing: NewListing;
  onBoostToggle: () => void;
  isUserBoostedListing: (listing: NewListing) => boolean;
}

const ListingDetailsDialog = ({
  open,
  onClose,
  listing,
  onBoostToggle,
  isUserBoostedListing,
}: ListingDetailsDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [userDetailDialogOpen, setUserDetailDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { mutateAsync: addComment } = useCreateComment();

  const handlePhoneClick = async () => {
    try {
      await navigator.clipboard.writeText(listing.author.phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };

  const handleAddComment = async () => {
    await addComment({
      listingId: listing._id,
      commentText: newComment,
    });
    setNewComment('');
  };

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        maxWidth={false}
        sx={{
          '& .MuiDialog-paper': {
            width: { xs: '100%', md: '55rem' },
            height: { xs: '90vh', md: '35rem' },
            maxWidth: '55rem',
            maxHeight: { xs: '90vh', md: 'none' },
            margin: { xs: '1rem', md: '2rem' },
            borderRadius: '1rem',
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '50% 50%' },
            gridTemplateRows: { xs: '35% 65%', md: '100%' },
            height: '100%',
          }}
        >
          <IconButton
            size="small"
            onClick={onClose}
            sx={(theme) => ({
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: alpha(theme.palette.background.default, 0.9),
              color: 'text.primary',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
              zIndex: 100,
            })}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <CardMedia
            component="img"
            image={`${SERVER_BASE_URL}${listing.imageUrl}`}
            alt="Listing image"
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              overflow: 'hidden',
            }}
          />
          <Box
            sx={{
              padding: { xs: '1rem', md: '1.5rem' },
              marginRight: { xs: '0', md: '0.5em' },
              marginBottom: { xs: '0', md: '0.5em' },
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '0.75rem', md: '1rem' },
              overflow: 'auto',
            }}
          >
            <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Chip
                label={listing.listingType
                  .toUpperCase()
                  .concat(' ')
                  .concat(listing.animalType.toUpperCase())}
                sx={(theme) => ({
                  backgroundColor:
                    listing.listingType === ListingTypeEnum.LOST
                      ? alpha(theme.palette.error.main, 0.2)
                      : alpha(theme.palette.success.main, 0.2),
                  color:
                    listing.listingType === ListingTypeEnum.LOST ? 'error.main' : 'success.main',
                  fontWeight: 'bold',
                  borderRadius: '1rem',
                })}
              />
              <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                Posted {moment(listing.createdAt).format('DD/MM/YYYY HH:mm')}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                borderRadius: '0.6rem',
                '&:hover': {
                  backgroundColor: 'grey.100',
                  cursor: 'pointer',
                },
              }}
              onClick={() => setUserDetailDialogOpen(true)}
            >
              <Avatar
                src={`${SERVER_BASE_URL}${listing.author.imageUrl}`}
                sx={{ width: '3rem', height: '3rem' }}
              />
              <Box>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {listing.author.firstName + ' ' + listing.author.lastName}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                  Lister Information
                </Typography>
              </Box>
            </Box>

            <DetailRow
              icon={<LocationOnIcon color="primary" />}
              title="LOCATION"
              value={listing.location}
            />

            <DetailRow
              icon={<CalendarTodayIcon color="primary" />}
              title="SEEN ON"
              value={moment(listing.lastSeen).format('DD/MM/YYYY HH:mm')}
            />

            <Box sx={{ backgroundColor: 'grey.100', borderRadius: '0.6rem', padding: '0.5rem' }}>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', fontWeight: 'bold' }}>
                DESCRIPTION
              </Typography>
              <Typography>{listing.description}</Typography>
            </Box>

            <Box
              component="a"
              href={`tel:${listing.author.phoneNumber}`}
              onClick={handlePhoneClick}
              sx={(theme) => ({
                backgroundColor: alpha(theme.palette.primary.main, 0.8),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.8rem',
                borderRadius: '0.8rem',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: alpha(theme.palette.primary.main, 0.95),
                },
                gap: '0.5rem',
                textDecoration: 'none',
              })}
            >
              <PhoneIcon sx={{ color: 'white' }} />
              <Typography sx={{ color: 'white', fontWeight: copied ? 'bold' : 'normal' }}>
                {copied ? 'Number Copied!' : `Call Lister (${listing.author.phoneNumber})`}
              </Typography>
            </Box>

            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Typography sx={{ fontWeight: 'bold' }}>Comments</Typography>
                <Chip label={`${listing.comments.length}`} sx={{ backgroundColor: 'grey.100' }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Tooltip
                  title={
                    isUserBoostedListing(listing) ? 'You boosted this listing' : 'Click to boost!'
                  }
                  placement="left"
                  arrow
                >
                  <IconButton
                    sx={{
                      color: isUserBoostedListing(listing) ? 'primary.main' : 'text.secondary',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                      padding: 0,
                    }}
                    onClick={onBoostToggle}
                  >
                    <FontAwesomeIcon size="xs" icon={faPaw} />
                  </IconButton>
                </Tooltip>
                <Typography sx={{ fontWeight: 'bold' }}>{listing.boosts.length}</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Boosts</Typography>
              </Box>
            </Box>

            {listing.comments.map((comment: NewComment) => (
              <Box key={comment._id} sx={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <Avatar
                  src={`${SERVER_BASE_URL}${comment.author.imageUrl}`}
                  sx={{ width: '2.2rem', height: '2.2rem' }}
                />
                <Box>
                  <Box
                    sx={{ backgroundColor: 'grey.100', borderRadius: '0.6rem', padding: '0.5rem' }}
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>
                      {comment.author.firstName + ' ' + comment.author.lastName}
                    </Typography>
                    <Typography>{comment.commentText}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    {moment(comment.createdAt).format('HH:mm')}
                  </Typography>
                </Box>
              </Box>
            ))}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'grey.100',
                borderRadius: '1rem',
                padding: '0.2rem 0.5rem 0.2rem 1.2rem',
                margin: '0 1rem',
                border: '1.5px solid transparent',
                '&:focus-within': {
                  borderColor: 'text.primary',
                },
              }}
            >
              <InputBase
                value={newComment}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNewComment(event.target.value)
                }
                placeholder="Write a helpful comment..."
                sx={{
                  flex: 1,
                  color: 'text.primary',
                  fontSize: '0.95rem',
                }}
              />
              <IconButton color="primary" onClick={handleAddComment}>
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Dialog>
      <UserDetailDialog
        open={userDetailDialogOpen}
        onClose={() => setUserDetailDialogOpen(false)}
        user={listing.author}
      />
    </>
  );
};

export default ListingDetailsDialog;
