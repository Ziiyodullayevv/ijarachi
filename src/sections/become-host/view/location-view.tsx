import type { MotionProps } from 'framer-motion';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';

import { varFade, MotionContainer } from 'src/components/animate';

import SectionHeader from '../components/section-header';
import { YandexLocationPicker } from '../components/yandex-location-picker';

export default function DescriptionView() {
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

      {
        <m.div {...motionProps}>
          <YandexLocationPicker
            apiKey="79b53398-7df4-42bc-aa98-6758b4529145" // yoki process.env.REACT_APP_...
            onLocationChange={(loc) => {
              // loc?.coords => [lon, lat]
              console.log('Picked:', loc);
            }}
          />
          ;
        </m.div>
      }
    </Container>
  );
}

const headerData = {
  title: 'Joyingiz qayerda joylashgan?',
  description: 'Manzilingiz faqat mehmon bron qilgandan keyin ko‘rsatiladi.',
};
