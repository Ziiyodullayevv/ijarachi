import { useState } from 'react';
import { m } from 'framer-motion';

import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';
import { varTap, transitionTap } from 'src/components/animate';

import { RECOMENDED_DATA } from './data';

export default function Recomended() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedItems(
      (prev) =>
        prev.includes(id)
          ? prev.filter((itemId) => itemId !== id) // o‘chirish
          : [...prev, id] // qo‘shish__
    );
  };

  return (
    <Grid container spacing={1.5}>
      {RECOMENDED_DATA.map((item) => {
        const isSelected = selectedItems.includes(item.id);
        return (
          <Grid key={item.id} size={3} sx={{ textAlign: 'center' }}>
            <Fab
              disableRipple
              onClick={() => handleToggle(item.id)}
              component={m.button}
              whileTap={varTap(0.92)}
              transition={transitionTap({ type: 'tween', duration: 0.08, ease: 'easeInOut' })}
              variant="outlined"
              color="black"
              sx={{
                width: '100%',
                height: 110,
                borderRadius: 1.5,
                border: '1px solid var(--palette-grey-300)',
                bgcolor: isSelected ? 'var(--palette-grey-200)' : 'transparent',
                '&.MuiFab-outlined': {
                  boxShadow: isSelected ? '0 0 0 0.75px currentColor' : undefined,
                  border: isSelected ? '1px solid black' : undefined,
                },
                '&.MuiFab-root:hover': {
                  boxShadow: isSelected ? '0 0 0 0.75px currentColor' : '0 0 0 0',
                  backgroundColor: isSelected
                    ? 'var(--palette-grey-200)'
                    : 'transparent !important',
                },
              }}
            >
              <Image sx={{ width: 52 }} src={item.imageUrl} />
            </Fab>
            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                fontWeight: isSelected ? 700 : 500,
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {item.title}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}
