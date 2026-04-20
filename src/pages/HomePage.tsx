import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import ListingCard from '../components/ListingCard';
import FilterBar, {
  type StatusFilter,
  type AnimalFilter,
  type SortOrderFilter,
} from '../components/FilterBar';
import { useListings } from '../context/ListingsContext';

const HomePage = () => {
  const listings = useListings();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [type, setType] = useState<StatusFilter>('all');
  const [animal, setAnimal] = useState<AnimalFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrderFilter>('newest');

  const filteredListings = useMemo(() => {
    return listings
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
  }, [listings, searchQuery, type, animal, sortOrder]);

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
