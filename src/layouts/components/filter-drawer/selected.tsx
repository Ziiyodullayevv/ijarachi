import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { useFilter } from './context/filter-context';

export default function SelectedComponents() {
  const { selectedFilters, removeFilter } = useFilter();

  if (selectedFilters.length === 0) return null;

  return (
    <>
      <Typography sx={{ fontSize: 10, fontWeight: 700, mb: 2 }} variant="h6">
        Selected
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {selectedFilters.map((item) => (
          <Button
            endIcon={<Iconify icon="carbon:close" width={20} />}
            variant="outlined"
            size="large"
            sx={{ borderRadius: '100px', fontWeight: 500 }}
            key={item.type + '-' + item.id}
            onClick={() => removeFilter(item.id)}
          >
            {item.title}
          </Button>
        ))}
      </Box>
      <Divider sx={{ my: 3 }} />
    </>
  );
}
