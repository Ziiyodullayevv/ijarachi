import type { NavCarouselProps } from '../type';

import { useState } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { megaMenuClasses } from 'src/components/mega-menu';
import { Carousel, useCarousel, CarouselArrowBasicButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

export function HeroCarusel({ sx, slides, className, options, ...other }: NavCarouselProps) {
  const carousel = useCarousel({
    ...options,
    slidesToShow: options?.slidesToShow ?? 7,
    slidesToScroll: options?.slidesToScroll ?? 7,
  });

  // Har bir item uchun like saqlaymiz
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (name: string) => {
    setLiked((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <CarouselRoot
      className={mergeClasses([megaMenuClasses.carousel.root, className])}
      sx={sx}
      {...other}
    >
      <CarouselHeader>
        <TitleRow>
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
            {slides[0]?.cityTitle || 'Popular members'}
          </Typography>

          <Iconify icon="solar:right-arrow" width={20} />
        </TitleRow>
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
      </CarouselHeader>

      <Carousel carousel={carousel}>
        {slides.map((item) => {
          const isLiked = liked[item.title];
          return (
            <CarouselItemRoot
              key={item.title}
              // href={item.path}
              color="inherit"
              underline="none"
              className={megaMenuClasses.carousel.item}
            >
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault(); // link bosilmasin
                    toggleLike(item.title);
                  }}
                  sx={{
                    position: 'absolute',
                    zIndex: 100,
                    right: 7,
                    top: 7,
                    color: isLiked ? 'primary.main' : 'common.white',
                    transition: 'color 0.25s ease',
                  }}
                  size="small"
                >
                  <Iconify icon={isLiked ? 'solar:heart-bold' : 'solar:heart-outline'} width={30} />
                </IconButton>

                <Image
                  alt={item.title}
                  src={item.coverUrl}
                  ratio="1/1"
                  sx={{ borderRadius: 2.5 }}
                />
              </Box>

              <CaruselTitleWrapper>
                <CarouselItemTitle>{item.title}</CarouselItemTitle>
                <CarouselItemSubTitle>{item.hostType}</CarouselItemSubTitle>
                <CarouselItemSubTitle sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  ${item.pricePerNight} for {item.nights} nights{' '}
                  <Iconify icon="eva:star-fill" width={12} />
                  4.8
                </CarouselItemSubTitle>
              </CaruselTitleWrapper>
            </CarouselItemRoot>
          );
        })}
      </Carousel>
    </CarouselRoot>
  );
}

// ----------------------------------------------------------------------

const CarouselRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(2),
}));

const CarouselHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  justifyContent: 'space-between',
}));

const CarouselItemRoot = styled(Link)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexDirection: 'column',
  padding: theme.spacing(0, 0.8),
  transition: theme.transitions.create('color'),
  '&:hover': { color: theme.vars.palette.primary.main },
}));

const CaruselTitleWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const CarouselItemTitle = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  ...theme.mixins.maxLine({ line: 1, persistent: theme.typography.caption }),
  fontWeight: theme.typography.fontWeightSemiBold,
  fontSize: 14,
}));

const CarouselItemSubTitle = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  ...theme.mixins.maxLine({ line: 1, persistent: theme.typography.caption }),
}));

const TitleRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));
