import { useNavigate } from 'react-router';

import { Box, Grid, IconButton, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { WishListCaruselCard } from 'src/sections/wishlist/components/wishlist-card';

const data = [
  {
    id: '1',
    title: 'Room of Indian',
    description: 'Green yard in India, Cozy apartment in center',
    rate: 4.2,
    images: [
      {
        id: '1',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-1.webp',
        description: '',
      },
      {
        id: '2',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-2.webp',
        description: '',
      },
      {
        id: '3',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-3.webp',
        description: '',
      },
      {
        id: '4',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-4.webp',
        description: '',
      },
    ],
  },
  {
    id: '2',
    title: 'Room of African House',
    description: 'Green yard in India, Cozy apartment in center',
    rate: 4.6,
    images: [
      {
        id: '2',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-2.webp',
        description: '',
      },
      {
        id: '1',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-1.webp',
        description: '',
      },
      {
        id: '3',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-3.webp',
        description: '',
      },
      {
        id: '4',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-4.webp',
        description: '',
      },
    ],
  },
  {
    id: '3',
    title: 'Room of American House',
    description: 'Green yard in India, Cozy apartment in center',
    rate: 4.4,
    images: [
      {
        id: '3',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-3.webp',
        description: '',
      },
      {
        id: '1',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-1.webp',
        description: '',
      },
      {
        id: '2',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-2.webp',
        description: '',
      },
      {
        id: '4',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-4.webp',
        description: '',
      },
    ],
  },
  {
    id: '4',
    title: 'Room of Uzbekistan',
    description: 'Green yard in India, Cozy apartment in center',
    rate: 4.9,
    images: [
      {
        id: '4',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-4.webp',
        description: '',
      },
      {
        id: '1',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-1.webp',
        description: '',
      },
      {
        id: '2',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-2.webp',
        description: '',
      },
      {
        id: '3',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-3.webp',
        description: '',
      },
    ],
  },
  {
    id: '5',
    title: 'Room of Uzbekistan',
    description: 'Green yard in India, Cozy apartment in center',
    rate: 4.9,
    images: [
      {
        id: '4',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-5.webp',
        description: '',
      },
      {
        id: '1',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-1.webp',
        description: '',
      },
      {
        id: '2',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-2.webp',
        description: '',
      },
      {
        id: '3',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-3.webp',
        description: '',
      },
      {
        id: '5',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-4.webp',
        description: '',
      },
    ],
  },
  {
    id: '4',
    title: 'Room of Uzbekistan',
    description: 'Green yard in India, Cozy apartment in center',
    rate: 4.9,
    images: [
      {
        id: '4',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-4.webp',
        description: '',
      },
      {
        id: '1',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-1.webp',
        description: '',
      },
      {
        id: '2',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-2.webp',
        description: '',
      },
      {
        id: '3',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-3.webp',
        description: '',
      },
    ],
  },
  {
    id: '6',
    title: 'Room of Uzbekistan',
    description: 'Green yard in India, Cozy apartment in center',
    rate: 4.9,
    images: [
      {
        id: '6',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-6.webp',
        description: '',
      },
      {
        id: '1',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-1.webp',
        description: '',
      },
      {
        id: '2',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-2.webp',
        description: '',
      },
      {
        id: '3',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-3.webp',
        description: '',
      },
      {
        id: '5',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-4.webp',
        description: '',
      },
    ],
  },
  {
    id: '4',
    title: 'Room of Uzbekistan',
    description: 'Green yard in India, Cozy apartment in center',
    rate: 4.9,
    images: [
      {
        id: '4',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-7.webp',
        description: '',
      },
      {
        id: '1',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-1.webp',
        description: '',
      },
      {
        id: '2',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-2.webp',
        description: '',
      },
      {
        id: '3',
        title: 'Apartment',
        coverUrl: '/public/assets/images/mock/house/house-3.webp',
        description: '',
      },
    ],
  },
];

export function WishlistCardsList() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        margin: '50px auto',
      }}
    >
      <Box
        sx={{
          margin: '20px 0px',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            width: 35,
            height: 35,
          }}
        >
          <Iconify sx={{ width: 16 }} icon="custom-icon:left-arrow1" />
        </IconButton>
        <Typography variant="h5">Wishlist</Typography>
      </Box>
      <Grid container spacing={2}>
        {data?.map((card, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
            <WishListCaruselCard data={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
