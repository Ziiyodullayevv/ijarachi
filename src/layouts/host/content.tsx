import type { BoxProps } from '@mui/material/Box';

import { mergeClasses } from 'minimal-shared/utils';

import Box from '@mui/material/Box';

import { layoutClasses } from '../core';

// ----------------------------------------------------------------------

export type HostContentProps = BoxProps;

export function HostContent({ sx, children, className, ...other }: HostContentProps) {
  return (
    <Box
      className={mergeClasses([layoutClasses.content, className])}
      sx={[
        () => ({
          width: 1,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 'var(--layout-host-width)',
          bgcolor: 'transparent',
          pb: 10,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {children}
    </Box>
  );
}
