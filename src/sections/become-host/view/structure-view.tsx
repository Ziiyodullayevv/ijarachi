'use client';

import type { MotionProps } from 'framer-motion';

import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionContainer } from 'src/components/animate';

import { RENT_TYPES } from '../data';

export default function StructureView() {
  const motionProps: MotionProps = {
    variants: varFade('inUp', { distance: 24 }),
  };

  // 🔹 DEFAULT SELECTED INDEX = 0
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Container
      component={MotionContainer}
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
      }}
    >
      <Box>
        <m.div {...motionProps}>
          <Typography sx={{ fontSize: 30, fontWeight: 700 }} variant="body1">
            Joyingiz turini tanlang
          </Typography>
        </m.div>

        <m.div {...motionProps}>
          <Typography sx={{ fontSize: 16 }} variant="body1">
             Keyingi bosqichda boshqa shartlarni belgilashingiz mumkin.
          </Typography>
        </m.div>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {RENT_TYPES.map((item, index) => {
          const isSelected = selectedIndex === index;

          return (
            <m.div {...motionProps} key={item.id}>
              <Button
                variant="outlined"
                size="large"
                disableRipple
                onClick={() => setSelectedIndex(index)} // 🔹 tanlash
                sx={{
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignContent: 'start',
                  width: '100%',
                  fontWeight: 500,
                  minHeight: 90,
                  px: 3,
                  py: 2,
                  boxShadow: isSelected ? '0 0 0 1px currentColor' : undefined,
                  border: isSelected ? '1px solid black' : undefined,
                }}
              >
                <Box
                  sx={{
                    textAlign: 'start',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: 2,
                  }}
                >
                  <div>
                    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{item.title}</Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        lineHeight: 1.4,
                        mt: 0.5,
                        display: 'inline-block',
                      }}
                    >
                      {item.description}
                    </Typography>
                  </div>

                  <div>{item.icon}</div>
                </Box>
              </Button>
            </m.div>
          );
        })}
      </Box>
    </Container>
  );
}
