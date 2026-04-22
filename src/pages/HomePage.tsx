import { useState, useMemo, useRef, useEffect } from 'react';
import { Box, Typography, CircularProgress, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListingCard from '../components/ListingCard';
import FilterBar, {
  type StatusFilter,
  type AnimalFilter,
  type SortOrderFilter,
} from '../components/FilterBar';
import { useListings } from '../context/ListingsContext';
import PublishReportDialog from '../components/ListingFormDialogs/PublishReportDialog';

const PAGE_SIZE = 3;

const HomePage = () => {
  const listings = useListings();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [type, setType] = useState<StatusFilter>('all');
  const [animal, setAnimal] = useState<AnimalFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrderFilter>('newest');
  const [page, setPage] = useState(1);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState<boolean>(false);

  const filteredListings = useMemo(() => {
    setPage(1);
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
        if (sortOrder === 'oldest') return a.date - b.date;
        if (sortOrder === 'highest-boosted') return b.boosts.length - a.boosts.length;
        return a.boosts.length - b.boosts.length;
      });
  }, [listings, searchQuery, type, animal, sortOrder]);

  const visibleListings = filteredListings.slice(0, page * PAGE_SIZE);
  const hasMore = visibleListings.length < filteredListings.length;

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore]);

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
        {visibleListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
        {filteredListings.length === 0 && (
          <Typography sx={{ color: 'text.secondary', marginTop: '2rem' }}>
            No listings found matching your criteria.
          </Typography>
        )}
      </Box>
      <Box
        ref={sentinelRef}
        sx={{ display: 'flex', justifyContent: 'center', mt: '2rem', minHeight: '2rem' }}
      >
        {hasMore && <CircularProgress size={'3rem'} sx={{ color: 'primary.main' }} />}
      </Box>
      <Fab
        color="primary"
        onClick={() => setIsPublishDialogOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
        }}
      >
        <AddIcon />
      </Fab>

      <PublishReportDialog
        isOpen={isPublishDialogOpen}
        onClose={() => setIsPublishDialogOpen(false)}
      />
    </Box>
  );
};

export default HomePage;
