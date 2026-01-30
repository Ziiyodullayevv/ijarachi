import { Box, Container } from '@mui/material';

import { RoomsGallery } from 'src/sections/rooms/rooms-gallery';

export function RoomsView() {
  return (
    <Box sx={{ background: 'var(--palette-grey-200)' }}>
      <Container maxWidth="lg">
        <RoomsGallery />

        
      </Container>
    </Box>
  );
}
