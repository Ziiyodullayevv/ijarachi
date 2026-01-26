import type { MotionProps } from 'framer-motion';

import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFieldTextFieldProps } from '@mui/x-date-pickers/internals';

import { varFade, MotionContainer } from 'src/components/animate';

import SectionError from '../components/section-error';
import SectionHeader from '../components/section-header';

export default function DescriptionView() {
  const motionProps: MotionProps = {
    variants: varFade('inUp', { distance: 24 }),
  };

  const MAX_LENGTH = 500;
  const [count, setCount] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCount(value.length);
  };

  const showError = count > MAX_LENGTH ? true : false;

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

      <m.div {...motionProps}>
        <TextField
          sx={{
            width: '100%',
            mt: 3,
            '& .MuiInputBase-input': { fontSize: 16 },
          }}
          onChange={handleChange}
          {...useFieldTextFieldProps}
          rows={8}
          defaultValue="Bu noyob turar joyda o‘tkazgan vaqtingizni har doim eslab yurasiz."
          error={showError}
          multiline
        />
      </m.div>

      <Box>
        <m.div {...motionProps}>
          <Typography sx={{ color: 'gray', fontWeight: '500' }} variant="body2">
            {count}/500
          </Typography>
        </m.div>
        {showError && <SectionError {...errorData} />}
      </Box>
    </Container>
  );
}

const headerData = {
  title: 'Tavsif yarating',
  description: 'Uyingizni boshqalardan ajratib turadigan jihatlarni yozing.',
};

const errorData = { description: 'Maksimal 500 ta belgi kiritish mumkin' };
