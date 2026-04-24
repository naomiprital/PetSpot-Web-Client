import {
  Box,
  InputBase,
  Select,
  MenuItem,
  Card,
  alpha,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Divider,
  type Theme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import {
  type ListingType,
  type AnimalType,
  ListingTypeEnum,
  AnimalTypeEnum,
} from '../types/Listing';

export type StatusFilter = ListingType | 'all';
export type AnimalFilter = AnimalType | 'all';
export type SortOrderFilter = 'newest' | 'oldest' | 'highest-boosted' | 'lowest-boosted';

export interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  type: StatusFilter;
  setType: (val: StatusFilter) => void;
  animal: AnimalFilter;
  setAnimal: (val: AnimalFilter) => void;
  sortOrder: SortOrderFilter;
  setSortOrder: (val: SortOrderFilter) => void;
  isAiSearching: boolean;
  isAiActive: boolean;
  onAiSearch: () => void;
  onAiClear: () => void;
}

const selectSx = (isActive: boolean) => (theme: Theme) => ({
  backgroundColor: isActive
    ? alpha(theme.palette.primary.main, 0.1)
    : theme.palette.background.default,
  borderRadius: '0.75rem',
  '& .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${isActive ? theme.palette.primary.main : theme.palette.grey[300]}`,
  },
});

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  type,
  setType,
  animal,
  setAnimal,
  sortOrder,
  setSortOrder,
  isAiSearching,
  isAiActive,
  onAiSearch,
  onAiClear,
}: FilterBarProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && searchQuery.trim()) onAiSearch();
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '0.75rem',
        borderRadius: '1rem',
        boxShadow: 'none',
        border: 1,
        borderColor: 'grey.300',
        marginBottom: '2rem',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}
      >
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            backgroundColor: isAiActive
              ? alpha(theme.palette.primary.main, 0.06)
              : theme.palette.background.default,
            border: `1px solid ${isAiActive ? theme.palette.primary.main : theme.palette.grey[300]}`,
            borderRadius: '0.75rem',
            padding: '0.4rem 0.5rem 0.4rem 1rem',
            transition: 'border-color 0.2s ease, background-color 0.2s ease',
            minWidth: { xs: '100%', md: 'auto' },
            gap: '0.5rem',
          })}
        >
          {isAiActive ? (
            <AutoAwesomeIcon
              sx={(theme) => ({
                fontSize: '1.1rem',
                color: theme.palette.primary.main,
                flexShrink: 0,
              })}
            />
          ) : (
            <SearchIcon sx={{ color: 'text.secondary', flexShrink: 0, fontSize: '1.2rem' }} />
          )}

          <InputBase
            placeholder={
              isAiActive
                ? 'AI results active — type to refine or click ✕ to clear'
                : 'Search or describe an animal…'
            }
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isAiSearching}
            sx={{ flex: 1, fontSize: '0.95rem', color: 'text.primary' }}
          />

          {isAiActive && (
            <Tooltip title="Clear AI search">
              <IconButton
                size="small"
                onClick={onAiClear}
                sx={{ color: 'text.secondary', p: '0.2rem' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Divider orientation="vertical" flexItem sx={{ mx: '0.25rem' }} />

          <Button
            variant={isAiActive ? 'contained' : 'text'}
            size="small"
            onClick={onAiSearch}
            disabled={isAiSearching || !searchQuery.trim()}
            startIcon={
              isAiSearching ? (
                <CircularProgress size={13} color="inherit" />
              ) : (
                <AutoAwesomeIcon sx={{ fontSize: '1rem !important' }} />
              )
            }
            sx={(theme) => ({
              borderRadius: '0.5rem',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              px: 1.25,
              py: 0.5,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              color: isAiActive ? 'white' : theme.palette.text.secondary,
            })}
          >
            {isAiSearching ? 'Searching…' : 'AI Search'}
          </Button>
        </Box>

        <Select
          value={type}
          onChange={(event) => setType(event.target.value as StatusFilter)}
          displayEmpty
          sx={selectSx(type !== 'all')}
        >
          <MenuItem value="all">All Types</MenuItem>
          <MenuItem value={ListingTypeEnum.LOST}>{ListingTypeEnum.LOST}</MenuItem>
          <MenuItem value={ListingTypeEnum.FOUND}>{ListingTypeEnum.FOUND}</MenuItem>
        </Select>

        <Select
          value={animal}
          onChange={(event) => setAnimal(event.target.value as AnimalFilter)}
          displayEmpty
          sx={selectSx(animal !== 'all')}
        >
          <MenuItem value="all">All Animals</MenuItem>
          <MenuItem value={AnimalTypeEnum.DOG}>{AnimalTypeEnum.DOG}</MenuItem>
          <MenuItem value={AnimalTypeEnum.CAT}>{AnimalTypeEnum.CAT}</MenuItem>
          <MenuItem value={AnimalTypeEnum.BIRD}>{AnimalTypeEnum.BIRD}</MenuItem>
          <MenuItem value={AnimalTypeEnum.RABBIT}>{AnimalTypeEnum.RABBIT}</MenuItem>
          <MenuItem value={AnimalTypeEnum.OTHER}>{AnimalTypeEnum.OTHER}</MenuItem>
        </Select>

        <Select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as SortOrderFilter)}
          displayEmpty
          disabled={isAiActive}
          sx={(theme) => ({
            ...selectSx(sortOrder !== 'newest')(theme),
            opacity: isAiActive ? 0.5 : 1,
          })}
        >
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
          <MenuItem value="highest-boosted">Most Boosted</MenuItem>
          <MenuItem value="lowest-boosted">Least Boosted</MenuItem>
        </Select>
      </Box>
    </Card>
  );
};

export default FilterBar;
