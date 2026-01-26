import type { Theme } from '@emotion/react';
import type { SxProps } from '@mui/material/styles';
import type { MasonryProps } from '@mui/lab/Masonry';
import type { CarouselOptions } from 'src/components/carousel';
import type { NavItemSlotProps } from 'src/components/nav-section';

export type NavSlotProps = {
  rootItem?: Pick<NavItemSlotProps, 'sx' | 'icon' | 'title' | 'info' | 'arrow'>;
  subItem?: SxProps<Theme>;
  subheader?: SxProps<Theme>;
  dropdown?: SxProps<Theme>;
  tags?: SxProps<Theme>;
  moreLink?: SxProps<Theme>;
  masonry?: Omit<MasonryProps<'ul'>, 'ref' | 'children'>;
  carousel?: {
    sx?: SxProps<Theme>;
    options?: CarouselOptions;
  };
};

export type NavCarouselProps = React.ComponentProps<'div'> &
  NavSlotProps['carousel'] & {
    slides: {
      cityTitle: string;
      title: string;
      hostType: string;
      pricePerNight: number;
      totalPrice: number;
      nights: number;
      rating: number;
      coverUrl: string;
    }[];
  };
