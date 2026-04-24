import { useState, useMemo, useRef, useEffect } from 'react';
import { Box, Typography, CircularProgress, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainFeedListingCard, { type Listing } from '../components/MainFeedListingCard';
import FilterBar, {
  type StatusFilter,
  type AnimalFilter,
  type SortOrderFilter,
} from '../components/FilterBar';
import PublishReportDialog from '../components/PublishReportDialog';
import { toast } from 'react-toastify';
import { rankListingsByDescription } from '../services/AiService';
import { useListings } from '../hooks/useListings';

const PAGE_SIZE = 3;

const HomePage = () => {
  const { data: listings = [], isLoading: isListingsLoading } = useListings();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [type, setType] = useState<StatusFilter>('all');
  const [animal, setAnimal] = useState<AnimalFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrderFilter>('newest');
  const [page, setPage] = useState(1);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState<boolean>(false);

  const [aiQuery, setAiQuery] = useState('');
  const [aiRankedIds, setAiRankedIds] = useState<string[] | null>(null);
  const [isAiSearching, setIsAiSearching] = useState(false);

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;
    setIsAiSearching(true);
    try {
      const ranked = await rankListingsByDescription(aiQuery.trim(), listings);
      if (ranked !== null) setAiRankedIds(ranked);
    } catch (err) {
      toast.error('AI search failed. Please try again.');
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
    if (listings?.length > 0) {
      let filtered = listings.filter((listing: Listing) => {
        const matchesSearch =
          aiRankedIds !== null
            ? true
            : listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.location.toLowerCase().includes(searchQuery.toLowerCase());
        const isResolved = listing.isResolved;
        const matchesType = type === 'all' || listing.listingType === type;
        const matchesAnimal = animal === 'all' || listing.animalType === animal;
        return matchesSearch && matchesType && matchesAnimal && !isResolved;
      });

      if (aiRankedIds) {
        const idIndex = Object.fromEntries(aiRankedIds.map((id, index) => [id, index]));
        filtered = filtered
          ?.filter((listing) => idIndex[listing._id] !== undefined)
          ?.sort((a, b) => idIndex[a._id] - idIndex[b._id]);
      } else {
        filtered = filtered?.sort((a, b) => {
          if (sortOrder === 'newest') return b.lastSeen - a.lastSeen;
          if (sortOrder === 'oldest') return a.lastSeen - b.lastSeen;
          if (sortOrder === 'highest-boosted') return b.boosts.length - a.boosts.length;
          return a.boosts.length - b.boosts.length;
        });
      }

      return filtered;
    }
  }, [searchQuery, type, animal, sortOrder, aiRankedIds, listings]);

  const visibleListings = filteredListings?.slice(0, page * PAGE_SIZE);
  const hasMore = visibleListings?.length < filteredListings?.length;

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

  if (isListingsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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
        {visibleListings?.map((listing) => (
          <MainFeedListingCard key={listing._id} listing={listing} />
        ))}
        {filteredListings?.length === 0 && (
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
