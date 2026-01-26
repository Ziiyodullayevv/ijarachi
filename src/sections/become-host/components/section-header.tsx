interface SectionHeaderProps {
  title: string;
  description?: string;
}

// ---------------------------------------

import type { MotionProps } from 'framer-motion';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { varFade } from 'src/components/animate';

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  const motionProps: MotionProps = {
    variants: varFade('inUp', { distance: 24 }),
  };
  return (
    <Box>
      <m.div {...motionProps}>
        {title && (
          <Typography sx={{ fontSize: 30, fontWeight: 700 }} variant="body1">
            {title}
          </Typography>
        )}
      </m.div>

      <m.div {...motionProps}>
        {description && (
          <Typography sx={{ fontSize: 16, mt: 1}} variant="body1">
            {description}
          </Typography>
        )}
      </m.div>
    </Box>
  );
}
