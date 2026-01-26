import type { MotionProps } from 'framer-motion';

import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate';

// -------------------- helpers --------------------
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const preventWeirdKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
};

function useNumberField(initial: number, min: number, max: number) {
  const [value, setValue] = useState<number>(initial);
  const [raw, setRaw] = useState<string>(String(initial));

  const sync = (next: number) => {
    setValue(next);
    setRaw(String(next));
  };

  const inc = () => sync(clamp(value + 1, min, max));
  const dec = () => sync(clamp(value - 1, min, max));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextRaw = e.target.value;

    if (nextRaw === '') {
      setRaw('');
      return;
    }

    if (!/^\d+$/.test(nextRaw)) return;

    const num = Number(nextRaw);
    if (Number.isNaN(num)) return;

    const clamped = clamp(num, min, max);
    setRaw(String(clamped));
    setValue(clamped);
  };

  const onBlur = () => {
    if (raw === '') {
      sync(min);
      return;
    }
    const num = Number(raw);
    if (Number.isNaN(num)) {
      sync(min);
      return;
    }
    sync(clamp(num, min, max));
  };

  return { value, raw, inc, dec, onChange, onBlur, min, max };
}

// -------------------- styles --------------------
const buttonStyles = {
  minWidth: '35px',
  minHeight: '35px',
  borderRadius: '100px',
  p: 0,
};

const numberFieldSx = {
  width: '60px',
  height: '35px',
  '& .MuiOutlinedInput-root': {
    height: 35,
    borderRadius: '100px',
  },
  '& .MuiOutlinedInput-input': {
    textAlign: 'center',
    p: 0,
  },
};

// -------------------- component --------------------
export default function Counters() {
  const motionProps: MotionProps = {
    variants: varFade('inUp', { distance: 24 }),
  };

  // Hooklarni map ichida chaqirmaymiz (Rule of Hooks)
  const rooms = useNumberField(1, 1, 100);
  const area = useNumberField(30, 1, 1000);
  const floor = useNumberField(1, 1, 200);
  const buildingFloors = useNumberField(9, 1, 200);

  const fields = [
    { key: 'rooms', label: 'Xonalar soni', ctrl: rooms },
    { key: 'area', label: 'Kvartira maydoni (m²)', ctrl: area },
    { key: 'floor', label: 'Qavat', ctrl: floor },
    { key: 'buildingFloors', label: 'Bino qavatlari soni', ctrl: buildingFloors },
  ] as const;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {fields.map(({ key, label, ctrl }, idx) => (
        <Box key={key}>
          <m.div {...motionProps}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                my: 2,
              }}
            >
              <Typography sx={{ fontWeight: 400, color: 'gray' }} variant="h5">
                {label}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <Button
                  sx={buttonStyles}
                  variant="outlined"
                  onClick={ctrl.dec}
                  disabled={ctrl.value <= ctrl.min}
                >
                  <Iconify icon="custom-icon:minuss" width={15} />
                </Button>

                <TextField
                  value={ctrl.raw}
                  onChange={ctrl.onChange}
                  onBlur={ctrl.onBlur}
                  onKeyDown={preventWeirdKeys}
                  type="number"
                  size="small"
                  placeholder="0"
                  inputProps={{ min: ctrl.min, max: ctrl.max, inputMode: 'numeric' }}
                  sx={numberFieldSx}
                />

                <Button
                  sx={buttonStyles}
                  variant="outlined"
                  onClick={ctrl.inc}
                  disabled={ctrl.value >= ctrl.max}
                >
                  <Iconify icon="custom-icon:pluss" width={15} />
                </Button>
              </Box>
            </Box>
          </m.div>

          {/* oxirida alohida Divider kerak bo'lsa, sizdagi kabi pastda qoldiramiz */}
          {idx !== fields.length - 1 ? (
            <m.div {...motionProps}>
              <Divider />
            </m.div>
          ) : null}
        </Box>
      ))}
    </Box>
  );
}
