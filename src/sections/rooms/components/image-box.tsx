import { Box, Button } from '@mui/material';

import { Image } from 'src/components/image';

type ImageBoxProps = {
  img: string;
  minHeight: number;
  alt?: string;
  showButton?: boolean;
};

export function ImageBox({ img, alt, minHeight, showButton }: ImageBoxProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: minHeight,
        overflow: 'hidden',

        // OVERLAY
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1,
        },

        // HOVER
        '&:hover::after': {
          cursor: 'pointer',
          opacity: 1,
        },
      }}
    >
      <Image
        src={img}
        alt={alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {showButton && (
        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            right: 15,
            bottom: 15,
            zIndex: 2, // overlay ustida turadi
            bgcolor: 'white',
            color: 'black',
            border: '1px solid black',
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          Show all photos
        </Button>
      )}
    </Box>
  );
}
