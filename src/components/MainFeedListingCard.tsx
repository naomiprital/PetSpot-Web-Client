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
import { useState } from 'react';
import ListingDetailsDialog from './ListingDetailsDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { isUserBoostedListing } from '../../utils/utilsFunctions';
import { ListingTypeEnum, type Listing } from '../types/Listing';
import { useToggleBoostListing } from '../hooks/useListings';
import { SERVER_BASE_URL } from '../../utils/consts';
import { useUser } from '../hooks/useUsers';

interface MainFeedListingCardProps {
  listing: Listing;
}

const MainFeedListingCard = ({ listing }: MainFeedListingCardProps) => {
  const { mutateAsync: boostListing } = useToggleBoostListing();
  const { data: user } = useUser();
  const [listingDetailsDialogOpen, setListingDetailsDialogOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setListingDetailsDialogOpen(true)}
        sx={{
          width: '100%',
          maxWidth: '24rem',
          height: '25rem',
          display: 'flex',
          flexDirection: 'column',
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
            image={`${SERVER_BASE_URL}${listing.imageUrl}`}
            alt="Listing image"
            sx={{
              height: '13.75rem',
              transition: 'transform 0.3s ease',
            }}
          />
          <Chip
            label={listing.listingType.toUpperCase()}
            sx={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              backgroundColor:
                listing.listingType === ListingTypeEnum.LOST ? 'error.main' : 'success.main',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '1rem',
            }}
          />
          <Chip
            label={listing.animalType.toUpperCase()}
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
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
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
                {moment(listing.lastSeen).format('MMM D')}
              </Typography>
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: 'text.primary',
                marginBottom: '1rem',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {listing.description}
            </Typography>
          </Box>
          <Box>
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
                      user?._id && isUserBoostedListing(listing, user?._id)
                        ? 'You boosted this listing'
                        : 'Click to boost!'
                    }
                    placement="bottom"
                    arrow
                  >
                    <IconButton
                      sx={{
                        color:
                          user?._id && isUserBoostedListing(listing, user?._id)
                            ? 'primary.main'
                            : 'text.secondary',
                        '&:hover': { backgroundColor: 'transparent' },
                        padding: 0,
                      }}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.stopPropagation();
                        boostListing(listing._id);
                      }}
                    >
                      <FontAwesomeIcon size="xs" icon={faPaw} />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body2">{listing.boosts.length}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Avatar
                  src={`${SERVER_BASE_URL}${listing.author?.imageUrl}`}
                  sx={{ width: '1.5rem', height: '1.5rem' }}
                />
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {listing.author?.firstName + ' ' + listing.author?.lastName}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <ListingDetailsDialog
        open={listingDetailsDialogOpen}
        onClose={() => setListingDetailsDialogOpen(false)}
        listing={listing}
        isUserBoostedListing={isUserBoostedListing}
      />
    </>
  );
};

export default MainFeedListingCard;
