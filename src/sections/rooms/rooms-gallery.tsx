import { Box, Grid, Stack, Button, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { ImageBox } from 'src/sections/rooms/components/image-box';

const images = [
  '/public/assets/images/mock/cover/cover-1.webp',
  '/public/assets/images/mock/cover/cover-2.webp',
  '/public/assets/images/mock/cover/cover-3.webp',
  '/public/assets/images/mock/cover/cover-4.webp',
  '/public/assets/images/mock/cover/cover-5.webp',
  '/public/assets/images/mock/cover/cover-6.webp',
  '/public/assets/images/mock/cover/cover-7.webp',
  '/public/assets/images/mock/cover/cover-8.webp',
];

export function RoomsGallery() {
  return (
    <Box sx={{ my: 4 }}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography sx={{ fontWeight: 600 }} variant="h4">
          Stylish Dubai Downtown Studio by Burj Khalifav
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button sx={buttonStyle} startIcon={<Iconify width={18} icon="custom-icon:share" />}>
            Share
          </Button>

          <Button sx={buttonStyle} startIcon={<Iconify icon="custom-icon:heart" width={18} />}>
            Save
          </Button>
        </Stack>
      </Stack>
      <Grid
        sx={{ borderRadius: 1.5, mt: 2, overflow: 'hidden' }}
        container
        height={420}
        spacing={1}
      >
        <Grid size={6}>
          <ImageBox img={images[0]} minHeight={422} />
        </Grid>
        <Grid size={6}>
          <Grid container spacing={1}>
            {images.slice(1, 5).map((img, i) => {
              const isLast = i === 3 ? true : false;
              return (
                <Grid key={i} size={6}>
                  <ImageBox img={img} minHeight={206} showButton={isLast} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const buttonStyle = {
  fontWeight: 500,
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'underline',
  },
};
