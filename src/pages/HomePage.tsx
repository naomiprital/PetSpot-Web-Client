import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import ListingCard, { type Listing } from '../components/ListingCard';
import FilterBar, {
  type StatusFilter,
  type AnimalFilter,
  type SortOrderFilter,
} from '../components/FilterBar';
import { AnimalsEnum, StatusEnum } from '../../utils/consts';

const mockListings: Listing[] = [
  {
    id: 1,
    status: StatusEnum.LOST,
    animal: AnimalsEnum.DOG,
    imageUrl:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    location: 'Central Park, NY',
    date: Date.now() - 100000000,
    description:
      'Buster is a friendly golden retriever. Wearing a blue collar. Last seen near the park',
    comments: 1,
    user: {
      name: 'John',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: 2,
    status: StatusEnum.FOUND,
    animal: AnimalsEnum.CAT,
    imageUrl:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    location: 'Brooklyn, NY',
    date: Date.now() - 200000000,
    description: 'Found a small black cat near the subway station. Very vocal and friendly.',
    comments: 3,
    user: {
      name: 'Sarah',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: 3,
    status: StatusEnum.LOST,
    animal: AnimalsEnum.BIRD,
    imageUrl:
      'https://us1.discourse-cdn.com/flex016/uploads/inaturalist/optimized/3X/e/a/eaa730a3a558b159061c738eb3ab961739294c66_2_387x500.jpeg',
    location: 'Queens, NY',
    date: Date.now() - 50000000,
    description: 'Green parakeet flew out the window. Answers to "Kiwi".',
    comments: 0,
    user: {
      name: 'Mike',
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: 4,
    status: StatusEnum.FOUND,
    animal: AnimalsEnum.DOG,
    imageUrl:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
    location: 'Manhattan, NY',
    date: Date.now() - 300000000,
    description: 'Found a stray husky wandering around. No collar, very energetic.',
    comments: 5,
    user: {
      name: 'Emma',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    },
  },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [type, setType] = useState<StatusFilter>('all');
  const [animal, setAnimal] = useState<AnimalFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrderFilter>('newest');

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
          <div style={{ color: '#64748b', marginTop: '2rem' }}>
            No listings found matching your criteria.
          </div>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
