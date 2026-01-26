import type { FilterItem } from './context/filter-context';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { AMENITIES_DATA } from './data';
import { useFilter } from './context/filter-context';

export default function Amenities() {
  const { selectedFilters, toggleFilter } = useFilter();

  return (
    <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 1 }}>
      {AMENITIES_DATA.map((item) => {
        const filterItem: FilterItem = { ...item, type: 'amenity' };
        const isSelected = selectedFilters.some((f) => f.id === item.id && f.type === 'amenity');

        return (
          <Button
            key={item.id}
            onClick={() => toggleFilter(filterItem)}
            variant="outlined"
            size="large"
            startIcon={item.icon}
            sx={{
              borderRadius: '100px',
              fontWeight: 500,
              boxShadow: isSelected ? '0 0 0 0.75px currentColor' : undefined,
              border: isSelected ? '1px solid black' : undefined,
            }}
          >
            {item.title}
          </Button>
        );
      })}
    </Box>
  );
}
