import type { MotionProps } from 'framer-motion';

import { useState } from 'react';
import { m } from 'framer-motion';

import { Box, Button, Container, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import SectionHeader from '../components/section-header';

export type FilterItem = {
  id: string;
  title: string;
  type: string;
  icon?: React.ReactNode;
};

export default function AmenitiesView() {
  const [selectedFilters, setSelectedFilters] = useState<FilterItem[]>([]);

  const toggleFilter = (filter: FilterItem) => {
    setSelectedFilters((prev) => {
      const exists = prev.some((f) => f.id === filter.id && f.type === filter.type);
      return exists
        ? prev.filter((f) => !(f.id === filter.id && f.type === filter.type))
        : [...prev, filter];
    });
  };

  const motionProps: MotionProps = {
    variants: varFade('inUp', { distance: 24 }),
  };

  return (
    <Container
      maxWidth={false}
      component={MotionContainer}
      sx={{
        display: 'flex',
        maxWidth: '700px',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <SectionHeader {...headerData} />

      <m.div {...motionProps}>
        <Typography sx={{ fontWeight: 500, mt: 3 }} variant="h6">
          What about these guest favorites?
        </Typography>
      </m.div>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {AMENITIES_DATA.map((item) => {
          const filterItem: FilterItem = { ...item, type: 'amenity' };
          const isSelected = selectedFilters.some((f) => f.id === item.id && f.type === 'amenity');

          return (
            <m.div {...motionProps}>
              <Button
                key={item.id}
                onClick={() => toggleFilter(filterItem)}
                variant="outlined"
                startIcon={item.icon}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  borderRadius: '10px',
                  alignItems: 'start',
                  fontWeight: 600,
                  width: '100%',
                  minHeight: '100px',
                  fontSize: 15,
                  px: '20px',
                  boxShadow: isSelected ? '0 0 0 0.75px currentColor' : undefined,
                  border: isSelected ? '1px solid black' : undefined,
                }}
              >
                {item.title}
              </Button>
            </m.div>
          );
        })}
      </Box>
    </Container>
  );
}

const headerData = {
  title: 'Uyda mavjud bo‘lgan qulayliklar',
  description: 'Foydalanish mumkin bo‘lgan barcha qulayliklarni belgilang.',
};

export const AMENITIES_DATA = [
  {
    id: '1',
    title: 'Wifi',
    icon: <Iconify icon="custom-icon:wifi" width={30} />,
    type: 'amenity',
  },
  {
    id: '2',
    title: 'Air conditioning',
    icon: <Iconify icon="custom-icon:snow" width={30} />,
    type: 'amenity',
  },
  {
    id: '3',
    title: 'TV',
    icon: <Iconify icon="custom-icon:tv" width={30} />,
    type: 'amenity',
  },
  {
    id: '4',
    title: 'Kitchen',
    icon: <Iconify icon="custom-icon:kitchen" width={30} />,
    type: 'amenity',
  },
  {
    id: '5',
    title: 'Heating',
    icon: <Iconify icon="custom-icon:thermometer" width={30} />,
    type: 'amenity',
  },
  {
    id: '6',
    title: 'Refrigerator',
    icon: <Iconify icon="custom-icon:refrigerator" width={30} />,
    type: 'amenity',
  },
  {
    id: '7',
    title: 'Self check-in',
    icon: <Iconify icon="custom-icon:self-check" width={30} />,
    type: 'amenity',
  },
  {
    id: '8',
    title: 'Free parking',
    icon: <Iconify icon="custom-icon:parking" width={30} />,
    type: 'amenity',
  },
  {
    id: '9',
    title: 'Iron',
    icon: <Iconify icon="custom-icon:iron" width={30} />,
    type: 'amenity',
  },
  {
    id: '10',
    title: 'Allows pets',
    icon: <Iconify icon="custom-icon:pet" width={30} />,
    type: 'amenity',
  },
];
