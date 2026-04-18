import { Box, InputBase, Select, MenuItem, Card, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { StatusEnum, AnimalsEnum } from '../../utils/consts';

export type StatusFilter = (typeof StatusEnum)[keyof typeof StatusEnum] | 'all';
export type AnimalFilter = (typeof AnimalsEnum)[keyof typeof AnimalsEnum] | 'all';
export type SortOrderFilter = 'newest' | 'oldest';

export interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  type: StatusFilter;
  setType: (val: StatusFilter) => void;
  animal: AnimalFilter;
  setAnimal: (val: AnimalFilter) => void;
  sortOrder: SortOrderFilter;
  setSortOrder: (val: SortOrderFilter) => void;
}

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  type,
  setType,
  animal,
  setAnimal,
  sortOrder,
  setSortOrder,
}: FilterBarProps) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.75rem',
        borderRadius: '1rem',
        boxShadow: 'none',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem',
        width: '100%',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#f8fafc',
          borderRadius: '0.75rem',
          padding: '0.5rem 1rem',
          minWidth: { xs: '100%', md: 'auto' },
        }}
      >
        <SearchIcon sx={{ color: '#94a3b8', marginRight: '1rem' }} />
        <InputBase
          placeholder="Search location or description..."
          sx={{ flex: 1, color: '#475569', fontSize: '0.95rem' }}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </Box>
      <Select
        value={type}
        onChange={(event) => setType(event.target.value as StatusFilter)}
        displayEmpty
        sx={(theme) => ({
          backgroundColor: type !== 'all' ? alpha(theme.palette.primary.main, 0.1) : '#f8fafc',
          borderRadius: '0.75rem',
          '& .MuiOutlinedInput-notchedOutline': {
            border: type !== 'all' ? `1px solid ${theme.palette.primary.main}` : 'none',
          },
        })}
      >
        <MenuItem value="all">All Types</MenuItem>
        <MenuItem value={StatusEnum.LOST}>{StatusEnum.LOST}</MenuItem>
        <MenuItem value={StatusEnum.FOUND}>{StatusEnum.FOUND}</MenuItem>
      </Select>
      <Select
        value={animal}
        onChange={(event) => setAnimal(event.target.value as AnimalFilter)}
        displayEmpty
        sx={(theme) => ({
          backgroundColor: animal !== 'all' ? alpha(theme.palette.primary.main, 0.1) : '#f8fafc',
          borderRadius: '0.75rem',
          '& .MuiOutlinedInput-notchedOutline': {
            border: animal !== 'all' ? `1px solid ${theme.palette.primary.main}` : 'none',
          },
        })}
      >
        <MenuItem value="all">All Animals</MenuItem>
        <MenuItem value={AnimalsEnum.DOG}>Dog</MenuItem>
        <MenuItem value={AnimalsEnum.CAT}>Cat</MenuItem>
        <MenuItem value={AnimalsEnum.BIRD}>Bird</MenuItem>
        <MenuItem value={AnimalsEnum.RABBIT}>Rabbit</MenuItem>
        <MenuItem value={AnimalsEnum.OTHER}>Other</MenuItem>
      </Select>
      <Select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as SortOrderFilter)}
        displayEmpty
        sx={{
          backgroundColor: '#f8fafc',
          borderRadius: '0.75rem',
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        }}
      >
        <MenuItem value="newest">Newest First</MenuItem>
        <MenuItem value="oldest">Oldest First</MenuItem>
      </Select>
    </Card>
  );
};

export default FilterBar;
