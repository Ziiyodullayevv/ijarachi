import type { MotionProps } from 'framer-motion';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';

import { varFade, MotionContainer } from 'src/components/animate';

import SectionHeader from '../components/section-header';
import { MUIEditablePrice } from '../components/price-count';

export default function PriceView() {
  const motionProps: MotionProps = {
    variants: varFade('inUp', { distance: 24 }),
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '700px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      component={MotionContainer}
    >
      <SectionHeader {...headerData} />

      <m.div {...motionProps} style={{ marginTop: '20px' }}>
        <MUIEditablePrice />
      </m.div>
    </Container>
  );
}

const headerData = {
  title: 'Kunlik yoki oylik ijara narxini kiriting',
  description: 'Tanlangan ijara turi bo‘yicha mos narxni belgilang.',
};
