import type { MotionProps } from 'framer-motion';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import Counters from '../components/counters';
import SectionHeader from '../components/section-header';

export default function Feautures() {
  const motionProps: MotionProps = {
    variants: varFade('inUp', { distance: 24 }),
  };

  return (
    <Container
      maxWidth={false}
      component={MotionContainer}
      sx={{
        maxWidth: '700px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <SectionHeader {...headerData} />

      <div>
        <m.div {...motionProps}>
          <Typography sx={{ fontWeight: 500, mt: 3, mb: 2 }} variant="h6">
            Uy haqida asosiy ko‘rsatkichlar qanday?
          </Typography>
        </m.div>

        <Counters />
      </div>

      <m.div {...motionProps}>
        <Typography sx={{ fontWeight: 500, mt: 3 }} variant="h6">
          Ta‘mir holati qanday ?
        </Typography>
      </m.div>

      {/* Tamir holati  */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {FEATURES_DATA.map((item) => (
          <m.div {...motionProps}>
            <Button
              key={item.id}
              onClick={() => 'akobir'}
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
                // boxShadow: isSelected ? '0 0 0 0.75px currentColor' : undefined,
                // border: isSelected ? '1px solid black' : undefined,
              }}
            >
              {item.title}
            </Button>
          </m.div>
        ))}
      </Box>

      <m.div {...motionProps}>
        <Typography sx={{ fontWeight: 500, mt: 3 }} variant="h6">
          Qanday qurilish materiali ishlatilgan ?
        </Typography>
      </m.div>

      {/* Tamir holati  */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {FEATURES_DATA.map((item) => (
          <m.div {...motionProps}>
            <Button
              key={item.id}
              onClick={() => 'akobir'}
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
                // boxShadow: isSelected ? '0 0 0 0.75px currentColor' : undefined,
                // border: isSelected ? '1px solid black' : undefined,
              }}
            >
              {item.title}
            </Button>
          </m.div>
        ))}
      </Box>
    </Container>
  );
}

const headerData = {
  title: 'Uy haqida asosiy ma’lumotlar',
  description: 'Uyning xonalari, maydoni va holati haqidagi ma’lumotlarni belgilang.',
};

const FEATURES_DATA = [
  {
    id: '1',
    title: 'Yangi ta’mirlangan',
    icon: <Iconify icon="custom-icon:wifi" width={30} />,
    type: 'amenity',
  },
  {
    id: '2',
    title: 'Yaxshi holatda',
    icon: <Iconify icon="custom-icon:snow" width={30} />,
    type: 'amenity',
  },
  {
    id: '3',
    title: 'O‘rtacha holat',
    icon: <Iconify icon="custom-icon:tv" width={30} />,
    type: 'amenity',
  },
  {
    id: '4',
    title: 'Ta’mirsiz',
    icon: <Iconify icon="custom-icon:kitchen" width={30} />,
    type: 'amenity',
  },
  {
    id: '5',
    title: 'Evro ta’mir',
    icon: <Iconify icon="custom-icon:thermometer" width={30} />,
    type: 'amenity',
  },
];
