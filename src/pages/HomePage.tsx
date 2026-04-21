import { useState, useMemo } from 'react';
import { Box, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListingCard from '../components/ListingCard';
import FilterBar, {
  type StatusFilter,
  type AnimalFilter,
  type SortOrderFilter,
} from '../components/FilterBar';
import { useListings } from '../context/ListingsContext';
import PublishReportDialog from '../components/PublishReportDialog';

const HomePage = () => {
  const listings = useListings();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [type, setType] = useState<StatusFilter>('all');
  const [animal, setAnimal] = useState<AnimalFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrderFilter>('newest');
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState<boolean>(false);

  const filteredListings = useMemo(() => {
    return listings
      .filter((listing) => {
        const isResolved = listing.isResolved;
        const matchesSearch =
          listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = type === 'all' || listing.status === type;
        const matchesAnimal = animal === 'all' || listing.animal === animal;
        return matchesSearch && matchesType && matchesAnimal && !isResolved;
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
