import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import moment from 'moment';
import { StatusEnum } from '../../utils/consts';
import { useState } from 'react';
import ListingDetailsDialog from './ListingDetailsDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

export interface Comment {
  id: string;
  text: string;
  createdAt: number;
  user: {
    name: string;
    avatar: string; // TODO: Switch to real user interface
  };
}

export interface Listing {
  id: string;
  status: string;
  animal: string;
  imageUrl: string;
  location: string;
  date: number;
  description: string;
  comments: Comment[];
  boosts: string[];
  userId: string;
  user: {
    name: string;
    avatar: string;
    phone: string; // TODO: Switch to real user interface
  };
  isResolved: boolean;
  isDeleted: boolean;
}

interface ListingCardProps {
  listing: Listing;
  onBoost: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isUserBoostedListing: (listing: Listing) => boolean;
}

const ListingCard = ({ listing, onBoost, isUserBoostedListing }: ListingCardProps) => {
  const [listingDetailsDialogOpen, setListingDetailsDialogOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setListingDetailsDialogOpen(true)}
        sx={{
          width: '100%',
          maxWidth: '24rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          cursor: 'pointer',
          '&:hover .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={listing.imageUrl}
            alt="Listing image"
            sx={{
              height: '13.75rem',
              transition: 'transform 0.3s ease',
            }}
          />
          <Chip
            label={listing.status.toUpperCase()}
            sx={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              backgroundColor: listing.status === StatusEnum.LOST ? 'error.main' : 'success.main',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '1rem',
            }}
          />
          <Chip
            label={listing.animal}
            sx={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: 'white',
              color: 'text.primary',
              fontWeight: 'bold',
              borderRadius: '1rem',
            }}
          />
        </Box>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.8rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: 'text.secondary',
              }}
            >
              <LocationOnIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                {listing.location}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {moment(listing.date).format('MMM D')}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              marginBottom: '1rem',
              lineHeight: 1.5,
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {listing.description}
          </Typography>
          <Divider sx={{ marginBottom: '0.8rem', borderColor: 'grey.200' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.2rem',
                }}
              >
                <ChatBubbleIcon sx={{ fontSize: '1.1rem', color: 'text.secondary' }} />
                <Typography variant="body2">{listing.comments.length}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.2rem',
                }}
              >
                <Tooltip
                  title={
                    isUserBoostedListing(listing) ? 'You boosted this listing' : 'Click to boost!'
                  }
                  placement="bottom"
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
                    onClick={onBoost}
                  >
                    <FontAwesomeIcon size="xs" icon={faPaw} />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">{listing.boosts.length}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Avatar src={listing.user.avatar} sx={{ width: '1.5rem', height: '1.5rem' }} />
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                {listing.user.name}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <ListingDetailsDialog
        open={listingDetailsDialogOpen}
        onClose={() => setListingDetailsDialogOpen(false)}
        listing={listing}
        isUserBoostedListing={isUserBoostedListing}
        onBoost={onBoost}
      />
    </>
  );
};

export default ListingCard;
