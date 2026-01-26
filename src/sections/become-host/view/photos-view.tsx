import type { MotionProps } from 'framer-motion';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';

import { varFade, MotionContainer } from 'src/components/animate';

import { UploadView } from '../components/upload';
import SectionHeader from '../components/section-header';

export default function PhotosView() {
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

      <m.div {...motionProps}>
        <UploadView />
      </m.div>
    </Container>
  );
}

const headerData = {
  title: 'Kvartira rasmlarini qo‘shing',
  description: 'E’lonni joylash uchun kamida 5 ta rasm yuklashingiz kerak.',
};
