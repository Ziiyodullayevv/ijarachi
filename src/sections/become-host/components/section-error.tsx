import type { MotionProps } from 'framer-motion';

import { m } from 'framer-motion';

import Typography from '@mui/material/Typography';

import { varFade } from 'src/components/animate';
import { Iconify } from 'src/components/iconify';

export default function SectionError({ description }: { description: string }) {
  const motionProps: MotionProps = {
    variants: varFade('inUp', { distance: 24 }),
  };
  return (
    <m.div {...motionProps}>
      {description && (
        <Typography
          sx={{ display: 'inline-flex', gap: '5px', mt: 1 }}
          color="error"
          variant="caption"
        >
          <Iconify icon="custom-icon:info" width={18} /> {description}
        </Typography>
      )}
    </m.div>
  );
}
