import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import moment from 'moment';
import { StatusEnum } from '../../utils/consts';

export interface Listing {
  id: string;
  status: string;
  animal: string;
  imageUrl: string;
  location: string;
  date: number;
  description: string;
  comments: number;
  user: {
    name: string;
    avatar: string;
  };
}

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '24rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid #f1f5f9',
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
            color: '#1f2937',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748b' }}>
            <LocationOnIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
            <Typography variant="body2" sx={{ color: '#475569' }}>
              {listing.location}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            {moment(listing.date).format('MMM D')}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: '#334155',
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
        <Divider sx={{ marginBottom: '0.8rem', borderColor: '#f1f5f9' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748b' }}>
            <ChatBubbleIcon sx={{ fontSize: '1.1rem', color: '#94a3b8' }} />
            <Typography variant="body2">
              {listing.comments} comments
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Avatar src={listing.user.avatar} sx={{ width: '1.5rem', height: '1.5rem' }} />
            <Typography variant="body2" sx={{ color: '#334155' }}>
              {listing.user.name}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
