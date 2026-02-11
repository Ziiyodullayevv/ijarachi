import { useState } from 'react';

import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowFloatButtons,
} from 'src/components/carousel';

type Images = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
}[];

type Props = {
  data: {
    id: string;
    title: string;
    rate: number;
    description: string;
    images: Images;
  };
};

export function WishListCaruselCard({ data }: Props) {
  const [isLiked, setIsLiked] = useState(true);

  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '0px',
    slidesToShow: { xs: 1, sm: 1 },
  });

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Carousel
          carousel={carousel}
          sx={{
            maxWidth: 640,
          }}
        >
          {data.images.map((item, index) => (
            <CarouselItem key={item.id} index={index} item={item} />
          ))}
        </Carousel>
        <IconButton
          onClick={() => setIsLiked((prev) => !prev)}
          sx={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: 10,
            right: 10,
            color: isLiked ? 'primary.main' : 'common.white',
            backgroundColor: 'transparent',
            ':hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Iconify icon={isLiked ? 'solar:heart-bold' : 'solar:heart-outline'} width={30} />
        </IconButton>
        <CarouselArrowFloatButtons
          {...carousel.arrows}
          options={carousel.options}
          sx={{
            position: 'absolute',
            top: '43%',
            transform: 'translateY(-50%)',
            bgcolor: 'white',
            color: 'black',
          }}
          slotProps={{
            prevBtn: { sx: { width: 10, height: 10, left: 10, borderRadius: 10 } },
            nextBtn: { sx: { width: 10, height: 10, right: 10, borderRadius: 10 } },
          }}
        />
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ fontSize: 14 }}>{data.title}</Typography>
            <Typography sx={{ fontSize: 14, display: 'flex', alignContent: 'center' }}>
              <Iconify sx={{ width: 14 }} icon="eva:star-fill" />
              {data.rate}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 13, color: 'gray' }}>{data.description}</Typography>
        </Box>
      </Box>

      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{ position: 'absolute', color: 'white' }}
      />
    </>
  );
}

type CarouselItemProps = {
  index: number;
  item: Props['data']['images'][number];
};

function CarouselItem({ item }: CarouselItemProps) {
  return (
    <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <Box
        component="img"
        alt={item.title}
        src={item.coverUrl}
        sx={{ aspectRatio: '4/3', objectFit: 'cover', height: 250 }}
      />
    </Box>
  );
}
