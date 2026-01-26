import type { MotionProps } from 'framer-motion';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionContainer } from 'src/components/animate';

export default function AboutYourPlaceView() {
  const motionProps: MotionProps = {
    variants: varFade('inUp', { distance: 24 }),
  };

  return (
    <Container
      component={MotionContainer}
      maxWidth="lg"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Box>
        <m.div {...motionProps}>
          <Typography sx={{ textTransform: 'uppercase', fontWeight: 500 }} variant="body1">
            Joy ma’lumotlari
          </Typography>
        </m.div>
        <m.div {...motionProps}>
          <Typography sx={{ fontSize: '50px !important', fontWeight: 700 }} variant="body1">
            Ijaraga beriladigan joy
          </Typography>
        </m.div>

        <m.div {...motionProps}>
          <Typography sx={{ fontSize: 18, mt: 2 }} variant="body1">
            Obyekt turini tanlang, asosiy xususiyatlar va qulayliklarni belgilang, rasmlar qo‘shing,
            joylashuvni kiriting, so‘ng uy nomi va narxni belgilang.
          </Typography>
        </m.div>
      </Box>

      <Box sx={{ marginRight: '-50px' }}>
        <m.div {...motionProps}>
          <video src={video} autoPlay muted playsInline style={{ width: '600px' }} />
        </m.div>
      </Box>
    </Container>
  );
}

const video =
  'https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high';
