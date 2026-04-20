import { useState, useMemo } from 'react';
import { Box, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListingCard, { type Listing } from '../components/ListingCard';
import FilterBar, {
  type StatusFilter,
  type AnimalFilter,
  type SortOrderFilter,
} from '../components/FilterBar';
import { AnimalsEnum, StatusEnum } from '../../utils/consts';
import PublishReportDialog from '../components/PublishReportDialog';

const mockListings: Listing[] = [
  {
    id: '1',
    status: StatusEnum.LOST,
    animal: AnimalsEnum.DOG,
    imageUrl:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    location: 'Central Park, NY',
    date: Date.now() - 100000000,
    description:
      'Buster is a friendly golden retriever. Wearing a blue collar. Last seen near the park',
    comments: [
      {
        id: 'c1',
        text: 'I think I saw a dog like this near the boat house!',
        createdAt: Date.now() - 5000000,
        user: {
          name: 'Alice',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
      },
    ],
    user: {
      name: 'John',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      phone: '1234567890',
    },
  },
  {
    id: '2',
    status: StatusEnum.FOUND,
    animal: AnimalsEnum.CAT,
    imageUrl:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    location: 'Brooklyn, NY',
    date: Date.now() - 200000000,
    description: 'Found a small black cat near the subway station. Very vocal and friendly.',
    comments: [
      {
        id: 'c2',
        text: 'Is this the cat that usually hangs around 5th Ave?',
        createdAt: Date.now() - 15000000,
        user: {
          name: 'Mike',
          avatar:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c3',
        text: 'Yes! I think it belongs to the corner shop owner.',
        createdAt: Date.now() - 10000000,
        user: {
          name: 'Sarah',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c4',
        text: 'I will go check with him today.',
        createdAt: Date.now() - 5000000,
        user: {
          name: 'Mike',
          avatar:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c5',
        text: 'I will go check with him today.',
        createdAt: Date.now() - 5000000,
        user: {
          name: 'Mike',
          avatar:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
        },
      },
    ],
    user: {
      name: 'Sarah',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      phone: '1234567890',
    },
  },
  {
    id: '3',
    status: StatusEnum.LOST,
    animal: AnimalsEnum.BIRD,
    imageUrl:
      'https://us1.discourse-cdn.com/flex016/uploads/inaturalist/optimized/3X/e/a/eaa730a3a558b159061c738eb3ab961739294c66_2_387x500.jpeg',
    location: 'Queens, NY',
    date: Date.now() - 50000000,
    description: 'Green parakeet flew out the window. Answers to "Kiwi".',
    comments: [],
    user: {
      name: 'Mike',
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
      phone: '1234567890',
    },
  },
  {
    id: '4',
    status: StatusEnum.FOUND,
    animal: AnimalsEnum.DOG,
    imageUrl:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
    location: 'Manhattan, NY',
    date: Date.now() - 300000000,
    description: 'Found a stray husky wandering around. No collar, very energetic.',
    comments: [
      {
        id: 'c5',
        text: 'I saw posters for a husky nearby, let me check the number.',
        createdAt: Date.now() - 20000000,
        user: {
          name: 'John',
          avatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c6',
        text: 'Did he have a blue harness?',
        createdAt: Date.now() - 15000000,
        user: {
          name: 'Alice',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c7',
        text: 'No harness, just empty.',
        createdAt: Date.now() - 10000000,
        user: {
          name: 'Emma',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c8',
        text: 'Ok, I will keep an eye out for posters.',
        createdAt: Date.now() - 5000000,
        user: {
          name: 'Alice',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c9',
        text: 'Thanks! Hopefully we find the owner.',
        createdAt: Date.now() - 1000000,
        user: {
          name: 'Emma',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
        },
      },
      {
        id: 'c10',
        text: 'I will go check with him today.',
        createdAt: Date.now() - 1000000,
        user: {
          name: 'Mike',
          avatar:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
        },
      },
    ],
    user: {
      name: 'Emma',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      phone: '1234567890',
    },
  },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [type, setType] = useState<StatusFilter>('all');
  const [animal, setAnimal] = useState<AnimalFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrderFilter>('newest');
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState<boolean>(false);

  const filteredListings = useMemo(() => {
    return mockListings
      .filter((listing) => {
        const matchesSearch =
          listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = type === 'all' || listing.status === type;
        const matchesAnimal = animal === 'all' || listing.animal === animal;
        return matchesSearch && matchesType && matchesAnimal;
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') return b.date - a.date;
        return a.date - b.date;
      });
  }, [searchQuery, type, animal, sortOrder]);

  return (
    <Box sx={{ padding: '2rem' }}>
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        type={type}
        setType={setType}
        animal={animal}
        setAnimal={setAnimal}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.2rem',
          justifyContent: 'center',
        }}
      >
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
        {filteredListings.length === 0 && (
          <Typography sx={{ color: 'text.secondary', marginTop: '2rem' }}>
            No listings found matching your criteria.
          </Typography>
        )}
      </Box>
      <Fab
        color="primary"
        onClick={() => setIsPublishDialogOpen(true)}
        sx={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
        }}
      >
        <AddIcon />
      </Fab>

      <PublishReportDialog
        open={isPublishDialogOpen}
        onClose={() => setIsPublishDialogOpen(false)}
      />
    </Box>
  );
};

export default HomePage;
