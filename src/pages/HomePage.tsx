import { useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import ListingCard, { type Listing } from '../components/ListingCard';
import FilterBar, {
  type StatusFilter,
  type AnimalFilter,
  type SortOrderFilter,
} from '../components/FilterBar';
import { AnimalsEnum, StatusEnum } from '../../utils/consts';
import { rankListingsByDescription } from '../services/aiSearch';

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
    comments: 1,
    userId: 'user-2',
    user: {
      name: 'John',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      phone: '+1-555-0100',
    },
    isResolved: false,
    isDeleted: false,
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
    comments: 3,
    userId: 'user-3',
    user: {
      name: 'Sarah',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      phone: '+1-555-0101',
    },
    isResolved: false,
    isDeleted: false,
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
    comments: 0,
    userId: 'user-4',
    user: {
      name: 'Mike',
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
      phone: '+1-555-0102',
    },
    isResolved: false,
    isDeleted: false,
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
    comments: 5,
    userId: 'user-5',
    user: {
      name: 'Emma',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      phone: '+1-555-0103',
    },
    isResolved: false,
    isDeleted: false,
  },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [type, setType] = useState<StatusFilter>('all');
  const [animal, setAnimal] = useState<AnimalFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrderFilter>('newest');

  const [aiQuery, setAiQuery] = useState('');
  const [aiRankedIds, setAiRankedIds] = useState<string[] | null>(null);
  const [isAiSearching, setIsAiSearching] = useState(false);

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;
    setIsAiSearching(true);
    try {
      const ranked = await rankListingsByDescription(aiQuery.trim(), mockListings);
      if (ranked !== null) setAiRankedIds(ranked);
    } catch (err) {
      console.error('AI search failed:', err);
    } finally {
      setIsAiSearching(false);
    }
  };

  const handleAiClear = () => {
    setAiQuery('');
    setAiRankedIds(null);
    setSearchQuery('');
  };

  const filteredListings = useMemo(() => {
    let listings = mockListings.filter((listing) => {
      const matchesSearch = aiRankedIds !== null
        ? true
        : listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = type === 'all' || listing.status === type;
      const matchesAnimal = animal === 'all' || listing.animal === animal;
      return matchesSearch && matchesType && matchesAnimal;
    });

    if (aiRankedIds) {
      const idIndex = Object.fromEntries(aiRankedIds.map((id, index) => [id, index]));
      listings = listings
        .filter((listing) => idIndex[listing.id] !== undefined)
        .sort((a, b) => idIndex[a.id] - idIndex[b.id]);
    } else {
      listings = listings.sort((a, b) => {
        if (sortOrder === 'newest') return b.date - a.date;
        return a.date - b.date;
      });
    }

    return listings;
  }, [searchQuery, type, animal, sortOrder, aiRankedIds]);

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
        setAiQuery={setAiQuery}
        isAiSearching={isAiSearching}
        aiRankedIds={aiRankedIds}
        onAiSearch={handleAiSearch}
        onAiClear={handleAiClear}
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
    </Box>
  );
};

export default HomePage;
