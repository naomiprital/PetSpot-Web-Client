import { useState, useMemo, useRef, useEffect } from 'react';
import { Box, Typography, CircularProgress, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainFeedListingCard from '../components/MainFeedListingCard';
import FilterBar, {
  type StatusFilter,
  type AnimalFilter,
  type SortOrderFilter,
} from '../components/FilterBar';
import PublishReportDialog from '../components/PublishReportDialog';
import { toast } from 'react-toastify';
import { useListings } from '../hooks/useListings';
import { useSmartSearch } from '../hooks/useAi';
import type { NewListing } from '../types/Listing';

const PAGE_SIZE = 3;

const HomePage = () => {
  const { data: newListings, isLoading: isListingsLoading } = useListings();
  const { mutateAsync: runSmartSearch, isPending: isAiSearching } = useSmartSearch();

  const [searchQuery, setSearchQuery] = useState('');
  const [type, setType] = useState<StatusFilter>('all');
  const [animal, setAnimal] = useState<AnimalFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrderFilter>('newest');
  const [page, setPage] = useState(1);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [aiListings, setAiListings] = useState<NewListing[] | null>(null);

  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const results = await runSmartSearch({
        query: searchQuery.trim(),
        type,
        animal,
      });
      setAiListings(results);
      setPage(1);
    } catch (err) {
      toast.error('AI search failed. Please try again.');
    }
  };

  const handleAiClear = () => {
    setAiListings(null);
    setSearchQuery('');
    setPage(1);
  };

  const filteredListings = useMemo(() => {
    if (!newListings?.length) return [];

    return newListings
      .filter((listing: NewListing) => {
        const matchesSearch =
          listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.location.toLowerCase().includes(searchQuery.toLowerCase());
        const isResolved = listing.isResolved;
        const matchesType = type === 'all' || listing.listingType === type;
        const matchesAnimal = animal === 'all' || listing.animalType === animal;

        return matchesSearch && matchesType && matchesAnimal && !isResolved;
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') return b.lastSeen - a.lastSeen;
        if (sortOrder === 'oldest') return a.lastSeen - b.lastSeen;
        if (sortOrder === 'highest-boosted') return b.boosts.length - a.boosts.length;
        return a.boosts.length - b.boosts.length;
      });
  }, [searchQuery, type, animal, sortOrder, newListings]);

  const activeDataSource = useMemo(() => {
    if (aiListings === null) {
      return filteredListings;
    }
    const aiIds = new Set(aiListings.map((listing) => listing._id));

    const uniqueStandardResults = filteredListings.filter((listing) => !aiIds.has(listing._id));

    return [...aiListings, ...uniqueStandardResults];
  }, [aiListings, filteredListings]);
  const visibleListings = activeDataSource?.slice(0, page * PAGE_SIZE);
  const hasMore = visibleListings?.length < activeDataSource?.length;

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) setPage((prev) => prev + 1);
      },
      { threshold: 0.2 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <>
      {isListingsLoading ? (
        <CircularProgress size={'3rem'} sx={{ color: 'primary.main' }} />
      ) : (
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
            isAiSearching={isAiSearching}
            isAiActive={aiListings !== null}
            onAiSearch={handleAiSearch}
            onAiClear={handleAiClear}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'center' }}>
            {visibleListings?.map((listing: NewListing) => (
              <MainFeedListingCard key={listing._id} listing={listing} />
            ))}
            {activeDataSource?.length === 0 && (
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
            sx={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
          >
            <AddIcon />
          </Fab>
          <PublishReportDialog
            isOpen={isPublishDialogOpen}
            onClose={() => setIsPublishDialogOpen(false)}
          />
        </Box>
      )}
    </>
  );
};

export default HomePage;
