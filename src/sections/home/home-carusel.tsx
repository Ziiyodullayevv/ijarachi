import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { housesByCity } from 'src/_mock/_house';

import { HeroCarusel } from './components/hero-carusel';

export default function CaruselPage() {
  return (
    <Box sx={{ backgroundColor: 'var(--palette-grey-200)', pb: 6, px: 4 }}>
      <Container maxWidth="xl" sx={{ px: '100px' }}>
        {housesByCity.map((item) => (
          <Box key={item.id} sx={{ pt: 1 }}>
            <HeroCarusel slides={item.data.map((house) => ({ ...house, cityTitle: item.title }))} />
          </Box>
        ))}
      </Container>
    </Box>
  );
}
